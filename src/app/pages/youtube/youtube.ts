import { Component, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { OllamaService } from '@core/API/ollama.api';
import { YoutubeService } from '@core/API/youtube.api';
import { ChatBox } from '@shared/components/chat-box/chat-box';
import { ChatMessage, VideoDetails } from '@shared/definitions/interfaces';
import { of } from 'rxjs';

@Component({
  selector: 'app-youtube',
  imports: [ChatBox],
  templateUrl: './youtube.html',
  styleUrl: './youtube.scss'
})

export class YoutubeComponent {

  videoId = signal<string>('');
  youtube = inject(YoutubeService);
  private llama = inject(OllamaService);
  chat = signal<ChatMessage[]>([]);
  loading = signal(false);

  userResource = rxResource<VideoDetails | null, string>({
    params: () => this.videoId(),
    stream: ({ params: id }) => id ? this.youtube.getVideoDetails(id) : of(null)
  });

  public search(value: string): void {
    if (!value.trim()) { return; }
    this.videoId.set(value);
  }
  
  constructor() {
    effect(() => {
      const video = this.userResource.value();
      if (video) {
        const foo = video.subtitles.map(sub => sub.text).join(" ");
        this.loading.set(true);
        let accumulated = '';
        this.llama.runStream(`dame un resumen corto de este texto: ${foo}`).subscribe({
      next: async (chunk) => {
        accumulated += chunk;
        this.chat.update(chat => ([{ from: 'ollama', text: accumulated }]));
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
      }
    })
  }

}

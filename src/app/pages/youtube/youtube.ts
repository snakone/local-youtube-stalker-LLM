import { Component, effect, inject, signal, untracked } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { OllamaService } from '@core/API/ollama.api';
import { YoutubeService } from '@core/API/youtube.api';
import { ChatBoxComponent } from '@shared/components/chat-box/chat-box';
import { ChatMessage, PromptType, Subtitle, VideoDetails } from '@shared/definitions/interfaces';
import { PROMPT_TYPE, RADIO_TYPES } from '@shared/utils/const.utils';
import { extractYouTubeId } from '@shared/utils/utils.functions';

@Component({
  selector: 'app-youtube',
  imports: [ChatBoxComponent],
  templateUrl: './youtube.html',
  styleUrl: './youtube.scss'
})

export class YoutubeComponent {

  private llama = inject(OllamaService);
  private youtube = inject(YoutubeService);
  videoId = signal<string>('');
  chat = signal<ChatMessage[]>([]);
  loading = signal(false);
  type = signal<PromptType>('resume');
  radioTypes = RADIO_TYPES;

  userResource = rxResource<VideoDetails | null, string>({
    params: () => this.videoId(),
    stream: ({ params: id }) => id ? this.youtube.getVideoDetails(id) : of(null)
  });
  
  constructor() {
    effect(() => {
      const video = this.userResource.value();
      if (video) {
        this.start(video.title);
        let accumulated = '';
        const prompt = this.getPrompt(video.subtitles);

        this.llama.runStream(prompt).subscribe({
          next: async (chunk) => {
            accumulated += chunk;
            this.chat.update(chat => [
              chat[0],
              { from: 'ollama', text: accumulated }
            ]);
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
    });
  }

  private start(title: string): void {
    this.loading.set(true);
    this.chat.set([{ from: 'ollama', text: `<b>Título</b>: ${title}` }]);
  }

  private getPrompt(subtitles: Subtitle[]): string {
    const text = subtitles.map(sub => sub.text).join(" ");
    const type = untracked(() => this.type());
    return `${PROMPT_TYPE[type]} ${text}`;
  }
  
  public search(value: string): void {
    if (!value.trim()) { return; }
    const id = extractYouTubeId(value);
    this.videoId.set(id || value);
    this.userResource.reload();
  }

}

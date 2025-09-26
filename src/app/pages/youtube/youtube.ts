import { Component, effect, inject, signal, untracked } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { MatIcon } from '@angular/material/icon';

import { OllamaService } from '@core/api/ollama.api';
import { YoutubeService } from '@core/api/youtube.api';
import { ChatBoxComponent } from '@shared/components/chat-box/chat-box';
import { ChatMessage, PromptType, Subtitle, VideoDetails } from '@shared/definitions/interfaces';
import { PROMPT_TYPE, RADIO_TYPES } from '@shared/utils/const.utils';
import { extractYouTubeId } from '@shared/utils/utils.functions';
import { Autofocus } from "@shared/directives/autofocus";
import { CrafterService } from '@core/crafter.service';

@Component({
  selector: 'app-youtube',
  imports: [ChatBoxComponent, Autofocus, MatIcon],
  templateUrl: './youtube.html',
  styleUrl: './youtube.scss'
})

export class YoutubePage {

  private llama = inject(OllamaService);
  private youtube = inject(YoutubeService);
  private crafter = inject(CrafterService);
  
  videoId = signal<string>('');
  chat = signal<ChatMessage[]>([]);
  loading = signal(false);
  type = signal<PromptType>('resume');
  radioTypes = RADIO_TYPES;
  controller: AbortController | undefined;

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

        if (video.subtitles.length === 0) {
          this.crafter.openSnackBar("No se ha encontrado texto en el vídeo. Revisa el Id.");
          this.loading.set(false);
          return;
        }

        const prompt = this.getPrompt(video.subtitles);
        this.controller = new AbortController();

        this.llama.runStream({prompt, signal: this.controller.signal})
        .subscribe({
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
  }

  public stop(): void {
    this.controller?.abort('Stopped');
    this.loading.set(false);
  }

  ngOnDestroy() {
    if (this.controller?.signal) {
      this.controller.abort();
    }
  }

}

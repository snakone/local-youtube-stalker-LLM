import { Component, effect, inject, signal, untracked } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

import { OllamaService } from '@core/api/ollama.api';
import { ScrapperService } from '@core/api/scrapper.api';
import { ChatBoxComponent } from '@shared/components/chat-box/chat-box';
import { ChatMessage, PromptType } from '@shared/definitions/interfaces';
import { Autofocus } from '@shared/directives/autofocus';
import { PROMPT_TYPE, RADIO_TYPES } from '@shared/utils/const.utils';
import { CrafterService } from '@core/crafter.service';

const httpsRegex = /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}.*$/;

@Component({
  selector: 'app-web',
  imports: [ChatBoxComponent, Autofocus],
  templateUrl: './web.html',
  styleUrl: './web.scss'
})

export class WebPage {

  private llama = inject(OllamaService);
  private scrapper = inject(ScrapperService);
  private crafter = inject(CrafterService);

  url = signal<string>('');
  chat = signal<ChatMessage[]>([]);
  loading = signal(false);
  type = signal<PromptType>('resume');
  radioTypes = RADIO_TYPES.filter(type => type.value !== 'humor');;

  userResource = rxResource<string | null, string>({
    params: () => this.url(),
    stream: ({ params: url }) => url ? this.scrapper.scrappePage(url)
    .pipe(catchError(err => {
      this.crafter.openSnackBar("Página web no encontrada. Revisa la URL.")
      throw new Error(err.error.message);
    })) : of(null),
  });

  constructor() {
    effect(() => {
      const text = this.userResource.value();
      if (text) {
        this.start();
        let accumulated = '';
        const prompt = this.getPrompt(text);
      
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

  private start(): void {
    this.loading.set(true);
    this.chat.set([{ from: 'ollama', text: `Analizando web...` }]);
  }

  private getPrompt(text: string): string {
    const type = untracked(() => this.type());
    return `${PROMPT_TYPE[type]} ${text}`;
  }

  public search(value: string): void {
    if (!value.trim()) { return; }
    this.url.set(value);
    this.userResource.reload();
  }

  public isURLInValid(url: string): boolean {
    return !httpsRegex.test(url.trim());
  }

}

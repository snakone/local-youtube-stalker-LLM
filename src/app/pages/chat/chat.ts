import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { OllamaService } from '@core/api/ollama.api';
import { ChatMessage } from '@shared/definitions/interfaces';
import { ChatBoxComponent } from '@shared/components/chat-box/chat-box';
import { Autofocus } from '@shared/directives/autofocus';

@Component({
  selector: 'app-chat',
  imports: [ChatBoxComponent, Autofocus, MatIcon],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})

export class ChatPage {
  private llama = inject(OllamaService);
  @ViewChild('input') input?: ElementRef<HTMLInputElement>;

  chat = signal<ChatMessage[]>([]);
  loading = signal(false);

  controller: AbortController | undefined;

  public sendMessage(text: string): void {
    if (!text || this.loading()) return;

    this.start(text);
    const index = this.chat().length;
    this.chat.update(chat => [...chat, { from: 'ollama', text: '' }]);
    let accumulated = '';
    this.controller = new AbortController();

    this.llama.runStream({prompt: text, signal: this.controller.signal})
    .subscribe({
      next: async (chunk) => {
        accumulated += chunk;
        this.chat.update(chat => {
          const updated = [...chat];
          updated[index] = { from: 'ollama', text: accumulated };
          return updated;
        });
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
        setTimeout(() => this.input?.nativeElement.focus(), 1);
      },
    });
  }

  private start(text: string): void {
    this.chat.update(chat => [...chat, { from: 'user', text }]);
    this.input!.nativeElement.value = '';
    this.loading.set(true);
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

import { Component, inject, signal } from '@angular/core';

import { OllamaService } from '@core/api/ollama.api';
import { ChatMessage } from '@shared/definitions/interfaces';
import { ChatBoxComponent } from '@shared/components/chat-box/chat-box';
import { Autofocus } from '@shared/directives/autofocus';

@Component({
  selector: 'app-chat',
  imports: [ChatBoxComponent, Autofocus],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})

export class ChatPage {
  private llama = inject(OllamaService);

  chat = signal<ChatMessage[]>([]);
  input = signal('');
  loading = signal(false);

  public sendMessage(): void {
    const text = this.input().trim();
    if (!text || this.loading()) return;

    this.start(text);
    const index = this.chat().length;
    this.chat.update(chat => [...chat, { from: 'ollama', text: '' }]);
    let accumulated = '';

    this.llama.runStream(text).subscribe({
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
      },
    });
  }

  private start(text: string): void {
    this.chat.update(chat => [...chat, { from: 'user', text }]);
    this.input.set('');
    this.loading.set(true);
  }

}

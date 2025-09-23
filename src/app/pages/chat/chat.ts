import { Component, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { OllamaService } from '@core/API/ollama.api';
import { ChatMessage } from '@shared/definitions/interfaces';
import { ChatBox } from '@shared/components/chat-box/chat-box';

@Component({
  selector: 'app-chat',
  imports: [ChatBox],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})

export class ChatComponent {
  private llama = inject(OllamaService);

  chat = signal<ChatMessage[]>([]);
  input = signal('');
  loading = signal(false);
  label = signal((from: 'user' | 'ollama') => from === 'user' ? 'Tú:' : 'Ollama:');

  @ViewChild('messagesContainer') messagesContainer?: ElementRef<HTMLDivElement>;

  constructor() {
    effect(() => {
      this.chat();
      queueMicrotask(() => {
        const el = this.messagesContainer?.nativeElement;
        if (el) el.scrollTop = el.scrollHeight;
      });
    });
  }

  public sendMessage(): void {
    const text = this.input().trim();
    if (!text || this.loading()) return;

    this.chat.update(chat => [...chat, { from: 'user', text }]);
    this.input.set('');
    this.loading.set(true);

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
      }
    });
  }

}

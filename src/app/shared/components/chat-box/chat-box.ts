import { NgClass } from '@angular/common';
import { Component, computed, effect, ElementRef, model, ViewChild } from '@angular/core';

import { ChatMessage } from '@shared/definitions/interfaces';
import { MarkdownPipe } from '@shared/pipes/markdown.pipe';

@Component({
  selector: 'app-chat-box',
  imports: [NgClass, MarkdownPipe],
  templateUrl: './chat-box.html',
  styleUrl: './chat-box.scss'
})

export class ChatBoxComponent {
  @ViewChild('messagesContainer') messagesContainer?: ElementRef<HTMLDivElement>;

  readonly chat = model<ChatMessage[]>([]);
  readonly loading = model(false);

  readonly label = computed(() => (from: 'user' | 'ollama') =>
    from === 'user' ? 'Tú:' : 'Ollama:'
  );

  constructor() {
    effect(() => {
      this.chat();
      queueMicrotask(() => this.scrollToBottom());
    });
  }

  private scrollToBottom(): void {
    const el = this.messagesContainer?.nativeElement;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }

}

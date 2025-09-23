import { NgClass } from '@angular/common';
import { Component, ElementRef, model, signal, ViewChild } from '@angular/core';
import { ChatMessage } from '@shared/definitions/interfaces';
import { MarkdownPipe } from '@shared/pipes/markdown.pipe';

@Component({
  selector: 'app-chat-box',
  imports: [NgClass, MarkdownPipe],
  templateUrl: './chat-box.html',
  styleUrl: './chat-box.scss'
})

export class ChatBox {

  @ViewChild('messagesContainer') messagesContainer?: ElementRef<HTMLDivElement>;

  chat = model<ChatMessage[]>([]);
  label = signal((from: 'user' | 'ollama') => from === 'user' ? 'Tú:' : 'Ollama:');
  loading = model(false);

}

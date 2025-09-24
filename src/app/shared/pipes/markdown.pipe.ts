import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Pipe({ name: 'markdown' })
export class MarkdownPipe implements PipeTransform {
  sanitizer = inject(DomSanitizer);

  transform(value: string): SafeHtml {
    const result = marked.parse(value || '');
    return this.sanitizer.bypassSecurityTrustHtml(String(result));
  }
}
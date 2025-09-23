import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URI = 'http://localhost:11434';

@Injectable({ providedIn: 'root' })

export class OllamaService {
  private apiUrl = `${URI}/api/generate`;

  constructor() {}

  public runStream(prompt: string, model = 'gemma3:latest'): Observable<string> {
    return new Observable<string>(observer => {
      const body = {
        model,
        prompt,
        options: {
          temperature: 0.3,
        },
        stream: true,
      };

      fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then(response => {
          if (!response.body) throw new Error('No stream body');
          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          let buffer = '';
          function read() {
            reader.read().then(({ done, value }) => {
              if (done) {
                if (buffer) observer.next(buffer);
                observer.complete();
                return;
              }
              buffer += decoder.decode(value, { stream: true });

              let lines = buffer.split('\n');
              buffer = lines.pop() || '';
              for (const line of lines) {
                if (!line.trim()) continue;
                try {
                  const json = JSON.parse(line);
                  if (json.response !== undefined) {
                    observer.next(json.response);
                  }
                } catch (e) {
                  console.error(e);
                }
              }
              read();
            });
          }
          read();
        })
        .catch(err => observer.error(err));

      // Cleanup
      return () => {};
    });
  }
}
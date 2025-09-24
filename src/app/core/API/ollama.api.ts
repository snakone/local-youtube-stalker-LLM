import { inject, Injectable } from '@angular/core';
import { CrafterService } from '@core/crafter.service';
import { LLMService } from '@shared/components/header/header.service';
import { Observable } from 'rxjs';

const URI = 'http://localhost:11434';

@Injectable({ providedIn: 'root' })

export class OllamaService {
  private apiUrl = `${URI}/api/generate`;
  private crafter = inject(CrafterService);

  constructor() {}

  public runStream(prompt: string, model = LLMService.selected()): Observable<string> {
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

          if (response.status === 404 && !response.ok) {
            this.crafter.openSnackBar('Módelo no encontrado. Prueba de instalarlo en Ollama.', 'Cerrar');
            observer.error(new Error('Not Found 404'));
          }

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
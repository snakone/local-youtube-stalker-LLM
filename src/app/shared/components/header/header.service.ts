import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class LLMService {
  public static selected = signal('gemma3:latest');
}
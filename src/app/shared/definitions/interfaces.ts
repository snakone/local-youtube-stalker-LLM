export interface ChatMessage {
  from: 'user' | 'ollama';
  text: string;
}

export interface VideoDetails {
    title: string;
    description: string;
    subtitles: Subtitle[];
}

export interface Subtitle {
    start: string;
    dur: string;
    text: string;
}

export interface VideoDetailsResponse extends ServerResponse {
  details: VideoDetails;
}

export interface ScrapperResponse extends ServerResponse {
  text: string;
}

export interface ServerResponse {
  ok: boolean;
  error?: string;
}

export interface HeaderItem {
  route: string;
  image: string;
  label: string;
  disabled: boolean;
}

export type PromptType = 'resume' | 'critic' | 'humor';
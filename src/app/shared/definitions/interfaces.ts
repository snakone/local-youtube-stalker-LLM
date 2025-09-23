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

export interface ServerResponse {
  ok: boolean;
  error?: string;
}
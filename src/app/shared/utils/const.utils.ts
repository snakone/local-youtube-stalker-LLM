import { HeaderItem, PromptType } from "@shared/definitions/interfaces";

export const PROMPT_TYPE: {[keyof in PromptType]: string} = {
  resume: 'Dame un resumen del siguiente texto para poder analizarlo, no digas nada extra, básate unicamente en el análisis, no empieces con frases como, voy a resumir el texto, aqui tienes el texto... dame el analisis directamente: ',
  critic: 'Eres un crítico y te encanta dar tu opinión y criticar texto, ahora mismo tu jefe te ha mandado que critiques este texto, no hace falta que digás quien eres, simplemente haz la crítica sin comentarios adicionales: ',
  humor: 'Eres un humorista de gran prestigio. Para pasar el rato, te dejo un texto para que lo analices y hagas humor con él. No digas quien eres, simplemente, intenta hacer reir al lector o ridiculizar a la persona que escribió el texto: '
}

export const RADIO_TYPES: {value: PromptType, label: string}[] = [
  { value: 'resume', label: 'Análisis' },
  { value: 'critic', label: 'Crítica' },
  { value: 'humor', label: 'Humor' }
];

const localhost = new URL(window.location.href);
export const disabled = !localhost.host.startsWith('localhost');

export const HEADER_ITEMS: HeaderItem[] = [
  { label: 'Chat', route: '/chat', image: '/chat.png', disabled },
  { label: 'Youtube', route: '/youtube', image: '/youtube.png', disabled },
  { label: 'Web', route: '/web', image: '/internet.png', disabled },
  { label: 'Install', route: '/install', image: '/install.png', disabled: false },
  { label: 'About', route: '/about', image: '/information.png', disabled: false },
];

export const AVAILABLE_LLM = ['gemma3:latest', 'qwen2.5-coder:latest', 'llama3.1:latest'];
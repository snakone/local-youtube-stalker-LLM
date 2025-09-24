import { PromptType } from "@shared/definitions/interfaces";

export const PROMPT_TYPE: {[keyof in PromptType]: string} = {
  resume: 'Dame un resumen del siguiente texto para poder analizarlo, no digas nada extra, básate unicamente en el análisis, no empieces con frases como, voy a resumir el texto, aqui tienes el texto... dame el analisis directamente: ',
  critic: 'Eres un crítico y te encanta dar tu opinión y criticar texto, ahora mismo tu jefe te ha mandado que critiques este texto, no hace falta que digás quien eres, simplemente haz la crítica sin comentarios adicionales: ',
  humor: 'Eres un humorista de gran prestigio. Para pasar el rato, te dejo un texto para que lo analices y hagas humor con él. No digas quien eres, simplemente, intenta hacer reir al lector o ridiculizar a la persona que escribió el texto: '
}

export const RADIO_TYPES: {value: PromptType, label: string}[] = [
  { value: 'resume', label: 'Análisis' },
  { value: 'critic', label: 'Crítica' },
  { value: 'humor', label: 'Humor' }
]
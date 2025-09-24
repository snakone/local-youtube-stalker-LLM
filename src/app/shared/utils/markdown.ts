export const INSTALL_MARKDOWN = `
## Instalación

Sigue estos pasos para poder instalar **Local Youtube Stalker** de manera local.

### 1. Instalar Ollama

- Visita [Ollama](https://ollama.com/download) y descarga la versión para tu plataforma.
- Usando Ollama, obtén los 3 módelos por defectos usados en la aplicación: **gemma3:latest**, **qwen2.5-coder:latest** y **llama3.1:latest**.

### 2. Obtener el cliente

- Visita el Github de [Local Youtube Tracker Client](https://github.com/snakone/local-youtube-stalker-LLM) y descarga el código.
- Dirígete a la raíz del proyecto, abre una terminal y ejecuta el comando: 

\`npm install\`

- Una vez instalado el cliente, ejecuta el siguiente comando para abrir la aplicación en tu navegador.

\`npm start\`

### 3. Obtener el servidor

- Visita el Github de [Local Youtube Tracker Server](https://github.com/snakone/local-youtube-stalker-server) y descarga el código.
- Dirígete a la raíz del proyecto, abre una terminal y ejecuta el comando: 

\`npm install\`

- Una vez instalado el servidor, ejecuta el siguiente comando para iniciar el servidor.

\`tsc && npm start\`
`;

export const ABOUT_MARKDOWN = `
## Presentación

Local Youtube Stalker Client (LYSC) es una aplicación totalmente **gratuita** que te permite aprovechar el poder de modelos de lenguaje grandes (LLM) directamente en tu máquina local usando **Ollama**. Olvídate de costes ocultos: aquí todo se ejecuta en tu propio equipo, garantizando privacidad, velocidad y control total sobre tus datos.

## Modelos Disponibles

La aplicación incluye soporte para varios LLMs avanzados, cada uno con características únicas:

- [gemma3:latest](https://ollama.com/library/gpt-oss:20b) – Ideal para conversaciones generales, resúmenes y análisis ligeros.
- [qwen2.5-coder:latest](https://ollama.com/library/qwen2.5-coder) – Perfecto si quieres un enfoque más técnico o detallado en tus análisis y resúmenes.
- [llama3.1:latest](https://ollama.com/library/llama3.1) – Versátil y equilibrado, combina creatividad y precisión en sus respuestas.

## Funcionalidades principales

Local Youtube Stalker Client ofrece múltiples formas de interactuar con tus videos y páginas web favoritas:

### 1. Chat con IA

Conversa con el modelo que prefieras. Puedes preguntar, solicitar resúmenes o simplemente charlar y explorar la creatividad del LLM.

### 2. Evaluación de videos de YouTube
Selecciona un video desde la barra superior y deja que la IA haga el trabajo por ti:  
- **Resúmenes rápidos**: obtén lo esencial sin ver todo el video.  
- **Críticas y análisis**: recibe opiniones constructivas sobre el contenido.  
- **Toques de humor**: la IA puede añadir comentarios graciosos para echar unas risas.  

### 3. Análisis de páginas web
La aplicación también puede analizar textos de páginas web, ofreciéndote:  
- Resúmenes claros y concisos del contenido.  
- Opiniones y críticas sobre el texto encontrado.  
- Interpretaciones creativas o divertidas según el modelo seleccionado.

## Por qué usar Local Youtube Stalker Client

- **Totalmente local**: todos los cálculos se realizan en tu equipo, sin enviar datos a servidores externos.  
- **Gratis y sin límites**: no hay costes ocultos ni suscripciones.  
- **Versátil y divertido**: combina utilidad y entretenimiento, adaptándose a tus necesidades y estilo.  
- **Tres modelos disponibles**: elige el modelo que mejor se ajuste a la tarea, desde análisis técnico hasta comentarios humorísticos.

##
Local Youtube Stalker Client te permite entender mejor los videos y textos que consumes, también transforma la experiencia en algo interactivo, divertido y completamente bajo tu control. Explora, analiza y disfruta con la ayuda de tu IA local. Descubre nuevas perspectivas y deja que la IA te sorprenda. Ten en cuenta que, al ejecutarse totalmente en local, la velocidad de respuesta dependerá de la potencia de tu equipo; recomendamos al menos **8 GB de RAM** para un uso normal.
`;
export function groupAndConcat<T>(array: T[], size: number): string[] {
  const result: string[] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size).join(" "));
  }

  return result;
}

export function extractYouTubeId(input: string): string | null {
  input = input.trim();

  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = input.match(regex);

  if (match && match[1]) return match[1];
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;

  return null;
}
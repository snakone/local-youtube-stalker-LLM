export function groupAndConcat(array: any[], size: number): string[] {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size).join(" "));
  }

  return result;
}
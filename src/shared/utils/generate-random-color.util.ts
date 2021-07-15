export function generateRandomColor(): string {
  const color: string = Math.floor(Math.random() * 16777215).toString(16);
  return `#${color}`;
}

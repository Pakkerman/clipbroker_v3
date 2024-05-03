export function generateId(): string {
  const rand = (Math.random() * 1000000).toFixed(0);
  console.log(rand);

  return rand.toString().padStart(6, "0");
}

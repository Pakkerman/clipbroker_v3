import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function generateId(): string {
  const rand = (Math.random() * 1000000).toFixed(0);
  return rand.toString().padStart(6, "0");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

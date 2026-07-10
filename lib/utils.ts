import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function normalizeUrl(url: string) {
  return url.toLowerCase().replace(/\/$/, "");
}

export function calculateOverallScore(metrics: Record<string, number>) {
  const values = Object.values(metrics);
  if (values.length === 0) return 0;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

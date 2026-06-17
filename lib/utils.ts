import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeUrl(url: string): string {
  try {
    // Add https:// if no protocol is specified
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    const urlObj = new URL(url);
    return urlObj.href;
  } catch (error) {
    throw new Error('Invalid URL format');
  }
}

export function isValidUrl(url: string): boolean {
  try {
    normalizeUrl(url);
    return true;
  } catch {
    return false;
  }
}

export function calculateOverallScore(scores: {
  technicalSEO: number;
  schema: number;
  googleNews: number;
  aiSearch: number;
}): number {
  const weights = {
    technicalSEO: 0.35,
    schema: 0.25,
    googleNews: 0.2,
    aiSearch: 0.2,
  };

  return Math.round(
    scores.technicalSEO * weights.technicalSEO +
    scores.schema * weights.schema +
    scores.googleNews * weights.googleNews +
    scores.aiSearch * weights.aiSearch
  );
}

export function getStatusColor(status: 'PASS' | 'WARNING' | 'ERROR'): string {
  switch (status) {
    case 'PASS':
      return 'text-green-500';
    case 'WARNING':
      return 'text-yellow-500';
    case 'ERROR':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-500';
}

export function getScoreGradient(score: number): string {
  if (score >= 80) return 'from-green-500 to-emerald-500';
  if (score >= 60) return 'from-yellow-500 to-orange-500';
  return 'from-red-500 to-rose-500';
}

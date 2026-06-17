import { isQuotaInfo } from "@/lib/type-guards";
import type { QuotaInfo } from "@/types";

export type { QuotaInfo };

const ANON_STORAGE_KEY = "gnst_anon_id";
const QUOTA_CACHE_KEY = "gnst_quota_cache";

function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export function getClientFingerprint(): string {
  if (typeof window === "undefined") return "server";

  const parts = [
    navigator.userAgent,
    navigator.language,
    String(new Date().getTimezoneOffset()),
    String(window.screen.width),
    String(window.screen.height),
  ];

  return `fp_${simpleHash(parts.join("|"))}`;
}

export function getOrCreateAnonymousId(): string {
  if (typeof window === "undefined") return "";

  const existing = localStorage.getItem(ANON_STORAGE_KEY);
  if (existing) return existing;

  const generated = `anon_${crypto.randomUUID()}`;
  localStorage.setItem(ANON_STORAGE_KEY, generated);
  return generated;
}

export function cacheQuota(quota: QuotaInfo): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(QUOTA_CACHE_KEY, JSON.stringify(quota));
}

export function readCachedQuota(): QuotaInfo | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(QUOTA_CACHE_KEY);
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    return isQuotaInfo(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function quotaLabel(quota: QuotaInfo): string {
  return `${quota.remaining} of ${quota.limit} analyses remaining today`;
}

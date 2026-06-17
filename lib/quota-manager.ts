import { NextRequest, NextResponse } from "next/server";

const DAILY_LIMIT = 5;
const ANON_COOKIE = "gnst_quota_id";
const DAY_MS = 24 * 60 * 60 * 1000;

type QuotaKeyType = "anonymous" | "authenticated";

type QuotaEntry = {
  dayKey: string;
  used: number;
};

type QuotaStore = {
  anonymous: Map<string, QuotaEntry>;
  authenticated: Map<string, QuotaEntry>;
};

declare global {
  // eslint-disable-next-line no-var
  var __gnstQuotaStore: QuotaStore | undefined;
}

function getStore(): QuotaStore {
  if (!globalThis.__gnstQuotaStore) {
    globalThis.__gnstQuotaStore = {
      anonymous: new Map<string, QuotaEntry>(),
      authenticated: new Map<string, QuotaEntry>(),
    };
  }

  return globalThis.__gnstQuotaStore;
}

function getDayKey(now: Date): string {
  return now.toISOString().slice(0, 10);
}

function getResetAt(now: Date): string {
  const next = new Date(now.getTime() + DAY_MS);
  return next.toISOString();
}

function ensureEntry(map: Map<string, QuotaEntry>, key: string, dayKey: string): QuotaEntry {
  const existing = map.get(key);
  if (!existing?.dayKey || existing.dayKey !== dayKey) {
    const fresh: QuotaEntry = { dayKey, used: 0 };
    map.set(key, fresh);
    return fresh;
  }

  return existing;
}

function resolveClient(request: NextRequest): {
  key: string;
  keyType: QuotaKeyType;
  anonIdToSet?: string;
} {
  const userId = request.headers.get("x-user-id")?.trim();
  if (userId) {
    return {
      key: userId,
      keyType: "authenticated",
    };
  }

  const cookieId = request.cookies.get(ANON_COOKIE)?.value?.trim();
  const anonHeader = request.headers.get("x-anon-id")?.trim();
  const fingerprint = request.headers.get("x-client-fingerprint")?.trim();

  const key = cookieId || anonHeader || fingerprint || crypto.randomUUID();

  return {
    key,
    keyType: "anonymous",
    anonIdToSet: cookieId ? undefined : key,
  };
}

export type QuotaPayload = {
  limit: number;
  used: number;
  remaining: number;
  resetAt: string;
  keyType: QuotaKeyType;
};

export type QuotaResult = {
  allowed: boolean;
  payload: QuotaPayload;
  anonIdToSet?: string;
};

export class QuotaManager {
  static getQuota(request: NextRequest): QuotaResult {
    const now = new Date();
    const dayKey = getDayKey(now);
    const resetAt = getResetAt(now);
    const client = resolveClient(request);
    const store = getStore();
    const target = client.keyType === "authenticated" ? store.authenticated : store.anonymous;
    const entry = ensureEntry(target, client.key, dayKey);
    const remaining = Math.max(0, DAILY_LIMIT - entry.used);

    return {
      allowed: remaining > 0,
      payload: {
        limit: DAILY_LIMIT,
        used: entry.used,
        remaining,
        resetAt,
        keyType: client.keyType,
      },
      anonIdToSet: client.anonIdToSet,
    };
  }

  static consume(request: NextRequest): QuotaResult {
    const now = new Date();
    const dayKey = getDayKey(now);
    const resetAt = getResetAt(now);
    const client = resolveClient(request);
    const store = getStore();
    const target = client.keyType === "authenticated" ? store.authenticated : store.anonymous;
    const entry = ensureEntry(target, client.key, dayKey);

    if (entry.used >= DAILY_LIMIT) {
      return {
        allowed: false,
        payload: {
          limit: DAILY_LIMIT,
          used: entry.used,
          remaining: 0,
          resetAt,
          keyType: client.keyType,
        },
        anonIdToSet: client.anonIdToSet,
      };
    }

    entry.used += 1;

    return {
      allowed: true,
      payload: {
        limit: DAILY_LIMIT,
        used: entry.used,
        remaining: Math.max(0, DAILY_LIMIT - entry.used),
        resetAt,
        keyType: client.keyType,
      },
      anonIdToSet: client.anonIdToSet,
    };
  }

  static attachAnonymousCookie(response: NextResponse, anonId?: string): void {
    if (!anonId) return;

    response.cookies.set(ANON_COOKIE, anonId, {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: DAY_MS / 1000,
      path: "/",
    });
  }

  static resetAll(): void {
    const store = getStore();
    store.anonymous.clear();
    store.authenticated.clear();
  }
}

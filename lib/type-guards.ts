import type { AuditStatus } from '@/types';
import type { QuotaInfo } from '@/types';

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isAuditStatus(value: unknown): value is AuditStatus {
  return value === 'PASS' || value === 'WARNING' || value === 'ERROR';
}

export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

export function getErrorMessage(error: unknown, fallback: string): string {
  return isError(error) ? error.message : fallback;
}

export interface JsonLdItem extends Record<string, unknown> {
  '@type'?: string | string[];
}

export function isJsonLdItem(value: unknown): value is JsonLdItem {
  return isRecord(value);
}

export function parseJsonLdTypes(item: JsonLdItem): string[] {
  const rawType = item['@type'];
  if (!rawType) return [];
  return Array.isArray(rawType) ? rawType.map(String) : [String(rawType)];
}

export function getSchemaTextValue(value: unknown): string | undefined {
  if (isString(value)) return value;
  if (!isRecord(value) || !('name' in value)) return undefined;
  return isString(value.name) ? value.name : undefined;
}

export function getSchemaUrlValue(value: unknown): string | undefined {
  if (isString(value)) return value;
  if (!isRecord(value) || !('url' in value)) return undefined;
  return isString(value.url) ? value.url : undefined;
}

export function hasSchemaProperty(data: unknown, key: string): boolean {
  return isRecord(data) && key in data;
}

export function isQuotaInfo(value: unknown): value is QuotaInfo {
  if (!isRecord(value)) return false;

  return (
    typeof value.limit === 'number' &&
    typeof value.used === 'number' &&
    typeof value.remaining === 'number' &&
    isString(value.resetAt) &&
    (value.keyType === 'anonymous' || value.keyType === 'authenticated')
  );
}

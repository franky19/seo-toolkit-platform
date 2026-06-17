const RATE_LIMIT_KEY = 'seo_toolkit_rate_limit';
const MAX_AUDITS_PER_DAY = 5;
const RESET_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export interface RateLimitInfo {
  count: number;
  resetTime: number;
}

export class RateLimiter {
  private static getRateLimitData(): RateLimitInfo | null {
    if (typeof window === 'undefined') return null;
    
    const data = localStorage.getItem(RATE_LIMIT_KEY);
    if (!data) return null;
    
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  private static setRateLimitData(data: RateLimitInfo): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
  }

  static checkLimit(): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    let rateLimitInfo = this.getRateLimitData();

    // If no data or reset time has passed, reset the counter
    if (!rateLimitInfo || now >= rateLimitInfo.resetTime) {
      rateLimitInfo = {
        count: 0,
        resetTime: now + RESET_INTERVAL,
      };
      this.setRateLimitData(rateLimitInfo);
    }

    const remaining = Math.max(0, MAX_AUDITS_PER_DAY - rateLimitInfo.count);
    const allowed = rateLimitInfo.count < MAX_AUDITS_PER_DAY;

    return {
      allowed,
      remaining,
      resetTime: rateLimitInfo.resetTime,
    };
  }

  static incrementCount(): void {
    const now = Date.now();
    let rateLimitInfo = this.getRateLimitData();

    if (!rateLimitInfo || now >= rateLimitInfo.resetTime) {
      rateLimitInfo = {
        count: 1,
        resetTime: now + RESET_INTERVAL,
      };
    } else {
      rateLimitInfo.count += 1;
    }

    this.setRateLimitData(rateLimitInfo);
  }

  static getRemainingTime(): string {
    const rateLimitInfo = this.getRateLimitData();
    if (!rateLimitInfo) return '24 hours';

    const now = Date.now();
    const remaining = rateLimitInfo.resetTime - now;

    if (remaining <= 0) return '0 hours';

    const hours = Math.floor(remaining / (60 * 60 * 1000));
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
}

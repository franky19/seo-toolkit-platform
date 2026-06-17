# Migration Plan: Next.js to Fastify + PostgreSQL + Redis

This document outlines the strategy for migrating from the current Next.js-only MVP to a scalable architecture with Fastify backend, PostgreSQL database, and Redis caching.

## Current Architecture (MVP)

```
Next.js 15 (App Router)
├── Frontend: React Components
├── API Routes: /api/audit
├── Rate Limiting: localStorage (browser)
└── Analytics: Vercel Analytics
```

**Limitations:**
- No persistent storage
- Browser-based rate limiting (can be bypassed)
- Limited audit history
- No user accounts
- No API analytics

## Target Architecture (Production)

```
Frontend (Next.js)
├── Landing Page
├── Dashboard
└── Results Display

Backend (Fastify)
├── API Gateway
├── Authentication Service
├── Audit Engine
└── Analytics Service

Database (PostgreSQL)
├── Users
├── Audits
├── Results
└── Analytics

Cache (Redis)
├── Rate Limiting
├── Audit Results Cache
└── Session Management
```

## Migration Strategy

### Phase 1: Backend Setup (Week 1-2)

#### 1.1 Create Fastify Backend

```bash
mkdir backend
cd backend
npm init -y
npm install fastify @fastify/cors @fastify/jwt @fastify/rate-limit
```

**Directory Structure:**
```
backend/
├── src/
│   ├── server.ts
│   ├── routes/
│   │   ├── audit.ts
│   │   ├── auth.ts
│   │   └── analytics.ts
│   ├── services/
│   │   ├── crawler.ts      # Move from Next.js
│   │   ├── analyzer.ts     # Move from Next.js
│   │   └── recommendation.ts
│   ├── database/
│   │   ├── models/
│   │   └── migrations/
│   └── config/
│       ├── database.ts
│       └── redis.ts
├── package.json
└── tsconfig.json
```

#### 1.2 Setup PostgreSQL

**Schema Design:**

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  tier VARCHAR(50) DEFAULT 'free',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audits table
CREATE TABLE audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  url TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit results table
CREATE TABLE audit_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID REFERENCES audits(id),
  seo_score INTEGER,
  google_news_score INTEGER,
  schema_score INTEGER,
  ai_search_score INTEGER,
  overall_score INTEGER,
  results JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rate limits table
CREATE TABLE rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  endpoint VARCHAR(255) NOT NULL,
  count INTEGER DEFAULT 0,
  reset_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics table
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100) NOT NULL,
  user_id UUID REFERENCES users(id),
  data JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_audits_user_id ON audits(user_id);
CREATE INDEX idx_audits_created_at ON audits(created_at);
CREATE INDEX idx_audit_results_audit_id ON audit_results(audit_id);
CREATE INDEX idx_rate_limits_user_id ON rate_limits(user_id);
CREATE INDEX idx_analytics_user_id ON analytics(user_id);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);
```

#### 1.3 Setup Redis

**Configuration:**
```typescript
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: 0,
});

// Cache keys structure
const CACHE_KEYS = {
  auditResult: (url: string) => `audit:${url}`,
  rateLimit: (userId: string, endpoint: string) => `rate:${userId}:${endpoint}`,
  session: (sessionId: string) => `session:${sessionId}`,
};

export { redis, CACHE_KEYS };
```

### Phase 2: API Migration (Week 2-3)

#### 2.1 Create Fastify Routes

**Example: Audit Route**
```typescript
// backend/src/routes/audit.ts
import { FastifyPluginAsync } from 'fastify';
import { WebCrawler } from '../services/crawler';
import { SEOAnalyzer } from '../services/analyzer';

const auditRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/audit', {
    schema: {
      body: {
        type: 'object',
        required: ['url'],
        properties: {
          url: { type: 'string' }
        }
      }
    },
    preHandler: [fastify.auth, fastify.rateLimit]
  }, async (request, reply) => {
    const { url } = request.body;
    const userId = request.user.id;

    // Check cache first
    const cached = await fastify.redis.get(`audit:${url}`);
    if (cached) {
      return JSON.parse(cached);
    }

    // Perform audit
    const crawlResult = await WebCrawler.crawl(url);
    const seoAudit = SEOAnalyzer.analyzeSEO(crawlResult.$, url);
    // ... rest of audit logic

    // Store in database
    const audit = await fastify.db.audits.create({
      user_id: userId,
      url,
      status: 'completed'
    });

    const result = {
      // ... audit results
    };

    await fastify.db.auditResults.create({
      audit_id: audit.id,
      ...result
    });

    // Cache for 24 hours
    await fastify.redis.setex(`audit:${url}`, 86400, JSON.stringify(result));

    return result;
  });
};

export default auditRoutes;
```

#### 2.2 Implement Rate Limiting with Redis

```typescript
// backend/src/plugins/rate-limit.ts
import { FastifyPluginAsync } from 'fastify';

const rateLimitPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.decorateRequest('checkRateLimit', async function() {
    const userId = this.user.id;
    const tier = this.user.tier;

    const limits = {
      free: { audits: 5, window: 86400 },
      pro: { audits: 100, window: 86400 },
      enterprise: { audits: 1000, window: 86400 }
    };

    const limit = limits[tier];
    const key = `rate:${userId}:audit`;

    const count = await fastify.redis.incr(key);
    if (count === 1) {
      await fastify.redis.expire(key, limit.window);
    }

    if (count > limit.audits) {
      throw new Error('Rate limit exceeded');
    }

    return { remaining: limit.audits - count };
  });
};

export default rateLimitPlugin;
```

### Phase 3: Frontend Migration (Week 3-4)

#### 3.1 Update Next.js to use Backend API

**Before (Current):**
```typescript
const response = await fetch('/api/audit', {
  method: 'POST',
  body: JSON.stringify({ url })
});
```

**After (With Backend):**
```typescript
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/audit`, {
  method: 'POST',
  headers: {
    'Authorization': `******
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ url })
});
```

#### 3.2 Add Authentication

```typescript
// lib/auth.ts
import { useSession } from 'next-auth/react';

export function useAuth() {
  const { data: session, status } = useSession();
  
  return {
    user: session?.user,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    token: session?.accessToken
  };
}
```

### Phase 4: Zero-Downtime Migration (Week 4)

#### 4.1 Dual-Mode Operation

```typescript
// config/api.ts
export const API_CONFIG = {
  useLegacy: process.env.USE_LEGACY_API === 'true',
  backendUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
};

// lib/api-client.ts
export async function auditWebsite(url: string) {
  if (API_CONFIG.useLegacy) {
    // Use Next.js API route
    return fetch('/api/audit', { ... });
  } else {
    // Use Fastify backend
    return fetch(`${API_CONFIG.backendUrl}/api/v1/audit`, { ... });
  }
}
```

#### 4.2 Gradual Rollout

1. Deploy Fastify backend alongside Next.js
2. Add feature flag for new API
3. Roll out to 10% of users
4. Monitor performance and errors
5. Gradually increase to 100%
6. Deprecate Next.js API routes

### Phase 5: Post-Migration Improvements (Week 5+)

#### 5.1 Background Jobs

```typescript
// Use Bull for background jobs
import Bull from 'bull';

const auditQueue = new Bull('audit-queue', {
  redis: REDIS_CONFIG
});

auditQueue.process(async (job) => {
  const { url, userId } = job.data;
  // Perform audit in background
  const result = await performAudit(url);
  
  // Notify user via WebSocket or email
  await notifyUser(userId, result);
});
```

#### 5.2 Real-time Updates

```typescript
// Add WebSocket support
import { Server } from 'socket.io';

io.on('connection', (socket) => {
  socket.on('subscribe:audit', (auditId) => {
    socket.join(`audit:${auditId}`);
  });
});

// Emit updates during audit
io.to(`audit:${auditId}`).emit('audit:progress', {
  step: 'seo-analysis',
  progress: 50
});
```

## Breaking Changes

### API Changes

**Old Format (Next.js):**
```json
POST /api/audit
{
  "url": "https://example.com"
}
```

**New Format (Fastify):**
```json
POST /api/v1/audit
Authorization: ******
{
  "url": "https://example.com"
}
```

### Rate Limiting Changes

- **Before:** Browser localStorage (5 audits/day)
- **After:** Redis-backed (tiered limits)
  - Free: 5 audits/day
  - Pro: 100 audits/day
  - Enterprise: 1000 audits/day

### Authentication

- **Before:** No authentication
- **After:** JWT-based authentication required

## Backward Compatibility

To maintain backward compatibility during migration:

1. **API Versioning:** Use `/api/v1` for new endpoints
2. **Legacy Support:** Keep `/api` routes for 3 months
3. **Gradual Migration:** Feature flags for gradual rollout
4. **Documentation:** Clear migration guide for users

## Performance Improvements

Expected improvements after migration:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Response Time | 3-5s | 1-2s | 60% faster |
| Rate Limit Accuracy | Client-side | Server-side | 100% reliable |
| Cache Hit Rate | 0% | 70-80% | Significant reduction in load |
| Concurrent Users | 100 | 10,000+ | 100x increase |
| Audit History | None | Unlimited | Full history |

## Deployment Strategy

### Development
```bash
docker-compose up -d
```

### Staging
```bash
# Deploy to staging
vercel deploy --environment staging
# Deploy backend
fly deploy --config fly.staging.toml
```

### Production
```bash
# Deploy frontend
vercel --prod
# Deploy backend
fly deploy --config fly.production.toml
```

## Monitoring & Observability

### Metrics to Track
- API response times
- Error rates
- Cache hit rates
- Rate limit violations
- Audit success/failure rates
- User sign-ups and conversions

### Tools
- **Logging:** Winston + Papertrail
- **Metrics:** Prometheus + Grafana
- **Error Tracking:** Sentry
- **APM:** New Relic or Datadog

## Cost Estimation

### Current (MVP)
- Vercel: $0/month (Hobby)
- Total: **$0/month**

### After Migration
- Vercel (Frontend): $20/month
- Fly.io (Backend): $29/month
- PostgreSQL (Managed): $15/month
- Redis (Managed): $10/month
- Total: **$74/month**

## Timeline Summary

| Week | Phase | Tasks |
|------|-------|-------|
| 1-2 | Backend Setup | Fastify + PostgreSQL + Redis |
| 2-3 | API Migration | Routes + Services |
| 3-4 | Frontend Update | Auth + API Client |
| 4 | Migration | Zero-downtime rollout |
| 5+ | Improvements | Background jobs + WebSockets |

## Success Criteria

✅ Zero downtime during migration
✅ 100% feature parity with MVP
✅ Response time < 2 seconds
✅ Support 10,000+ concurrent users
✅ 99.9% uptime
✅ Full audit history for users

## Rollback Plan

If issues occur during migration:

1. Switch feature flag to legacy mode
2. All traffic routes to Next.js API
3. Investigate and fix backend issues
4. Retry migration when stable

## Notes

- The current MVP code is designed to be easily extractable
- Services (`crawler.ts`, `analyzer.ts`) can be moved as-is
- Type definitions are shared between frontend and backend
- Rate limiter logic is abstracted for easy replacement

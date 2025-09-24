# FieldOps Gateway

Gateway API built with **Node.js + TypeScript + Express**.  
Acts as the single entry point for all FieldOps services (Auth, Jobs, Billing, Notifications, Files).  
Handles request validation, JWT auth (stubbed until Auth service is ready), rate limiting, logging, and reverse proxying.

---

## Features

- Express + TypeScript
- Environment variable validation with **zod**
- Security middleware: **helmet**, **cors**, **express-rate-limit**
- Structured logging with **pino-http**
- Request tracing (`x-request-id`)
- JWT auth guard (toggle with `AUTH_DISABLED=true`)
- Dockerfile for containerized runs
- Jest + Supertest test suite (with coverage)

---

## Requirements

- Node.js **20.x** (use [`n`](https://github.com/tj/n) or `nvm` to install/switch)
- npm v9+
- (optional) Docker, if running as container

---

## Environment variables

Copy `.env.example` → `.env` and adjust as needed.

```bash
PORT=8080
CORS_ORIGIN=http://localhost:5173

# Logging
LOG_LEVEL=info

# Rate limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100

# Auth (stubbed until Auth service is ready)
AUTH_DISABLED=true
AUTH_ISSUER=https://auth.local
AUTH_AUDIENCE=fieldops
AUTH_JWKS_URL=http://localhost:8001/.well-known/jwks.json

# Downstream service stubs
AUTH_SERVICE_URL=http://localhost:8001
JOBS_SERVICE_URL=http://localhost:8002
BILLING_SERVICE_URL=http://localhost:8003
NOTIFS_SERVICE_URL=http://localhost:8004
FILES_SERVICE_URL=http://localhost:8005
```

## Useful Commands

Run in dev mode. Server starts at http://localhost:8080

```
npm run dev
```

Build and run compiled JS

```
npm run build
npm start
```

Unit/E2E tests use Jest + Supertest.

```
npm test
```

Healthcheck

```
curl http://localhost:8080/health

# Response
{
  "status": "ok",
  "uptime": 42.123,
  "hostname": "MacBook-Pro.local",
  "time": "2025-09-24T18:12:34.567Z"
}
```

## Docker

Build the image

```
docker build -t fieldops-gateway .
```

Run the container

```
docker run -p 8080:8080 --env-file .env fieldops-gateway
```

## CI/CD

<li><b>Lint + Build:</b> runs on every PR (ci-pr.yml) </li>

<li><b>Tests + Coverage</b>: Jest test suite, uploads coverage to Codecov </li>

<li>Badge available in root README</li>

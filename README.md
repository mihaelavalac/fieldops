# FieldOps

![CI (PR)](https://github.com/mihaelavalac/fieldops/actions/workflows/ci-pr.yml/badge.svg?branch=main)
[![codecov](https://codecov.io/gh/mihaelavalac/fieldops/branch/main/graph/badge.svg)](https://codecov.io/gh/mihaelavalac/fieldops)

# FieldOps

Polyglot demo platform: **microservices** (FastAPI, Laravel, Node/TS) + **microfrontends** (React + Angular).  
Includes JWT gateway, event-driven workflows (SQS), file uploads (S3), relational + document DBs, caching, and full CI/CD.

> 🚀 This project is built as a **portfolio system** to showcase modern software engineering practices:  
> clean code, test coverage, polyglot services, infrastructure-as-code, and cloud-native design.

---

## Architecture (planned)

- **Gateway** (Node.js + TypeScript + Express)  
  Central API entrypoint, JWT verification, rate limiting, reverse proxy.

- **Auth Service** (Python + FastAPI, PostgreSQL)  
  Users, orgs, RBAC, JWT mint/refresh.

- **Jobs Service** (Laravel + MySQL + Redis)  
  Work orders, scheduling, technician assignments.

- **Billing Service** (Python + FastAPI, MongoDB + S3)  
  Invoices, PDF generation, mock payments.

- **Notifications Service** (Laravel worker + SQS + Mailhog)  
  Email, SMS, and websocket push.

- **Files Service** (Node microservice + S3)  
  Secure file uploads (photos, signatures).

- **Frontends**
  - React backoffice (dispatch, billing, users)
  - Angular tech portal (jobs, status updates, photos)
  - React shell (micro-frontend host)

---

## Current status

✅ **Gateway service implemented**

- Express + TypeScript
- Env validation (zod)
- Security middleware (helmet, cors, rate-limit)
- Request tracing & JSON logs (pino-http)
- JWT guard (toggle with `AUTH_DISABLED=true`)
- Health route `/health`
- Jest test suite (Supertest) with coverage
- Dockerfile + CI workflow (lint/build/test/coverage)

Next: **Auth service (FastAPI + Postgres)**

---

## Local development

### Requirements

- Node.js 20.x (via `n` or `nvm`)
- Python 3.11
- PHP 8.3
- Docker (for infra stack)

### Infra stack (databases, cache, local AWS, mail)

From repo root:

```bash
docker compose -f infra/dev/docker-compose.yml up -d
```

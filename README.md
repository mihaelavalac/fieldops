# FieldOps

![CI (PR)](https://github.com/mihaelavalac/fieldops/actions/workflows/ci-pr.yml/badge.svg?branch=main)
[![codecov](https://codecov.io/gh/mihaelavalac/fieldops/branch/main/graph/badge.svg)](https://codecov.io/gh/mihaelavalac/fieldops)

Polyglot demo platform: microservices (FastAPI, Laravel, Node/TS) + microfrontends (React + Angular).
Includes JWT gateway, S3 file uploads, SQS events, Postgres/MySQL/Mongo, Redis cache.

## Quick start

Infra (dev) will live in /infra/dev with docker compose.

## Structure (will be added as we go)

- /infra # dev/prod infra (compose, terraform later)
- /gateway # Node/TS
- /services # auth-fastapi, jobs-laravel, billing-fastapi, notifications-laravel, files-node
- /apps # shell-react, backoffice-react, tech-portal-angular
- /packages # shared types, UI tokens

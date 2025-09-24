import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  PORT: z.string().default("8080"),
  CORS_ORIGIN: z.string().default("*"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60_000),
  RATE_LIMIT_MAX: z.coerce.number().default(100),
  AUTH_DISABLED: z.coerce.boolean().default(true),
  AUTH_ISSUER: z.string().default("https://auth.local"),
  AUTH_AUDIENCE: z.string().default("fieldops"),
  AUTH_JWKS_URL: z
    .string()
    .default("http://localhost:8001/.well-known/jwks.json"),
  AUTH_SERVICE_URL: z.string().default("http://localhost:8001"),
  JOBS_SERVICE_URL: z.string().default("http://localhost:8002"),
  BILLING_SERVICE_URL: z.string().default("http://localhost:8003"),
  NOTIFS_SERVICE_URL: z.string().default("http://localhost:8004"),
  FILES_SERVICE_URL: z.string().default("http://localhost:8005"),
});

export const env = EnvSchema.parse(process.env);

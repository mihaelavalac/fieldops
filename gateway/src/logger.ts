// src/logger.ts
import pino from "pino";
import pinoHttp from "pino-http";
import { env } from "./config";

const base = pino({
  level: env.LOG_LEVEL,
  // pretty logs in dev; JSON in prod
  transport:
    process.env.NODE_ENV === "production"
      ? undefined
      : { target: "pino-pretty", options: { colorize: true } },
});

export const httpLogger = pinoHttp({
  logger: base,
  // auto logs each request/response
  autoLogging: true,
  // attach requestId (set by our middleware) to every log line
  customProps: (req) => ({ requestId: (req as any).requestId }),
});

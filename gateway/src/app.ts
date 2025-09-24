import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { env } from "./config";
import { httpLogger } from "./logger";
import { requestId } from "./middleware/requestId";
import { healthRouter } from "./routes/health";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN === "*" ? true : env.CORS_ORIGIN,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(requestId);
  app.use(httpLogger);

  app.use(
    rateLimit({ windowMs: env.RATE_LIMIT_WINDOW_MS, max: env.RATE_LIMIT_MAX }),
  );

  app.use(healthRouter);

  app.use((_req, res) => res.status(404).json({ error: "not_found" }));
  app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err);
    res.status(500).json({ error: "internal_error" });
  });

  return app;
}

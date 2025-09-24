import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { env } from "./config";
import { httpLogger as logger } from "./logger";
import { requestId } from "./middleware/requestId";
import { authGuard } from "./middleware/auth";
import { healthRouter } from "./routes/health";

const app = express();

// Core middleware
app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN === "*" ? true : env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(requestId);
app.use(logger);

// Rate limit (basic, per IP)
app.use(
  rateLimit({ windowMs: env.RATE_LIMIT_WINDOW_MS, max: env.RATE_LIMIT_MAX }),
);

// Health (no auth)
app.use(healthRouter);

// Auth-protected routes will come here (after we build services)
// app.use("/api", authGuard, apiRouter);

// 404 + error handling
app.use((_req, res) => res.status(404).json({ error: "not_found" }));
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(500).json({ error: "internal_error" });
});

app.listen(Number(env.PORT), () => {
  console.log(`Gateway listening on http://localhost:${env.PORT}`);
});

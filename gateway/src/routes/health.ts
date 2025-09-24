import { Router } from "express";
import os from "node:os";

export const healthRouter = Router();

healthRouter.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    hostname: os.hostname(),
    time: new Date().toISOString(),
  });
});

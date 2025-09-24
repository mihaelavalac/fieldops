import { NextFunction, Request, Response } from "express";
import { env } from "../config";
import { createRemoteJWKSet, jwtVerify } from "jose";

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;

export async function authGuard(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (env.AUTH_DISABLED) return next(); // dev mode: skip

  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ error: "missing_bearer_token" });

    if (!jwks) jwks = createRemoteJWKSet(new URL(env.AUTH_JWKS_URL));
    const { payload } = await jwtVerify(token, jwks, {
      issuer: env.AUTH_ISSUER,
      audience: env.AUTH_AUDIENCE,
    });

    (req as any).user = payload; // e.g., sub, org_id, role
    return next();
  } catch (err) {
    return res.status(401).json({ error: "invalid_token" });
  }
}

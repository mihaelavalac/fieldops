import { ZodObject, ZodRawShape } from "zod";

export function validate(schema: {
  body?: ZodObject<ZodRawShape>;
  query?: ZodObject<ZodRawShape>;
  params?: ZodObject<ZodRawShape>;
}) {
  return (req: any, res: any, next: any) => {
    try {
      if (schema.body) req.body = schema.body.parse(req.body);
      if (schema.query) req.query = schema.query.parse(req.query);
      if (schema.params) req.params = schema.params.parse(req.params);
      next();
    } catch (e: any) {
      res
        .status(400)
        .json({ error: "validation_error", details: e.errors ?? String(e) });
    }
  };
}

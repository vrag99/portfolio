import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");
app.get("/ping", (c) => {
  return c.json({
    message: "pong",
  });
});

export const GET = handle(app);
// export const POST = handle(app);
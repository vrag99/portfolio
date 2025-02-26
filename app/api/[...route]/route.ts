import { Hono } from "hono";
import { handle } from "hono/vercel";
import Groq from "groq-sdk";

export const runtime = "edge";

const app = new Hono().basePath("/api");
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = "llama-3.3-70b-versatile";

app.get("/ping", (c) => {
  return c.json({
    message: "pong",
  });
});

app.post("/chat", async (c) => {
  const { messages } = await c.req.json();

  const chatCompletion: Groq.Chat.ChatCompletion =
    await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        ...messages,
      ],
      model: MODEL,
    });

  return c.json(chatCompletion?.choices[0].message.content);
});

export const GET = handle(app);
export const POST = handle(app);

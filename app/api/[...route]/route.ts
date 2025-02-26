import { Hono } from "hono";
import { handle } from "hono/vercel";
import Groq from "groq-sdk";
import { ABOUT, PROJECTS, SOCIALS, TIMELINE } from "@/data/portfolio";

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

app.get("/command", async (c) => {
  const { name } = c.req.query();
  switch (name) {
    case "/about":
      return c.json({
        type: "text",
        data: ABOUT,
      });
    case "/projects":
      return c.json({
        type: "projects",
        data: PROJECTS,
      });
    case "/achievements":
      return c.json(TIMELINE);
    case "/socials":
      return c.json(SOCIALS);
    default:
      return c.json({
        message: "Command not found",
      });
  }
});

app.get("/about", async (c) => {
  return c.json(ABOUT);
});

app.get("/projects", async (c) => {
  return c.json(PROJECTS);
});

export const GET = handle(app);
export const POST = handle(app);

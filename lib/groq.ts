"use server";

import Groq from "groq-sdk";

const client = new Groq();
const MODEL = "llama-3.3-70b-versatile";

export const chat = async (
  messages: Groq.Chat.Completions.ChatCompletionMessageParam[]
) => {
  const chatCompletion: Groq.Chat.ChatCompletion =
    await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        ...messages,
      ],
      model: MODEL,
    });

  return chatCompletion?.choices[0].message.content;
};



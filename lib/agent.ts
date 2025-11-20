import { groq } from '@ai-sdk/groq';
import { Agent } from "@voltagent/core";

export const agent = new Agent({
  name: "Assistant",
  instructions: "Answer questions clearly and concisely.",
  model: groq("llama-3.3-70b-versatile"),
})
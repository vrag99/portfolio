import { createOpenAI } from "@ai-sdk/openai";
import { Agent } from "@voltagent/core";
import {
  getAboutTool,
  getProjectsTool,
  getAchievementsTool,
  getSkillsTool,
  getSocialsTool,
  getExperienceTool,
  getEducationTool,
} from "./tools";
import { readFileSync } from "fs";
import { join } from "path";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const systemPrompt = readFileSync(
  join(process.cwd(), "lib/agent/system_prompt.md"),
  "utf-8"
);

export const agent = new Agent({
  name: "Garv's Portfolio Assistant",
  instructions: systemPrompt,
  model: openrouter("google/gemini-2.5-flash"),
  tools: [
    getAboutTool,
    getProjectsTool,
    getAchievementsTool,
    getSkillsTool,
    getSocialsTool,
    getExperienceTool,
    getEducationTool,
  ],
});

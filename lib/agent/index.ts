import { google } from "@ai-sdk/google";
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

const systemPrompt = readFileSync(
  join(process.cwd(), "lib/agent/system_prompt.md"),
  "utf-8"
);

export const agent = new Agent({
  name: "Garv's Portfolio Assistant",
  instructions: systemPrompt,
  model: google("gemini-2.5-flash"),
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

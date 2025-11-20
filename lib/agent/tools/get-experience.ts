import { createTool } from "@voltagent/core";
import { z } from "zod";
import { EXPERIENCE } from "@/content/portfolio";

export const getExperienceTool = createTool({
  name: "get_experience",
  description:
    "Get Garv's work experience, internships, and professional positions. Use this when the user asks about work experience, jobs, internships, or professional background.",
  parameters: z.object({}).optional(),
  execute: async () => {
    return {
      experience: EXPERIENCE,
    };
  },
});

import { createTool } from "@voltagent/core";
import { z } from "zod";
import { EDUCATION } from "@/content/portfolio";

export const getEducationTool = createTool({
  name: "get_education",
  description:
    "Get Garv's educational background including university, degree, and academic information. Use this when the user asks about education, university, degree, or academic background.",
  parameters: z.object({}),
  execute: async () => {
    return {
      education: EDUCATION,
    };
  },
});

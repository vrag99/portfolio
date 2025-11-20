import { createTool } from "@voltagent/core";
import { z } from "zod";
import { SKILL_SET } from "@/content/portfolio";

export const getSkillsTool = createTool({
  name: "get_skills",
  description:
    "Get Garv's technical skills including programming languages and technologies/frameworks. Use this when the user asks about skills, technologies, programming languages, or technical expertise.",
  parameters: z.object({
    category: z
      .enum(["languages", "technologies", "all"])
      .optional()
      .describe(
        "Optional: Filter by category - 'languages' for programming languages, 'technologies' for frameworks/tools, or 'all' for everything"
      ),
  }),
  execute: async ({ category = "all" }) => {
    if (category === "languages") {
      return {
        languages: SKILL_SET.languages,
        category: "languages",
      };
    }

    if (category === "technologies") {
      return {
        technologies: SKILL_SET.technologies,
        category: "technologies",
      };
    }

    return {
      languages: SKILL_SET.languages,
      technologies: SKILL_SET.technologies,
      category: "all",
    };
  },
});

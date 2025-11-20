import { createTool } from "@voltagent/core";
import { z } from "zod";
import { PROJECTS } from "@/content/portfolio";

export const getProjectsTool = createTool({
  name: "get_projects",
  description:
    "Get a list of Garv's projects including their titles, descriptions, technologies used, and GitHub links. Use this when the user asks about projects, work, portfolio, or what Garv has built.",
  parameters: z.object({
    filterByTech: z
      .string()
      .optional()
      .describe(
        "Optional: Filter projects by a specific technology or tag (e.g., 'Rust', 'Solidity', 'TypeScript')"
      ),
  }),
  execute: async ({ filterByTech }) => {
    if (filterByTech) {
      const filtered = PROJECTS.filter((project) =>
        project.tags.some((tag) =>
          tag.toLowerCase().includes(filterByTech.toLowerCase())
        )
      );
      return {
        projects: filtered,
        filtered: true,
        filterTech: filterByTech,
      };
    }

    return {
      projects: PROJECTS,
      filtered: false,
    };
  },
});

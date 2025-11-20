import { createTool } from "@voltagent/core";
import { z } from "zod";
import { TIMELINE } from "@/content/portfolio";

export const getAchievementsTool = createTool({
  name: "get_achievements",
  description:
    "Get Garv's achievements and accomplishments timeline, including hackathon wins, awards, and notable milestones. Use this when the user asks about achievements, awards, hackathons, competitions, or accomplishments.",
  parameters: z.object({
    limit: z
      .number()
      .optional()
      .describe("Optional: Limit the number of achievements returned"),
  }),
  execute: async ({ limit }) => {
    const achievements = limit ? TIMELINE.slice(0, limit) : TIMELINE;

    return {
      achievements,
      total: TIMELINE.length,
      returned: achievements.length,
    };
  },
});

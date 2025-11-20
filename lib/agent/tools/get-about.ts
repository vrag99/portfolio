import { createTool } from "@voltagent/core";
import { z } from "zod";
import { ABOUT } from "@/content/portfolio";

export const getAboutTool = createTool({
  name: "get_about",
  description:
    "Get information about Garv Makkar - his background, interests, and what he's currently working on. Use this when the user asks about who Garv is, his background, interests, or general information about him.",
  parameters: z.object({}).optional().nullish(),
  execute: async () => {
    return {
      about: ABOUT,
    };
  },
});

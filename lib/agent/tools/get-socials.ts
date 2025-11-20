import { createTool } from "@voltagent/core";
import { z } from "zod";
import { SOCIALS } from "@/content/portfolio";

export const getSocialsTool = createTool({
  name: "get_socials",
  description:
    "Get Garv's social media links and contact information including GitHub, LinkedIn, email, and other platforms. Use this when the user asks about social media, contact information, or how to reach Garv.",
  parameters: z.object({}).optional(),
  execute: async () => {
    return {
      socials: SOCIALS
    };
  },
});
 
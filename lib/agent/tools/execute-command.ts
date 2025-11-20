import { createTool } from "@voltagent/core";
import { z } from "zod";
import {
  ABOUT,
  PROJECTS,
  TIMELINE,
  SOCIALS,
  EDUCATION,
  EXPERIENCE,
} from "@/content/portfolio";

export const executeCommandTool = createTool({
  name: "execute_command",
  description:
    "Execute special portfolio commands that start with '/'. Available commands: /about, /projects, /achievements, /socials, /education, /experience. Use this ONLY when the user's input starts with a forward slash (/).",
  parameters: z.object({
    command: z
      .enum([
        "/about",
        "/projects",
        "/achievements",
        "/socials",
        "/education",
        "/experience",
      ])
      .describe("The command to execute"),
  }),
  execute: async ({ command }) => {
    switch (command) {
      case "/about":
        return {
          type: "text",
          data: ABOUT,
        };
      case "/projects":
        return {
          type: "projects",
          data: PROJECTS,
        };
      case "/achievements":
        return {
          type: "timeline",
          data: TIMELINE,
        };
      case "/socials":
        return {
          type: "socials",
          data: SOCIALS,
        };
      case "/education":
        return {
          type: "background",
          data: EDUCATION,
        };
      case "/experience":
        return {
          type: "background",
          data: EXPERIENCE,
        };
      default:
        return {
          type: "text",
          data: "Command not found. Available commands: /about, /projects, /achievements, /socials, /education, /experience",
        };
    }
  },
});

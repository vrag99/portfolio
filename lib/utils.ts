import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { ABOUT, PROJECTS, TIMELINE, SOCIALS } from "@/content/portfolio";
import { AiResponse } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCommandResponse(command: string): AiResponse {
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
    default:
      return {
        type: "text",
        data: "Command not found",
      };
  }
}
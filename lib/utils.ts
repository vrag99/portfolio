import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  ABOUT,
  PROJECTS,
  TIMELINE,
  SOCIALS,
  EDUCATION,
  EXPERIENCE,
} from "@/content/portfolio";

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
        data: "Command not found",
      };
  }
}

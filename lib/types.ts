import { LucideIcon } from "lucide-react";

export interface Command {
  name: string;
  description: string;
}

export type Project = {
  title: string;
  description: string;
  tags: string[];
  github: string;
};

export type Achievement = {
  title: string;
  description: string;
  timestamp: Date;
  link: string;
};

export type Social = {
  title: string;
  icon: LucideIcon;
  link: string;
};

// for chat
type AiResponseBase<T extends "text" | "projects" | "timeline" | "social"> = {
  type: T;
  data: T extends "text"
    ? string
    : T extends "projects"
    ? Project[]
    : T extends "timeline"
    ? Achievement[]
    : T extends "social"
    ? Social[]
    : never;
};

export type AiResponse =
  | AiResponseBase<"text">
  | AiResponseBase<"projects">
  | AiResponseBase<"timeline">
  | AiResponseBase<"social">;

export type AiBubbleData = {
  isLoading: boolean;
  response: AiResponse[] | null;
};

type BubbleBase<T extends "user" | "ai"> = {
  sender: T;
  data: T extends "user" ? string : AiBubbleData;
};

export type Bubble = BubbleBase<"user"> | BubbleBase<"ai">;
export type Thread = Bubble[];

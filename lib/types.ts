

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
  timestamp: string; // ISO format
  link: string;
};

export type Social = {
  title: string;
  icon: 'github' | 'linkedin' | 'email' | 'twitter'; 
  link: string;
};

export type SkillSet = {
  languages: string[];
  technologies: string[];
}

// for chat
type AiResponseBase<T extends "text" | "projects" | "timeline" | "socials"> = {
  type: T;
  data: T extends "text"
    ? string
    : T extends "projects"
    ? Project[]
    : T extends "timeline"
    ? Achievement[]
    : T extends "socials"
    ? Social[]
    : never;
};

export type AiResponse =
  | AiResponseBase<"text">
  | AiResponseBase<"projects">
  | AiResponseBase<"timeline">
  | AiResponseBase<"socials">;

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

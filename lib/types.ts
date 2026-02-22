export interface Command {
  name: string;
  description: string;
}

export type Project = {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  link?: string;
};

export type Achievement = {
  title: string;
  description: string;
  timestamp: string; // ISO format
  link: string;
};

export type Background = {
  title: string;
  description: string;
  startTime: string;
  endTime?: string;
  link: string;
};

export type Social = {
  title: string;
  icon: "github" | "linkedin" | "email" | "twitter";
  link: string;
};

export type SkillSet = {
  languages: string[];
  technologies: string[];
};

// for chat
type AiResponseBase<
  T extends "text" | "projects" | "timeline" | "socials" | "background"
> = {
  type: T;
  data: T extends "text"
    ? string
    : T extends "projects"
    ? Project[]
    : T extends "timeline"
    ? Achievement[]
    : T extends "socials"
    ? Social[]
    : T extends "background"
    ? Background[]
    : never;
};

export type AiResponse =
  | AiResponseBase<"text">
  | AiResponseBase<"projects">
  | AiResponseBase<"timeline">
  | AiResponseBase<"socials">
  | AiResponseBase<"background">;

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


// streaming types -->
export type StreamingBubble = {
  sender: "user" | "ai";
  data: string;
}

export type StreamingThread = StreamingBubble[];
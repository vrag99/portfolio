export interface Command {
  name: string;
  description: string;
}

// for chat
export type AiBubbleData = {
  isLoading: boolean;
  response: string[] | null;
};

type BubbleBase<T extends "user" | "ai"> = {
  sender: T;
  data: T extends "user" ? string : AiBubbleData;
};

export type Bubble = BubbleBase<"user"> | BubbleBase<"ai">;
export type Thread = Bubble[];

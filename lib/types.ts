export interface Command {
  name: string;
  description: string;
}


// for chat
type AiResponseBase<T extends "Text" | "Form"> = {
  type: T;
  body: T extends "Text" ? string : object;
};

export type AiBubbleData = {
  isLoading: boolean;
  response: AiResponse[] | null;
};

type BubbleBase<T extends "user" | "ai"> = {
  sender: T;
  data: T extends "user" ? string : AiBubbleData;
};

export type AiResponse = AiResponseBase<"Text"> | AiResponseBase<"Form">;
export type Bubble = BubbleBase<"user"> | BubbleBase<"ai">;
export type ChatHistory = Bubble[];

export type BackendResponse = {
  conversation: AiResponse[],
  user_id: string
}
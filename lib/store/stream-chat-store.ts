import { StreamingBubble, StreamingThread } from "@/lib/types";
import { create } from "zustand/react";

interface ChatStoreStates {
  userInput: string;
  thread: StreamingThread;
  setUserInput: (input: string) => void;
  addBubble: (bubble: StreamingBubble) => void;
  streamAiResponse: (response: string) => void;
  resetThread: () => void;
}

export const useChatStore = create<ChatStoreStates>((set) => ({
  userInput: "",
  thread: [],
  setUserInput: (input) => set({ userInput: input }),
  addBubble: (bubble) =>
    set((state) => ({ thread: [...state.thread, bubble] })),
  streamAiResponse: (response) => {
    set((state) => {
      const newThread = [...state.thread];
      const lastBubble = newThread[newThread.length - 1];
      if (lastBubble && lastBubble.sender === "ai") {
        lastBubble.data += response;
      }
      return { thread: newThread };
    });
  },
  resetThread: () => set({ thread: [] }),
}));

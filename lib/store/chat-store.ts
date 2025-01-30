import { create } from "zustand";
import { Bubble, Thread } from "@/lib/types";

interface ChatStoreStates {
  userInput: string;
  thread: Thread;
  setUserInput: (input: string) => void;
  addBubble: (bubble: Bubble) => void;
  addAiLoadingBubble: () => void;
  showAiResponse: (response: string[]) => void;
}

export const useChatStore = create<ChatStoreStates>((set) => ({
  userInput: "",
  thread: [],
  setUserInput: (input) => set({ userInput: input }),
  addBubble: (bubble) =>
    set((state) => ({ thread: [...state.thread, bubble] })),
  addAiLoadingBubble: () =>
    set((state) => ({
      thread: [
        ...state.thread,
        { sender: "ai", data: { isLoading: true, response: null } },
      ],
    })),
  showAiResponse: (response) => {
    set((state) => {
      const newThread = [...state.thread];
      newThread[newThread.length - 1] = {
        sender: "ai",
        data: {
          isLoading: false,
          response: response,
        },
      };
      return { thread: newThread };
    });
  },
}));

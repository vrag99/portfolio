import { create } from "zustand";
import { Bubble, Thread } from "@/lib/types";

interface ChatStoreStates {
  thread: Thread;
  addBubble: (bubble: Bubble) => void;
  addAiLoadingBubble: () => void;
  showAiResponse: (response: string[]) => void;
}

export const useChatStore = create<ChatStoreStates>((set) => ({
  thread: [],
  addBubble: (bubble) =>
    set((state) => ({ thread: [...state.thread, bubble] })),
  addAiLoadingBubble: () =>
    set((state) => ({
      thread: [
        ...state.thread,
        { sender: "ai", data: { isLoading: true, response: null } },
      ],
    })),
  showAiResponse: (response) =>
    set((state) => ({
      thread: [
        ...state.thread.slice(0, state.thread.length - 1),
        { sender: "ai", data: { isLoading: false, response } },
      ],
    })),
}));

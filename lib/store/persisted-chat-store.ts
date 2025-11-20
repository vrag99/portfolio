// useChatStore.ts
import { create } from "zustand";
import type { UIMessage } from "ai";

interface PersistedChatStore {
  chatId: string | null;
  messages: UIMessage[];
  setChatId: (id: string) => void;
  setMessages: (messages: UIMessage[]) => void;
  addMessage: (message: UIMessage) => void;
  clearChat: () => void;
}

export const useChatStore = create<PersistedChatStore>((set, get) => ({
  chatId: null,
  messages: [],
  setChatId: (id: string) => set({ chatId: id }),
  setMessages: (messages: UIMessage[]) => set({ messages }),
  addMessage: (message: UIMessage) =>
    set({ messages: [...get().messages, message] }),
  clearChat: () => set({ chatId: null, messages: [] }),
}));


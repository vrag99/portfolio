"use client";
import { AskBox, Thread } from "@/components/chat";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useChatStore } from "@/lib/store/persisted-chat-store";

const ChatPage = () => {
  const { chatId, messages: storedMessages, setMessages } = useChatStore();

  const { messages, sendMessage, status } = useChat({
    id: chatId || undefined,
    messages: storedMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    onFinish: ({ messages: newMessages }) => {
      setMessages(newMessages);
    },
  });

  return (
    <main className="flex flex-col w-full h-screen">
      <div className="w-full flex-1 max-w-3xl flex flex-col mx-auto mt-20 px-2 md:px-0">
        <Thread messages={messages} />
        <div className="sticky bottom-0 pb-2 px-4 md:px-0 md:pb-4">
          <AskBox onSendMessage={sendMessage} status={status} />
        </div>
      </div>
    </main>
  );
};

export default ChatPage;

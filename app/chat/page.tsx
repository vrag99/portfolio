"use client";
import { AskBox, Thread } from "@/components/chat";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useChatStore } from "@/lib/store/persisted-chat-store";

const ChatPage = () => {
  const { chatId, messages: storedMessages, setMessages: setStoredMessages } = useChatStore();

  const { messages, sendMessage, status, error } = useChat({
    id: chatId || undefined,
    messages: storedMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    onFinish: ({ messages: newMessages }) => {
      setStoredMessages(newMessages);
    },
    onError: (error) => {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    },
  });


  return (
    <main className="flex flex-col w-full h-screen">
      <div className="w-full flex-1 max-w-3xl flex flex-col mx-auto mt-20 px-2 md:px-0">
        <Thread messages={messages} />
        
        {/* Display error if present */}
        {error && (
          <div className="mx-4 md:mx-0 mb-4 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-sm font-semibold text-destructive mb-1">Stream Error</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        )}
        
        <div className="sticky bottom-0 pb-2 px-4 md:px-0 md:pb-4 backdrop-blur-xl bg-gradient-to-r from-background via-background/20 to-background rounded-t-lg">
          <AskBox onSendMessage={sendMessage} status={status} />
        </div>
      </div>
    </main>
  );
};

export default ChatPage;

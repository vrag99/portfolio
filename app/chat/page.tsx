"use client";
import { AskBox, Thread } from "@/components/chat";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useChatStore } from "@/lib/store/persisted-chat-store";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ChatNav = () => {
  const router = useRouter();
  return (
    <nav className="w-full fixed z-50 bg-gradient-to-b from-background to-transparent to-[120%]">
      <div className="max-w-3xl mx-auto pt-4 pb-6 flex items-center gap-2">
        <Badge
          variant={"accent"}
          className="cursor-pointer aspect-square p-0.5"
          onClick={() => router.back()}
        >
          <ChevronLeft className="size-4" />
        </Badge>
        <Badge variant={"secondary"}>/chat</Badge>
      </div>
    </nav>
  );
};

const ChatPage = () => {
  const {
    chatId,
    setChatId,
    messages: storedMessages,
    setMessages: setStoredMessages,
  } = useChatStore();

  const { id, messages, sendMessage, status, error } = useChat({
    ...(chatId ? { id: chatId } : {}),
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

  useEffect(() => {
    if (!chatId && id) {
      setChatId(id);
    }
  }, [chatId, id, setChatId]);

  return (
    <main className="flex flex-col w-full h-screen">
      <ChatNav />
      <div className="w-full flex-1 max-w-3xl flex flex-col mx-auto mt-20 px-2 md:px-0">
        <Thread messages={messages} />

        {/* Display error if present */}
        {error && (
          <div className="mx-4 md:mx-0 mb-4 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-sm font-semibold text-destructive mb-1">
              Stream Error
            </p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        )}

        <div className="sticky bottom-0 pb-[max(0.5rem,env(safe-area-inset-bottom))] px-4 md:px-0 md:pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-xl bg-gradient-to-r from-background via-background/20 to-background rounded-t-lg">
          <AskBox onSendMessage={sendMessage} status={status} />
        </div>
      </div>
    </main>
  );
};

export default ChatPage;

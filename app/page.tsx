"use client";

import { AskBox } from "@/components/chat";
import { Hero } from "@/components/home";
import BlurFade from "@/components/ui/blur-fade";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useChatStore } from "@/lib/store/persisted-chat-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { generateId } from "ai";

export default function Home() {
  const router = useRouter();
  const { chatId, messages, setChatId, setMessages } = useChatStore();

  useEffect(() => {
    if (!chatId) {
      const newChatId = generateId();
      setChatId(newChatId);
    }
  }, [chatId, setChatId]);

  const { sendMessage, status } = useChat({
    id: chatId || undefined,
    messages: messages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    onFinish: ({ messages: newMessages }) => {
      setMessages(newMessages);
      router.push(`/chat`);
    },
  });

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="space-y-8 font-medium">
        <BlurFade delay={0.4} className="space-y-4">
          <Hero />
        </BlurFade>
        <BlurFade delay={0.8} direction="up">
          <AskBox
            commandBoxPosition="bottom"
            onSendMessage={sendMessage}
            status={status}
          />
        </BlurFade>
      </div>
    </div>
  );
}

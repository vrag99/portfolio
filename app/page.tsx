"use client";

import { AskBox } from "@/components/chat";
import {
  Hero,
  Description,
  ExperienceSection,
  GitHubChart,
} from "@/components/home";
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
    <main className="min-h-screen pb-28">
      <div className="max-w-3xl mx-auto px-6 pt-32 space-y-8">
        <BlurFade inView className="space-y-4">
          <Hero />
        </BlurFade>
        <BlurFade inView direction="up">
          <Description />
        </BlurFade>
        <BlurFade inView direction="up">
          <GitHubChart />
        </BlurFade>
        <hr />
        <BlurFade inView>
          <ExperienceSection />
        </BlurFade>
        <hr />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
        <div className="bg-gradient-to-t from-background via-background/80 to-transparent pt-8 pb-4 px-4">
          <div className="max-w-2xl mx-auto pointer-events-auto">
            <AskBox
              commandBoxPosition="top"
              onSendMessage={sendMessage}
              status={status}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

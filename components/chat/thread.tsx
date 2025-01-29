"use client";

import React, { useEffect, useRef } from "react";
import { UserBubble, AiBubble } from "./chat-bubbles";
import { useChatStore } from "@/lib/store/chat-store";

const Thread = () => {
  const { thread } = useChatStore();
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread]);

  return (
    <div className="gap-4 px-4 flex-1 flex flex-col">
      {thread.map((bubble, i) => (
        <div className="flex flex-col" key={i}>
          {bubble.sender === "user" ? (
            <UserBubble message={bubble.data} />
          ) : (
            <AiBubble />
          )}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default Thread;

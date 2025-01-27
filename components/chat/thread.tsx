"use client";

import React, { useEffect, useRef } from "react";
import { UserBubble, AiBubble } from "./chat-bubbles";
import { useChatStore } from "@/lib/store/chat-store";

const Thread = () => {
  const { thread } = useChatStore();
  const threadRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.addEventListener("DOMNodeInserted", (e) => {
        const target = e.target as HTMLElement;
        target.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [thread]);

  return (
    <div ref={threadRef} className="gap-4 px-4 flex-1 flex flex-col">
      {thread.map((bubble, i) => (
        <>
          {bubble.sender === "user" ? (
            <UserBubble message={bubble.data} key={i} />
          ) : (
            <AiBubble key={i} />
          )}
        </>
      ))}
    </div>
  );
};

export default Thread;

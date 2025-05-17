"use client";

import React, { useEffect, useRef } from "react";
import { UserBubble, AiBubble } from "./chat-bubbles";
import { useChatStore } from "@/lib/store/chat-store";
import { AnimatePresence, motion } from "motion/react";

const Thread = () => {
  const { thread } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight;
    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [thread]);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto space-y-4" ref={containerRef}>
      <AnimatePresence>
        {thread.map((bubble, i) => (
          <PushAnimationWrapper className="flex flex-col" key={i}>
            {bubble.sender === "user" ? (
              <UserBubble text={bubble.data} />
            ) : (
              <AiBubble data={bubble.data} />
            )}
          </PushAnimationWrapper>
        ))}
        <div
          ref={bottomRef}
          className="h-[1px] w-full flex-shrink-0 scroll-mt-4"
          aria-hidden="true"
        />
      </AnimatePresence>
    </div>
  );
};

function PushAnimationWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      layout
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { duration: 0.3 },
      }}
    >
      {children}
    </motion.div>
  );
}

export default Thread;

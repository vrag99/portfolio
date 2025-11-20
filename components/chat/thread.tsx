"use client";

import React, { useEffect, useRef } from "react";
import { UserBubble, AiBubble } from "./chat-bubbles";
import { AnimatePresence, motion } from "motion/react";
import { UIMessage } from "ai";

const Thread = ({ messages }: { messages: UIMessage[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto space-y-4"
      ref={containerRef}
    >
      <AnimatePresence>
        {messages.map((message, i) => (
          <PushAnimationWrapper className="flex flex-col" key={i}>
            {message.role === "user" ? (
              <UserBubble message={message} />
            ) : (
              <AiBubble message={message} />
            )}
          </PushAnimationWrapper>
        ))}
        <div ref={messagesEndRef} />
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
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        opacity: { duration: 0.3 },
      }}
    >
      {children}
    </motion.div>
  );
}

export default Thread;

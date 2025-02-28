"use client";

import React, { useEffect, useRef } from "react";
import { UserBubble, AiBubble } from "./chat-bubbles";
import { useChatStore } from "@/lib/store/chat-store";
import { AnimatePresence, motion } from "motion/react";
import { chat } from "@/lib/groq";
import { getCommandResponse } from "@/lib/utils";

const Thread = () => {
  const { thread, showAiResponse, userInput } = useChatStore();
  const endRef = useRef<HTMLDivElement | null>(null);
  const hasBeenRendered = useRef(false);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread]);

  useEffect(() => {
    if (hasBeenRendered.current) {
      // chat([{ role: "user", content: userInput }]).then((res) => {
      //   showAiResponse([{ type: "text", data: res ?? "There was some error" }]);
      // });

      const res = getCommandResponse(userInput);
      showAiResponse([res]);
    }

    hasBeenRendered.current = true;
  }, [userInput]);

  return (
    <div className="gap-4 px-4 flex-1 flex flex-col">
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
      </AnimatePresence>
      <div ref={endRef} />
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

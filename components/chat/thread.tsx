import React from "react";
import { UserBubble, AiBubble } from "./chat-bubbles";

const Thread = () => {
  return (
    <div className="flex flex-col gap-8">
      {Array.from({ length: 10 }).map((_, i) => (
        <div className="space-y-4 flex flex-col">
          <UserBubble message="/about" key={i} />
          <AiBubble key={i} />
        </div>
      ))}
    </div>
  );
};

export default Thread;

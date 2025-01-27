import React from "react";
import { UserBubble, AiBubble } from "./chat-bubbles";

const Thread = () => {
  return (
    <>
      {Array.from({ length: 1 }).map((_, i) => (
        <div key={i} className="space-y-4 flex flex-col">
          <UserBubble message="/about" key={i} />
          <AiBubble key={i} />
        </div>
      ))}
    </>
  );
};

export default Thread;

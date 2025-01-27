import { AskBox, Thread } from "@/components/chat";

import React from "react";

const ChatPage = () => {
  return (
    <>
      <div className="space-y-8 px-4 flex-1">
        <Thread />
      </div>
      <div className="sticky bottom-0 pb-4 bg-background">
        <AskBox />
      </div>
    </>
  );
};

export default ChatPage;

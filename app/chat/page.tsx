import { AskBox, Thread } from "@/components/chat";

import React from "react";

const ChatPage = () => {
  return (
    <>
      <Thread />
      <div className="sticky bottom-0 py-4 bg-background">
        <AskBox />
      </div>
    </>
  );
};

export default ChatPage;

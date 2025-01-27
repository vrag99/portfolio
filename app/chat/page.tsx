import { AskBox, Thread } from "@/components/chat";

import React from "react";

const ChatPage = () => {
  return (
    <>
      <Thread />

      <div className="sticky bottom-0 pb-4 pt-2 bg-background">
        <AskBox />
      </div>
    </>
  );
};

export default ChatPage;

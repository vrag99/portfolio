import { AskBox, Thread } from "@/components/chat";

import React from "react";

const ChatPage = () => {
  return (
    <>
      <Thread />
      <div className="sticky bottom-0 pb-4 pt-10 bg-gradient-to-t from-background from-[68%] to-transparent">
        <AskBox />
      </div>
    </>
  );
};

export default ChatPage;

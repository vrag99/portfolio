import { AskBox, Thread } from "@/components/chat";

import React from "react";

const ChatPage = () => {
  return (
    <>
      <Thread />
      <div className="sticky bottom-0 pb-2 pt-10 bg-gradient-to-t from-background from-[68%] to-transparent px-4 md:px-0 md:pb-4">
        <AskBox />
      </div>
    </>
  );
};

export default ChatPage;

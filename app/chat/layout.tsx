import { ChatNavbar } from "@/components/chat";
import React from "react";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex w-full h-screen">
      <div className="flex flex-col flex-1">
        <ChatNavbar />
        <div className="w-full h-full max-w-3xl flex flex-col mx-auto mt-10 ">
          {children}
        </div>
      </div>
    </main>
  );
};

export default ChatLayout;

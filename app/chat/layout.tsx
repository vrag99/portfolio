import { ChatNavbar } from "@/components/chat";
import React from "react";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full h-screen">
      <ChatNavbar />
      <div className="max-w-3xl flex flex-col mx-auto mt-20">{children}</div>
    </main>
  );
};

export default ChatLayout;

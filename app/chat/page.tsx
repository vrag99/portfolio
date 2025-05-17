"use client";
import { AskBox, ChatNavbar, Thread } from "@/components/chat";

const ChatPage = () => {
  return (
    <main className="flex flex-col w-full h-screen">
      <ChatNavbar />
      <div className="w-full flex-1 max-w-3xl flex flex-col mx-auto mt-10">
        <Thread />
        <div className="sticky bottom-0 pb-2 px-4 md:px-0 md:pb-4">
          <AskBox navigateToChat={false} />
        </div>
      </div>
    </main>
  );
};

export default ChatPage;

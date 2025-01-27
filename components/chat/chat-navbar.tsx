import React from "react";

const ChatNavbar = () => {
  return (
    <nav className="flex flex-row items-center h-10 bg-background sticky top-0 w-full">
      <div className="p-2 w-full">
        <h1 className="text-xl font-highlight text-primary italic font-medium">Garv</h1>
      </div>
      <div
        id="shadow"
        className="bg-gradient-to-b from-background to-transparent absolute top-10 w-full h-10"
      ></div>
    </nav>
  );
};

export default ChatNavbar;

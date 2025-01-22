import { Sparkle, Terminal } from "lucide-react";
import React from "react";

export const UserBubble = ({ message }: { message: string }) => {
  return (
    <p className="px-4 py-1.5 self-end rounded-xl bg-accent text-accent-foreground font-medium">
      {message}
    </p>
  );
};

export const AiBubble = () => {
  return (
    <div className="self-start p-2 flex flex-row gap-2 bg-secondary/10 rounded-2xl border-b-2 border-r">
      <div className="w-8 h-8 mt-1">
        <Terminal className="h-4 w-4" />
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab nemo ipsum
        omnis! Accusamus sunt optio dolorum odit ea sit aliquid, voluptate non
        perferendis fugit culpa inventore unde esse voluptatibus nihil.
      </p>
    </div>
  );
};

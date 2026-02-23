"use client";

import { Terminal } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import Renderer from "./renderer";
import { type UIMessage } from "@ai-sdk/react";

export const UserBubble = ({ message }: { message: UIMessage }) => {
  return (
    <>
      {message.parts.map((part, i) => {
        if (part.type === "text") {
          return (
            <p
              key={i}
              className="px-4 py-1.5 float-end rounded-xl bg-accent text-accent-foreground font-medium text-sm w-fit"
            >
              {part.text}
            </p>
          );
        }
        return null;
      })}
    </>
  );
};

export const AiBubble = ({ message }: { message: UIMessage }) => {
  return (
    <div className="self-start p-2 flex flex-row">
      <div className={cn("w-6 h-6 mt-1")}>
        <Terminal className="h-4 w-4 mr-2 mt-0.5" />
      </div>
      <div className="space-y-1">
        {message.parts.map((part, i) => (
          <Renderer key={i} part={part} />
        ))}
      </div>
    </div>
  );
};

"use client";

import { AiBubbleData } from "@/lib/types";
import { Loader, Terminal } from "lucide-react";
import React from "react";
import { TextShimmerWave } from "../ui/text-shimmer-wave";
import { cn } from "@/lib/utils";

export const UserBubble = ({ message }: { message: string }) => {
  return (
    <p className="px-4 py-1.5 self-end rounded-xl bg-accent text-accent-foreground font-medium w-fit">
      {message}
    </p>
  );
};

export const AiBubble = (props: AiBubbleData) => {
  const thinkingPhrases = [
    "Let me think about that...",
    "Hmm, interesting question...",
    "Drawing from my experience...",
    "Connecting the dots...",
    "Almost there...",
    "One moment please...",
    "Processing that thought...",
  ];
  const phrase =
    thinkingPhrases[Math.floor(Math.random() * thinkingPhrases.length)];
    
  return (
    <div className="self-start p-2 flex flex-row ">
      <div className={cn("w-6 h-6 mt-1")}>
        {props.isLoading ? (
          <Loader className="h-4 w-4 text-primary animate-spin" />
        ) : (
          <Terminal className="h-4 w-4" />
        )}
      </div>
      {props.isLoading ? (
        <TextShimmerWave className="font-medium">
          {phrase}
        </TextShimmerWave>
      ) : (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab nemo
          ipsum omnis! Accusamus sunt optio dolorum odit ea sit aliquid,
          voluptate non perferendis fugit culpa inventore unde esse voluptatibus
          nihil.
        </p>
      )}
    </div>
  );
};

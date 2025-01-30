"use client";

import { AiBubbleData } from "@/lib/types";
import { Loader, Terminal } from "lucide-react";
import React from "react";
import { TextShimmerWave } from "../ui/text-shimmer-wave";
import { cn } from "@/lib/utils";

export const UserBubble = ({ text }: { text: string }) => {
  return (
    <p className="px-4 py-1.5 self-end rounded-xl bg-accent text-accent-foreground font-medium w-fit">
      {text}
    </p>
  );
};

export const AiBubble = ({ data }: { data: AiBubbleData }) => {
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
        {data.isLoading ? (
          <Loader className="h-4 w-4 text-primary animate-spin" />
        ) : (
          <Terminal className="h-4 w-4" />
        )}
      </div>
      {data.isLoading ? (
        <TextShimmerWave className="font-medium">{phrase}</TextShimmerWave>
      ) : (
        <>
          {data.response?.map((text, i) => (
            <p className="font-medium text-muted-foreground" key={i}>{text}</p>
          ))}
        </>
      )}
    </div>
  );
};

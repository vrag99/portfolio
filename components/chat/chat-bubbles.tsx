"use client";

import { AiBubbleData } from "@/lib/types";
import { Loader, Terminal } from "lucide-react";
import React from "react";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { cn } from "@/lib/utils";
import { THINKING_PHRASES } from "@/lib/constants";
import Renderer from "./renderer";

export const UserBubble = ({ text }: { text: string }) => {
  return (
    <p className="px-4 py-1.5 self-end rounded-xl bg-accent text-accent-foreground font-medium text-sm w-fit">
      {text}
    </p>
  );
};

export const AiBubble = ({ data }: { data: AiBubbleData }) => {
  const phrase =
    THINKING_PHRASES[Math.floor(Math.random() * THINKING_PHRASES.length)];

  return (
    <div className="self-start p-2 flex flex-row">
      <div className={cn("w-6 h-6 mt-1")}>
        {data.isLoading ? (
          <Loader className="h-4 w-4 text-primary animate-spin" />
        ) : (
          <Terminal className="h-4 w-4 mr-2 mt-0.5" />
        )}
      </div>
      {data.isLoading ? (
        <TextShimmerWave className="font-medium">{phrase}</TextShimmerWave>
      ) : (
        <div className="space-y-1">
          {data.response?.map((res, i) => (
            <Renderer key={i} response={res} />
          ))}
        </div>
      )}
    </div>
  );
};

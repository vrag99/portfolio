"use client";

import { Markdown } from "@/components/ui/markdown";
import { useTextStream } from "@/components/ui/response-stream";
import { useEffect } from "react";

export default function MarkdownRenderer({ markdown }: { markdown: string }) {
  const { displayedText, startStreaming } = useTextStream({
    textStream: markdown,
    mode: "typewriter",
    speed: 30,
    characterChunkSize: 6,
  });

  useEffect(() => {
    startStreaming();
  }, [startStreaming]);

  return (
    <Markdown className="prose dark:prose-invert">
      {displayedText}
    </Markdown>
  );
}

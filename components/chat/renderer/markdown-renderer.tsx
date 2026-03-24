"use client";

import { Markdown } from "@/components/ui/markdown";
import { useTextStream } from "@/components/ui/response-stream";

function StreamingMarkdown({ markdown }: { markdown: string }) {
  const { displayedText } = useTextStream({
    textStream: markdown,
    mode: "typewriter",
    speed: 30,
    characterChunkSize: 6,
  });

  return (
    <Markdown className="prose dark:prose-invert">
      {displayedText || markdown}
    </Markdown>
  );
}

export default function MarkdownRenderer({
  markdown,
  animate = true,
}: {
  markdown: string;
  animate?: boolean;
}) {
  if (!animate) {
    return (
      <Markdown className="prose dark:prose-invert">{markdown}</Markdown>
    );
  }

  return <StreamingMarkdown markdown={markdown} />;
}

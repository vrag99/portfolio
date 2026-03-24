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
  isRestored,
}: {
  markdown: string;
  isRestored?: boolean;
}) {
  if (isRestored) {
    return <Markdown className="prose dark:prose-invert">{markdown}</Markdown>;
  } else {
    return <StreamingMarkdown markdown={markdown} />;
  }
}

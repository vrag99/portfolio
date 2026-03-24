import { cn } from "@/lib/utils";
import { marked } from "marked";
import { memo, useId, useMemo } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { CodeBlock, CodeBlockCode } from "./code-block";

export type MarkdownProps = {
  children: string;
  id?: string;
  className?: string;
  components?: Partial<Components>;
};

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map((token) => token.raw);
}

function extractLanguage(className?: string): string {
  if (!className) return "plaintext";
  const match = className.match(/language-(\w+)/);
  return match ? match[1] : "plaintext";
}

const INITIAL_COMPONENTS: Partial<Components> = {
  a: function AComponent({ className, children, ...props }) {
    return (
      <a
        {...props}
        className={cn(
          "text-primary underline underline-offset-4",
          "dark:decoration-primary/40",
          "group",
          className,
        )}
        target="_blank"
      >
        {children}{" "}
        <span className="relative inline-block size-[1rem] align-top overflow-hidden">
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full group-hover:translate-x-full">
            &#8599;
          </span>
          <span className="absolute left-0 top-0 inline-block translate-y-full -translate-x-full transition-transform duration-300 group-hover:translate-y-0 group-hover:translate-x-0">
            &#8599;
          </span>
        </span>
      </a>
    );
  },
  p: function PComponent({ className, children, ...props }) {
    return (
      <p
        {...props}
        className={cn("mb-3 text-muted-foreground font-medium text-base", className)}
      >
        {children}
      </p>
    );
  },
  em: function EmComponent({ className, children, ...props }) {
    return (
      <em
        {...props}
        className={cn(
          "font-serif text-lg font-medium",
          className,
        )}
      >
        {children}
      </em>
    );
  },
  code: function CodeComponent({ className, children, ...props }) {
    const isInline =
      !props.node?.position?.start.line ||
      props.node?.position?.start.line === props.node?.position?.end.line;

    if (isInline) {
      return (
        <span
          className={cn(
            "bg-accent text-accent-foreground border-b border-accent-foreground/20 rounded-sm px-1 font-mono text-sm",
            className,
          )}
          {...props}
        >
          {children}
        </span>
      );
    }

    const language = extractLanguage(className);

    return (
      <CodeBlock className={className}>
        <CodeBlockCode code={children as string} language={language} />
      </CodeBlock>
    );
  },
};

const MemoizedMarkdownBlock = memo(
  function MarkdownBlock({
    content,
    components = INITIAL_COMPONENTS,
  }: {
    content: string;
    components?: Partial<Components>;
  }) {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    );
  },
  function propsAreEqual(prevProps, nextProps) {
    return prevProps.content === nextProps.content;
  },
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

function MarkdownComponent({
  children,
  id,
  className,
  components = INITIAL_COMPONENTS,
}: MarkdownProps) {
  const generatedId = useId();
  const blockId = id ?? generatedId;
  const blocks = useMemo(() => parseMarkdownIntoBlocks(children), [children]);

  return (
    <div className={className}>
      {blocks.map((block, index) => (
        <MemoizedMarkdownBlock
          key={`${blockId}-block-${index}`}
          content={block}
          components={components}
        />
      ))}
    </div>
  );
}

const Markdown = memo(MarkdownComponent);
Markdown.displayName = "Markdown";

export { Markdown };

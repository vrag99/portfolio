import { CodeBlock, CodeBlockCode } from "@/components/ui/code-block";
import { cn } from "@/lib/utils";
import type { MDXComponents } from "mdx/types";

function extractLanguage(className?: string): string {
  if (!className) return "plaintext";
  const match = className.match(/language-(\w+)/);
  return match ? match[1] : "plaintext";
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    code: function CodeComponent({ className, children, ...props }) {
      const isInline = typeof children === "string" && !children.includes("\n");

      if (isInline) {
        return (
          <span
            className={cn(
              "bg-accent text-accent-foreground border-b border-accent-foreground/20 rounded-sm px-1 font-mono text-sm",
              className
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
    ...components,
  };
}

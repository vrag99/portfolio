import React, { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import { motion, Variants } from "motion/react";

// Define types for our props
interface MarkdownRendererProps {
  markdown: string;
  customOverrides?: Record<string, any>;
  animationDelay?: number;
  staggerDelay?: number;
}

// Define animation variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const lineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  markdown,
  customOverrides = {},
  animationDelay = 0.2,
  staggerDelay = 0.08,
}) => {
  const [lines, setLines] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Process the markdown to split into logical lines for animation
    const processedLines = [];
    const rawLines = markdown.split("\n");

    // Process markdown to handle multiline elements appropriately
    let currentBlock = "";
    let inCodeBlock = false;

    for (const line of rawLines) {
      // Handle code blocks specially to keep them together
      if (line.trim().startsWith("```")) {
        if (inCodeBlock) {
          // End of code block
          currentBlock += line + "\n";
          processedLines.push(currentBlock);
          currentBlock = "";
          inCodeBlock = false;
        } else {
          // Start of code block
          if (currentBlock.trim()) {
            processedLines.push(currentBlock);
          }
          currentBlock = line + "\n";
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        // Within code block, just append
        currentBlock += line + "\n";
        continue;
      }

      // For list items, keep consecutive ones together
      if (
        line.trim().startsWith("- ") ||
        line.trim().startsWith("* ") ||
        line.trim().match(/^\d+\.\s/)
      ) {
        if (
          currentBlock.trim() &&
          !(
            currentBlock.trim().startsWith("- ") ||
            currentBlock.trim().startsWith("* ") ||
            currentBlock.trim().match(/^\d+\.\s/)
          )
        ) {
          processedLines.push(currentBlock);
          currentBlock = line + "\n";
        } else {
          currentBlock += line + "\n";
        }
        continue;
      }

      // For headings and paragraphs, treat as individual blocks
      if (line.trim().startsWith("#") || line.trim() === "") {
        if (currentBlock.trim()) {
          processedLines.push(currentBlock);
        }
        if (line.trim() !== "") {
          processedLines.push(line + "\n");
        } else {
          currentBlock = "";
        }
      } else {
        // For normal text content
        if (
          currentBlock.trim() &&
          (currentBlock.trim().startsWith("#") ||
            currentBlock.trim().startsWith(">"))
        ) {
          processedLines.push(currentBlock);
          currentBlock = line + "\n";
        } else {
          currentBlock += line + "\n";
        }
      }
    }

    // Add the last block if not empty
    if (currentBlock.trim()) {
      processedLines.push(currentBlock);
    }

    setLines(processedLines);
    setIsAnimating(true);
  }, [markdown]);

  // Default styling with shadcn/ui color tokens
  const defaultOverrides = {
    h1: {
      component: ({ children, ...props }: { children: React.ReactNode }) => (
        <h1
          {...props}
          className="scroll-m-20 text-4xl font-extrabold tracking-tight mb-4 text-foreground"
        >
          {children}
        </h1>
      ),
    },
    h2: {
      component: ({ children, ...props }: { children: React.ReactNode }) => (
        <h2
          {...props}
          className="scroll-m-20 text-3xl font-semibold tracking-tight mb-3 text-foreground"
        >
          {children}
        </h2>
      ),
    },
    h3: {
      component: ({ children, ...props }: { children: React.ReactNode }) => (
        <h3
          {...props}
          className="scroll-m-20 text-2xl font-semibold tracking-tight  mb-2 text-foreground"
        >
          {children}
        </h3>
      ),
    },
    h4: {
      component: ({ children, ...props }: { children: React.ReactNode }) => (
        <h4
          {...props}
          className="scroll-m-20 text-xl font-semibold tracking-tight mb-2 text-foreground"
        >
          {children}
        </h4>
      ),
    },
    p: {
      component: ({ children, ...props }: { children: React.ReactNode }) => (
        <p {...props} className="leading-7 mb-3 text-muted-foreground font-medium">
          {children}
        </p>
      ),
    },
    a: {
      component: ({ children, ...props }: { children: React.ReactNode }) => (
        <a
          {...props}
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {children}
        </a>
      ),
    },
    em: {
      component: ({ children, ...props }: { children: React.ReactNode }) => (
        <em {...props} className="font-highlight font-bold">
          {children}
        </em>
      ),
    },
    ul: {
      component: ({ children, ...props }: { children: React.ReactNode }) => (
        <ul {...props} className="my-4 ml-6 list-disc text-muted-foreground">
          {children}
        </ul>
      ),
    },
    ol: {
      component: ({ children, ...props }: { children: React.ReactNode }) => (
        <ol {...props} className="my-4 ml-6 list-decimal text-muted-foreground">
          {children}
        </ol>
      ),
    },
    li: {
      component: ({ children, ...props }: { children: React.ReactNode }) => (
        <li {...props} className="mt-2 font-medium">
          {children}
        </li>
      ),
    },
    blockquote: {
      component: ({ children, ...props }: { children: React.ReactNode }) => (
        <blockquote
          className="mt-4 mb-4 border-l-4 border-border pl-4 italic text-muted-foreground"
          {...props}
        >
          {children}
        </blockquote>
      ),
    },
    code: {
      component: ({ children, ...props }: { children: React.ReactNode }) => (
        <code
          {...props}
          className="relative rounded bg-muted font-mono text-sm font-semibold text-muted-foreground p-1 m-0.5"
        >
          {children}
        </code>
      ),
    },
    pre: {
      component: ({ children, ...props }: { children: React.ReactNode }) => (
        <pre
          {...props}
          className="mb-4 mt-4 text-wrap rounded-lg border border-primary bg-muted p-4 text-sm font-mono text-primary"
        >
          {children}
        </pre>
      ),
    },
    hr: {
      component: (props: any) => (
        <hr {...props} className="my-6 border-border" />
      ),
    },
    table: {
      component: ({ children, ...props }: { children: React.ReactNode }) => (
        <div className="my-6 w-full overflow-y-auto">
          <table {...props} className="w-full caption-bottom text-sm">
            {children}
          </table>
        </div>
      ),
    },
    thead: {
      component: ({ children, ...props }: { children: React.ReactNode }) => (
        <thead {...props} className="border-b bg-muted/50">
          {children}
        </thead>
      ),
    },
    tbody: {
      component: ({ children, ...props }: { children: React.ReactNode }) => (
        <tbody {...props} className="divide-y divide-border">
          {children}
        </tbody>
      ),
    },
    tr: {
      component: ({ children, ...props }: { children: React.ReactNode }) => (
        <tr
          {...props}
          className="hover:bg-muted/50 data-[state=selected]:bg-muted"
        >
          {children}
        </tr>
      ),
    },
    th: {
      component: ({ children, ...props }: { children: React.ReactNode }) => (
        <th
          {...props}
          className="h-10 px-4 text-left align-middle font-medium text-muted-foreground"
        >
          {children}
        </th>
      ),
    },
    td: {
      component: ({ children, ...props }: { children: React.ReactNode }) => (
        <td {...props} className="p-4 align-middle text-muted-foreground">
          {children}
        </td>
      ),
    },
  };

  // Merge default overrides with custom overrides
  const overrides = {
    ...defaultOverrides,
    ...customOverrides,
  };

  // Custom container variants with adjustable stagger delay
  const customContainerVariants = {
    ...containerVariants,
    visible: {
      ...containerVariants.visible,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: animationDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={customContainerVariants}
    >
      {lines.map((line, index) => (
        <motion.div key={index} variants={lineVariants}>
          <Markdown options={{ overrides }}>{line}</Markdown>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MarkdownRenderer;

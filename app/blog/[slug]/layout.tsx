import { cn } from "@/lib/utils";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={cn(
        "max-w-3xl mx-auto mt-24 prose dark:prose-invert px-4 md:px-0",
        "prose-headings:text-primary prose-headings:font-bold prose-headings:tracking-tight",
        "prose-blockquote:font-serif",
        "prose-a:underline prose-a:underline-offset-2 prose-a:decoration-dashed",
        "prose-em:font-serif prose-em:italic prose-em:font-semibold",
        "prose-pre:p-0 prose-pre:m-0 prose-pre:bg-transparent prose-pre:border-none prose-pre:rounded-none"
      )}
    >
      {children}
    </main>
  );
}

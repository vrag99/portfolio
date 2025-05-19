import { getPostMetadata } from "@/data/utils";
import { notFound } from "next/navigation";

// TODO: Use SSG here

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const metadata = getPostMetadata(slug);
    return {
      title: metadata.title,
      description: metadata.description,
    };
  } catch {
    return notFound();
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  let Post;
  try {
    const mod = await import(`@/data/blog/${slug}.mdx`);
    Post = mod.default;
  } catch {
    return notFound();
  }
  const metadata = getPostMetadata(slug as string);

  return (
    <>
      <h1>{metadata.title}</h1>
      <p className="not-prose text-muted-foreground font-serif italic">
        {metadata.description}
      </p>
      <Post />
    </>
  );
}

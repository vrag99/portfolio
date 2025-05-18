import { getBlogSlugs, getPostMetadata } from "@/data/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(`@/data/blog/${slug}.mdx`);
  const metadata = await getPostMetadata(slug);

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

export const generateStaticParams = () => {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({ slug: slug }));
};

export const dynamicParams = false;

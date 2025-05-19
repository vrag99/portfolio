import { getBlogsMetadata } from "@/data/utils";
import { Link } from "next-view-transitions";

const Blog = () => {
  const blogsMetadata = getBlogsMetadata();
  return (
    <div className="max-w-2xl mx-auto mt-24 px-4 md:px-0">
      <h1 className="text-2xl tracking-tight font-semibold font-mono text-primary">
        /blog
      </h1>
      <p className="text-muted-foreground mt-0.5">
        A collection of my writings, thoughts, and ideas.
      </p>
      <div className="space-y-4 mt-4">
        {blogsMetadata.map((blog) => {
          return (
            <Link
              href={blog.slug}
              key={blog.slug}
              className="py-2 flex justify-between items-center border-b"
            >
              <div className="flex flex-col">
                <h2 className="text-lg font-medium">{blog.data.title}</h2>
              </div>
              <p className="text-sm text-muted-foreground font-serif italic">
                {new Date(blog.data.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;

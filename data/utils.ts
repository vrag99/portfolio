import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const getBlogsMetadata = () => {
  const blogDir = path.join(process.cwd(), "data", "blog");
  const files = fs.readdirSync(blogDir);
  const metadata = files.map((file) => {
    const fileContent = fs.readFileSync(
      path.join(blogDir, `${file}`),
      "utf8"
    );
    const fileName = file.replace(".mdx", "");
    const { data } = matter(fileContent);
    return { slug: `/blog/${fileName}`, data };
  });
  return metadata.sort((a, b) => b.data.date.localeCompare(a.data.date));
};

export const getPostMetadata = (slug: string) => {
  const blogDir = path.join(process.cwd(), "data", "blog");
  const file = fs.readFileSync(path.join(blogDir, `${slug}.mdx`), "utf8");
  const { data } = matter(file);
  return data;
}

export const getBlogSlugs = () => {
  const blogDir = path.join(process.cwd(), "data", "blog");
  const files = fs.readdirSync(blogDir);
  return files.map((file) => file.replace(".mdx", ""));
};
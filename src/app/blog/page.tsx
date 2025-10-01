import PostPreview from "@/components/PostPreview";
import { client } from "@/sanity/lib/client";
import { Post } from "@/sanity/sanity.types";
import { Metadata } from "next";
import { defineQuery } from "next-sanity";

export const metadata: Metadata = {
  title: "Blog | KritOWo",
};

// GROQ query to fetch all posts
const POSTS_QUERY = defineQuery(`
*[_type == "post"]{
  title,
  slug,
  image,
  ellipsis,
  _createdAt
}`);

export type QueriedPost = Pick<
  Post,
  "title" | "slug" | "image" | "_createdAt" | "ellipsis"
>;

export default async function Blog() {
  const posts = await client.fetch<QueriedPost[]>(POSTS_QUERY);

  return (
    <div>
      <h2 className="w-full text-center sr-only">Blog</h2>
      {posts.length === 0 && <p>hier is noch nix :(</p>}
      <div className="flex flex-col gap-4 mt-8">
        {posts.map((post, index) => (
          <PostPreview key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

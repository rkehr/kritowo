import { urlFor } from "@/components/PostPreview"; // optional if you want image builder
import { client } from "@/sanity/lib/client";
import { Post } from "@/sanity/sanity.types";
import { Metadata } from "next";
import { defineQuery, PortableText } from "next-sanity";

interface PostPageProps {
  params: {
    slug: string;
  };
}

// GROQ query to fetch a single post by slug
const POST_QUERY = defineQuery(`
*[_type == "post" && slug.current == $slug][0]{
  title,
  slug,
  image,
  content,
  _createdAt,
  ellipsis
}`);

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await client.fetch<Post | null>(POST_QUERY, {
    slug: params.slug,
  });
  return {
    title: post?.title ?? "Blog Post",
    description: post?.ellipsis ?? "Read this blog post",
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;
  const post = await client.fetch<Post | null>(POST_QUERY, { slug });

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-heading">{post.title}</h1>

      {post.image && (
        <img
          src={urlFor(post.image).url()}
          alt={post.title ?? ""}
          width={800}
          height={450}
          className="rounded-md"
        />
      )}

      {post.content?.map((block, index) => (
        <PortableText
          key={index}
          value={block}
        />
      ))}

      <p className="text-sm text-muted">
        Published on: {new Date(post._createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

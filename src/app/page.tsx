import { client } from "@/sanity/lib/client";
import { defineQuery, PortableText } from "next-sanity";
import { Metadata } from "next";
import { Blurb } from "@/sanity/sanity.types";

interface HomePageProps {
  searchParams?: Promise<{ v?: keyof typeof focusLookup }>;
}

const BLURB_QUERY = defineQuery(`
*[_type == "blurb" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  blurb
}`);

type QueriedBlurb = Pick<Blurb, "_id" | "slug" | "title" | "blurb">;

export async function generateMetadata({
  searchParams,
}: HomePageProps): Promise<Metadata> {
  const slug = focusLookup[(await searchParams)?.v ?? "a"];
  const blurb = await client.fetch<QueriedBlurb | null>(BLURB_QUERY, { slug });
  return {
    title: blurb?.title ?? "Welcome",
    description:
      blurb?.blurb
        ?.map((b) => b.children?.map((c) => c.text).join(" ") ?? "")
        .join(" ") ?? "",
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const slug = focusLookup[(await searchParams)?.v ?? "a"];

  const blurb = await client.fetch<QueriedBlurb | null>(BLURB_QUERY, { slug });

  if (!blurb) {
    return <p>No blurb found for focus: {slug}</p>;
  }

  return (
    <div className="space-y-4 p-8">
      <h1 className="text-4xl font-heading">{blurb.title}</h1>
      <div className="prose">
        {blurb.blurb?.map((block, index) => (
          <PortableText
            key={index}
            value={block}
          />
        ))}
      </div>
    </div>
  );
}

const focusLookup = {
  a: "audioDev",
  w: "webDev",
  t: "eventTech",
  d: "default",
  o: "owlDev",
};

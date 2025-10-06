import { client } from "@/sanity/lib/client";
import { defineQuery, PortableText } from "next-sanity";
import { Metadata } from "next";
import { TextBlock } from "@/sanity/sanity.types";

export const metadata: Metadata = {
  title: "Impressum | KritOWo",
  description:
    "Die Kritischen Orientierungswochen 2025 and der Humboldt-Universität zu Berlin",
};

const TEXT_BLOCK_QUERY = defineQuery(`
*[_type == "textBlock" && slug.current == "imprint"][0]{
  _id,
  title,
  slug,
  content
}`);

type QueriedTextBlock = Pick<TextBlock, "slug" | "title" | "content">;

export default async function Home() {
  const textBlock = await client.fetch<QueriedTextBlock | null>(
    TEXT_BLOCK_QUERY,
  );

  if (!textBlock) {
    return <p>No textBlock </p>;
  }

  return (
    <div className="space-y-4 p-8">
      <h1 className="text-4xl font-heading">{textBlock.title}</h1>
      <div className="prose">
        {textBlock.content?.map((block, index) => (
          <PortableText key={index} value={block} />
        ))}
      </div>
    </div>
  );
}

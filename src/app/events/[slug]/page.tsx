import { urlFor } from "@/components/EventPreview";
import { client } from "@/sanity/lib/client";
import { Event } from "@/sanity/sanity.types";
import { Metadata } from "next";
import { defineQuery, PortableText } from "next-sanity";

interface EventPageProps {
  params: {
    slug: string;
  };
}

const EVENT_QUERY = defineQuery(`
*[_type == "event" && slug.current == $slug][0]{
  title,
  slug,
  image,
  content,
  _createdAt,
  ellipsis
}`);

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const event = await client.fetch<Event | null>(EVENT_QUERY, {
    slug: params.slug,
  });
  return {
    title: event?.title ?? "Event",
    description: event?.ellipsis ?? "Event details",
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = params;

  const event = await client.fetch<Event | null>(EVENT_QUERY, { slug });

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-heading">{event.title}</h1>
      {event.image && (
        <img
          src={urlFor(event.image).url()}
          alt={event.title ?? ""}
          width={800}
          height={450}
          className="rounded-md"
        />
      )}

      {event.content?.map((block, index) => (
        <PortableText key={index} value={block} />
      ))}
      <p className="text-sm text-muted">
        Created at: {new Date(event._createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

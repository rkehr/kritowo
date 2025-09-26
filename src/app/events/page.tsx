import EventPreview from "@/components/EventPreview";
import { client } from "@/sanity/lib/client";
import { Event } from "@/sanity/sanity.types";
import { Metadata } from "next";
import { defineQuery } from "next-sanity";

export const metadata: Metadata = {
  title: "Programm | KritOWo",
};

const EVENTS_QUERY = defineQuery(`
*[_type == "event"]{
  title,
  slug,
  image,
  ellipsis,
  _createdAt,
}`);

export type QueriedEvent = Pick<
  Event,
  "title" | "slug" | "image" | "_createdAt" | "ellipsis"
>;

export default async function Events() {
  const posts = await client.fetch<QueriedEvent[]>(EVENTS_QUERY);
  return (
    <div>
      <h2 className="w-full text-center">Programm</h2>
      <div className="flex flex-col gap-4 mt-8">
        {posts.length === 0 && <p>No events found.</p>}
        {posts.map((event, index) => (
          <EventPreview key={index} event={event} />
        ))}
      </div>
    </div>
  );
}

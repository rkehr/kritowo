import { urlFor } from "@/components/EventPreview";
import LocationPreview from "@/components/LocationPreview";
import { client } from "@/sanity/lib/client";
import { Event, Format, Language, Location } from "@/sanity/sanity.types";
import { format } from "date-fns";
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
  date,
  ellipsis,
  speaker,
  organisation,
  location->{...},
  language[]->{...},
  format[]->{...},
}`);
type JoinedEvent = Omit<Event, "location" | "format" | "language"> & {
  format: Format[];
  location: Location;
  language: Language[];
};

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const event = await client.fetch<JoinedEvent | null>(EVENT_QUERY, {
    slug: params.slug,
  });
  return {
    title: event?.title ?? "Event",
    description: event?.ellipsis ?? "Event details",
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;

  const event = await client.fetch<JoinedEvent | null>(EVENT_QUERY, { slug });

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className="space-y-4 flex flex-col gap-4">
      <h1 className="text-4xl font-heading">{event.title}</h1>
      <div className="flex justify-between items-baseline">
        <div className="text-3xl font-bold text-primary-foreground font-[coiny]">
          {event.date && format(event.date, "dd.MM.yyyy HH:mm")}
        </div>
        <div className="">
          {event.format?.map((format) => format.title).join(" | ")}
        </div>
      </div>

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
      <div className="flex justify-between items-baseline">
        <div>
          {[event.organisation, event.speaker].filter(Boolean).join(" | ")}
        </div>
        {event.language && (
          <div className="">
            Sprache{event.language.length > 1 ? "n" : ""}:{" "}
            {event.language?.map((language) => language.title).join(" | ")}
          </div>
        )}
      </div>
      {event.location && <LocationPreview location={event.location} showMap />}
    </div>
  );
}

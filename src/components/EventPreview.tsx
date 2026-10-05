import { QueriedEvent } from "@/app/events/page";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url";
import Link from "next/link";
import { de } from "date-fns/locale";
import { formatInTimeZone } from "date-fns-tz";

interface EventPreviewProps {
  event: QueriedEvent;
}

export default function EventPreview(props: EventPreviewProps) {
  const { event } = props;
  console.log(event);
  return (
    <Link href={`/events/${event.slug?.current}`} className="block w-full">
      <div>
        {event.image && (
          <img
            src={urlFor(event.image).width(1200).height(300).url()}
            alt={event.title ?? ""}
            className="w-full rounded-lg"
          />
        )}
        <div>
          <div className="mb-2 w-full">
            <span className="mr-4 text-2xl font-bold glow text-primary-foreground font-didact ">
              {event.date &&
                formatInTimeZone(event.date, "Europe/Berlin", "HH:mm", {
                  locale: de,
                })}
            </span>
            <h3 className="inline hyphens-auto">{event.title}</h3>
            <div className="clear-both" />
          </div>
          <span>{event.ellipsis}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>{event?.format?.map(({ title }) => title).join(" | ")} </span>
          <span>{event.organisation}</span>
        </div>
      </div>
    </Link>
  );
}

const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

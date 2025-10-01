import { QueriedEvent } from "@/app/events/page";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { format } from "date-fns";
import Link from "next/link";
import { de } from "date-fns/locale";
import { formatInTimeZone } from "date-fns-tz";

interface EventPreviewProps {
  event: QueriedEvent;
}

export default function EventPreview(props: EventPreviewProps) {
  const { event } = props;
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
            <span className="float-right mx-4 text-2xl font-bold text-primary-foreground font-[coiny] relative top-0.75">
              {event.date &&
                formatInTimeZone(event.date, "Europe/Berlin", "HH:mm", {
                  locale: de,
                })}
            </span>
            <h3 className="break-words inline hyphens-auto">{event.title}</h3>
            <div className="clear-both" />
          </div>
        </div>
        <div className="">
          <span>{event.ellipsis}</span>
        </div>
      </div>
    </Link>
  );
}

const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

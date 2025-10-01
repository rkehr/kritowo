import { QueriedEvent } from "@/app/events/page";
import { Card, CardContent, CardHeader } from "./ui/card";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { formatInTimeZone } from "date-fns-tz";
import Link from "next/link";

interface EventPreviewProps {
  event: QueriedEvent;
}

export default function EventPreview(props: EventPreviewProps) {
  const { event } = props;
  return (
    <Link href={`/events/${event.slug?.current}`} className="block">
      <Card>
        {event.image && (
          <img
            src={urlFor(event.image).width(1200).height(300).url()}
            alt={event.title ?? ""}
            className="w-full rounded-lg"
          />
        )}
        <CardHeader>
          <div className="flex justify-between items-baseline mb-2">
            <h3>{event.title}</h3>
            {formatInTimeZone(
              event._createdAt,
              "Europe/Berlin",
              "dd. MMMM yyyy",
            )}
          </div>
        </CardHeader>
        <CardContent>
          <span>{event.ellipsis}...</span>
        </CardContent>
      </Card>
    </Link>
  );
}

const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

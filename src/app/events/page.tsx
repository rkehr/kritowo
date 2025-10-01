import EventPreview from "@/components/EventPreview";
import { client } from "@/sanity/lib/client";
import { Event } from "@/sanity/sanity.types";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { de } from "date-fns/locale";
import { Metadata } from "next";
import { defineQuery } from "next-sanity";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Programm | KritOWo",
  description:
    "Die Kritischen Orientierungswochen 2025 and der Humboldt-Universität zu Berlin",
};

const EVENTS_QUERY = defineQuery(`
*[_type == "event"]{
  title,
  slug,
  image,
  ellipsis,
  date,
}|order(date asc)`);

export type QueriedEvent = Pick<
  Event,
  "title" | "slug" | "image" | "date" | "ellipsis" | "_createdAt"
>;

export default async function Events() {
  const posts = await client.fetch<QueriedEvent[]>(EVENTS_QUERY);
  let lastDate: string | null = null;
  return (
    <div className="w-full">
      <h2 className="text-sm sr-only hyphens-auto">Programm</h2>
      <div className="flex flex-col gap-8 w-full">
        {posts.length === 0 && <p>No events found.</p>}
        {posts.map((event, index) => {
          let shouldShowDate = false;
          const dateString = event.date
            ? formatInTimeZone(event.date, "Europe/Berlin", "dd.MM.", {
                locale: de,
              })
            : null;
          if (dateString === null || !event.date) {
            return <EventPreview key={index} event={event} />;
          }
          if (dateString !== lastDate) {
            shouldShowDate = true;
            lastDate = dateString;
          }
          return (
            <Fragment key={index}>
              {shouldShowDate && (
                <div>
                  <div
                    className={`text-3xl font-bold ${
                      index === 0 ? "mt-4" : "mt-12"
                    } text-primary-foreground font-[coiny]`}
                    key={index}
                  >
                    {dateString}
                  </div>
                  {"\n"}
                  <div className="text-lg font-bold text-primary-foreground font-[coiny]">
                    {formatInTimeZone(event.date, "Europe/Berlin", "EEEE", {
                      locale: de,
                    })}
                  </div>
                </div>
              )}
              <EventPreview event={event} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

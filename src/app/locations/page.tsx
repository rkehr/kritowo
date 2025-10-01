import LocationPreview from "@/components/LocationPreview";
import { client } from "@/sanity/lib/client";
import { Location } from "@/sanity/sanity.types";
import { Metadata } from "next";
import { defineQuery } from "next-sanity";

export const metadata: Metadata = {
  title: "Veranstaltungsorte | KritOWo",
};

const LOCATIONS_QUERY = defineQuery(`
*[_type == "location"]{
  title,
  slug,
  image,
  ellipsis,
  street,
  nr,
  postcode,
  city,
  coordinates,
  _createdAt,
}`);

export type QueriedLocation = Pick<
  Location,
  | "title"
  | "slug"
  | "image"
  | "street"
  | "postcode"
  | "nr"
  | "city"
  | "coordinates"
  | "_createdAt"
>;

export default async function Locations() {
  const posts = await client.fetch<QueriedLocation[]>(LOCATIONS_QUERY);
  return (
    <div>
      <h2 className="w-full text-center sr-only">Veranstaltungsorte</h2>
      <div className="flex flex-col gap-4 mt-8">
        {posts.length === 0 && <p>No locations found.</p>}
        {posts.map((location, index) => (
          <LocationPreview key={index} location={location} />
        ))}
      </div>
    </div>
  );
}

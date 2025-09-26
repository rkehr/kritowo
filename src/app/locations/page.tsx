import LocationPreview from "@/components/LocationPreview";
import { client } from "@/sanity/lib/client";
import { Location } from "@/sanity/sanity.types";
import { Metadata } from "next";
import { defineQuery } from "next-sanity";

export const metadata: Metadata = {
  title: "Locations | KritOWo",
};

const LOCATIONS_QUERY = defineQuery(`
*[_type == "location"]{
  title,
  slug,
  image,
  ellipsis,
  _createdAt,
}`);

export type QueriedLocation = Pick<
  Location,
  "title" | "slug" | "image" | "_createdAt"
>;

export default async function Locations() {
  const posts = await client.fetch<QueriedLocation[]>(LOCATIONS_QUERY);
  return (
    <div>
      <h2 className="w-full text-center">Locations</h2>
      <div className="flex flex-col gap-4 mt-8">
        {posts.length === 0 && <p>No locations found.</p>}
        {posts.map((location, index) => (
          <LocationPreview key={index} location={location} />
        ))}
      </div>
    </div>
  );
}

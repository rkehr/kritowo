import { urlFor } from "@/components/LocationPreview";
import MapWrapper from "@/components/MapWrapper";
import { client } from "@/sanity/lib/client";
import { Location } from "@/sanity/sanity.types";
import { Metadata } from "next";
import { defineQuery, PortableText } from "next-sanity";

interface LocationPageProps {
  params: {
    slug: string;
  };
}

const LOCATION_QUERY = defineQuery(`
*[_type == "location" && slug.current == $slug][0]{
  title,
  slug,
  image,
  content,
  coordinates,
  street,
  city,
  postcode,
  nr,
  _createdAt,
}`);

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const location = await client.fetch<Location | null>(LOCATION_QUERY, {
    slug: params.slug,
  });
  return {
    title: location?.title ?? "Veranstaltungsort",
    description: "Veranstaltungsortdetails",
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = params;

  const location = await client.fetch<Location | null>(LOCATION_QUERY, {
    slug,
  });

  if (!location) {
    return <p>Location not found.</p>;
  }
  const { image, title, content, coordinates } = location;

  return (
    <div className="space-y-4 content w-full">
      {image && (
        <img
          src={urlFor(image).url()}
          alt={title ?? ""}
          width={800}
          height={450}
          className="rounded-md"
        />
      )}
      <h1 className="text-4xl font-heading">{title}</h1>
      <div>
        {location.street} {location.nr}
      </div>
      <div>
        {location.postcode} {location.city}
      </div>
      {content?.map((block, index) => (
        <PortableText key={index} value={block} />
      ))}
      {coordinates && <MapWrapper position={coordinates} />}
    </div>
  );
}

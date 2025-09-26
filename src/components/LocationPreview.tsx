import { QueriedLocation } from "@/app/locations/page";
import { Card, CardContent, CardHeader } from "./ui/card";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { format } from "date-fns";
import Link from "next/link";

interface LocationPreviewProps {
  location: QueriedLocation;
}

export default function LocationPreview(props: LocationPreviewProps) {
  const { location } = props;
  return (
    <Link href={`/locations/${location.slug?.current}`} className="block">
      <Card>
        {location.image && (
          <img
            src={urlFor(location.image).width(1200).height(300).url()}
            alt={location.title ?? ""}
            className="w-full rounded-lg"
          />
        )}
        <CardHeader>
          <h3>{location.title}</h3>
        </CardHeader>
        <CardContent>
          <span>{location.ellipsis}...</span>
        </CardContent>
      </Card>
    </Link>
  );
}

const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

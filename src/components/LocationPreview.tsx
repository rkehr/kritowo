import { QueriedLocation } from "@/app/locations/page";
import { Card, CardContent, CardHeader } from "./ui/card";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { format } from "date-fns";
import Link from "next/link";
import MapWrapper from "./MapWrapper";

interface LocationPreviewProps {
  location: QueriedLocation;
  showMap?: boolean;
}

export default function LocationPreview(props: LocationPreviewProps) {
  const { location, showMap } = props;
  const { image, coordinates, nr, street, postcode, city, title, slug } =
    location;
  return (
    <Link href={`/locations/${slug?.current}`} className="block">
      <Card className="border-0">
        {image && (
          <img
            src={urlFor(image).width(1200).height(300).url()}
            alt={title ?? ""}
            className="w-full rounded-lg"
          />
        )}
        <div className="flex flex-row flex-wrap justify-between items-center p-6">
          <CardHeader className="p-0 glow">
            <h3>{title}</h3>
          </CardHeader>
          <CardContent className="p-0 text-muted-foreground">
            {street} {nr}
            <br />
            {postcode} {city}
          </CardContent>
        </div>
        {coordinates && showMap && (
          <MapWrapper position={coordinates} height={200} />
        )}
      </Card>
    </Link>
  );
}

const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

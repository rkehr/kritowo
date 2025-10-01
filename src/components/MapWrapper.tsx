"use client";

import { Geopoint } from "@/sanity/sanity.types";
import dynamic from "next/dynamic";

// Dynamically import Map only on the client
const Map = dynamic(() => import("./Map"), { ssr: false });

interface MapWrapperProps {
  position: Geopoint;
  height?: number;
}

export default function MapWrapper(props: MapWrapperProps) {
  const { position, height } = props;
  const { lat, lng } = position;
  if (!lat || !lng) {
    return null;
  }
  return <Map position={[lat, lng]} height={height} />;
}

"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import L, { DivIcon } from "leaflet";
import { createRoot } from "react-dom/client";

interface MapProps {
  position: [number, number];
  height?: number;
}

const svgMarker = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#345d61" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0z"></path>
  <circle cx="12" cy="10" r="3"></circle>
</svg>
`;

function createSVGIcon(): L.DivIcon {
  return new L.DivIcon({
    html: svgMarker,
    className: "", // remove default Leaflet styles
    iconSize: [32, 32],
    iconAnchor: [16, 32], // tip points to position
  });
}

export default function Map(props: MapProps) {
  const { position, height = 400 } = props;

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ minHeight: height + "px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://www.carto.com/">CARTO</a>'
        url="https://cartodb-basemaps-a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={position} icon={createSVGIcon()}></Marker>
    </MapContainer>
  );
}

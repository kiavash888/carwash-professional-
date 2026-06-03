"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { Wash } from "@/lib/demo-data";
import { useEffect } from "react";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

function FlyTo({ wash }: { wash: Wash }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([wash.lat, wash.lng], 14, { duration: 0.8 });
  }, [wash, map]);
  return null;
}

export default function IsfahanMap({
  washes,
  selectedWash,
  onSelect
}: {
  washes: Wash[];
  selectedWash: Wash;
  onSelect: (wash: Wash) => void;
}) {
  return (
    <MapContainer className="map" center={[32.6546, 51.668]} zoom={12} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyTo wash={selectedWash} />
      {washes.map((wash) => (
        <Marker key={wash.id} position={[wash.lat, wash.lng]} icon={icon} eventHandlers={{ click: () => onSelect(wash) }}>
          <Popup>
            <div className="popup-title">{wash.name}</div>
            <div>{wash.area}</div>
            <button style={{marginTop: 8}} onClick={() => onSelect(wash)}>انتخاب کارواش</button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

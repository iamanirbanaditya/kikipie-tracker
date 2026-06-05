"use client";

import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";

export default function RouteMap({
  points,
}: {
  points: [number, number][];
}) {

  if (points.length === 0) {
    return null;
  }

  return (
    <MapContainer
      center={points[0]}
      zoom={14}
      style={{
        height: "600px",
        width: "100%",
      }}
    >
      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline
        positions={points}
      />

      <Marker position={points[0]}>
        <Popup>
          Start Point
        </Popup>
      </Marker>

      <Marker
        position={
          points[
            points.length - 1
          ]
        }
      >
        <Popup>
          End Point
        </Popup>
      </Marker>

    </MapContainer>
  );
}
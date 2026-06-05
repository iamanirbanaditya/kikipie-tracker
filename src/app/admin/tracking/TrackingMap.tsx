"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

export default function TrackingMap() {
  const [position, setPosition] =
    useState<[number, number]>([
      22.6156,
      88.4120,
    ]);

  const loadLocation = async () => {
    try {
      const res = await axios.get(
        "/api/location/latest"
      );

      const loc =
        res.data.latestLocation;

      if (loc) {
        setPosition([
          loc.latitude,
          loc.longitude,
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadLocation();

    const interval = setInterval(
      loadLocation,
      10000
    );

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>
          Subrota Pal
        </Popup>
      </Marker>
    </MapContainer>
  );
}
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
  const [employees, setEmployees] =
    useState<any[]>([]);

  const loadLocations =
    async () => {
      try {
        const res =
          await axios.get(
            "/api/admin/live"
          );

        setEmployees(
          res.data.liveEmployees
        );
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    loadLocations();

    const interval =
      setInterval(
        loadLocations,
        10000
      );

    return () =>
      clearInterval(interval);
  }, []);

  const defaultCenter: [
    number,
    number
  ] = [
    22.6156,
    88.4120,
  ];

  const firstLocation =
    employees.find(
      (e) =>
        e.latestLocation
    );

  const center =
    firstLocation
      ? [
          firstLocation
            .latestLocation
            .latitude,
          firstLocation
            .latestLocation
            .longitude,
        ]
      : defaultCenter;

  return (
    <MapContainer
      center={
        center as [
          number,
          number
        ]
      }
      zoom={12}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {employees.map(
        (item) => {

          if (
            !item.latestLocation
          )
            return null;

          return (
            <Marker
              key={
                item.employee._id
              }
              position={[
                item
                  .latestLocation
                  .latitude,
                item
                  .latestLocation
                  .longitude,
              ]}
            >
              <Popup>

                <div>

                  <h3 className="font-bold">
                    {
                      item.employee
                        .name
                    }
                  </h3>

                  <p>
                    {
                      item.employee
                        .email
                    }
                  </p>

                  <p>
                    Updated:
                  </p>

                  <p>
                    {new Date(
                      item
                        .latestLocation
                        .createdAt
                    ).toLocaleString()}
                  </p>

                  <br />

                  <a
                    href={`https://www.google.com/maps?q=${item.latestLocation.latitude},${item.latestLocation.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open In Maps
                  </a>

                </div>

              </Popup>
            </Marker>
          );
        }
      )}
    </MapContainer>
  );
}
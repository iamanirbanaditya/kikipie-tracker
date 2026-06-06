"use client";

import { useEffect, useState } from "react";
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
  const [routePoints, setRoutePoints] =
    useState<[number, number][]>([]);

  useEffect(() => {
    const loadRoadRoute =
      async () => {

        if (
          points.length < 2
        ) {
          setRoutePoints(
            points
          );
          return;
        }

        try {

          const coordinates =
            points
              .slice(0, 100)
              .map(
                (p) =>
                  `${p[1]},${p[0]}`
              )
              .join(";");

          const response =
            await fetch(
              `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`
            );

          const data =
            await response.json();

          if (
            data.routes &&
            data.routes.length
          ) {

            const roadRoute =
              data.routes[0].geometry.coordinates.map(
                (
                  coord: number[]
                ) =>
                  [
                    coord[1],
                    coord[0],
                  ] as [
                    number,
                    number
                  ]
              );

            setRoutePoints(
              roadRoute
            );
          } else {
            setRoutePoints(
              points
            );
          }

        } catch (
          error
        ) {

          console.error(
            error
          );

          setRoutePoints(
            points
          );
        }
      };

    loadRoadRoute();
  }, [points]);

  if (
    routePoints.length === 0
  ) {
    return null;
  }

  return (
    <MapContainer
      center={
        routePoints[0]
      }
      zoom={15}
      style={{
        height: "650px",
        width: "100%",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline
        positions={
          routePoints
        }
        pathOptions={{
          color:
            "#C8102E",
          weight: 6,
        }}
      />

      <Marker
        position={
          routePoints[0]
        }
      >
        <Popup>
          Start Location
        </Popup>
      </Marker>

      <Marker
        position={
          routePoints[
            routePoints.length -
              1
          ]
        }
      >
        <Popup>
          End Location
        </Popup>
      </Marker>

    </MapContainer>
  );
}
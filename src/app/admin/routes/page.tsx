"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const RouteMap = dynamic(
  () => import("./RouteMap"),
  {
    ssr: false,
  }
);

export default function RoutesPage() {
  const [points, setPoints] = useState<
    [number, number][]
  >([]);

  const [stats, setStats] =
    useState({
      totalPoints: 0,
      startPoint: "",
      endPoint: "",
    });

  useEffect(() => {
    loadRoute();
  }, []);

  const loadRoute = async () => {
    try {
      const res = await axios.get(
        "/api/location/replay"
      );

      const logs = res.data.logs;

      const routePoints = logs.map(
        (log: any) => [
          log.latitude,
          log.longitude,
        ]
      );

      setPoints(routePoints);

      if (logs.length > 0) {
        setStats({
          totalPoints: logs.length,

          startPoint: `${logs[0].latitude.toFixed(
            4
          )}, ${logs[0].longitude.toFixed(
            4
          )}`,

          endPoint: `${logs[
            logs.length - 1
          ].latitude.toFixed(
            4
          )}, ${logs[
            logs.length - 1
          ].longitude.toFixed(4)}`,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-[#C8102E] mb-6">
        Route Replay
      </h1>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-black">
            GPS Points
          </h3>

          <p className="text-3xl font-bold text-[#C8102E]">
            {stats.totalPoints}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-black">
            Start Location
          </h3>

          <p className="font-semibold">
            {stats.startPoint}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-black">
            End Location
          </h3>

          <p className="font-semibold">
            {stats.endPoint}
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <RouteMap points={points} />
      </div>
    </div>
  );
}
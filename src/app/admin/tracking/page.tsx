"use client";

import dynamic from "next/dynamic";

const Map = dynamic(
  () => import("./TrackingMap"),
  {
    ssr: false,
  }
);

export default function TrackingPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Live Employee Tracking
      </h1>

      <div className="h-[600px]">
        <Map />
      </div>
    </div>
  );
}
"use client";

import dynamic from "next/dynamic";

const Map = dynamic(
  () =>
    import(
      "./TrackingMap"
    ),
  {
    ssr: false,
  }
);

export default function TrackingPage() {
  return (
    <div>

      <h1 className="text-4xl font-bold text-[#C8102E] mb-6">
        Live Employee Tracking
      </h1>

      <div className="bg-white rounded-xl shadow p-4">

        <div className="h-[700px]">
          <Map />
        </div>

      </div>

    </div>
  );
}
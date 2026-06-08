"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await axios.get(
        "/api/dashboard/stats"
      );

      setStats(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      <h1 className="text-4xl font-bold text-[#C8102E] mb-8">
        Dashboard
      </h1>

      {stats && (
        <>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#C8102E]">
              <h3 className="text-black mb-2">
                Total Employees
              </h3>

              <p className="text-4xl font-bold text-[#C8102E]">
                {stats.totalEmployees}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600">
              <h3 className="text-black mb-2">
                Attendance Records
              </h3>

              <p className="text-4xl font-bold text-green-600">
                {stats.totalAttendance}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
              <h3 className="text-black mb-2">
                GPS Records
              </h3>

              <p className="text-4xl font-bold text-blue-600">
                {stats.totalLocations}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-600">
              <h3 className="text-black mb-2">
                Total KM
              </h3>

              <p className="text-4xl font-bold text-purple-600">
                {stats.totalKm}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
              <h3 className="text-black mb-2">
                On Duty
              </h3>

              <p className="text-4xl font-bold text-green-500">
                {stats.activeEmployees}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
              <h3 className="text-black mb-2">
                System Status
              </h3>

              <p className="text-2xl font-bold text-green-600">
                Active
              </p>
            </div>

          </div>

          <div className="mt-10 bg-white rounded-xl shadow-md p-6">

            <h2 className="text-2xl font-semibold mb-4">
              Quick Overview
            </h2>

            <div className="space-y-3 text-black">

              <p>
                👥 Total Employees:{" "}
                <strong>
                  {stats.totalEmployees}
                </strong>
              </p>

              <p>
                📅 Attendance Records:{" "}
                <strong>
                  {stats.totalAttendance}
                </strong>
              </p>

              <p>
                📍 GPS Tracking Records:{" "}
                <strong>
                  {stats.totalLocations}
                </strong>
              </p>

              <p>
                🚗 Total KM Travelled:{" "}
                <strong>
                  {stats.totalKm}
                </strong>
              </p>

              <p>
                🟢 Employees On Duty:{" "}
                <strong>
                  {stats.activeEmployees}
                </strong>
              </p>

              <p>
                🚀 Tracking System Status:{" "}
                <strong className="text-green-600">
                  Running
                </strong>
              </p>

            </div>

          </div>

        </>
      )}

    </div>
  );
}
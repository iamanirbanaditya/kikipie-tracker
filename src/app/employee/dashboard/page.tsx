"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeeDashboard() {
  const [employee, setEmployee] =
    useState<any>(null);

  const [attendanceId, setAttendanceId] =
    useState("");

  const [tracking, setTracking] =
    useState(false);

  const [location, setLocation] =
    useState("");

  useEffect(() => {
    const user =
      localStorage.getItem(
        "employee"
      );

    if (user) {
      setEmployee(
        JSON.parse(user)
      );
    }

    const savedAttendance =
      localStorage.getItem(
        "attendanceId"
      );

    if (savedAttendance) {
      setAttendanceId(
        savedAttendance
      );

      setTracking(true);
    }
  }, []);

  const startDuty =
    async () => {

      if (!employee) return;

      const attendanceRes =
        await axios.post(
          "/api/attendance/start",
          {
            employeeId:
              employee._id,
          }
        );

      const id =
        attendanceRes.data
          .attendance._id;

      localStorage.setItem(
        "attendanceId",
        id
      );

      setAttendanceId(id);

      setTracking(true);

      navigator.geolocation.watchPosition(
        async (
          position
        ) => {

          setLocation(
            `${position.coords.latitude.toFixed(
              5
            )}, ${position.coords.longitude.toFixed(
              5
            )}`
          );

          await axios.post(
            "/api/location/update",
            {
              employeeId:
                employee._id,

              latitude:
                position.coords
                  .latitude,

              longitude:
                position.coords
                  .longitude,
            }
          );
        }
      );
    };

  const endDuty =
    async () => {

      if (!attendanceId)
        return;

      await axios.post(
        "/api/attendance/end",
        {
          attendanceId,
        }
      );

      localStorage.removeItem(
        "attendanceId"
      );

      setAttendanceId("");

      setTracking(false);

      alert(
        "Duty Completed"
      );
    };

  const logout = () => {
    localStorage.removeItem(
      "employee"
    );

    localStorage.removeItem(
      "attendanceId"
    );

    window.location.href =
      "/login";
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4">

      <div className="max-w-md mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h1 className="text-3xl font-bold text-[#C8102E] text-center mb-6">
            Kikipie Tracker
          </h1>

          {employee && (
            <div className="mb-6 text-center">

              <h2 className="text-2xl font-bold text-black">
                {
                  employee.name
                }
              </h2>

              <p className="text-black">
                {
                  employee.email
                }
              </p>

            </div>
          )}

          <div className="bg-slate-100 rounded-xl p-4 mb-6">

            <p className="text-black font-bold">
              Duty Status
            </p>

            <p
              className={`font-bold text-xl ${
                tracking
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {tracking
                ? "ON DUTY"
                : "OFF DUTY"}
            </p>

          </div>

          <div className="bg-slate-100 rounded-xl p-4 mb-6">

            <p className="text-black font-bold">
              Current Location
            </p>

            <p className="text-black break-all">
              {location ||
                "Waiting for GPS..."}
            </p>

          </div>

          <div className="space-y-4">

            <button
              onClick={
                startDuty
              }
              className="w-full bg-green-600 text-white py-4 rounded-xl text-lg font-bold"
            >
              Start Duty
            </button>

            <button
              onClick={
                endDuty
              }
              className="w-full bg-red-600 text-white py-4 rounded-xl text-lg font-bold"
            >
              End Duty
            </button>

            <button
              onClick={
                logout
              }
              className="w-full bg-black text-white py-4 rounded-xl text-lg font-bold"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
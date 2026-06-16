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

  const [employees, setEmployees] =
    useState<any[]>([]);

  const [employeeId, setEmployeeId] =
    useState("");

  const [selectedDate, setSelectedDate] =
    useState("");

  const [attendanceInfo, setAttendanceInfo] =
    useState<any>(null);

  const [points, setPoints] =
    useState<
      [number, number][]
    >([]);

  const [stats, setStats] =
    useState({
      totalPoints: 0,
      startPoint: "",
      endPoint: "",
    });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees =
    async () => {

      try {

        const res =
          await axios.get(
            "/api/employees"
          );

        setEmployees(
          res.data.employees
        );

      } catch (error) {

        console.error(
          error
        );
      }
    };

  const loadRoute =
    async () => {

      if (
        !employeeId
      ) {

        alert(
          "Select Employee"
        );

        return;
      }

      try {

        const res =
          await axios.get(
            `/api/location/replay?employeeId=${employeeId}&date=${selectedDate}`
          );

        const logs =
          res.data.logs;

        setAttendanceInfo(
          res.data.attendance
        );

        const routePoints =
          logs.map(
            (
              log: any
            ) => [
              log.latitude,
              log.longitude,
            ]
          );

        setPoints(
          routePoints
        );

        if (
          logs.length > 0
        ) {

          setStats({
            totalPoints:
              logs.length,

            startPoint:
              logs[0]
                .address ||
              `${logs[0].latitude}, ${logs[0].longitude}`,

            endPoint:
              logs[
                logs.length - 1
              ].address ||
              `${logs[
                logs.length - 1
              ].latitude}, ${logs[
                logs.length - 1
              ].longitude}`,
          });

        } else {

          setStats({
            totalPoints: 0,
            startPoint: "",
            endPoint: "",
          });
        }

      } catch (error) {

        console.error(
          error
        );
      }
    };

  return (
    <div>

      <h1 className="text-4xl font-bold text-[#C8102E] mb-6">
        Route History
      </h1>

      <div className="bg-white p-5 rounded-xl shadow mb-6">

        <div className="grid md:grid-cols-4 gap-4">

          <select
            value={
              employeeId
            }
            onChange={(e) =>
              setEmployeeId(
                e.target.value
              )
            }
            className="border p-3 rounded text-black"
          >

            <option value="">
              Select Employee
            </option>

            {employees.map(
              (
                employee
              ) => (
                <option
                  key={
                    employee._id
                  }
                  value={
                    employee._id
                  }
                >
                  {
                    employee.name
                  }
                </option>
              )
            )}

          </select>

          <input
            type="date"
            value={
              selectedDate
            }
            onChange={(e) =>
              setSelectedDate(
                e.target.value
              )
            }
            className="border p-3 rounded text-black"
          />

          <button
            onClick={
              loadRoute
            }
            className="bg-[#C8102E] text-white rounded p-3"
          >
            Load Route
          </button>

        </div>

      </div>

      {attendanceInfo && (

        <div className="grid md:grid-cols-4 gap-4 mb-6">

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-black">
              Check In
            </h3>

            <p className="font-bold text-[#C8102E]">
              {
                attendanceInfo.loginTime
                  ? new Date(
                      attendanceInfo.loginTime
                    ).toLocaleTimeString()
                  : "-"
              }
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-black">
              Check Out
            </h3>

            <p className="font-bold text-[#C8102E]">
              {
                attendanceInfo.logoutTime
                  ? new Date(
                      attendanceInfo.logoutTime
                    ).toLocaleTimeString()
                  : "-"
              }
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-black">
              Total KM
            </h3>

            <p className="font-bold text-[#C8102E]">
              {
                attendanceInfo.totalKm || 0
              } KM
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-black">
              Status
            </h3>

            <p className="font-bold text-[#C8102E]">
              {
                attendanceInfo.status || "-"
              }
            </p>
          </div>

        </div>

      )}

      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-5 rounded-xl shadow">

          <h3 className="text-black">
            GPS Points
          </h3>

          <p className="text-3xl font-bold text-[#C8102E]">
            {
              stats.totalPoints
            }
          </p>

        </div>

        <div className="bg-white p-5 rounded-xl shadow">

          <h3 className="text-black">
            Start Location
          </h3>

          <p className="text-black break-words">
            {
              stats.startPoint
            }
          </p>

        </div>

        <div className="bg-white p-5 rounded-xl shadow">

          <h3 className="text-black">
            End Location
          </h3>

          <p className="text-black break-words">
            {
              stats.endPoint
            }
          </p>

        </div>

      </div>

      <div className="bg-white p-4 rounded-xl shadow">

        <RouteMap
          points={points}
        />

      </div>

    </div>
  );
}
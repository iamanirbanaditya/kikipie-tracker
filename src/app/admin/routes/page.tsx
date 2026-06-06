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
        console.error(error);
      }
    };

  const loadRoute =
    async () => {

      try {

        const res =
          await axios.get(
            `/api/location/replay?employeeId=${employeeId}`
          );

        const logs =
          res.data.logs;

        const routePoints =
          logs.map(
            (log: any) => [
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
              `${logs[0].latitude.toFixed(
                5
              )}, ${logs[0].longitude.toFixed(
                5
              )}`,

            endPoint:
              `${logs[
                logs.length - 1
              ].latitude.toFixed(
                5
              )}, ${logs[
                logs.length - 1
              ].longitude.toFixed(
                5
              )}`,
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

        <div className="grid md:grid-cols-3 gap-4">

          <select
            value={
              employeeId
            }
            onChange={(
              e
            ) =>
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
            Start
          </h3>

          <p className="text-black">
            {
              stats.startPoint
            }
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-black">
            End
          </h3>

          <p className="text-black">
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
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AttendancePage() {
  const [attendance, setAttendance] =
    useState<any[]>([]);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance =
    async () => {
      const res =
        await axios.get(
          "/api/attendance"
        );

      setAttendance(
        res.data.attendance
      );
    };

  const approve =
    async (id: string) => {
      await axios.post(
        "/api/attendance/approve",
        {
          attendanceId: id,
        }
      );

      loadAttendance();
    };

  const reject =
    async (id: string) => {
      await axios.post(
        "/api/attendance/reject",
        {
          attendanceId: id,
        }
      );

      loadAttendance();
    };

  return (
    <div>

      <h1 className="text-4xl font-bold text-[#C8102E] mb-8">
        Attendance Management
      </h1>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#C8102E] text-white">

            <tr>

              <th className="p-4 text-left">
                Employee
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Check In
              </th>

              <th className="p-4 text-left">
                Check Out
              </th>

              <th className="p-4 text-left">
                KM
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {attendance.map((item) => (

              <tr
                key={item._id}
                className="border-b"
              >

                <td className="p-4">
                  {item.employeeId?.name}
                </td>

                <td className="p-4">
                  {item.date}
                </td>

                <td className="p-4">

                  {item.loginTime
                    ? new Date(
                        item.loginTime
                      ).toLocaleTimeString(
                        "en-IN",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : "-"}

                </td>

                <td className="p-4">

                  {item.logoutTime
                    ? new Date(
                        item.logoutTime
                      ).toLocaleTimeString(
                        "en-IN",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : "-"}

                </td>

                <td className="p-4 font-bold">
                  {item.totalKm || 0} KM
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      item.status ===
                      "Approved"
                        ? "bg-green-100 text-green-700"
                        : item.status ===
                          "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

                <td className="p-4 flex gap-2">

                  {item.status ===
                  "Pending" ? (
                    <>
                      <button
                        onClick={() =>
                          approve(
                            item._id
                          )
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          reject(
                            item._id
                          )
                        }
                        className="bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500">
                      Completed
                    </span>
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
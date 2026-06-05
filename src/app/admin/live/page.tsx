"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function LivePage() {
  const [employees, setEmployees] =
    useState<any[]>([]);

  const loadEmployees = async () => {
    const res =
      await axios.get(
        "/api/admin/live"
      );

    setEmployees(
      res.data.liveEmployees
    );
  };

  useEffect(() => {
    loadEmployees();

    const interval =
      setInterval(
        loadEmployees,
        10000
      );

    return () =>
      clearInterval(interval);
  }, []);

  const isOnline = (
    date: string
  ) => {
    const diff =
      Date.now() -
      new Date(date).getTime();

    return (
      diff <
      5 * 60 * 1000
    );
  };

  return (
    <div>

      <h1 className="text-4xl font-bold text-[#C8102E] mb-8">
        Live Employees
      </h1>

      <div className="grid lg:grid-cols-2 gap-6">

        {employees.map(
          (item) => {

            const location =
              item.latestLocation;

            return (
              <div
                key={
                  item.employee._id
                }
                className="bg-white rounded-xl shadow-lg p-6"
              >

                <div className="flex justify-between items-center mb-4">

                  <div>
                    <h2 className="text-2xl font-bold text-black">
                      {
                        item.employee.name
                      }
                    </h2>

                    <p className="text-black">
                      {
                        item.employee.email
                      }
                    </p>
                  </div>

                  {location &&
                  isOnline(
                    location.createdAt
                  ) ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                      Online
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold">
                      Offline
                    </span>
                  )}

                </div>

                {location ? (
                  <>

                    <p className="text-black mb-3">
                      Last Updated:
                      {" "}
                      {new Date(
                        location.createdAt
                      ).toLocaleString()}
                    </p>

                    <a
                      href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block bg-[#C8102E] text-white px-4 py-3 rounded-lg"
                    >
                      View on Google Maps
                    </a>

                  </>
                ) : (
                  <p className="text-black">
                    No Location Available
                  </p>
                )}

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function LivePage() {
  const [employees, setEmployees] =
    useState<any[]>([]);

  const loadEmployees = async () => {
    try {
      const res = await axios.get(
        "/api/admin/live"
      );

      setEmployees(
        res.data.liveEmployees
      );
    } catch (error) {
      console.error(error);
    }
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
                className="bg-white rounded-xl shadow-lg p-6 border"
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
                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                      ONLINE
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold">
                      OFFLINE
                    </span>
                  )}

                </div>

                {location ? (
                  <>

                    <div className="space-y-2 mb-4">

                      <p className="text-black">
                        <strong>
                          Address:
                        </strong>
                      </p>

                      <p className="text-black break-words">
                        {location.address ||
                          "Address not available"}
                      </p>

                      <p className="text-black">
                        <strong>
                          City:
                        </strong>{" "}
                        {location.city ||
                          "-"}
                      </p>

                      <p className="text-black">
                        <strong>
                          State:
                        </strong>{" "}
                        {location.state ||
                          "-"}
                      </p>

                      <p className="text-black">
                        <strong>
                          Updated:
                        </strong>{" "}
                        {new Date(
                          location.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>

                    <a
                      href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block bg-[#C8102E] text-white px-4 py-3 rounded-lg"
                    >
                      Open In Google Maps
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
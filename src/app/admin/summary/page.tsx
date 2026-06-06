"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function SummaryPage() {

  const [data, setData] =
    useState<any>(null);

  useEffect(() => {

    loadSummary();

  }, []);

  const loadSummary =
    async () => {

      try {

        const res =
          await axios.get(
            "/api/reports/summary"
          );

        setData(
          res.data
        );

      } catch (error) {

        console.error(
          error
        );
      }
    };

  return (
    <div>

      <h1 className="text-4xl font-bold text-[#C8102E] mb-8">
        Company Travel Summary
      </h1>

      {data && (

        <>

          <div className="grid md:grid-cols-2 gap-6 mb-8">

            <div className="bg-white rounded-xl shadow p-6">

              <h3 className="text-black font-bold">
                Total Employees
              </h3>

              <p className="text-4xl font-bold text-[#C8102E]">
                {
                  data.totalEmployees
                }
              </p>

            </div>

            <div className="bg-white rounded-xl shadow p-6">

              <h3 className="text-black font-bold">
                Total KM Travelled
              </h3>

              <p className="text-4xl font-bold text-green-600">
                {
                  data.companyKm
                }
              </p>

            </div>

          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

              <thead>

                <tr className="bg-[#C8102E] text-white">

                  <th className="p-4 text-left">
                    Employee
                  </th>

                  <th className="p-4 text-left">
                    KM
                  </th>

                  <th className="p-4 text-left">
                    GPS Points
                  </th>

                  <th className="p-4 text-left">
                    Last Location
                  </th>

                </tr>

              </thead>

              <tbody>

                {data.employees.map(
                  (
                    employee: any
                  ) => (

                    <tr
                      key={
                        employee.employeeId
                      }
                      className="border-b"
                    >

                      <td className="p-4">
                        {
                          employee.name
                        }
                      </td>

                      <td className="p-4 font-bold">
                        {
                          employee.totalKm
                        }
                      </td>

                      <td className="p-4">
                        {
                          employee.totalPoints
                        }
                      </td>

                      <td className="p-4">

                        {
                          employee
                            .lastLocation
                            ?.address ||
                          "No Location"
                        }

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </>

      )}

    </div>
  );
}
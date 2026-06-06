"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function TimelinePage() {

  const [employees, setEmployees] =
    useState<any[]>([]);

  const [employeeId, setEmployeeId] =
    useState("");

  const [timeline, setTimeline] =
    useState<any[]>([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees =
    async () => {

      const res =
        await axios.get(
          "/api/employees"
        );

      setEmployees(
        res.data.employees
      );
    };

  const loadTimeline =
    async () => {

      const res =
        await axios.post(
          "/api/reports/timeline",
          {
            employeeId,
          }
        );

      setTimeline(
        res.data.timeline
      );
    };

  return (
    <div>

      <h1 className="text-4xl font-bold text-[#C8102E] mb-8">
        Employee Timeline
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <div className="flex gap-4">

          <select
            value={employeeId}
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
              (emp) => (
                <option
                  key={
                    emp._id
                  }
                  value={
                    emp._id
                  }
                >
                  {emp.name}
                </option>
              )
            )}

          </select>

          <button
            onClick={
              loadTimeline
            }
            className="bg-[#C8102E] text-white px-5 py-3 rounded"
          >
            Load Timeline
          </button>

        </div>

      </div>

      <div className="space-y-4">

        {timeline.map(
          (
            item,
            index
          ) => (

            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow"
            >

              <p className="font-bold text-[#C8102E]">
                {item.time}
              </p>

              <p className="text-black">
                {item.address}
              </p>

              <p className="text-gray-600">
                {item.city}
                {" "}
                {item.state}
              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
}
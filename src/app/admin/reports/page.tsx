"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ReportsPage() {
  const [employees, setEmployees] =
    useState<any[]>([]);

  const [selectedEmployee, setSelectedEmployee] =
    useState("");

  const [report, setReport] =
    useState<any>(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees =
    async () => {
      const res =
        await axios.get(
          "/api/employees/list"
        );

      setEmployees(
        res.data.employees
      );
    };

  const generateReport =
    async () => {

      if (!selectedEmployee) {
        alert(
          "Select Employee"
        );
        return;
      }

      const res =
        await axios.post(
          "/api/reports/employee",
          {
            employeeId:
              selectedEmployee,
          }
        );

      setReport(
        res.data
      );
    };

  return (
    <div>

      <h1 className="text-4xl font-bold text-[#C8102E] mb-8">
        Reports
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Generate Employee Report
        </h2>

        <div className="flex gap-4">

          <select
            value={selectedEmployee}
            onChange={(e) =>
              setSelectedEmployee(
                e.target.value
              )
            }
            className="border p-3 rounded w-80 text-black"
          >

            <option value="">
              Select Employee
            </option>

            {employees.map(
              (employee) => (
                <option
                  key={
                    employee._id
                  }
                  value={
                    employee._id
                  }
                >
                  {employee.name}
                </option>
              )
            )}

          </select>

          <button
            onClick={
              generateReport
            }
            className="bg-[#C8102E] text-white px-6 py-3 rounded"
          >
            Generate
          </button>

        </div>

      </div>

      {report && (

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-black font-bold">
              Total KM
            </h3>

            <p className="text-4xl font-bold text-[#C8102E]">
              {report.totalKm?.toFixed(
                2
              )}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-black font-bold">
              GPS Points
            </h3>

            <p className="text-4xl font-bold text-[#C8102E]">
              {
                report.totalPoints
              }
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-black font-bold">
              Tracking Status
            </h3>

            <p className="text-2xl font-bold text-green-600">
              Active
            </p>
          </div>

        </div>

      )}

    </div>
  );
}
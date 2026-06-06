"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ReportsPage() {
  const [employees, setEmployees] =
    useState<any[]>([]);

  const [selectedEmployee, setSelectedEmployee] =
    useState("");

  const [filter, setFilter] =
    useState("today");

  const [report, setReport] =
    useState<any>(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees =
    async () => {
      try {

        const res =
          await axios.get(
            "/api/employees/list"
          );

        setEmployees(
          res.data.employees
        );

      } catch (error) {
        console.error(error);
      }
    };

  const generateReport =
    async () => {

      if (!selectedEmployee) {

        alert(
          "Select Employee"
        );

        return;
      }

      try {

        const res =
          await axios.post(
            "/api/reports/employee",
            {
              employeeId:
                selectedEmployee,

              filter,
            }
          );

        setReport(
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
        Reports
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Generate Employee Report
        </h2>

        <div className="flex flex-wrap gap-4">

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

          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value
              )
            }
            className="border p-3 rounded text-black"
          >
            <option value="today">
              Today
            </option>

            <option value="week">
              This Week
            </option>

            <option value="month">
              This Month
            </option>

            <option value="all">
              All Time
            </option>
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
            <h3 className="font-bold text-black">
              Total KM
            </h3>

            <p className="text-4xl font-bold text-[#C8102E]">
              {report.totalKm}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-black">
              GPS Points
            </h3>

            <p className="text-4xl font-bold text-[#C8102E]">
              {report.totalPoints}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-black">
              Total Halts
            </h3>

            <p className="text-4xl font-bold text-[#C8102E]">
              {report.totalHalts}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-black">
              Halt Minutes
            </h3>

            <p className="text-4xl font-bold text-orange-600">
              {report.totalHaltMinutes}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
            <h3 className="font-bold text-black mb-2">
              Last Known Location
            </h3>

            <p className="text-black break-words">
              {
                report.lastLocation?.address ||
                "No Address Available"
              }
            </p>
          </div>

        </div>

      )}

    </div>
  );
}
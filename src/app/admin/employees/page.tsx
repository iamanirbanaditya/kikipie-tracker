"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeesPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [employees, setEmployees] = useState<any[]>([]);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/api/employees");
      setEmployees(res.data.employees);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async () => {
    try {
      await axios.post("/api/employees", {
        name,
        email,
        department: "Operations",
        designation: "Field Executive",
        phone: "9999999999",
      });

      setMessage("✅ Employee Added Successfully");

      setName("");
      setEmail("");

      fetchEmployees();
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to Add Employee");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-[#C8102E] mb-8">
        Employees
      </h1>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#C8102E]">
          <h3 className="text-black font-bold">
            Total Employees
          </h3>

          <p className="text-4xl font-bold text-[#C8102E]">
            {employees.length}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">
          Add New Employee
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Employee Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="border border-gray-300 p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Employee Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="border border-gray-300 p-3 rounded-lg"
          />
        </div>

        <button
          onClick={addEmployee}
          className="mt-4 bg-[#C8102E] hover:bg-red-700 text-white px-6 py-3 rounded-lg"
        >
          Add Employee
        </button>

        {message && (
          <p className="mt-4 font-medium">
            {message}
          </p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">
          Employee Directory
        </h2>

        {employees.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            No Employees Found
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {employees.map((employee) => (
              <div
                key={employee._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">
                      {employee.name}
                    </h3>

                    <p className="text-black">
                      {employee.email}
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    {employee.status}
                  </span>
                </div>

                <div className="space-y-2 text-black">
                  <p>
                    <strong>Department:</strong>{" "}
                    {employee.department}
                  </p>

                  <p>
                    <strong>Designation:</strong>{" "}
                    {employee.designation}
                  </p>

                  <p>
                    <strong>Role:</strong>{" "}
                    {employee.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
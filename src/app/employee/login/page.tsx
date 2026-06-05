"use client";

import { useState } from "react";
import axios from "axios";

export default function EmployeeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(
        "/api/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "employee",
        JSON.stringify(res.data.user)
      );

      window.location.href =
        "/employee/dashboard";

    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">
        Employee Login
      </h1>

      <input
        className="border p-3 w-full mb-4"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        className="border p-3 w-full mb-4"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        onClick={login}
        className="bg-green-600 text-white px-5 py-3 rounded"
      >
        Login
      </button>
    </div>
  );
}
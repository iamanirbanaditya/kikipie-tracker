"use client";

import { useState } from "react";
import axios from "axios";

export default function MaintenancePage() {

  const [result, setResult] =
    useState<any>(null);

  const runCleanup =
    async () => {

      const res =
        await axios.get(
          "/api/maintenance/cleanup"
        );

      setResult(
        res.data
      );
    };

  return (
    <div>

      <h1 className="text-4xl font-bold text-[#C8102E] mb-8">
        Maintenance
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <button
          onClick={
            runCleanup
          }
          className="bg-red-600 text-white px-6 py-3 rounded"
        >
          Delete Logs Older Than 90 Days
        </button>

        {result && (
          <div className="mt-6">

            <p>
              Deleted:
              {" "}
              {
                result.deleted
              }
              {" "}
              Records
            </p>

          </div>
        )}

      </div>

    </div>
  );
}
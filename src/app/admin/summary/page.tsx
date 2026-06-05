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

      const res =
        await axios.get(
          "/api/reports/summary"
        );

      setData(
        res.data
      );
    };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Daily Summary
      </h1>

      {data && (

        <div className="space-y-4">

          <div className="border p-4 rounded">
            Total KM:
            {" "}
            {data.totalKm?.toFixed(
              2
            )}
          </div>

          <div className="border p-4 rounded">
            Total Halts:
            {" "}
            {data.totalHalts}
          </div>

        </div>

      )}

    </div>
  );
}
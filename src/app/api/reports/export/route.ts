import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import User from "@/models/User";
import LocationLog from "@/models/LocationLog";

import {
  calculateDistance,
} from "@/lib/calculateDistance";

export async function POST(
  req: NextRequest
) {
  try {

    await connectDB();

    const {
      filter,
      startDate,
      endDate,
    } = await req.json();

    const employees =
      await User.find({
        role: "employee",
      });

    const reportData = [];

    for (const employee of employees) {

      const query: any = {
        employeeId:
          employee._id,
      };

      if (
        filter === "custom" &&
        startDate &&
        endDate
      ) {

        query.createdAt = {
          $gte: new Date(
            startDate
          ),
          $lte: new Date(
            endDate
          ),
        };

      } else {

        const start =
          new Date();

        if (
          filter === "today"
        ) {

          start.setHours(
            0,
            0,
            0,
            0
          );

        } else if (
          filter === "week"
        ) {

          start.setDate(
            start.getDate() - 7
          );

        } else if (
          filter === "month"
        ) {

          start.setMonth(
            start.getMonth() - 1
          );
        }

        if (
          filter !== "all"
        ) {

          query.createdAt = {
            $gte: start,
          };
        }
      }

      const logs =
        await LocationLog.find(
          query
        ).sort({
          createdAt: 1,
        });

      let totalKm = 0;

      for (
        let i = 1;
        i < logs.length;
        i++
      ) {

        totalKm +=
          calculateDistance(
            logs[i - 1].latitude,
            logs[i - 1].longitude,
            logs[i].latitude,
            logs[i].longitude
          );
      }

      reportData.push({
        Employee:
          employee.name,
        Email:
          employee.email,
        GPSPoints:
          logs.length,
        TotalKM:
          Number(
            totalKm.toFixed(2)
          ),
      });
    }

    return NextResponse.json({
      success: true,
      reportData,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });
  }
}
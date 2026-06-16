import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import LocationLog from "@/models/LocationLog";
import Attendance from "@/models/Attendance";

import {
  calculateDistance,
} from "@/lib/calculateDistance";

import {
  detectHalts,
} from "@/lib/detectHalts";

export async function POST(
  req: NextRequest
) {
  try {

    await connectDB();

    const {
      employeeId,
      filter,
      startDate,
      endDate,
    } = await req.json();

    let attendanceQuery: any =
      {
        employeeId,
      };

    const today =
      new Date()
        .toLocaleDateString(
          "en-CA",
          {
            timeZone:
              "Asia/Kolkata",
          }
        );

    if (
      filter ===
        "custom" &&
      startDate &&
      endDate
    ) {

      attendanceQuery.date =
        {
          $gte:
            startDate,
          $lte:
            endDate,
        };

    } else if (
      filter ===
      "today"
    ) {

      attendanceQuery.date =
        today;

    } else if (
      filter ===
      "month"
    ) {

      const currentMonth =
        today.substring(
          0,
          7
        );

      attendanceQuery.date =
        {
          $regex:
            `^${currentMonth}`,
        };
    }

    const attendances =
      await Attendance.find(
        attendanceQuery
      );

    const attendanceIds =
      attendances.map(
        (a) => a._id
      );

    const logs =
      await LocationLog.find({
        attendanceId:
          {
            $in:
              attendanceIds,
          },
      }).sort({
        createdAt: 1,
      });

    let totalKm = 0;

    for (
      let i = 1;
      i < logs.length;
      i++
    ) {

      if (
        String(
          logs[i]
            .attendanceId
        ) !==
        String(
          logs[
            i - 1
          ]
            .attendanceId
        )
      ) {
        continue;
      }

      totalKm +=
        calculateDistance(
          logs[
            i - 1
          ].latitude,
          logs[
            i - 1
          ].longitude,
          logs[i]
            .latitude,
          logs[i]
            .longitude
        );
    }

    const halts =
      detectHalts(
        logs
      );

    const totalHaltMinutes =
      halts.reduce(
        (
          total,
          halt
        ) =>
          total +
          halt.duration,
        0
      );

    const lastLocation =
      logs.length > 0
        ? logs[
            logs.length -
              1
          ]
        : null;

    return NextResponse.json({
      success: true,

      totalKm:
        Number(
          totalKm.toFixed(
            2
          )
        ),

      totalPoints:
        logs.length,

      totalHalts:
        halts.length,

      totalHaltMinutes,

      lastLocation,

      halts,

      logs,

      totalSessions:
        attendances.length,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });
  }
}
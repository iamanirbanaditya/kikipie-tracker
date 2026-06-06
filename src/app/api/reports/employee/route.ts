import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import LocationLog from "@/models/LocationLog";

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
    } = await req.json();

    const logs =
      await LocationLog.find({
        employeeId,
      }).sort({
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

    const halts =
      detectHalts(logs);

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
            logs.length - 1
          ]
        : null;

    return NextResponse.json({
      success: true,

      totalKm:
        Number(
          totalKm.toFixed(2)
        ),

      totalPoints:
        logs.length,

      totalHalts:
        halts.length,

      totalHaltMinutes,

      lastLocation,

      halts,

      logs,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });
  }
}
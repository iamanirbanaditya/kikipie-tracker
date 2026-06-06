import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import LocationLog from "@/models/LocationLog";

import {
  calculateDistance,
} from "@/lib/calculateDistance";

import {
  detectHalts,
} from "@/lib/detectHalts";

export async function GET() {

  try {

    await connectDB();

    const logs =
      await LocationLog.find()
        .sort({
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

      halts,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });
  }
}
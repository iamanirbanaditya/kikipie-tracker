import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Attendance from "@/models/Attendance";
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
      attendanceId,
    } = await req.json();

    const logs =
      await LocationLog.find({
        attendanceId,
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

    const attendance =
      await Attendance.findByIdAndUpdate(
        attendanceId,
        {
          logoutTime:
            new Date(),

          totalKm:
            Number(
              totalKm.toFixed(
                2
              )
            ),
        },
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      attendance,
      totalKm:
        Number(
          totalKm.toFixed(
            2
          )
        ),
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });
  }
}
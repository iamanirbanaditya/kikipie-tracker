import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import User from "@/models/User";
import Attendance from "@/models/Attendance";
import LocationLog from "@/models/LocationLog";

export async function GET() {
  try {

    await connectDB();

    const totalEmployees =
      await User.countDocuments({
        role: "employee",
      });

    const totalAttendance =
      await Attendance.countDocuments();

    const totalLocations =
      await LocationLog.countDocuments();

    const attendances =
      await Attendance.find();

    let totalKm = 0;

    attendances.forEach(
      (attendance) => {
        totalKm +=
          attendance.totalKm || 0;
      }
    );

    const activeEmployees =
      await Attendance.countDocuments({
        logoutTime: {
          $exists: false,
        },
      });

    return NextResponse.json({
      success: true,

      totalEmployees,

      totalAttendance,

      totalLocations,

      totalKm: Number(
        totalKm.toFixed(2)
      ),

      activeEmployees,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });
  }
}
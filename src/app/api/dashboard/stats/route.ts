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

    return NextResponse.json({
      success: true,

      totalEmployees,

      totalAttendance,

      totalLocations,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });
  }
}
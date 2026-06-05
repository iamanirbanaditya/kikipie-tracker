import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Attendance from "@/models/Attendance";

export async function POST(
  req: NextRequest
) {
  try {
    await connectDB();

    const { attendanceId } =
      await req.json();

    const attendance =
      await Attendance.findByIdAndUpdate(
        attendanceId,
        {
          logoutTime: new Date(),
        },
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      attendance,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
    });
  }
}
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Attendance from "@/models/Attendance";

export async function POST(
  req: NextRequest
) {
  try {

    await connectDB();

    const {
      employeeId,
    } = await req.json();

    const today =
      new Date().toLocaleDateString(
        "en-CA",
        {
          timeZone:
            "Asia/Kolkata",
        }
      );

    const existingAttendance =
      await Attendance.findOne({
        employeeId,
        date: today,
      });

    if (
      existingAttendance
    ) {

      return NextResponse.json({
        success: true,
        attendance:
          existingAttendance,
        message:
          "Attendance already exists for today",
      });
    }

    const attendance =
      await Attendance.create({
        employeeId,
        date: today,
        loginTime:
          new Date(),
        status:
          "Pending",
      });

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
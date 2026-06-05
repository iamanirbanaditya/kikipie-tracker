import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Attendance from "@/models/Attendance";

export async function GET() {
  try {
    await connectDB();

    const attendance =
      await Attendance.find()
        .populate("employeeId")
        .sort({
          createdAt: -1,
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
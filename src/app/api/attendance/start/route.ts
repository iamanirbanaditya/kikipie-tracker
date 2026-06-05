import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Attendance from "@/models/Attendance";

export async function POST(
  req: NextRequest
) {
  try {
    await connectDB();

    const { employeeId } =
      await req.json();

    const attendance =
      await Attendance.create({
        employeeId,
        date:
          new Date()
            .toISOString()
            .split("T")[0],

        loginTime: new Date(),
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
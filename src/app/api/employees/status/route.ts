import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(
  req: NextRequest
) {
  try {

    await connectDB();

    const {
      employeeId,
      status,
    } = await req.json();

    const employee =
      await User.findByIdAndUpdate(
        employeeId,
        {
          status,
        },
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      employee,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });
  }
}
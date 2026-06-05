import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Duty from "@/models/Duty";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { employeeId } = await req.json();

    const duty = await Duty.create({
      employeeId,
      loginTime: new Date(),
      status: "active",
    });

    return NextResponse.json({
      success: true,
      duty,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
    });
  }
}
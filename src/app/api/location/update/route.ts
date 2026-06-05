import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import LocationLog from "@/models/LocationLog";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const {
      employeeId,
      latitude,
      longitude,
    } = await req.json();

    const location = await LocationLog.create({
      employeeId,
      latitude,
      longitude,
      timestamp: new Date(),
    });

    return NextResponse.json({
      success: true,
      location,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
    });
  }
}
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import LocationLog from "@/models/LocationLog";

export async function GET() {
  try {
    await connectDB();

    const latestLocation = await LocationLog
      .findOne()
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      latestLocation,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
    });
  }
}
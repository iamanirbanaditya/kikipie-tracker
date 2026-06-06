import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import LocationLog from "@/models/LocationLog";

export async function GET() {
  try {

    await connectDB();

    const cutoffDate =
      new Date();

    cutoffDate.setDate(
      cutoffDate.getDate() - 90
    );

    const result =
      await LocationLog.deleteMany({
        createdAt: {
          $lt: cutoffDate,
        },
      });

    return NextResponse.json({
      success: true,
      deleted:
        result.deletedCount,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });
  }
}
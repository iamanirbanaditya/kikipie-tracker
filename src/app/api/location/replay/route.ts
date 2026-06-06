import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import LocationLog from "@/models/LocationLog";

export async function GET(
  req: NextRequest
) {
  try {

    await connectDB();

    const searchParams =
      req.nextUrl.searchParams;

    const employeeId =
      searchParams.get(
        "employeeId"
      );

    let query: any = {};

    if (employeeId) {
      query.employeeId =
        employeeId;
    }

    const logs =
      await LocationLog.find(
        query
      ).sort({
        createdAt: 1,
      });

    return NextResponse.json({
      success: true,
      logs,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });
  }
}
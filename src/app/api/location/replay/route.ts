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

    const date =
      searchParams.get(
        "date"
      );

    const query: any = {};

    if (employeeId) {

      query.employeeId =
        employeeId;
    }

    if (date) {

      const startDate =
        new Date(date);

      startDate.setHours(
        0,
        0,
        0,
        0
      );

      const endDate =
        new Date(date);

      endDate.setHours(
        23,
        59,
        59,
        999
      );

      query.createdAt = {
        $gte: startDate,
        $lte: endDate,
      };
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
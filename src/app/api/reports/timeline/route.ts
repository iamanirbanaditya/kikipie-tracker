import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import LocationLog from "@/models/LocationLog";

export async function POST(
  req: NextRequest
) {
  try {

    await connectDB();

    const {
      employeeId,
    } = await req.json();

    const logs =
      await LocationLog.find({
        employeeId,
      }).sort({
        createdAt: 1,
      });

    const timeline =
      logs.map(
        (log: any) => ({
          time:
            new Date(
              log.createdAt
            ).toLocaleTimeString(),

          address:
            log.address ||
            "Unknown Location",

          city:
            log.city || "",

          state:
            log.state || "",
        })
      );

    return NextResponse.json({
      success: true,
      timeline,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });
  }
}
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
      latitude,
      longitude,
      accuracy,
    } = await req.json();

    if (
      accuracy &&
      accuracy > 50
    ) {
      return NextResponse.json({
        success: false,
        message:
          "Poor GPS Accuracy",
      });
    }

    const lastLog =
      await LocationLog.findOne({
        employeeId,
      }).sort({
        createdAt: -1,
      });

    if (lastLog) {

      const lastTime =
        new Date(
          lastLog.createdAt
        ).getTime();

      const currentTime =
        Date.now();

      const secondsPassed =
        (currentTime -
          lastTime) /
        1000;

      const latDiff =
        Math.abs(
          latitude -
            lastLog.latitude
        );

      const lngDiff =
        Math.abs(
          longitude -
            lastLog.longitude
        );

      const movedEnough =
        latDiff > 0.0003 ||
        lngDiff > 0.0003;

      if (
        !movedEnough &&
        secondsPassed < 15
      ) {
        return NextResponse.json({
          success: true,
          skipped: true,
          message:
            "Location Not Saved",
        });
      }
    }

    let address = "";
    let city = "";
    let state = "";

    try {

      const geoResponse =
        await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );

      const geoData =
        await geoResponse.json();

      address =
        geoData.display_name ||
        "";

      city =
        geoData.address?.city ||
        geoData.address?.town ||
        geoData.address?.village ||
        "";

      state =
        geoData.address?.state ||
        "";

    } catch (error) {

      console.error(
        "Geocoding Error:",
        error
      );
    }

    const location =
      await LocationLog.create({
        employeeId,
        latitude,
        longitude,
        accuracy,
        address,
        city,
        state,
        timestamp:
          new Date(),
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
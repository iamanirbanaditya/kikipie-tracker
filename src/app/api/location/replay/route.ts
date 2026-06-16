import {
  NextRequest,
  NextResponse,
} from "next/server";

import connectDB from "@/lib/mongodb";
import LocationLog from "@/models/LocationLog";
import Attendance from "@/models/Attendance";

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

    if (!employeeId) {

      return NextResponse.json({
        success: false,
        message:
          "Employee Required",
      });
    }

    let attendanceQuery: any =
      {
        employeeId,
      };

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

      attendanceQuery.createdAt =
        {
          $gte:
            startDate,
          $lte:
            endDate,
        };
    }

    const attendance =
      await Attendance.findOne(
        attendanceQuery
      ).sort({
        createdAt: -1,
      });

    if (!attendance) {

      return NextResponse.json({
        success: true,
        logs: [],
        attendance: null,
      });
    }

    const logs =
      await LocationLog.find({
        attendanceId:
          attendance._id,
      }).sort({
        createdAt: 1,
      });

    return NextResponse.json({
      success: true,
      logs,
      attendance: {
        loginTime:
          attendance.loginTime,
        logoutTime:
          attendance.logoutTime,
        totalKm:
          attendance.totalKm,
        status:
          attendance.status,
      },
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });
  }
}
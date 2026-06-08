import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import User from "@/models/User";
import Attendance from "@/models/Attendance";
import LocationLog from "@/models/LocationLog";

export async function GET() {
  try {
    await connectDB();

    const employees =
      await User.find({
        role: "employee",
      });

    const liveEmployees =
      await Promise.all(
        employees.map(
          async (
            employee
          ) => {

            const attendance =
              await Attendance.findOne({
                employeeId:
                  employee._id,
              })
                .sort({
                  createdAt: -1,
                });

            let latestLocation =
              null;

            if (
              attendance &&
              !attendance.logoutTime
            ) {

              latestLocation =
                await LocationLog.findOne({
                  attendanceId:
                    attendance._id,
                }).sort({
                  createdAt: -1,
                });
            }

            return {
              employee,
              attendance,
              latestLocation,
            };
          }
        )
      );

    return NextResponse.json({
      success: true,
      liveEmployees,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });
  }
}
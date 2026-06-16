import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import User from "@/models/User";
import Attendance from "@/models/Attendance";
import LocationLog from "@/models/LocationLog";

import {
  calculateDistance,
} from "@/lib/calculateDistance";

export async function GET() {

  try {

    await connectDB();

    const employees =
      await User.find({
        role: "employee",
      });

    const summary =
      await Promise.all(

        employees.map(
          async (
            employee
          ) => {

            const logs =
              await LocationLog.find({
                employeeId:
                  employee._id,
              }).sort({
                createdAt: 1,
              });

            const attendance =
              await Attendance.find({
                employeeId:
                  employee._id,
              });

            let totalKm = 0;

            for (
              let i = 1;
              i < logs.length;
              i++
            ) {

              totalKm +=
                calculateDistance(
                  logs[i - 1].latitude,
                  logs[i - 1].longitude,
                  logs[i].latitude,
                  logs[i].longitude
                );
            }

            const presentDays =
              attendance.length;

            const approvedDays =
              attendance.filter(
                (a) =>
                  a.status ===
                  "Approved"
              ).length;

            const rejectedDays =
              attendance.filter(
                (a) =>
                  a.status ===
                  "Rejected"
              ).length;

            const attendancePercent =
              presentDays > 0
                ? (
                    (approvedDays /
                      presentDays) *
                    100
                  ).toFixed(0)
                : "0";

            return {

              employeeId:
                employee._id,

              name:
                employee.name,

              email:
                employee.email,

              totalKm:
                Number(
                  totalKm.toFixed(
                    2
                  )
                ),

              totalPoints:
                logs.length,

              presentDays,

              approvedDays,

              rejectedDays,

              attendancePercent,

              lastLocation:
                logs.length
                  ? logs[
                      logs.length -
                        1
                    ]
                  : null,
            };
          }
        )
      );

    const companyKm =
      summary.reduce(
        (
          total,
          emp
        ) =>
          total +
          emp.totalKm,
        0
      );

    return NextResponse.json({
      success: true,

      companyKm:
        Number(
          companyKm.toFixed(
            2
          )
        ),

      totalEmployees:
        employees.length,

      employees:
        summary,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });
  }
}
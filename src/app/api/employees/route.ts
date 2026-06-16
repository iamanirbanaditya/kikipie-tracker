import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Attendance from "@/models/Attendance";
import bcrypt from "bcryptjs";

export async function GET() {

  try {

    await connectDB();

    const employees =
      await User.find({
        role: "employee",
      });

    const employeesWithStats =
      await Promise.all(

        employees.map(
          async (
            employee
          ) => {

            const attendance =
              await Attendance.find({
                employeeId:
                  employee._id,
              });

            const presentDays =
              attendance.length;

            const approvedDays =
              attendance.filter(
                (item) =>
                  item.status ===
                  "Approved"
              ).length;

            const rejectedDays =
              attendance.filter(
                (item) =>
                  item.status ===
                  "Rejected"
              ).length;

            const totalKm =
              attendance.reduce(
                (
                  total,
                  item
                ) =>
                  total +
                  (item.totalKm ||
                    0),
                0
              );

            const lastAttendance =
              attendance.sort(
                (
                  a: any,
                  b: any
                ) =>
                  new Date(
                    b.createdAt
                  ).getTime() -
                  new Date(
                    a.createdAt
                  ).getTime()
              )[0];

            return {

              ...employee.toObject(),

              presentDays,

              approvedDays,

              rejectedDays,

              totalKm:
                Number(
                  totalKm.toFixed(
                    2
                  )
                ),

              lastActive:
                lastAttendance
                  ?.date ||
                "-",
            };
          }
        )
      );

    return NextResponse.json({
      success: true,
      employees:
        employeesWithStats,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });
  }
}

export async function POST(
  req: NextRequest
) {

  try {

    await connectDB();

    const body =
      await req.json();

    const hashedPassword =
      await bcrypt.hash(
        "123456",
        10
      );

    const employee =
      await User.create({
        ...body,
        role: "employee",
        password:
          hashedPassword,
        status:
          "active",
      });

    return NextResponse.json({
      success: true,
      employee,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });
  }
}
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import LocationLog from "@/models/LocationLog";

export async function GET() {
  try {
    await connectDB();

    const employees = await User.find({
      role: "employee",
    });

    const liveEmployees = await Promise.all(
      employees.map(async (employee) => {
        const latestLocation =
          await LocationLog.findOne({
            employeeId: employee._id,
          }).sort({
            createdAt: -1,
          });

        return {
          employee,
          latestLocation,
        };
      })
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
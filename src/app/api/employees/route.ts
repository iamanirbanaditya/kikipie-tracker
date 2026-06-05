import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectDB();

    const employees = await User.find({
      role: "employee",
    });

    return NextResponse.json({
      success: true,
      employees,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

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
        status: "active",
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
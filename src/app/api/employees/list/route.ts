import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {

  try {

    await connectDB();

    const employees =
      await User.find({
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
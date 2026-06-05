import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectDB();

    const existingAdmin =
      await User.findOne({
        email:
          "admin@kikipie.com",
      });

    if (existingAdmin) {
      return NextResponse.json({
        success: true,
        message:
          "Admin already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        "admin123",
        10
      );

    const admin =
      await User.create({
        name:
          "Kikipie Admin",

        email:
          "admin@kikipie.com",

        phone:
          "9999999999",

        department:
          "Management",

        designation:
          "Administrator",

        role:
          "admin",

        password:
          hashedPassword,

        status:
          "active",
      });

    return NextResponse.json({
      success: true,
      message:
        "Admin Created",
      admin,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
    });
  }
}
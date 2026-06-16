import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(
  req: NextRequest
) {
  try {

    await connectDB();

    const {
      email,
      password,
    } = await req.json();

    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return NextResponse.json(
        {
          success: false,
          message:
            "User not found",
        },
        {
          status: 404,
        }
      );
    }

    if (
      user.status ===
      "inactive"
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Account is deactivated. Contact administrator.",
        },
        {
          status: 403,
        }
      );
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (
      !validPassword
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid password",
        },
        {
          status: 401,
        }
      );
    }

    const response =
      NextResponse.json({
        success: true,
        message:
          "Login Successful",
        user,
      });

    response.cookies.set(
      "admin",
      user._id.toString(),
      {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge:
          60 *
          60 *
          24,
      }
    );

    return response;

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          "Server Error",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(
  request: NextRequest
) {
  const admin =
    request.cookies.get("admin");

  if (
    request.nextUrl.pathname.startsWith(
      "/admin"
    )
  ) {
    if (!admin) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
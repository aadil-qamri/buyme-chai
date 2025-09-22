import { NextResponse } from "next/server";

export function middleware(req) {
  const maintenanceMode = true; // flip to false when done

  const { pathname, searchParams } = req.nextUrl;

  // Allow bypass with secret query param
  if (searchParams.get("?bypass=true") === "true") {
    return NextResponse.next();
  }

  // Skip API routes and static files (images, fonts, etc.)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(.*)$/) // skip all file extensions (.png, .jpg, .css, etc.)
  ) {
    return NextResponse.next();
  }

  if (maintenanceMode && pathname !== "/maintenance") {
    return NextResponse.rewrite(new URL("/maintenance", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!maintenance).*)"], // apply everywhere except /maintenance
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/admin-dashboard",
  "/donor-dashboard",
  "/needy-dashboard",
];

const authRoutes = [
  "/login",
  "/register",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL("/login", request.url);

    return NextResponse.redirect(loginUrl);
  }

  
  if (isAuthRoute && accessToken) {
    const dashboardUrl = new URL("/needy-dashboard", request.url);

    return NextResponse.redirect(dashboardUrl);
  }

  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login/:path*",
    "/register/:path*",
    "/admin-dashboard/:path*",
    "/donor-dashboard/:path*",
    "/needy-dashboard/:path*",
  ],
};
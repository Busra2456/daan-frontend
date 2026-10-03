import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
	"/admin-dashboard",
	"/donor-dashboard",
	"/needy-dashboard",
];

const authRoutes = ["/login", "/register"];

const roleDashboardMap = {
	ADMIN: "/admin-dashboard",
	DONOR: "/donor-dashboard",
	NEEDY: "/needy-dashboard",
} as const;

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
		return NextResponse.redirect(
			new URL("/login", request.url),
		);
	}

	if (!accessToken) {
		return NextResponse.next();
	}

	let payload: {
		userId?: string;
		name?: string;
		email?: string;
		role?: keyof typeof roleDashboardMap;
	};

	try {
		const [, encodedPayload] = accessToken.split(".");

		if (!encodedPayload) {
			throw new Error("Invalid JWT");
		}

		const decodedPayload = Buffer.from(
			encodedPayload,
			"base64url",
		).toString("utf-8");

		payload = JSON.parse(decodedPayload);
	} catch {
		const response = NextResponse.redirect(
			new URL("/login", request.url),
		);

		response.cookies.delete("accessToken");
		response.cookies.delete("refreshToken");

		return response;
	}

	const userRole = payload.role;

	if (!userRole || !roleDashboardMap[userRole]) {
		const response = NextResponse.redirect(
			new URL("/login", request.url),
		);

		response.cookies.delete("accessToken");
		response.cookies.delete("refreshToken");

		return response;
	}

	const correctDashboard = roleDashboardMap[userRole];

	if (isAuthRoute) {
		return NextResponse.redirect(
			new URL(correctDashboard, request.url),
		);
	}

	
	if (
		isProtectedRoute &&
		pathname !== correctDashboard &&
		!pathname.startsWith(`${correctDashboard}/`)
	) {
		return NextResponse.redirect(
			new URL(correctDashboard, request.url),
		);
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
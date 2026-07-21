import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;
const secretKey = JWT_SECRET ? new TextEncoder().encode(JWT_SECRET) : null;

const publicPaths = [
  "/login",
  "/signup",
  "/signup/sender",
  "/signup/driver",
  "/api/auth/login",
  "/api/auth/signup",
  "/api/auth/logout",
  "/api/contact",
  "/_next/static",
  "/_next/image",
  "/favicon.ico",
  "/images",
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (publicPaths.some((p) => pathname.startsWith(p)) || pathname === "/") {
    return NextResponse.next();
  }

  if (!secretKey) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(token, secretKey);
    const role = payload.role;

    if (pathname.startsWith("/sender/") && role !== "sender") {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/driver/dashboard", request.url));
    }

    if (pathname.startsWith("/driver/") && role !== "driver") {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/sender/dashboard", request.url));
    }

    if (pathname.startsWith("/api/sender/") && role !== "sender") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (pathname.startsWith("/api/driver/") && role !== "driver") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.next();
  } catch {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

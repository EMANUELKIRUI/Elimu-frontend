import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const AUTH_WHITELIST = [
  "/login",
  "/auth",
  "/verify-email",
  "/verify-phone",
  "/register-school",
  "/admin/login",
  "/_next",
  "/favicon.ico"
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_FILE.test(pathname) || AUTH_WHITELIST.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return NextResponse.next();
  }

  const token = request.cookies.get("elimu_token")?.value;

  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = pathname.startsWith("/admin") ? "/admin/login" : "/login";
    return NextResponse.redirect(loginUrl);
  }

  if ((pathname === "/login" || pathname === "/auth/login") && token) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/";
    return NextResponse.redirect(homeUrl);
  }

  if (pathname === "/admin/login" && token) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/admin/dashboard";
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};

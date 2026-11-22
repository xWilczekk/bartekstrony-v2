import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionValue } from "@/lib/control-auth";

export function proxy(request: NextRequest) {
  const authed = verifySessionValue(request.cookies.get(SESSION_COOKIE)?.value);
  const isLogin = request.nextUrl.pathname === "/control";

  const res = !authed && !isLogin ? NextResponse.redirect(new URL("/control", request.url)) : NextResponse.next();

  res.headers.set("Cache-Control", "private, no-store, max-age=0");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Content-Security-Policy", "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'");
  res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  res.headers.set("Referrer-Policy", "no-referrer");
  return res;
}

export const config = { matcher: ["/control", "/control/:path*"] };

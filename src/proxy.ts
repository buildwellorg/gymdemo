import { NextRequest, NextResponse } from "next/server";

// Fast UX-level gate: only checks that a session cookie is present.
// The real verification (signature + expiry, via Firebase Admin) happens
// server-side in src/app/admin/(protected)/layout.tsx, which runs on the
// Node.js runtime that firebase-admin requires. This proxy only runs on
// the Edge runtime, which can't use firebase-admin.
export function proxy(request: NextRequest) {
  const hasSession = request.cookies.has("session");
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    if (hasSession) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!hasSession) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

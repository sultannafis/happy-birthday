import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const visitorSession = request.cookies.get("session")?.value;
  const adminSession = request.cookies.get("admin_session")?.value;
  
  const pathname = request.nextUrl.pathname;

  // Handle rute admin
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }
    
    if (!adminSession) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    
    const parsedAdminSession = await decrypt(adminSession);
    if (!parsedAdminSession || parsedAdminSession.role !== 'admin') {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    
    return NextResponse.next();
  }

  // Handle rute API Admin
  if (pathname.startsWith("/api/admin")) {
    if (pathname === "/api/admin/auth") {
      return NextResponse.next();
    }
    
    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized, missing token" }, { status: 401 });
    }
    
    const parsedAdminSession = await decrypt(adminSession);
    if (!parsedAdminSession || parsedAdminSession.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized, invalid token" }, { status: 401 });
    }
    
    return NextResponse.next();
  }

  // Rute publik yang tidak perlu dipassword
  if (pathname === "/") {
    return NextResponse.next();
  }

  const publicPaths = ["/password", "/api/auth", "/api/admin/auth"];
  
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Jika tidak ada session / token invalid, redirect ke /password untuk pengunjung
  console.log("Middleware checking path:", pathname, "Session:", !!visitorSession);
  if (!visitorSession) {
    console.log("No visitor session, redirecting to /password");
    return NextResponse.redirect(new URL("/password", request.url));
  }

  const parsedSession = await decrypt(visitorSession);
  if (!parsedSession) {
    return NextResponse.redirect(new URL("/password", request.url));
  }

  // Lolos pengecekan
  return NextResponse.next();
}

export const config = {
  // Hanya jalankan middleware di path tertentu (abaikan file statis, public, _next)
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/|.*\\..*).*)"],
};

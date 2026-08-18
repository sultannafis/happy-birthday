import { NextRequest, NextResponse } from "next/server";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.SITE_PASSWORD;

    if (password === correctPassword) {
      // Create session payload
      const sessionData = { authenticated: true, timestamp: Date.now() };
      const encryptedSessionData = await encrypt(sessionData);

      // Set cookie
      const cookieStore = await cookies();
      cookieStore.set("session", encryptedSessionData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, message: "passwordnyaa salahhh sayangggg, cobaa inget-inget lagiiii hihihi 🤭" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal" },
      { status: 500 }
    );
  }
}

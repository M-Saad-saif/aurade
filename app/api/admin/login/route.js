import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  cookieOptions,
  createToken,
  safeEqual,
} from "@/lib/adminAuth";

export async function POST(request) {
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not configured." },
      { status: 500 },
    );
  }

  const { password } = await request.json().catch(() => ({}));

  if (typeof password !== "string" || !safeEqual(password, expected)) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set(ADMIN_COOKIE, createToken(), cookieOptions);
  return response;
}

// Logout
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  return response;
}

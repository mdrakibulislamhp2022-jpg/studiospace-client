import { NextResponse } from "next/server";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { auth } from "@/lib/auth";

const ONE_WEEK = 60 * 60 * 24 * 7;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

// Issue a JWT (HTTPOnly cookie) for the signed-in BetterAuth user
export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = jwt.sign(
    { email: session.user.email, name: session.user.name || "" },
    process.env.JWT_SECRET,
    { expiresIn: ONE_WEEK }
  );

  const response = NextResponse.json({ ok: true });
  response.cookies.set("token", token, { ...cookieOptions, maxAge: ONE_WEEK });
  return response;
}

// Remove the JWT cookie (used on logout)
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("token", "", { ...cookieOptions, maxAge: 0 });
  return response;
}
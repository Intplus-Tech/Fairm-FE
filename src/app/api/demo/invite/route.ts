import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const { fullName, email, phone, role } = await req.json();

  if (!fullName || !email || !phone || !role) {
    return NextResponse.json(
      { message: "Missing fields" },
      { status: 400 }
    );
  }

  const token = crypto.randomUUID();

  const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/accept-invite?token=${token}&email=${email}&name=${encodeURIComponent(
    fullName
  )}`;

  console.log("📧 INVITE EMAIL (DEMO)");
  console.log("To:", email);
  console.log("Link:", inviteLink);

  return NextResponse.json({
    success: true,
    inviteLink,
  });
}

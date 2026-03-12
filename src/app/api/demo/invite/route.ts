import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, phone, role } = await req.json();

    if (!fullName || !email || !phone || !role) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const token = randomUUID();

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      req.headers.get("origin") ||
      "http://localhost:3000";

    const inviteLink = `${baseUrl}/auth/accept-invite?token=${token}&email=${encodeURIComponent(
      email
    )}&role=${encodeURIComponent(role)}&name=${encodeURIComponent(fullName)}`;

    // DEMO MODE — no email sending
    console.log("Invite link:", inviteLink);

    return NextResponse.json({
      success: true,
      message: "Invite generated successfully",
      inviteLink,
      token,
      email,
      role,
    });
  } catch (error) {
    console.error("Invite API error:", error);

    return NextResponse.json(
      { success: false, message: "Invite failed", error: String(error) },
      { status: 500 }
    );
  }
}
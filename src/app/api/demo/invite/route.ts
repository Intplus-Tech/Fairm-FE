import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
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
      process.env.NEXT_PUBLIC_APP_URL ??
      req.headers.get("origin") ??
      "http://localhost:3000";

    const inviteLink = `${baseUrl}/auth/accept-invite?token=${token}&email=${encodeURIComponent(
      email
    )}&role=${encodeURIComponent(role)}&name=${encodeURIComponent(fullName)}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.DEMO_EMAIL_USER,
        pass: process.env.DEMO_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"FAIRM" <${process.env.DEMO_EMAIL_USER}>`,
      to: email,
      subject: "FAIRM Invitation",
      html: `
        <p>Hello ${fullName},</p>
        <p>You have been invited to join FAIRM.</p>

        <p>Click the link below to create your account:</p>

        <a href="${inviteLink}" target="_blank">${inviteLink}</a>
      `,
    });

    console.log("Invite link:", inviteLink);

    return NextResponse.json({
      success: true,
      inviteLink,
      token,
      email,
      role,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Invite failed" },
      { status: 500 }
    );
  }
}
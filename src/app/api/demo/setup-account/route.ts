import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token, email, role, password } = await req.json();

    if (!token || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Account created:", { email, role });

    return NextResponse.json({
      success: true,
      message: "Account setup successful",
      user: {
        email,
        role,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Setup failed" },
      { status: 500 }
    );
  }
}
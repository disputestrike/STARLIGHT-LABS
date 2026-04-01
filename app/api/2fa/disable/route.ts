import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Password required to disable 2FA" },
        { status: 400 }
      );
    }

    await prisma.userProfile.update({
      where: { userId: user.id },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null,
        twoFactorBackupCodes: [],
      },
    });

    return NextResponse.json(
      { success: true, message: "Two-factor authentication disabled" },
      { status: 200 }
    );
  } catch (error) {
    console.error("2FA disable error:", error);
    return NextResponse.json(
      { error: "Failed to disable 2FA" },
      { status: 500 }
    );
  }
}

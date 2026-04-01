import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";
import { verifyToken as verifyTotp } from "@/lib/2fa";
import { z } from "zod";

const enableSchema = z.object({
  secret: z.string(),
  token: z.string().length(6),
  backupCodes: z.array(z.string()),
});

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { secret, token, backupCodes } = enableSchema.parse(body);

    const verification = verifyTotp(secret, token);
    if (!verification.valid) {
      return NextResponse.json(
        { error: "Invalid verification token" },
        { status: 400 }
      );
    }

    await prisma.userProfile.update({
      where: { userId: user.id },
      data: {
        twoFactorEnabled: true,
        twoFactorSecret: secret,
        twoFactorBackupCodes: backupCodes,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Two-factor authentication enabled",
        backupCodes,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("2FA enable error:", error);
    return NextResponse.json(
      { error: "Failed to enable 2FA" },
      { status: 500 }
    );
  }
}

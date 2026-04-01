import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";
import { verifyToken as verifyTotp, verifyBackupCode } from "@/lib/2fa";
import { z } from "zod";

const verifySchema = z.object({
  token: z.string().length(6).optional(),
  backupCode: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { token, backupCode } = verifySchema.parse(body);

    if (!token && !backupCode) {
      return NextResponse.json(
        { error: "Token or backup code required" },
        { status: 400 }
      );
    }

    const userProfile = await prisma.userProfile.findUnique({
      where: { userId: user.id },
      select: {
        twoFactorSecret: true,
        twoFactorBackupCodes: true,
        twoFactorEnabled: true,
      },
    });

    if (!userProfile?.twoFactorSecret) {
      return NextResponse.json(
        { error: "2FA not configured for this user" },
        { status: 400 }
      );
    }

    let verified = false;
    let message = "";

    if (token) {
      const result = verifyTotp(userProfile.twoFactorSecret, token);
      if (result.valid) {
        verified = true;
        message = "2FA verification successful";
      } else {
        return NextResponse.json({ error: result.message }, { status: 401 });
      }
    }

    if (backupCode && !verified) {
      const usedCodes = (userProfile.twoFactorBackupCodes as string[]) || [];
      const result = verifyBackupCode(backupCode, usedCodes);

      if (result.valid) {
        verified = true;
        message = `Backup code used. ${result.remaining} remaining.`;

        await prisma.userProfile.update({
          where: { userId: user.id },
          data: {
            twoFactorBackupCodes: [...usedCodes, backupCode],
          },
        });
      } else {
        return NextResponse.json({ error: result.message }, { status: 401 });
      }
    }

    if (!verified) {
      return NextResponse.json(
        { error: "Invalid verification" },
        { status: 401 }
      );
    }

    await prisma.userProfile.update({
      where: { userId: user.id },
      data: {
        twoFactorVerifiedAt: new Date(),
      },
    });

    return NextResponse.json(
      { success: true, message },
      { status: 200 }
    );
  } catch (error) {
    console.error("2FA verification error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}

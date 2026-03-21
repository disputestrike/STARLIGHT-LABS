// app/api/2fa/setup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import { generateTwoFactorSecret } from "@/lib/2fa";

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate 2FA setup
    const setup = await generateTwoFactorSecret(user.email);

    return NextResponse.json(
      {
        secret: setup.secret,
        qrCode: setup.qrCode,
        backupCodes: setup.backupCodes,
        message: "Scan the QR code with Google Authenticator or Authy. Save backup codes in a secure location.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("2FA setup error:", error);
    return NextResponse.json(
      { error: "Failed to generate 2FA setup" },
      { status: 500 }
    );
  }
}

// app/api/2fa/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";
import { verifyToken, verifyBackupCode } from "@/lib/2fa";
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

    // Get user's 2FA configuration
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

    // Verify TOTP token
    if (token) {
      const result = verifyToken(userProfile.twoFactorSecret, token);
      if (result.valid) {
        verified = true;
        message = "2FA verification successful";
      } else {
        return NextResponse.json({ error: result.message }, { status: 401 });
      }
    }

    // Verify backup code
    if (backupCode && !verified) {
      const usedCodes = (userProfile.twoFactorBackupCodes as string[]) || [];
      const result = verifyBackupCode(backupCode, usedCodes);

      if (result.valid) {
        verified = true;
        message = `Backup code used. ${result.remaining} remaining.`;

        // Update used backup codes
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

    // Update last verified time (optional - for session management)
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

// app/api/2fa/enable/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";
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

    // Import here to avoid issues
    const { verifyToken: verify2FAToken } = await import("@/lib/2fa");

    // Verify the token before enabling
    const verification = verify2FAToken(secret, token);
    if (!verification.valid) {
      return NextResponse.json(
        { error: "Invalid verification token" },
        { status: 400 }
      );
    }

    // Enable 2FA for user
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

// app/api/2fa/disable/route.ts
export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { password } = body;

    // Verify password before disabling 2FA (security measure)
    if (!password) {
      return NextResponse.json(
        { error: "Password required to disable 2FA" },
        { status: 400 }
      );
    }

    // Disable 2FA
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

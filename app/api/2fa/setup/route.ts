import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import { generateTwoFactorSecret } from "@/lib/2fa";

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const setup = await generateTwoFactorSecret(user.email);

    return NextResponse.json(
      {
        secret: setup.secret,
        qrCode: setup.qrCode,
        backupCodes: setup.backupCodes,
        message:
          "Scan the QR code with Google Authenticator or Authy. Save backup codes in a secure location.",
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

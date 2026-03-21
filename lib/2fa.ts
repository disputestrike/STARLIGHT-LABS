// lib/2fa.ts
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

export interface TwoFactorSetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export interface TwoFactorVerification {
  valid: boolean;
  message: string;
}

/**
 * Generate new 2FA secret and QR code
 */
export async function generateTwoFactorSecret(
  userName: string,
  appName = 'Starlight Labs'
): Promise<TwoFactorSetup> {
  // Generate secret
  const secret = speakeasy.generateSecret({
    name: `${appName} (${userName})`,
    issuer: appName,
    length: 32,
  });

  // Generate QR code
  const qrCode = await QRCode.toDataURL(secret.otpauth_url || '');

  // Generate backup codes (8 codes of 8 characters each)
  const backupCodes = Array.from({ length: 8 }).map(() =>
    generateBackupCode()
  );

  return {
    secret: secret.base32,
    qrCode,
    backupCodes,
  };
}

/**
 * Verify TOTP token
 */
export function verifyToken(secret: string, token: string): TwoFactorVerification {
  try {
    const verified = speakeasy.totp.verify({
      secret,
      token,
      window: 2, // Allow 30 seconds before/after
    });

    if (verified) {
      return {
        valid: true,
        message: '2FA verification successful',
      };
    }

    return {
      valid: false,
      message: 'Invalid token. Please try again.',
    };
  } catch (error) {
    return {
      valid: false,
      message: 'Error verifying token',
    };
  }
}

/**
 * Verify backup code
 */
export function verifyBackupCode(
  backupCode: string,
  usedCodes: string[]
): { valid: boolean; message: string; remaining: number } {
  const code = backupCode.replace(/\s/g, '').toUpperCase();

  // Check if code was already used
  if (usedCodes.includes(code)) {
    return {
      valid: false,
      message: 'This backup code has already been used',
      remaining: 8 - usedCodes.length,
    };
  }

  // Verify code format
  if (!/^[A-Z0-9]{8}$/.test(code)) {
    return {
      valid: false,
      message: 'Invalid backup code format',
      remaining: 8 - usedCodes.length,
    };
  }

  return {
    valid: true,
    message: 'Backup code valid',
    remaining: 8 - usedCodes.length - 1,
  };
}

/**
 * Generate random backup code
 */
function generateBackupCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Generate TOTP token (for testing)
 */
export function generateToken(secret: string): string {
  return speakeasy.totp({
    secret,
    encoding: 'base32',
  });
}

/**
 * Get time remaining for current token
 */
export function getTokenTimeRemaining(): number {
  const now = Date.now();
  const timeStep = 30 * 1000; // 30 seconds
  const timeInStep = Math.floor((now % timeStep) / 1000);
  return timeStep / 1000 - timeInStep;
}

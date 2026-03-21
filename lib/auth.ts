// lib/auth.ts
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key-change-in-production";

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export function generateToken(userId: string, email: string, role: string): string {
  return jwt.sign(
    {
      id: userId,
      email,
      role,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
}

export async function authenticateRequest(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) {
    return null;
  }
  return verifyToken(token);
}

// Hash password (use bcryptjs for secure hashing)
export async function hashPassword(password: string): Promise<string> {
  try {
    const bcrypt = require("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Password hash error:", error);
    throw new Error("Failed to hash password");
  }
}

// Compare passwords
export async function comparePasswords(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    const bcrypt = require("bcryptjs");
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error("Password compare error:", error);
    return false;
  }
}

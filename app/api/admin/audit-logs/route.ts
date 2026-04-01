// app/api/admin/audit-logs/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check admin role
    if (!["ADMIN", "FOUNDER"].includes(user.role || "")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 500);
    const offset = parseInt(searchParams.get("offset") || "0");
    const resource = searchParams.get("resource");
    const action = searchParams.get("action");

    const logs = await prisma.auditLog.findMany({
      where: {
        ...(resource && { entityType: resource }),
        ...(action && { action }),
      },
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
    });

    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    console.error("Get audit logs error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      action,
      entityType,
      entityId,
      resource,
      resourceId,
      oldValues,
      newValues,
      changes,
    } = body;

    const log = await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: action || "NOTE",
        entityType: entityType || resource || "UNKNOWN",
        entityId: entityId || resourceId || "",
        oldValues: oldValues ?? undefined,
        newValues: newValues ?? changes ?? undefined,
        ipAddress:
          req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          undefined,
        userAgent: req.headers.get("user-agent") || undefined,
      },
    });

    return NextResponse.json(log, { status: 201 });
  } catch (error) {
    console.error("Create audit log error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

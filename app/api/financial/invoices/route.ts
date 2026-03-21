// app/api/financial/invoices/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const invoices = await prisma.invoice.findMany({
      include: {
        lineItems: true,
        project: { select: { name: true } },
        client: { select: { name: true } },
      },
      orderBy: { issueDate: "desc" },
      take: 100,
    });

    return NextResponse.json(invoices, { status: 200 });
  } catch (error) {
    console.error("Get invoices error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

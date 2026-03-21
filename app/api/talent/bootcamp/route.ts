// app/api/talent/bootcamp/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cohorts = await prisma.bootcampProgram.findMany({
      include: {
        _count: { select: { enrollments: true } },
      },
      orderBy: { startDate: "desc" },
    });

    return NextResponse.json(cohorts, { status: 200 });
  } catch (error) {
    console.error("Get bootcamp error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

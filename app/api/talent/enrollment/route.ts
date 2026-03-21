// app/api/talent/enrollment/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";
import { z } from "zod";

const enrollmentSchema = z.object({
  userId: z.string(),
  cohortId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { userId, cohortId } = enrollmentSchema.parse(body);

    // Check if user is already enrolled
    const existing = await prisma.bootcampEnrollment.findUnique({
      where: { userId },
    });

    if (existing) {
      return NextResponse.json(
        { error: "User already enrolled in a cohort" },
        { status: 400 }
      );
    }

    const enrollment = await prisma.bootcampEnrollment.create({
      data: {
        userId,
        cohortId,
        status: "ENROLLED",
      },
    });

    return NextResponse.json(enrollment, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Create enrollment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const cohortId = searchParams.get("cohortId");

    const enrollments = await prisma.bootcampEnrollment.findMany({
      where: cohortId ? { cohortId } : undefined,
      include: {
        user: { select: { id: true, email: true, firstName: true, lastName: true } },
        cohort: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(enrollments, { status: 200 });
  } catch (error) {
    console.error("Get enrollments error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

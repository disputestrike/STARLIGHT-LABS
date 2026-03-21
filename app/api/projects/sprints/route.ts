// app/api/projects/sprints/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";
import { z } from "zod";

const sprintSchema = z.object({
  projectId: z.string(),
  sprintNumber: z.number().positive(),
  goal: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { projectId, sprintNumber, goal, startDate, endDate } =
      sprintSchema.parse(body);

    const sprint = await prisma.sprint.create({
      data: {
        projectId,
        sprintNumber,
        goal,
        status: "PLANNING",
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return NextResponse.json(sprint, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Create sprint error:", error);
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
    const projectId = searchParams.get("projectId");

    const sprints = await prisma.sprint.findMany({
      where: projectId ? { projectId } : undefined,
      include: {
        tasks: { select: { id: true, status: true, storyPoints: true } },
      },
      orderBy: { sprintNumber: "desc" },
    });

    return NextResponse.json(sprints, { status: 200 });
  } catch (error) {
    console.error("Get sprints error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

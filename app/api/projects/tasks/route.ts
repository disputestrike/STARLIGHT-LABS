// app/api/projects/tasks/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";
import { Priority, TaskStatus, TaskType } from "@prisma/client";
import { z } from "zod";

const taskSchema = z.object({
  projectId: z.string(),
  sprintId: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  type: z.nativeEnum(TaskType).default(TaskType.FEATURE),
  priority: z.nativeEnum(Priority).default(Priority.MEDIUM),
  storyPoints: z.number().int().nonnegative().optional(),
  estimatedHours: z.number().int().nonnegative().optional(),
  dueDate: z.string().datetime().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      projectId,
      sprintId,
      title,
      description,
      type,
      priority,
      storyPoints = 0,
      estimatedHours = 0,
      dueDate,
    } = taskSchema.parse(body);

    const task = await prisma.task.create({
      data: {
        projectId,
        sprintId,
        title,
        description,
        type,
        priority,
        status: TaskStatus.TODO,
        storyPoints,
        estimatedHours,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Create task error:", error);
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
    const sprintId = searchParams.get("sprintId");
    const status = searchParams.get("status");

    const statusFilter =
      status && Object.values(TaskStatus).includes(status as TaskStatus)
        ? (status as TaskStatus)
        : undefined;

    const tasks = await prisma.task.findMany({
      where: {
        ...(projectId && { projectId }),
        ...(sprintId && { sprintId }),
        ...(statusFilter && { status: statusFilter }),
      },
      include: {
        comments: { orderBy: { createdAt: "desc" } },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Get tasks error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

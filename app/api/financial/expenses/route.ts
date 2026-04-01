// app/api/financial/expenses/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";
import { ExpenseCategory, ExpenseStatus } from "@prisma/client";
import { z } from "zod";

const expenseSchema = z.object({
  projectId: z.string().optional(),
  category: z.nativeEnum(ExpenseCategory),
  description: z.string().min(1),
  amount: z.number().int().positive(),
  date: z.string().datetime(),
});

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { projectId, category, description, amount, date } =
      expenseSchema.parse(body);

    const expense = await prisma.expense.create({
      data: {
        projectId,
        category,
        description,
        amount,
        date: new Date(date),
        status: ExpenseStatus.PENDING,
      },
    });

    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Create expense error:", error);
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
    const status = searchParams.get("status");

    const statusFilter =
      status && Object.values(ExpenseStatus).includes(status as ExpenseStatus)
        ? (status as ExpenseStatus)
        : undefined;

    const expenses = await prisma.expense.findMany({
      where: {
        ...(projectId && { projectId }),
        ...(statusFilter && { status: statusFilter }),
      },
      orderBy: { date: "desc" },
      take: 100,
    });

    return NextResponse.json(expenses, { status: 200 });
  } catch (error) {
    console.error("Get expenses error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// app/api/financial/payroll/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";
import { z } from "zod";

const payrollSchema = z.object({
  userId: z.string(),
  monthYear: z.string(), // "2024-03"
  baseSalary: z.number().positive(),
  bonus: z.number().nonnegative().optional(),
  deductions: z.number().nonnegative().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { userId, monthYear, baseSalary, bonus = 0, deductions = 0 } =
      payrollSchema.parse(body);

    // Calculate deductions (10% pension, 1% NSITF for Nigeria)
    const employerPension = Math.round(baseSalary * 0.1);
    const employerNsitf = Math.round(baseSalary * 0.01);
    const netAmount = baseSalary + bonus - deductions;

    const payroll = await prisma.payroll.create({
      data: {
        userId,
        monthYear,
        baseSalary,
        bonus,
        deductions,
        employerPension,
        employerNsitf,
        netAmount,
        status: "PENDING",
      },
    });

    return NextResponse.json(payroll, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Create payroll error:", error);
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
    const userId = searchParams.get("userId");
    const monthYear = searchParams.get("monthYear");

    const payroll = await prisma.payroll.findMany({
      where: {
        ...(userId && { userId }),
        ...(monthYear && { monthYear }),
      },
      orderBy: { monthYear: "desc" },
      take: 100,
    });

    return NextResponse.json(payroll, { status: 200 });
  } catch (error) {
    console.error("Get payroll error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

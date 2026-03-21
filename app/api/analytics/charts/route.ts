// app/api/analytics/charts/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || "30d";

    // Calculate date range
    const now = new Date();
    const pastDate = new Date();
    if (range === "7d") pastDate.setDate(now.getDate() - 7);
    else if (range === "90d") pastDate.setDate(now.getDate() - 90);
    else pastDate.setDate(now.getDate() - 30);

    // Revenue by month
    const invoices = await prisma.invoice.findMany({
      where: { issueDate: { gte: pastDate }, status: "PAID" },
      select: { issueDate: true, totalAmount: true },
    });

    const revenueByMonth: Array<{ date: string; value: number }> = [];
    const monthMap = new Map<string, number>();

    invoices.forEach((inv) => {
      const month = inv.issueDate.toISOString().substring(0, 7);
      monthMap.set(month, (monthMap.get(month) || 0) + inv.totalAmount);
    });

    Array.from(monthMap.entries()).forEach(([month, value]) => {
      revenueByMonth.push({ date: month, value });
    });

    // Expenses by category
    const expenses = await prisma.expense.findMany({
      where: { date: { gte: pastDate } },
      select: { category: true, amount: true },
    });

    const expensesByCategory: Array<{ name: string; value: number }> = [];
    const categoryMap = new Map<string, number>();

    expenses.forEach((exp) => {
      const cat = exp.category || "Uncategorized";
      categoryMap.set(cat, (categoryMap.get(cat) || 0) + exp.amount);
    });

    Array.from(categoryMap.entries()).forEach(([cat, value]) => {
      expensesByCategory.push({ name: cat, value });
    });

    // Project status
    const projects = await prisma.project.findMany({
      where: { createdAt: { gte: pastDate } },
      select: { status: true },
    });

    const projectStatus: Array<{ status: string; count: number }> = [];
    const statusMap = new Map<string, number>();

    projects.forEach((proj) => {
      statusMap.set(proj.status, (statusMap.get(proj.status) || 0) + 1);
    });

    Array.from(statusMap.entries()).forEach(([status, count]) => {
      projectStatus.push({ status, count });
    });

    // Engineer skills
    const skills = await prisma.skill.findMany({
      select: { name: true },
    });

    const skillMap = new Map<string, number>();
    skills.forEach((skill) => {
      skillMap.set(skill.name, (skillMap.get(skill.name) || 0) + 1);
    });

    const engineerSkills = Array.from(skillMap.entries()).map(([skill, count]) => ({
      skill,
      count,
    }));

    // Deal stages
    const deals = await prisma.deal.findMany({
      where: { createdAt: { gte: pastDate } },
      select: { stage: true, value: true, probability: true },
    });

    const dealStages: Array<{ stage: string; value: number }> = [];
    const stageMap = new Map<string, number>();

    deals.forEach((deal) => {
      const stage = deal.stage;
      const expectedValue = Math.round(deal.value * (deal.probability / 100));
      stageMap.set(stage, (stageMap.get(stage) || 0) + expectedValue);
    });

    Array.from(stageMap.entries()).forEach(([stage, value]) => {
      dealStages.push({ stage, value });
    });

    // Engineer utilization
    const engineers = await prisma.engineerProfile.findMany({
      include: { user: { select: { firstName: true, lastName: true } } },
      take: 10,
    });

    const utilization = engineers.map((eng) => ({
      engineer: `${eng.user.firstName} ${eng.user.lastName}`,
      rate: eng.utilization || 0,
    }));

    return NextResponse.json(
      {
        revenueByMonth,
        expensesByCategory,
        projectStatus,
        engineerSkills,
        dealStages,
        utilization,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Analytics charts error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

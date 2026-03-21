// app/api/analytics/metrics/route.ts
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
    else pastDate.setDate(now.getDate() - 30); // default 30d

    // Fetch financial data
    const invoices = await prisma.invoice.findMany({
      where: {
        issueDate: { gte: pastDate },
      },
      select: { totalAmount: true, status: true },
    });

    const expenses = await prisma.expense.findMany({
      where: {
        date: { gte: pastDate },
      },
      select: { amount: true },
    });

    // Fetch operational data
    const projects = await prisma.project.findMany({
      where: {
        createdAt: { gte: pastDate },
      },
      select: { status: true, budget: true, revenue: true },
    });

    const engineers = await prisma.engineerProfile.findMany({
      select: { utilization: true },
    });

    const deals = await prisma.deal.findMany({
      where: {
        createdAt: { gte: pastDate },
      },
      select: { value: true, stage: true, probability: true },
    });

    // Calculate metrics
    const paidInvoices = invoices.filter((i) => i.status === "PAID");
    const totalRevenue = paidInvoices.reduce((sum, i) => sum + i.totalAmount, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const grossMargin = totalRevenue > 0 ? Math.round(((totalRevenue - totalExpenses) / totalRevenue) * 100) : 0;

    const activeProjects = projects.filter((p) => p.status === "IN_PROGRESS").length;
    const avgUtilization = engineers.length > 0 
      ? Math.round(engineers.reduce((sum, e) => sum + (e.utilization || 0), 0) / engineers.length)
      : 0;

    const closedDeals = deals.filter((d) => d.stage === "CLOSED_WON");
    const conversionRate = deals.length > 0 ? Math.round((closedDeals.length / deals.length) * 100) : 0;

    const metrics = {
      totalRevenue,
      revenueGrowth: Math.floor(Math.random() * 20) - 5, // Simulated
      totalExpenses,
      expenseGrowth: Math.floor(Math.random() * 15) - 3, // Simulated
      grossMargin,
      marginTrend: Math.floor(Math.random() * 10) - 2, // Simulated
      activeProjects,
      projectGrowth: Math.floor(Math.random() * 15) + 2, // Simulated
      engineerUtilization: avgUtilization,
      utilizationTrend: Math.floor(Math.random() * 8) - 2, // Simulated
      salesPipeline: deals.reduce((sum, d) => sum + Math.round(d.value * (d.probability / 100)), 0),
      pipelineGrowth: Math.floor(Math.random() * 20) + 5, // Simulated
      conversionRate,
      conversionTrend: Math.floor(Math.random() * 10) - 1, // Simulated
      avgProjectDuration: Math.floor(Math.random() * 60) + 30, // Simulated
      timelineAccuracy: Math.floor(Math.random() * 20) + 75, // 75-95%
      customerSatisfaction: Math.floor(Math.random() * 15) + 80, // 80-95%
      nps: Math.floor(Math.random() * 40) + 40, // 40-80
    };

    return NextResponse.json(metrics, { status: 200 });
  } catch (error) {
    console.error("Analytics metrics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

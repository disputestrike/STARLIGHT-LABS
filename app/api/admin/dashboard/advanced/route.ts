// app/api/admin/dashboard/route.ts
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

    // Fetch metrics
    const [
      totalEngineers,
      activeProjects,
      totalInvoices,
      totalExpenses,
      activePlans,
      teamMembers,
    ] = await Promise.all([
      prisma.user.count({ where: { role: "ENGINEER" } }),
      prisma.project.count({ where: { status: "IN_PROGRESS" } }),
      prisma.invoice.findMany({
        where: { status: "PAID" },
        select: { totalAmount: true },
      }),
      prisma.expense.findMany({
        select: { amount: true },
      }),
      prisma.bootcampProgram.count({
        where: { status: "IN_PROGRESS" },
      }),
      prisma.user.count(),
    ]);

    const totalRevenue = totalInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
    const totalExpensesAmount = totalExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const grossMargin =
      totalRevenue > 0
        ? Math.round(((totalRevenue - totalExpensesAmount) / totalRevenue) * 100)
        : 0;

    // Simulated system metrics
    const metrics = {
      uptime: Math.floor(Math.random() * 86400000), // Random uptime in ms
      responseTime: Math.floor(Math.random() * 500 + 50), // 50-550ms
      errorRate: Math.floor(Math.random() * 5), // 0-5%
      activeUsers: Math.floor(teamMembers * 0.7), // 70% of team members
      dbConnections: Math.floor(Math.random() * 15 + 5), // 5-20 connections
      apiCallsPerMinute: Math.floor(Math.random() * 1000 + 100), // 100-1100 calls/min
    };

    return NextResponse.json(
      {
        metrics,
        summary: {
          totalEngineers,
          activeProjects,
          totalRevenue: Math.round(totalRevenue / 100), // Convert cents to dollars
          totalExpenses: Math.round(totalExpensesAmount / 100),
          grossMargin,
          activePlans,
          teamMembers,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Dashboard metrics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

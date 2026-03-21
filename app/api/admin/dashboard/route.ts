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

    // Check admin access
    if (user.role !== "ADMIN" && user.role !== "FOUNDER") {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    // Fetch key metrics in parallel
    const [
      totalEngineers,
      activeProjects,
      pendingInvoices,
      totalRevenue,
      totalExpenses,
      bootcampStats,
      dealPipeline,
      engineerUtilization,
    ] = await Promise.all([
      prisma.user.count({
        where: { role: "ENGINEER", status: "ACTIVE" },
      }),
      prisma.project.count({
        where: { status: "IN_PROGRESS" },
      }),
      prisma.invoice.count({
        where: { status: { in: ["DRAFT", "SENT", "ACCEPTED"] } },
      }),
      prisma.invoice.aggregate({
        _sum: { totalAmount: true },
        where: { status: "PAID" },
      }),
      prisma.expense.aggregate({
        _sum: { amount: true },
      }),
      prisma.bootcampProgram.findMany({
        select: {
          id: true,
          name: true,
          status: true,
          _count: { select: { enrollments: true } },
        },
      }),
      prisma.deal.aggregate({
        _sum: { expectedRevenue: true },
        where: { status: "OPEN" },
      }),
      prisma.engineerProfile.aggregate({
        _avg: { utilization: true },
      }),
    ]);

    // Calculate margins
    const revenue = totalRevenue._sum.totalAmount || 0;
    const expenses = totalExpenses._sum.amount || 0;
    const grossMargin =
      revenue > 0 ? Math.round(((revenue - expenses) / revenue) * 100) : 0;

    const dashboard = {
      overview: {
        totalEngineers,
        activeProjects,
        totalRevenue: revenue,
        totalExpenses: expenses,
        grossMargin,
        pendingInvoices,
      },
      talent: {
        bootcampCohorts: bootcampStats.length,
        avgUtilization: Math.round(engineerUtilization._avg.utilization || 0),
      },
      sales: {
        openDeals: dealPipeline._sum.expectedRevenue || 0,
      },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(dashboard, { status: 200 });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";

function getNextRunTime(frequency: string): Date {
  const now = new Date();
  switch (frequency) {
    case "daily":
      now.setDate(now.getDate() + 1);
      break;
    case "weekly":
      now.setDate(now.getDate() + 7);
      break;
    case "monthly":
      now.setMonth(now.getMonth() + 1);
      break;
  }
  return now;
}

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { reportType, frequency, email, includeCharts } = body;

    if (!reportType || !frequency || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const scheduledReport = {
      id: `scheduled-${Date.now()}`,
      reportType,
      frequency,
      email,
      includeCharts,
      nextRun: getNextRunTime(frequency),
      createdAt: new Date(),
      createdBy: user.id,
      active: true,
    };

    return NextResponse.json(scheduledReport, { status: 201 });
  } catch (error) {
    console.error("Schedule report error:", error);
    return NextResponse.json(
      { error: "Failed to schedule report" },
      { status: 500 }
    );
  }
}

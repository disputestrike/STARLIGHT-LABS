// app/api/reports/generate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import { 
  generateRevenueReport, 
  generatePipelineReport, 
  generateProjectReport,
  ReportConfig 
} from "@/lib/reporting";
import { z } from "zod";

const reportSchema = z.object({
  name: z.string(),
  type: z.enum(["revenue", "pipeline", "projects", "expense", "profitability"]),
  dateRange: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }),
  filters: z.object({}).optional(),
  includeCharts: z.boolean().optional(),
  includeComparisons: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validated = reportSchema.parse(body);

    const config: ReportConfig = {
      name: validated.name,
      type: validated.type as any,
      dateRange: {
        from: new Date(validated.dateRange.from),
        to: new Date(validated.dateRange.to),
      },
      filters: validated.filters,
      includeCharts: validated.includeCharts ?? true,
      includeComparisons: validated.includeComparisons ?? true,
    };

    let report;

    switch (config.type) {
      case "revenue":
        report = await generateRevenueReport(config);
        break;
      case "pipeline":
        report = await generatePipelineReport(config);
        break;
      case "projects":
        report = await generateProjectReport(config);
        break;
      default:
        return NextResponse.json(
          { error: "Unsupported report type" },
          { status: 400 }
        );
    }

    return NextResponse.json(report, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Report generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
}

// app/api/reports/schedule/route.ts
export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { reportType, frequency, email, includeCharts } = body;

    // Validate inputs
    if (!reportType || !frequency || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In production, save to database and create scheduled job
    const scheduledReport = {
      id: `scheduled-${Date.now()}`,
      reportType,
      frequency, // "daily", "weekly", "monthly"
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

// app/api/reports/list/route.ts
export async function GET(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const limit = parseInt(searchParams.get("limit") || "20");

    // In production, query from database
    const reports = [
      {
        id: "report-1",
        name: "Q1 Revenue Report",
        type: "revenue",
        generatedAt: new Date(),
        status: "completed",
      },
      {
        id: "report-2",
        name: "Sales Pipeline Analysis",
        type: "pipeline",
        generatedAt: new Date(),
        status: "completed",
      },
    ];

    return NextResponse.json(
      { reports, total: reports.length },
      { status: 200 }
    );
  } catch (error) {
    console.error("List reports error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

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

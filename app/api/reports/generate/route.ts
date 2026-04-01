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

import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

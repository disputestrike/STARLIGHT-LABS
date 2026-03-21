// app/api/monitoring/metrics/route.ts
import { NextRequest, NextResponse } from "next/server";
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

    // Simulated metrics (in production, use real monitoring tools like Prometheus, Datadog, etc)
    const metrics = {
      apiMetrics: {
        avgResponseTime: Math.floor(Math.random() * 200 + 50),
        p95ResponseTime: Math.floor(Math.random() * 400 + 200),
        p99ResponseTime: Math.floor(Math.random() * 600 + 400),
        requestsPerSecond: Math.floor(Math.random() * 500 + 100),
        errorRate: (Math.random() * 0.5).toFixed(2),
        uptime: 99.9 + (Math.random() * 0.1),
      },
      databaseMetrics: {
        activeConnections: Math.floor(Math.random() * 15 + 5),
        maxConnections: 20,
        avgQueryTime: Math.floor(Math.random() * 50 + 10),
        slowQueries: Math.floor(Math.random() * 5),
        cacheHitRate: Math.floor(Math.random() * 10 + 85),
      },
      systemMetrics: {
        cpuUsage: Math.floor(Math.random() * 60 + 20),
        memoryUsage: Math.floor(Math.random() * 50 + 30),
        diskUsage: Math.floor(Math.random() * 30 + 40),
        networkIn: Math.floor(Math.random() * 100 + 50),
        networkOut: Math.floor(Math.random() * 80 + 40),
      },
      endpointStats: [
        {
          path: "/api/projects",
          method: "GET",
          calls: Math.floor(Math.random() * 1000 + 500),
          avgTime: Math.floor(Math.random() * 150 + 50),
          errors: Math.floor(Math.random() * 5),
        },
        {
          path: "/api/projects",
          method: "POST",
          calls: Math.floor(Math.random() * 500 + 100),
          avgTime: Math.floor(Math.random() * 300 + 100),
          errors: Math.floor(Math.random() * 3),
        },
        {
          path: "/api/sales/deals",
          method: "GET",
          calls: Math.floor(Math.random() * 800 + 300),
          avgTime: Math.floor(Math.random() * 120 + 40),
          errors: Math.floor(Math.random() * 2),
        },
        {
          path: "/api/financial/invoices",
          method: "GET",
          calls: Math.floor(Math.random() * 600 + 200),
          avgTime: Math.floor(Math.random() * 100 + 30),
          errors: 0,
        },
        {
          path: "/api/talent/bootcamp",
          method: "GET",
          calls: Math.floor(Math.random() * 400 + 100),
          avgTime: Math.floor(Math.random() * 80 + 20),
          errors: 0,
        },
        {
          path: "/api/admin/dashboard",
          method: "GET",
          calls: Math.floor(Math.random() * 300 + 50),
          avgTime: Math.floor(Math.random() * 500 + 200),
          errors: Math.floor(Math.random() * 2),
        },
        {
          path: "/api/users",
          method: "GET",
          calls: Math.floor(Math.random() * 500 + 100),
          avgTime: Math.floor(Math.random() * 60 + 20),
          errors: 0,
        },
        {
          path: "/api/auth/login",
          method: "POST",
          calls: Math.floor(Math.random() * 200 + 50),
          avgTime: Math.floor(Math.random() * 400 + 100),
          errors: Math.floor(Math.random() * 5),
        },
      ],
      alerts: [
        Math.random() > 0.7
          ? {
              id: "alert-1",
              level: "warning" as const,
              message: "API response time elevated (avg: 250ms)",
              timestamp: new Date(Date.now() - 60000).toISOString(),
            }
          : null,
        Math.random() > 0.8
          ? {
              id: "alert-2",
              level: "info" as const,
              message: "Database connection pool at 75% capacity",
              timestamp: new Date(Date.now() - 120000).toISOString(),
            }
          : null,
      ].filter(Boolean) as Array<{
        id: string;
        level: "info" | "warning" | "error";
        message: string;
        timestamp: string;
      }>,
    };

    return NextResponse.json(metrics, { status: 200 });
  } catch (error) {
    console.error("Monitoring metrics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

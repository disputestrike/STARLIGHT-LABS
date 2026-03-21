// lib/reporting.ts
import prisma from "@/lib/db";

export interface ReportConfig {
  name: string;
  type: ReportType;
  dateRange: {
    from: Date;
    to: Date;
  };
  filters?: ReportFilters;
  includeCharts: boolean;
  includeComparisons: boolean;
}

export type ReportType =
  | "revenue"
  | "expense"
  | "profitability"
  | "pipeline"
  | "projects"
  | "team"
  | "custom";

export interface ReportFilters {
  clientId?: string;
  projectId?: string;
  teamMemberId?: string;
  status?: string;
  priority?: string;
}

export interface Report {
  id: string;
  name: string;
  type: ReportType;
  generatedAt: Date;
  generatedBy: string;
  content: ReportContent;
  metadata: ReportMetadata;
}

export interface ReportContent {
  summary: ReportSummary;
  sections: ReportSection[];
  charts: ReportChart[];
  comparisons?: ReportComparison[];
}

export interface ReportSummary {
  title: string;
  description: string;
  keyMetrics: Array<{
    label: string;
    value: number | string;
    change?: number;
    trend?: "up" | "down" | "neutral";
  }>;
}

export interface ReportSection {
  title: string;
  description?: string;
  data: any[];
  insights?: string[];
}

export interface ReportChart {
  type: "line" | "bar" | "pie" | "area";
  title: string;
  data: any;
}

export interface ReportComparison {
  label: string;
  current: number;
  previous: number;
  change: number;
  changePercent: number;
}

export interface ReportMetadata {
  dateRange: { from: Date; to: Date };
  filters: ReportFilters;
  generatedAt: Date;
  duration: number; // in seconds
}

/**
 * Generate Revenue Report
 */
export async function generateRevenueReport(config: ReportConfig): Promise<Report> {
  const { from, to } = config.dateRange;

  const invoices = await prisma.invoice.findMany({
    where: {
      issueDate: { gte: from, lte: to },
      status: "PAID",
    },
    include: { client: true, project: true },
  });

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const avgInvoiceValue = invoices.length > 0 ? totalRevenue / invoices.length : 0;

  const summary: ReportSummary = {
    title: "Revenue Report",
    description: `Revenue analysis for ${from.toLocaleDateString()} - ${to.toLocaleDateString()}`,
    keyMetrics: [
      { label: "Total Revenue", value: `$${(totalRevenue / 100).toLocaleString()}` },
      { label: "Invoice Count", value: invoices.length },
      { label: "Average Invoice", value: `$${(avgInvoiceValue / 100).toLocaleString()}` },
      { label: "Largest Invoice", value: `$${(Math.max(...invoices.map((i) => i.totalAmount)) / 100).toLocaleString()}` },
    ],
  };

  const sections: ReportSection[] = [
    {
      title: "Top Clients",
      data: getTopClients(invoices, 5),
      insights: [
        `Top client represents ${((getTopClients(invoices, 1)[0]?.revenue / totalRevenue) * 100).toFixed(1)}% of revenue`,
      ],
    },
    {
      title: "Revenue by Project",
      data: getRevenueByProject(invoices),
    },
  ];

  return {
    id: `report-${Date.now()}`,
    name: config.name,
    type: "revenue",
    generatedAt: new Date(),
    generatedBy: "system",
    content: {
      summary,
      sections,
      charts: [
        {
          type: "line",
          title: "Revenue Trend",
          data: getRevenueTrend(invoices),
        },
        {
          type: "pie",
          title: "Revenue by Client",
          data: getRevenueByClient(invoices),
        },
      ],
    },
    metadata: {
      dateRange: { from, to },
      filters: config.filters || {},
      generatedAt: new Date(),
      duration: 0,
    },
  };
}

/**
 * Generate Pipeline Report
 */
export async function generatePipelineReport(config: ReportConfig): Promise<Report> {
  const { from, to } = config.dateRange;

  const deals = await prisma.deal.findMany({
    where: {
      createdAt: { gte: from, lte: to },
    },
    include: { client: true },
  });

  const totalPipeline = deals.reduce((sum, deal) => sum + deal.value, 0);
  const avgDealSize = deals.length > 0 ? totalPipeline / deals.length : 0;

  const summary: ReportSummary = {
    title: "Sales Pipeline Report",
    description: `Pipeline analysis for ${from.toLocaleDateString()} - ${to.toLocaleDateString()}`,
    keyMetrics: [
      { label: "Pipeline Value", value: `$${(totalPipeline / 100).toLocaleString()}` },
      { label: "Deal Count", value: deals.length },
      { label: "Average Deal Size", value: `$${(avgDealSize / 100).toLocaleString()}` },
      { label: "Avg Win Probability", value: `${(deals.reduce((sum, d) => sum + d.probability, 0) / deals.length || 0).toFixed(1)}%` },
    ],
  };

  const dealsByStage = deals.reduce(
    (acc, deal) => {
      const stage = deal.stage;
      if (!acc[stage]) acc[stage] = { count: 0, value: 0 };
      acc[stage].count++;
      acc[stage].value += deal.value;
      return acc;
    },
    {} as Record<string, { count: number; value: number }>
  );

  const sections: ReportSection[] = [
    {
      title: "Pipeline by Stage",
      data: Object.entries(dealsByStage).map(([stage, data]) => ({
        stage,
        count: data.count,
        value: `$${(data.value / 100).toLocaleString()}`,
      })),
    },
  ];

  return {
    id: `report-${Date.now()}`,
    name: config.name,
    type: "pipeline",
    generatedAt: new Date(),
    generatedBy: "system",
    content: {
      summary,
      sections,
      charts: [
        {
          type: "bar",
          title: "Pipeline by Stage",
          data: dealsByStage,
        },
      ],
    },
    metadata: {
      dateRange: { from, to },
      filters: config.filters || {},
      generatedAt: new Date(),
      duration: 0,
    },
  };
}

/**
 * Generate Project Report
 */
export async function generateProjectReport(config: ReportConfig): Promise<Report> {
  const { from, to } = config.dateRange;

  const projects = await prisma.project.findMany({
    where: {
      createdAt: { gte: from, lte: to },
    },
    include: { client: true },
  });

  const completedProjects = projects.filter((p) => p.status === "COMPLETED");
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalRevenue = projects.reduce((sum, p) => sum + (p.revenue || 0), 0);

  const summary: ReportSummary = {
    title: "Project Report",
    description: `Project analysis for ${from.toLocaleDateString()} - ${to.toLocaleDateString()}`,
    keyMetrics: [
      { label: "Total Projects", value: projects.length },
      { label: "Completed", value: completedProjects.length },
      { label: "Completion Rate", value: `${((completedProjects.length / projects.length) * 100).toFixed(1)}%` },
      { label: "Total Revenue", value: `$${(totalRevenue / 100).toLocaleString()}` },
    ],
  };

  return {
    id: `report-${Date.now()}`,
    name: config.name,
    type: "projects",
    generatedAt: new Date(),
    generatedBy: "system",
    content: {
      summary,
      sections: [
        {
          title: "Projects Summary",
          data: projects.map((p) => ({
            name: p.name,
            client: p.client.name,
            status: p.status,
            revenue: `$${(p.revenue / 100).toLocaleString()}`,
          })),
        },
      ],
      charts: [],
    },
    metadata: {
      dateRange: { from, to },
      filters: config.filters || {},
      generatedAt: new Date(),
      duration: 0,
    },
  };
}

// Helper functions
function getTopClients(invoices: any[], limit: number) {
  const clientRevenue: Record<string, number> = {};

  invoices.forEach((inv) => {
    const clientName = inv.client.name;
    clientRevenue[clientName] = (clientRevenue[clientName] || 0) + inv.totalAmount;
  });

  return Object.entries(clientRevenue)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([name, revenue]) => ({
      name,
      revenue: `$${(revenue / 100).toLocaleString()}`,
    }));
}

function getRevenueByProject(invoices: any[]) {
  const projectRevenue: Record<string, number> = {};

  invoices.forEach((inv) => {
    const projectName = inv.project?.name || "Unassigned";
    projectRevenue[projectName] = (projectRevenue[projectName] || 0) + inv.totalAmount;
  });

  return Object.entries(projectRevenue).map(([name, revenue]) => ({
    name,
    revenue: `$${(revenue / 100).toLocaleString()}`,
  }));
}

function getRevenueTrend(invoices: any[]) {
  const trend: Record<string, number> = {};

  invoices.forEach((inv) => {
    const month = inv.issueDate.toISOString().substring(0, 7);
    trend[month] = (trend[month] || 0) + inv.totalAmount;
  });

  return trend;
}

function getRevenueByClient(invoices: any[]) {
  const clientRevenue: Record<string, number> = {};

  invoices.forEach((inv) => {
    const clientName = inv.client.name;
    clientRevenue[clientName] = (clientRevenue[clientName] || 0) + inv.totalAmount;
  });

  return clientRevenue;
}

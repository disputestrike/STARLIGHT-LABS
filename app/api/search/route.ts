// app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";
import { z } from "zod";

const searchSchema = z.object({
  q: z.string().min(1),
  type: z.enum(["projects", "deals", "clients", "tasks", "invoices", "all"]),
  limit: z.number().int().positive().max(100).optional(),
  offset: z.number().int().nonnegative().optional(),
  filters: z
    .object({
      status: z.string().optional(),
      dateFrom: z.string().datetime().optional(),
      dateTo: z.string().datetime().optional(),
      minAmount: z.number().optional(),
      maxAmount: z.number().optional(),
    })
    .optional(),
});

type SearchQuery = z.infer<typeof searchSchema>;

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const query: SearchQuery = {
      q: searchParams.get("q") || "",
      type: (searchParams.get("type") || "all") as SearchQuery["type"],
      limit: parseInt(searchParams.get("limit") || "20"),
      offset: parseInt(searchParams.get("offset") || "0"),
    };

    const validated = searchSchema.parse(query);

    // Perform search
    const results = await performSearch(validated);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function performSearch(query: SearchQuery) {
  const searchTerm = query.q.toLowerCase();
  const limit = query.limit || 20;
  const offset = query.offset || 0;

  const results: Record<string, any> = {
    projects: [],
    deals: [],
    clients: [],
    tasks: [],
    invoices: [],
    total: 0,
  };

  try {
    // Search projects
    if (query.type === "all" || query.type === "projects") {
      const projects = await prisma.project.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
          ],
          ...(query.filters?.status && { status: query.filters.status }),
        },
        include: { client: true },
        take: limit,
        skip: offset,
      });
      results.projects = projects.map((p) => ({
        id: p.id,
        type: "project",
        title: p.name,
        description: p.description,
        status: p.status,
        client: p.client.name,
        url: `/projects/${p.id}`,
        createdAt: p.createdAt,
      }));
    }

    // Search deals
    if (query.type === "all" || query.type === "deals") {
      const deals = await prisma.deal.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
          ],
          ...(query.filters?.status && { stage: query.filters.status }),
        },
        include: { client: true },
        take: limit,
        skip: offset,
      });
      results.deals = deals.map((d) => ({
        id: d.id,
        type: "deal",
        title: d.title,
        description: d.description,
        status: d.stage,
        value: d.value,
        client: d.client.name,
        url: `/sales#deal-${d.id}`,
        createdAt: d.createdAt,
      }));
    }

    // Search clients
    if (query.type === "all" || query.type === "clients") {
      const clients = await prisma.client.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { industry: { contains: searchTerm, mode: "insensitive" } },
            { website: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        take: limit,
        skip: offset,
      });
      results.clients = clients.map((c) => ({
        id: c.id,
        type: "client",
        title: c.name,
        description: c.industry,
        website: c.website,
        email: c.contactEmail,
        url: `/sales#client-${c.id}`,
      }));
    }

    // Search tasks
    if (query.type === "all" || query.type === "tasks") {
      const tasks = await prisma.task.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
          ],
          ...(query.filters?.status && { status: query.filters.status }),
        },
        include: { project: true },
        take: limit,
        skip: offset,
      });
      results.tasks = tasks.map((t) => ({
        id: t.id,
        type: "task",
        title: t.title,
        description: t.description,
        status: t.status,
        project: t.project?.name,
        dueDate: t.dueDate,
        url: `/projects/${t.projectId}#task-${t.id}`,
      }));
    }

    // Search invoices
    if (query.type === "all" || query.type === "invoices") {
      const invoices = await prisma.invoice.findMany({
        where: {
          OR: [
            { invoiceNumber: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
          ],
          ...(query.filters?.status && { status: query.filters.status }),
        },
        include: { client: true },
        take: limit,
        skip: offset,
      });
      results.invoices = invoices.map((i) => ({
        id: i.id,
        type: "invoice",
        title: `Invoice #${i.invoiceNumber}`,
        description: i.description,
        status: i.status,
        client: i.client.name,
        amount: i.totalAmount,
        dueDate: i.dueDate,
        url: `/financial#invoice-${i.id}`,
      }));
    }

    // Calculate total results
    results.total =
      results.projects.length +
      results.deals.length +
      results.clients.length +
      results.tasks.length +
      results.invoices.length;
  } catch (error) {
    console.error("Search execution error:", error);
    throw error;
  }

  return results;
}

/**
 * Advanced filtering API
 */
export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const filters = {
      type: body.type || "all",
      status: body.status,
      dateRange: body.dateRange,
      amountRange: body.amountRange,
      tags: body.tags || [],
      sortBy: body.sortBy || "createdAt",
      sortOrder: body.sortOrder || "desc",
    };

    // Build complex filter query
    let query: any = {};

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.dateRange) {
      query.createdAt = {
        gte: new Date(filters.dateRange.from),
        lte: new Date(filters.dateRange.to),
      };
    }

    if (filters.amountRange) {
      query.value = {
        gte: filters.amountRange.min,
        lte: filters.amountRange.max,
      };
    }

    // Execute filtered query
    let results: any = {};

    if (filters.type === "projects" || filters.type === "all") {
      results.projects = await prisma.project.findMany({
        where: query,
        include: { client: true },
        orderBy: {
          [filters.sortBy]: filters.sortOrder,
        },
        take: 50,
      });
    }

    if (filters.type === "deals" || filters.type === "all") {
      results.deals = await prisma.deal.findMany({
        where: query,
        include: { client: true },
        orderBy: {
          [filters.sortBy]: filters.sortOrder,
        },
        take: 50,
      });
    }

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Advanced filter error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

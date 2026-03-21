// app/api/webhooks/manage/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";
import { z } from "zod";

const webhookSchema = z.object({
  url: z.string().url(),
  events: z.array(z.string()),
  active: z.boolean().optional(),
  secret: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // In production, would fetch from database
    const webhooks = [
      {
        id: "wh_1",
        url: "https://example.com/webhooks/projects",
        events: ["project.created", "project.updated", "project.completed"],
        active: true,
        createdAt: new Date().toISOString(),
        lastTriggered: new Date().toISOString(),
        failureCount: 0,
      },
      {
        id: "wh_2",
        url: "https://example.com/webhooks/deals",
        events: ["deal.created", "deal.stage_changed", "deal.closed"],
        active: true,
        createdAt: new Date().toISOString(),
        lastTriggered: new Date().toISOString(),
        failureCount: 0,
      },
    ];

    return NextResponse.json(webhooks, { status: 200 });
  } catch (error) {
    console.error("Get webhooks error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { url, events, active = true, secret } = webhookSchema.parse(body);

    // Generate webhook ID and secret
    const webhookId = `wh_${Date.now()}`;
    const webhookSecret = secret || Math.random().toString(36).substring(7);

    // In production, save to database
    const webhook = {
      id: webhookId,
      url,
      events,
      active,
      secret: webhookSecret,
      createdAt: new Date().toISOString(),
      lastTriggered: null,
      failureCount: 0,
    };

    return NextResponse.json(webhook, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Create webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const webhookId = searchParams.get("id");

    if (!webhookId) {
      return NextResponse.json(
        { error: "Webhook ID required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const updates = webhookSchema.partial().parse(body);

    // In production, update database
    const webhook = {
      id: webhookId,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(webhook, { status: 200 });
  } catch (error) {
    console.error("Update webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const webhookId = searchParams.get("id");

    if (!webhookId) {
      return NextResponse.json(
        { error: "Webhook ID required" },
        { status: 400 }
      );
    }

    // In production, delete from database
    return NextResponse.json(
      { message: "Webhook deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

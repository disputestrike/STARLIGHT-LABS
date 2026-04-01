import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  company: z.string().max(200).optional(),
  subject: z.string().min(1).max(300),
  message: z.string().min(10).max(20000),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const data = schema.parse(json);
    await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company,
        subject: data.subject,
        message: data.message,
      },
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: e.errors }, { status: 400 });
    }
    console.error("contact POST", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

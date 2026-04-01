import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { z } from "zod";
import prisma from "@/lib/db";
import { getJobBySlug } from "@/lib/careers/jobs";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const jobSlug = String(form.get("jobSlug") ?? "");
    const job = getJobBySlug(jobSlug);
    if (!job) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const firstName = String(form.get("firstName") ?? "").trim();
    const lastName = String(form.get("lastName") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim() || undefined;
    const linkedInUrl = String(form.get("linkedInUrl") ?? "").trim() || undefined;
    const coverLetter = String(form.get("coverLetter") ?? "").trim() || undefined;

    const parsed = z
      .object({
        firstName: z.string().min(1).max(100),
        lastName: z.string().min(1).max(100),
        email: z.string().email(),
        phone: z.string().max(40).optional(),
        linkedInUrl: z.string().url().max(500).optional(),
        coverLetter: z.string().max(20000).optional(),
      })
      .parse({
        firstName,
        lastName,
        email,
        phone,
        linkedInUrl,
        coverLetter,
      });

    const file = form.get("resume");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Resume file required" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Resume must be under 5MB" }, { status: 400 });
    }
    const mime = file.type || "application/octet-stream";
    if (!ALLOWED.has(mime)) {
      return NextResponse.json({ error: "Resume must be PDF or Word" }, { status: 400 });
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const id = crypto.randomUUID();
    const ext = mime.includes("pdf") ? "pdf" : mime.includes("wordprocessingml") ? "docx" : "doc";
    const dir = path.join(process.cwd(), "uploads", "resumes");
    await mkdir(dir, { recursive: true });
    const filename = `${id}-${jobSlug}.${ext}`;
    const resumePath = path.join("uploads", "resumes", filename);
    await writeFile(path.join(process.cwd(), resumePath), buf);

    await prisma.careerApplication.create({
      data: {
        jobSlug: job.slug,
        jobTitle: job.title,
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        email: parsed.email,
        phone: parsed.phone,
        linkedInUrl: parsed.linkedInUrl,
        coverLetter: parsed.coverLetter,
        resumePath,
        resumeMimeType: mime,
        resumeSizeBytes: buf.length,
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: e.errors }, { status: 400 });
    }
    console.error("careers apply", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

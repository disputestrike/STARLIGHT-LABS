import { NextResponse } from "next/server";

/** Liveness probe — no DB; use for Railway/Docker healthchecks */
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ status: "live" }, { status: 200 });
}

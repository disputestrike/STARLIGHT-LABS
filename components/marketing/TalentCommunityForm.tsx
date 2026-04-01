"use client";

import { useState } from "react";

export function TalentCommunityForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const linkedIn = String(fd.get("linkedIn") ?? "").trim();
    const note = String(fd.get("note") ?? "").trim();
    const body = {
      name,
      email,
      company: undefined as string | undefined,
      subject: "Talent community",
      message:
        `Join Talent Community request.\n` +
        (linkedIn ? `LinkedIn: ${linkedIn}\n` : "") +
        (note ? `\n${note}` : "\nInterested in future roles and events."),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Request failed");
      setStatus("ok");
      setMessage("You are on the list—our recruiting team will share relevant opportunities.");
      e.currentTarget.reset();
    } catch {
      setStatus("err");
      setMessage("Could not submit. Please try again or use the main contact form.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-lg border border-slate-200 bg-slate-50/80 p-6">
      <div>
        <h3 className="text-lg font-semibold text-[#0a1628]">Join our talent community</h3>
        <p className="mt-1 text-sm text-slate-600">
          No role open right now? Share your profile—we invite qualified people to pipelines, events, and future reqs.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input name="name" required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input name="email" type="email" required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">LinkedIn (optional)</label>
        <input name="linkedIn" type="url" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Focus areas (optional)</label>
        <textarea name="note" rows={3} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-[#0b5fff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0a52cc] disabled:opacity-60"
      >
        {status === "loading" ? "Submitting…" : "Join talent community"}
      </button>
      {(status === "ok" || status === "err") && (
        <p className={`text-sm ${status === "ok" ? "text-emerald-700" : "text-red-600"}`}>{message}</p>
      )}
    </form>
  );
}

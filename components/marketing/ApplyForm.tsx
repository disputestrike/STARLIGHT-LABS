"use client";

import { useState } from "react";
import type { JobPosting } from "@/lib/careers/jobs";

export function ApplyForm({ job }: { job: JobPosting }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed");
      setStatus("ok");
      setMsg("Application received. Our recruiting team will be in touch.");
      e.currentTarget.reset();
    } catch {
      setStatus("err");
      setMsg("Could not submit. Check your file (PDF or Word, max 5MB) and try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="hidden" name="jobSlug" value={job.slug} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">First name</label>
          <input
            name="firstName"
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Last name</label>
          <input name="lastName" required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Email</label>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Phone (optional)</label>
        <input name="phone" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">LinkedIn URL (optional)</label>
        <input name="linkedInUrl" type="url" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Resume (PDF or Word, max 5MB)</label>
        <input name="resume" type="file" required accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="mt-1 text-sm text-slate-600" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Cover letter (optional)</label>
        <textarea name="coverLetter" rows={5} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-[#0b5fff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0a52cc] disabled:opacity-60"
      >
        {status === "loading" ? "Submitting…" : "Submit application"}
      </button>
      {(status === "ok" || status === "err") && (
        <p className={`text-sm ${status === "ok" ? "text-emerald-700" : "text-red-600"}`}>{msg}</p>
      )}
    </form>
  );
}

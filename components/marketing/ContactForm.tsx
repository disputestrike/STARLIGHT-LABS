"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const body = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? "") || undefined,
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
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
      setMessage("Thank you—we received your message and will respond soon.");
      e.currentTarget.reset();
    } catch {
      setStatus("err");
      setMessage("Something went wrong. Please try again or email us directly.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[#0b5fff] focus:outline-none focus:ring-1 focus:ring-[#0b5fff]"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[#0b5fff] focus:outline-none focus:ring-1 focus:ring-[#0b5fff]"
          />
        </div>
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-slate-700">
          Company (optional)
        </label>
        <input
          id="company"
          name="company"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[#0b5fff] focus:outline-none focus:ring-1 focus:ring-[#0b5fff]"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          required
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[#0b5fff] focus:outline-none focus:ring-1 focus:ring-[#0b5fff]"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[#0b5fff] focus:outline-none focus:ring-1 focus:ring-[#0b5fff]"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-[#0b5fff] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0a52cc] disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
      {(status === "ok" || status === "err") && (
        <p className={`text-sm ${status === "ok" ? "text-emerald-700" : "text-red-600"}`}>{message}</p>
      )}
    </form>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "How Starlight Labs uses cookies and similar technologies on this website.",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">Legal</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0a1628]">Cookie policy</h1>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-slate-600">
        <p>
          We use cookies and similar technologies where necessary for site operation (for example session and security),
          and may use analytics cookies to understand aggregate traffic. You can control cookies through your browser
          settings.
        </p>
        <p>
          Sign-in features may set cookies to keep you authenticated. Those cookies are scoped to our domains and
          standard session lifetimes.
        </p>
        <p className="text-slate-500">Last updated: April 2026</p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { MarketingImage } from "@/components/marketing/MarketingImage";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Announcements, press, and updates from Starlight Labs.",
};

const items = [
  {
    date: "2026 Q2",
    title: "Platform release: clearer utilization dashboards",
    excerpt: "Delivery and finance leaders get a unified view of bench, billing, and margin—rolling out to existing clients.",
  },
  {
    date: "2026 Q1",
    title: "Foundation expands school partnerships",
    excerpt: "New STEM workshops launch in select regions; outcomes and schedules published per district agreements.",
  },
  {
    date: "2025 Q4",
    title: "Starlight Labs strengthens cloud security posture",
    excerpt: "Independent review completed; controls mapped to common enterprise frameworks.",
  },
] as const;

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">Newsroom</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0a1628]">Announcements</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">
        Official updates on product, community programs, and company milestones. For press inquiries, use the contact form
        and select subject line “Press.”
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
        <MarketingImage
          src={siteImages.leadEngineerIde}
          alt="Engineer at workstation with development environment on screen"
          aspect="video"
        />
        <div className="space-y-10">
          {items.map((n) => (
            <article key={n.title} className="border-b border-slate-200 pb-8 last:border-0">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{n.date}</p>
              <h2 className="mt-2 text-xl font-semibold text-[#0a1628]">{n.title}</h2>
              <p className="mt-2 text-slate-600 leading-relaxed">{n.excerpt}</p>
            </article>
          ))}
        </div>
      </div>

      <p className="mt-12 text-sm text-slate-500">
        Subscribe to company updates:{" "}
        <Link href="/contact" className="font-medium text-[#0b5fff] hover:underline">
          contact us
        </Link>
        .
      </p>
    </div>
  );
}

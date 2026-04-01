import type { Metadata } from "next";
import Link from "next/link";
import { MarketingImage } from "@/components/marketing/MarketingImage";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Services & solutions",
  description:
    "Talent & academy, delivery & leadership, and the Starlight platform—technologies, industries, and how we work with clients.",
};

const cards = [
  {
    href: "/services/talent-academy",
    title: "Talent & academy",
    desc: "Recruiting, cohort learning, assessments, and continuous upskilling—so teams are client-ready.",
  },
  {
    href: "/services/delivery",
    title: "Delivery & leadership",
    desc: "Program execution, delivery management, and special initiatives with transparent governance.",
  },
  {
    href: "/services/platform",
    title: "Platform & operations",
    desc: "One system for talent, CRM, projects, and finance—visibility without spreadsheet chaos.",
  },
] as const;

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">Services</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0a1628]">Solutions for global engineering</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">
        We combine people, process, and software: structured talent pipelines, accountable delivery, and an integrated
        operating platform. Below are the three pillars—each with dedicated detail.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <MarketingImage
          src={siteImages.datacenterSpecialist}
          alt="IT specialist reviewing infrastructure in a data center"
          aspect="video"
        />
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-[#0a1628]">Technologies & industries</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            We work across modern web and cloud stacks, data and AI platforms, and enterprise integration patterns.
            Industries include financial services, health and life sciences, technology, energy, and public-sector
            programs—always with sector-appropriate security and compliance.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow"
          >
            <h2 className="text-lg font-semibold text-[#0a1628]">{c.title}</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.desc}</p>
            <span className="mt-4 inline-block text-sm font-medium text-[#0b5fff]">Read more →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

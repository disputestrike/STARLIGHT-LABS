import type { Metadata } from "next";
import Link from "next/link";
import { MarketingImage } from "@/components/marketing/MarketingImage";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Services & solutions",
  description:
    "Engineering delivery, talent operations, cloud and data, quality, and the Starlight platform—how we work with clients end to end.",
};

const pillars = [
  {
    href: "/services/talent-academy",
    title: "Talent & academy",
    desc: "Recruiting, cohort learning, assessments, and continuous upskilling—so teams are client-ready before they bill.",
  },
  {
    href: "/services/delivery",
    title: "Delivery & leadership",
    desc: "Program execution, delivery management, and special initiatives with transparent governance and stakeholder communication.",
  },
  {
    href: "/services/platform",
    title: "Platform & operations",
    desc: "One system for talent, CRM, projects, and finance—visibility without spreadsheet chaos.",
  },
] as const;

const offerings = [
  {
    title: "Custom software & product engineering",
    body: "End-to-end product builds, modernization of legacy stacks, and iterative delivery with clear milestones and code quality gates.",
  },
  {
    title: "Cloud, platform & integration",
    body: "Landing zones, CI/CD, API and event-driven integration, and operational hardening across major cloud providers and hybrid estates.",
  },
  {
    title: "Data, analytics & intelligent automation",
    body: "Pipelines, warehousing patterns, operational reporting, and workflow automation—implemented with ownership and observability, not black-box promises.",
  },
  {
    title: "Quality engineering & reliability",
    body: "Test strategy, automation, performance and resilience testing, and SRE practices that match client risk appetite.",
  },
  {
    title: "Security & compliance alignment",
    body: "Secure SDLC, access models, and evidence packs that support enterprise procurement and audit—not checkbox theater.",
  },
  {
    title: "Managed & embedded teams",
    body: "Blended squads, staff augmentation with management discipline, and follow-the-sun models where programs require it.",
  },
] as const;

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">Services</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0a1628]">What we deliver</h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        Starlight Labs combines engineering execution with talent operations: we recruit and develop people, run delivery
        with accountable leadership, and connect commercial reality to work in flight through one platform. Below is a
        practical map of how we help—from strategy-shaped execution to long-running programs.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <MarketingImage
          src={siteImages.datacenterSpecialist}
          alt="IT specialist reviewing infrastructure in a data center"
          aspect="video"
        />
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-[#0a1628]">Three pillars</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Everything routes through <strong className="font-medium text-slate-800">talent</strong>,{" "}
            <strong className="font-medium text-slate-800">delivery</strong>, and{" "}
            <strong className="font-medium text-slate-800">platform</strong>—so capacity, margin, and outcomes stay aligned.
            Explore each pillar for methods, roles, and engagement patterns.
          </p>
          <Link href="/industries" className="mt-4 inline-block text-sm font-semibold text-[#0b5fff] hover:underline">
            Industries we serve →
          </Link>
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {pillars.map((c) => (
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

      <h2 className="mt-20 text-2xl font-semibold text-[#0a1628]">Service lines &amp; capabilities</h2>
      <p className="mt-3 max-w-3xl text-slate-600">
        Engagements mix these capabilities depending on your roadmap—not every label below applies to every client. We scope
        honestly and staff to match.
      </p>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {offerings.map((o) => (
          <div key={o.title} className="border-t border-slate-200 pt-8">
            <h3 className="text-base font-semibold text-[#0a1628]">{o.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{o.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-lg border border-slate-200 bg-slate-50 p-8">
        <h2 className="text-lg font-semibold text-[#0a1628]">Start a conversation</h2>
        <p className="mt-2 text-sm text-slate-600">
          Tell us about your programs, constraints, and timelines. We respond with realistic delivery options—no public
          pricing on the web; commercial terms are discussed directly.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-md bg-[#0b5fff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0a52cc]"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}

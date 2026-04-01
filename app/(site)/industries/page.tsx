import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Sectors Starlight Labs serves with engineering delivery, talent programs, and platform operations—aligned to regulation and risk.",
};

const industries = [
  {
    id: "financial-services",
    name: "Financial services & banking",
    body: "Core systems modernization, payments, risk and reporting integrations, and secure SDLC practices aligned to audit and regulatory expectations.",
  },
  {
    id: "health-life-sciences",
    name: "Health & life sciences",
    body: "Product engineering with privacy-by-design, interoperability, and documentation suitable for regulated environments.",
  },
  {
    id: "technology-software",
    name: "Technology & software",
    body: "SaaS delivery, platform engineering, and scale-up programs for product companies that need velocity without sacrificing reliability.",
  },
  {
    id: "energy-industrials",
    name: "Energy & industrials",
    body: "Operations technology, field-to-cloud integration, and long-lived systems where safety and uptime matter.",
  },
  {
    id: "public-sector-education",
    name: "Public sector & education",
    body: "Transparent delivery models, accessibility-aware interfaces, and programs that respect procurement and governance cycles.",
  },
  {
    id: "retail-logistics-consumer",
    name: "Retail, logistics & consumer",
    body: "Omnichannel experiences, supply-chain visibility, and integration across partners and legacy estates.",
  },
] as const;

export default function IndustriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">Industries</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0a1628]">Where we focus</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">
        We align squads, tooling, and governance to sector norms—not a one-size template. Below are representative
        industries; engagement models combine dedicated teams, hybrid pods, and outcome-based delivery.
      </p>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {industries.map((row) => (
          <div key={row.id} id={row.id} className="scroll-mt-28 border-t border-slate-200 pt-8">
            <h2 className="text-lg font-semibold text-[#0a1628]">{row.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{row.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-lg border border-slate-200 bg-slate-50 p-8">
        <h2 className="text-lg font-semibold text-[#0a1628]">Discuss your context</h2>
        <p className="mt-2 text-sm text-slate-600">
          Share sector, constraints, and timelines—we propose delivery shapes that fit, including security, data residency,
          and partner ecosystems.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded-md bg-[#0b5fff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0a52cc]"
          >
            Contact us
          </Link>
          <Link
            href="/services"
            className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-slate-400"
          >
            View services
          </Link>
        </div>
      </div>
    </div>
  );
}

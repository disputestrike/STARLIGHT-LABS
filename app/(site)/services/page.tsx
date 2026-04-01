import type { Metadata } from "next";
import Link from "next/link";
import { MarketingImage } from "@/components/marketing/MarketingImage";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Services & solutions",
  description:
    "Consulting, global delivery, digital, data & AI, cloud modernization, business applications, cyber, QA, and managed teams—how Starlight Labs engages end to end.",
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

const capabilityGroups: { title: string; intro?: string; items: string[] }[] = [
  {
    title: "Consulting & strategy",
    intro: "Problem framing, operating models, and roadmaps that engineering can actually deliver—not slides without owners.",
    items: [
      "Business and technology consulting",
      "Operating model and global delivery design",
      "Portfolio prioritization and transformation governance",
      "Vendor and partner evaluation",
    ],
  },
  {
    title: "Digital experience & customer engagement",
    intro: "Experiences across web, mobile, and service channels—measured by conversion, retention, and service quality.",
    items: [
      "Digital marketing & personalization foundations",
      "Digital commerce and subscription journeys",
      "Customer service and digital interaction platforms",
      "Employee digital workplace and collaboration",
      "Design systems, accessibility, and performance",
    ],
  },
  {
    title: "Data, analytics & AI",
    intro: "From trustworthy pipelines to applied AI—governed, observable, and tied to decisions.",
    items: [
      "Data strategy, warehousing, and lakehouse patterns",
      "Analytics, BI, and operational reporting",
      "Applied machine learning and MLOps",
      "Generative AI use cases (RAG, assistants) with guardrails",
      "Sustainability and ESG reporting automation where relevant",
    ],
  },
  {
    title: "Innovation & product engineering",
    intro: "Build, integrate, and experiment—without compromising security or maintainability.",
    items: [
      "Custom application development and maintenance (ADM)",
      "APIs, microservices, and integration hubs",
      "IoT and edge-connected products (where programs warrant)",
      "Blockchain and emerging tech—only when there is a clear business case",
      "Prototypes and incubation for new offerings",
    ],
  },
  {
    title: "Accelerate modernization & cloud",
    intro: "Velocity with control: automation, cloud landing zones, and measurable migration outcomes.",
    items: [
      "Enterprise agile, DevOps, and platform engineering",
      "Application modernization (refactor, re-platform, replace)",
      "Multi-cloud and hybrid architectures",
      "API economy enablement and developer portals",
      "Digital process automation and workflow orchestration",
      "Supply chain and operations systems integration",
      "Energy transition and network transformation programs (sector-dependent)",
    ],
  },
  {
    title: "Business applications ecosystem",
    intro: "We integrate and implement where enterprises already run—SAP, Oracle, Salesforce, Microsoft, and adjacent ISVs.",
    items: [
      "SAP (incl. S/4HANA) functional and technical tracks",
      "Oracle Cloud applications and technology stack",
      "Salesforce platform, Service Cloud, and industry clouds",
      "Microsoft Dynamics, Power Platform, and Microsoft 365 / Azure business workloads",
      "Service experience and CRM transformation",
    ],
  },
  {
    title: "Infrastructure, GCC & managed capacity",
    intro: "Run platforms reliably and stand up global capability centers with clear governance.",
    items: [
      "Cloud and data center infrastructure services",
      "Global capability centers (GCC) setup and operations",
      "Managed services and embedded squads",
      "Network and workplace infrastructure modernization",
    ],
  },
  {
    title: "Assure: security, quality & risk",
    intro: "Shift-left quality and defensible security—aligned to procurement and audit expectations.",
    items: [
      "Cybersecurity strategy, identity, and zero-trust patterns",
      "Application and cloud security assessments",
      "Quality engineering, test automation, and performance engineering",
      "Business process management (BPM) discipline and controls",
      "Regulatory alignment and evidence packs (sector-specific)",
    ],
  },
];

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
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">Services</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">What we deliver</h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
        Starlight Labs combines consulting depth with execution: we help clients navigate digital and AI-led change, then staff
        and run delivery with accountable leadership—backed by our talent, academy, and internal platform. Below is a
        practical map of capabilities we can bring (scoped per engagement—not every item applies to every client).
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
        <MarketingImage
          src={siteImages.datacenterSpecialist}
          alt="IT specialist reviewing infrastructure in a data center"
          aspect="video"
        />
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-[#0a1628] sm:text-xl">Three pillars</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
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

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition active:bg-slate-50 sm:p-6 sm:hover:border-slate-300 sm:hover:shadow"
          >
            <h2 className="text-base font-semibold text-[#0a1628] sm:text-lg">{c.title}</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.desc}</p>
            <span className="mt-4 inline-block text-sm font-medium text-[#0b5fff]">Read more →</span>
          </Link>
        ))}
      </div>

      <h2 className="mt-16 text-xl font-semibold text-[#0a1628] sm:text-2xl">Capability map</h2>
      <p className="mt-3 max-w-3xl text-sm text-slate-600 sm:text-base">
        Organized like a global services catalog—so you can see where we plug in. Commercial models (fixed capacity,
        time-and-materials, outcome-based) are agreed per pursuit.
      </p>

      <div className="mt-10 space-y-12">
        {capabilityGroups.map((group) => (
          <section key={group.title} className="border-t border-slate-200 pt-10 first:border-t-0 first:pt-0">
            <h3 className="text-lg font-semibold text-[#0a1628]">{group.title}</h3>
            {group.intro ? <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{group.intro}</p> : null}
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-slate-100 bg-slate-50/80 px-3 py-2.5 text-sm text-slate-700 sm:px-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <h2 className="mt-16 text-xl font-semibold text-[#0a1628] sm:text-2xl">How engagements often combine</h2>
      <p className="mt-3 max-w-3xl text-sm text-slate-600 sm:text-base">
        These are recurring bundles—not product names. We tailor squads, governance, and tooling to your constraints.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
        {offerings.map((o) => (
          <div key={o.title} className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
            <h3 className="text-base font-semibold text-[#0a1628]">{o.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{o.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-lg border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-[#0a1628]">Start a conversation</h2>
        <p className="mt-2 text-sm text-slate-600">
          Tell us about your programs, constraints, and timelines. We respond with realistic delivery options—pricing and
          statements of work are discussed directly, not on the public web.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-md bg-[#0b5fff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0a52cc]"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}

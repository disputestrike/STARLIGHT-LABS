import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case studies",
  description: "Representative client outcomes from Starlight Labs delivery—anonymized where required.",
};

const studies = [
  {
    title: "Multi-squad program: one reporting spine",
    problem:
      "A global client had several vendors and internal teams shipping features on different cadences; leadership lacked a single view of progress, risk, and utilization.",
    approach:
      "We aligned squads on a shared delivery operating model: weekly steering, common definition of done, and dashboards fed from the same work-management and time data.",
    outcome:
      "Predictability improved within two quarters: fewer surprise slips, clearer tradeoffs in steering, and finance could explain margin movement without spreadsheet archaeology.",
    sector: "Technology / software",
  },
  {
    title: "Regulated environment: audit-ready SDLC",
    problem:
      "An enterprise needed to accelerate releases without weakening evidence for auditors—change records, access reviews, and test artifacts had to stay defensible.",
    approach:
      "We embedded secure SDLC practices, automated more of the evidence trail, and trained squads on what “audit-ready” means in daily work—not as a last-minute scramble.",
    outcome:
      "Release frequency increased while audit findings on engineering process trended down; teams spent less time reconstructing history during reviews.",
    sector: "Financial services pattern",
  },
  {
    title: "Academy-to-production: ramping a new product line",
    problem:
      "A product group needed to stand up a new line of business with engineers who were strong on fundamentals but new to the client’s stack and domain.",
    approach:
      "Structured academy-style onboarding paired with production squads: code-review norms, observability baselines, and explicit quality gates before customer-facing cutovers.",
    outcome:
      "Time-to-first meaningful contribution shortened; defect rates in early releases stayed within agreed thresholds because gates were enforced, not debated ad hoc.",
    sector: "Cross-industry",
  },
  {
    title: "Data platform: pipelines teams actually trust",
    problem:
      "Analytics and ML consumers could not rely on freshness or lineage; ad hoc extracts duplicated logic and broke silently.",
    approach:
      "We implemented governed ingestion, transformation contracts, and monitoring—so failures page the right owners and dashboards show SLAs, not just charts.",
    outcome:
      "Downstream teams spent less time reconciling numbers; ML and reporting could agree on “one source of truth” for core entities.",
    sector: "Data / analytics",
  },
] as const;

export default function CaseStudiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">Evidence</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0a1628]">Case studies</h1>
      <p className="mt-4 text-lg text-slate-600">
        The stories below are anonymized composites drawn from real delivery work—names and products omitted where contracts
        require confidentiality. They illustrate how we engage, not a guarantee of future results.
      </p>

      <div className="mt-12 space-y-14">
        {studies.map((s) => (
          <article key={s.title} className="border-b border-slate-200 pb-14 last:border-0 last:pb-0">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{s.sector}</p>
            <h2 className="mt-2 text-xl font-semibold text-[#0a1628]">{s.title}</h2>
            <h3 className="mt-6 text-sm font-semibold text-slate-800">Problem</h3>
            <p className="mt-2 text-slate-600 leading-relaxed">{s.problem}</p>
            <h3 className="mt-6 text-sm font-semibold text-slate-800">Approach</h3>
            <p className="mt-2 text-slate-600 leading-relaxed">{s.approach}</p>
            <h3 className="mt-6 text-sm font-semibold text-slate-800">Outcome</h3>
            <p className="mt-2 text-slate-600 leading-relaxed">{s.outcome}</p>
          </article>
        ))}
      </div>

      <p className="mt-12 text-slate-600">
        Request sector-relevant detail during a conversation with our team—subject to confidentiality and what we can share.
      </p>
      <Link href="/contact" className="mt-6 inline-block font-medium text-[#0b5fff] hover:underline">
        Contact us →
      </Link>
    </div>
  );
}

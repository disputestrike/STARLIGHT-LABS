import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case studies",
  description: "Client outcomes and representative work from Starlight Labs (preview).",
};

export default function CaseStudiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">Evidence</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0a1628]">Case studies (preview)</h1>
      <p className="mt-4 text-lg text-slate-600">
        We are preparing anonymized stories across velocity improvement, cost transparency, and platform adoption. Each
        will include problem, approach, metrics, and lessons learned.
      </p>
      <ul className="mt-10 list-disc space-y-3 pl-5 text-slate-600">
        <li>Global program: multi-squad delivery with unified reporting</li>
        <li>Regulated environment: secure SDLC and audit-ready artifacts</li>
        <li>Academy-to-production: ramping a new product line with measurable quality gates</li>
      </ul>
      <p className="mt-8 text-slate-600">
        Request sector-relevant examples during a conversation with our team—subject to confidentiality.
      </p>
      <Link href="/contact" className="mt-8 inline-block font-medium text-[#0b5fff] hover:underline">
        Contact us →
      </Link>
    </div>
  );
}

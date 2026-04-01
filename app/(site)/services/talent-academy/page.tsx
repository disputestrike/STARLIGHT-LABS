import type { Metadata } from "next";
import Link from "next/link";
import { MarketingImage } from "@/components/marketing/MarketingImage";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Talent & academy",
  description: "Recruiting, cohort programs, assessments, and continuous learning at Starlight Labs.",
};

export default function TalentAcademyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <Link href="/services" className="text-sm font-medium text-[#0b5fff] hover:underline">
        ← Services
      </Link>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">Talent & academy</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0a1628]">Build the bench clients trust</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">
        We run structured recruiting, skills assessments, and academy-style cohorts where they fit—so engineers meet a
        clear bar before they join client work.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
        <MarketingImage
          src={siteImages.techAcademy}
          alt="Instructor guiding students in a coding workshop"
          aspect="video"
          priority
        />
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <h2 className="text-xl font-semibold text-[#0a1628]">What we offer</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Role-based learning paths (full stack, backend, data, platform)</li>
            <li>Hands-on projects and code review culture from day one</li>
            <li>Continuous learning budgets and internal guilds</li>
          </ul>
        </div>
      </div>

      <div className="mt-16 max-w-3xl space-y-6 text-slate-600 leading-relaxed">
        <h2 className="text-xl font-semibold text-[#0a1628]">Methodology</h2>
        <p>
          Curriculum is tied to delivery needs—not generic slides. We measure readiness with practical exercises, pair
          sessions, and manager sign-off before billable placement.
        </p>
        <Link href="/careers" className="inline-block font-medium text-[#0b5fff] hover:underline">
          View careers & academy roles →
        </Link>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { MarketingImage } from "@/components/marketing/MarketingImage";
import { TalentCommunityForm } from "@/components/marketing/TalentCommunityForm";
import { JOB_POSTINGS } from "@/lib/careers/jobs";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open roles at Starlight Labs—engineering, platform, delivery, marketing & social, and talent programs. Apply online.",
};

export default function CareersIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">Careers</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">Explore opportunities</h1>
      <p className="mt-4 max-w-2xl text-slate-600 leading-relaxed">
        We hire across engineering, platform, delivery, and talent. Paths include early career, experienced professionals,
        internships, and campus programs. Every application is reviewed with confidentiality and compliance in mind.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <section id="experienced-professionals" className="scroll-mt-28 rounded-lg border border-slate-200 bg-slate-50/80 p-5">
          <h2 className="text-base font-semibold text-[#0a1628]">Experienced professionals</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Staff, lead, and principal roles across engineering, delivery, and platform—client-facing ownership and clear
            accountability.
          </p>
          <Link href="#open-roles" className="mt-3 inline-block text-sm font-medium text-[#0b5fff] hover:underline">
            Browse roles below
          </Link>
        </section>
        <section id="early-career-internships" className="scroll-mt-28 rounded-lg border border-slate-200 bg-slate-50/80 p-5">
          <h2 className="text-base font-semibold text-[#0a1628]">Early career &amp; internships</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Structured onboarding, mentorship, and paths from classroom or internship into billable work where programs
            allow.
          </p>
          <Link href="#open-roles" className="mt-3 inline-block text-sm font-medium text-[#0b5fff] hover:underline">
            See relevant openings
          </Link>
        </section>
        <section id="campus-programs" className="scroll-mt-28 rounded-lg border border-slate-200 bg-slate-50/80 p-5">
          <h2 className="text-base font-semibold text-[#0a1628]">Campus &amp; graduates</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Career days, cohort pipelines, and graduate hiring—aligned to regional calendars and merit-based assessment.
          </p>
          <Link href="#open-roles" className="mt-3 inline-block text-sm font-medium text-[#0b5fff] hover:underline">
            View programs &amp; roles
          </Link>
        </section>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
        <MarketingImage
          src={siteImages.graduationCelebration}
          alt="Graduates celebrating with diplomas outdoors"
          aspect="video"
        />
        <div className="space-y-4 text-slate-600">
          <h2 className="text-xl font-semibold text-[#0a1628]">Grow with us</h2>
          <p>
            From academy and internship tracks to principal engineering and delivery leadership, we invest in clear
            expectations, feedback, and paths that reward performance. Benefits and mobility frameworks vary by region and
            role—details are shared during recruiting.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4 text-slate-600 lg:order-1">
          <h2 className="text-xl font-semibold text-[#0a1628]">Culture & flexibility</h2>
          <p>
            Teams blend remote and in-person collaboration. We emphasize written communication, respectful debate, and
            outcomes over performative hours—while maintaining the accountability our clients require.
          </p>
        </div>
        <div className="lg:order-2">
          <MarketingImage
            src={siteImages.graduatesCafe}
            alt="Colleagues collaborating at an outdoor table with laptops"
            aspect="video"
          />
        </div>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
        <MarketingImage
          src={siteImages.remoteGlobalDeveloper}
          alt="Developer working remotely with a world map on a secondary monitor"
          aspect="video"
        />
        <div className="space-y-4 text-slate-600">
          <h2 className="text-xl font-semibold text-[#0a1628]">Remote & global</h2>
          <p>
            Many roles are remote-friendly across regions; some client programs require overlap windows or travel. Job posts
            spell out location and mobility expectations clearly.
          </p>
        </div>
      </div>

      <div className="mt-16 max-w-xl">
        <TalentCommunityForm />
      </div>

      <h2 id="open-roles" className="scroll-mt-28 mt-20 text-2xl font-semibold text-[#0a1628]">
        Open roles
      </h2>
      <div className="mt-8 divide-y divide-slate-200 border-t border-slate-200">
        {JOB_POSTINGS.map((job) => (
          <Link
            key={job.slug}
            href={`/careers/${job.slug}`}
            className="flex flex-col gap-2 py-6 transition active:bg-slate-50/80 sm:flex-row sm:items-center sm:justify-between sm:hover:bg-slate-50/80"
          >
            <div>
              <h3 className="text-lg font-semibold text-[#0a1628]">{job.title}</h3>
              <p className="text-sm text-slate-500">
                {job.department} · {job.location} · {job.type}
              </p>
            </div>
            <span className="text-sm font-medium text-[#0b5fff]">View role →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

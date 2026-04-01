import type { Metadata } from "next";
import Link from "next/link";
import { MarketingImage } from "@/components/marketing/MarketingImage";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Foundation",
  description:
    "Community programs: computer literacy, youth STEM, and education partnerships aligned with Starlight Labs values.",
};

export default function FoundationPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">Community</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0a1628]">Starlight Foundation</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">
        Technology only matters when it reaches people. From our base in Nigeria, we widen access through computer literacy,
        introductory STEM and coding, and mentorship that connects practicing engineers with the next generation—prioritizing
        inclusion, safety, and long-term partnerships with schools and nonprofits.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
        <MarketingImage
          src={siteImages.foundationStemOutreach}
          alt="Instructor with children learning at computers"
          aspect="video"
          priority
        />
        <div className="space-y-6 text-slate-600 leading-relaxed">
          <h2 className="text-xl font-semibold text-[#0a1628]">Programs</h2>
          <ul className="list-disc space-y-3 pl-5">
            <li>Community labs and school partnerships for foundational digital skills (keyboard, browsers, safe online habits)</li>
            <li>Coding workshops and project-based STEM for youth—small groups with clear learning outcomes</li>
            <li>Mentor hours with our delivery and academy staff; career conversations without unrealistic promises</li>
            <li>Equipment and connectivity guidance where institutions need practical help to get started</li>
          </ul>
          <p>
            Initiatives are co-designed with educators and local leaders—prioritizing safety, inclusion, and sustainable
            impact over one-off photo ops. Where we can, we align foundation activity with hiring pipelines so merit and
            assessment stay the gate, not connections alone.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <h2 className="text-xl font-semibold text-[#0a1628]">Academy pathways</h2>
          <p>
            Where we run cohort programs, foundation participants may feed into structured academy tracks—always on merit
            and assessment, never as a quota. We publish outcomes and stories as programs mature.
          </p>
        </div>
        <MarketingImage
          src={siteImages.techAcademy}
          alt="Students in a technology academy classroom with laptops"
          aspect="video"
        />
      </div>

      <div className="mt-16 rounded-lg border border-slate-200 bg-slate-50 p-8">
        <h2 className="text-xl font-semibold text-[#0a1628]">Get involved</h2>
        <p className="mt-3 text-slate-600">
          Schools, nonprofits, and sponsors: tell us about your institution, age range, and goals. We respond with
          realistic next steps.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-md bg-[#0b5fff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0a52cc]"
        >
          Contact foundation team
        </Link>
      </div>
    </div>
  );
}

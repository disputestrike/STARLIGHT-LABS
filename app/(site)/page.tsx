import type { Metadata } from "next";
import Link from "next/link";
import { HeroRotator } from "@/components/marketing/HeroRotator";
import { MarketingImage } from "@/components/marketing/MarketingImage";
import { ValuePropositionBand } from "@/components/marketing/ValuePropositionBand";
import { siteImages } from "@/lib/site-images";
import { SITE_TAGLINE } from "@/lib/site-tagline";

export const metadata: Metadata = {
  title: "Home",
  description: SITE_TAGLINE,
};

export default function HomePage() {
  return (
    <>
      <ValuePropositionBand />
      <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <HeroRotator />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              We recruit, train, and onboard engineers; run delivery and HR with enterprise-grade discipline; and give
              clients one operating system for talent, projects, CRM, and finance. Commercial terms are discussed when you
              are ready—no public pricing.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/about"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-[#0b5fff] px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#0a52cc]"
              >
                About Starlight Labs
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-800 transition hover:border-slate-400"
              >
                Services & solutions
              </Link>
              <Link
                href="/careers"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md px-6 py-3 text-center text-sm font-semibold text-[#0b5fff] hover:underline"
              >
                Careers
              </Link>
            </div>
          </div>
          <MarketingImage
            src={siteImages.programmersCollaboration}
            alt="Engineers collaborating on code and architecture in a modern office"
            priority
            aspect="video"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Trusted delivery model</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-80 grayscale">
            {["Financial services", "Health & life sciences", "Technology", "Public sector", "Energy"].map((name) => (
              <span key={name} className="text-sm font-semibold text-slate-400">
                {name}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-slate-500">
            Representative industries—see{" "}
            <Link href="/industries" className="font-medium text-[#0b5fff] hover:underline">
              industries we serve
            </Link>
            . Named references and case studies are published as partnerships allow.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <MarketingImage
            src={siteImages.engineeringOutcomesWhiteboard}
            alt="Team mapping develop, deploy, and outcome on a glass board"
            aspect="video"
          />
          <div>
            <h2 className="text-2xl font-semibold text-[#0a1628]">Develop → deploy → outcome</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Delivery is not a slogan—it is a traceable path. We align squads to measurable outcomes, clear ownership, and
              transparent reporting so clients see progress every sprint.
            </p>
            <Link href="/services/delivery" className="mt-6 inline-block text-sm font-semibold text-[#0b5fff] hover:underline">
              How we deliver →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              title: "Talent & academy",
              body: "Structured programs, assessments, and continuous learning—so engineers are client-ready before they bill.",
              href: "/services/talent-academy",
            },
            {
              title: "Delivery & leadership",
              body: "Project execution, delivery management, and special initiatives—aligned to how global enterprises run work.",
              href: "/services/delivery",
            },
            {
              title: "One platform",
              body: "Talent, CRM, projects, and financial operations together—no siloed spreadsheets or opaque bench.",
              href: "/services/platform",
            },
          ].map((c) => (
            <div key={c.title} className="border-t border-slate-200 pt-8">
              <h3 className="text-lg font-semibold text-[#0a1628]">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.body}</p>
              <Link href={c.href} className="mt-4 inline-block text-sm font-medium text-[#0b5fff] hover:underline">
                Learn more
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-[#0a1628]">What clients say</h2>
              <blockquote className="mt-6 border-l-2 border-[#0b5fff] pl-6 text-slate-700 leading-relaxed">
                <p>
                  &ldquo;Starlight gave us predictable velocity and honest utilization data. We finally had one view of
                  delivery and cost across regions.&rdquo;
                </p>
                <footer className="mt-4 text-sm text-slate-500">— Program director, global enterprise</footer>
              </blockquote>
              <blockquote className="mt-8 border-l-2 border-slate-300 pl-6 text-slate-700 leading-relaxed">
                <p>
                  &ldquo;The academy pipeline meant we could scale a new product line without sacrificing code quality or
                  security reviews.&rdquo;
                </p>
                <footer className="mt-4 text-sm text-slate-500">— VP Engineering, growth-stage company</footer>
              </blockquote>
            </div>
            <MarketingImage
              src={siteImages.teamCollaborationOffice}
              alt="Diverse team reviewing data and dashboards together"
              aspect="video"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <MarketingImage
            src={siteImages.engineerAtWork}
            alt="Engineer focused at workstation in a bright office"
            aspect="video"
          />
          <div>
            <h2 className="text-2xl font-semibold text-[#0a1628]">Global reach, regional depth</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We operate distributed squads across time zones with regional leads who understand local compliance,
              language, and stakeholder expectations. Delivery hubs coordinate with client teams in the Americas, EMEA, and
              Asia-Pacific.
            </p>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-slate-600">
              <li>Follow-the-sun support for critical programs</li>
              <li>Consistent security and data-handling practices</li>
              <li>Transparent capacity and skills visibility in-platform</li>
            </ul>
            <Link href="/about" className="mt-6 inline-block text-sm font-semibold text-[#0b5fff] hover:underline">
              Our story →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-[#0a1628]">Evidence & outcomes</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            We are building a library of anonymized case studies—velocity uplift, cost transparency, and platform adoption.
            Ask our team for sector-relevant examples during conversation.
          </p>
          <Link
            href="/case-studies"
            className="mt-6 inline-flex rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-slate-400"
          >
            Case studies (preview)
          </Link>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#0a1628]">Foundation & community</h2>
              <p className="mt-3 max-w-xl text-slate-600">
                Teaching computer literacy and early STEM skills where we operate—partnering with schools and nonprofits.
              </p>
            </div>
            <Link
              href="/foundation"
              className="inline-flex shrink-0 rounded-md bg-[#0b5fff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0a52cc]"
            >
              Foundation programs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

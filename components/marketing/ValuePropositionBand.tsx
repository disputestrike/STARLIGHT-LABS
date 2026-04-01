import Link from "next/link";
import { SITE_TAGLINE } from "@/lib/site-tagline";
import { ValueFrameworkVisual } from "@/components/marketing/ValueFrameworkVisual";

/** Full-bleed value block — immediate “why Starlight” without competitor naming or buzzword stuffing. */
export function ValuePropositionBand() {
  return (
    <section
      className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#050d18] via-[#0a1628] to-[#0f3460]"
      aria-labelledby="value-proposition-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 4l26 15v30L30 64 4 49V19z' fill='none' stroke='%23fff' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200/90">Value proposition</p>
            <h2
              id="value-proposition-heading"
              className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.25rem] lg:leading-[1.15]"
            >
              Engineering delivery you can run, measure, and defend.
            </h2>
            <p className="mt-5 text-base font-medium leading-relaxed text-slate-100/95">{SITE_TAGLINE}</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-300/95">
              We connect recruiting and academy pipelines to accountable squads, transparent utilization, and a single
              operating view of projects, CRM, and finance—so leaders steer with facts, not folklore.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="rounded-md border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Explore services
              </Link>
              <Link
                href="/industries"
                className="rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white/95 transition hover:border-white/40 hover:bg-white/5"
              >
                Industries
              </Link>
              <Link href="/contact" className="rounded-md px-6 py-3 text-sm font-semibold text-sky-200 hover:text-white">
                Contact →
              </Link>
            </div>
          </div>
          <ValueFrameworkVisual />
        </div>
      </div>
    </section>
  );
}

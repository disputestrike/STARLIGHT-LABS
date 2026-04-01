import type { Metadata } from "next";
import Link from "next/link";
import { MarketingImage } from "@/components/marketing/MarketingImage";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Partnerships",
  description: "Strategic alliances, technology partnerships, and ecosystem relationships at Starlight Labs.",
};

export default function PartnershipsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">Partnerships</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0a1628]">Alliances & ecosystem</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">
        We work with cloud providers, ISVs, and implementation partners where it accelerates client outcomes. Logos and
        named references are published as agreements allow.
      </p>

      <div className="mt-12">
        <MarketingImage
          src={siteImages.teamCollaborationOffice}
          alt="Team collaborating around analytics and dashboards"
          aspect="wide"
        />
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-[#0a1628]">Technology partners</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Certifications and specializations are pursued where they map to client demand—always in service of fit, not
            shelfware.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-[#0a1628]">Services alliances</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Co-selling and referral relationships with firms that share our quality bar. We are selective and
            transparent with clients.
          </p>
        </div>
      </div>

      <Link
        href="/contact"
        className="mt-10 inline-flex rounded-md bg-[#0b5fff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0a52cc]"
      >
        Discuss a partnership
      </Link>
    </div>
  );
}

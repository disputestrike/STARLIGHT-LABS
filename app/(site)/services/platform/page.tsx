import type { Metadata } from "next";
import Link from "next/link";
import { MarketingImage } from "@/components/marketing/MarketingImage";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Platform & operations",
  description: "Integrated talent, CRM, projects, and finance on the Starlight platform.",
};

export default function PlatformPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <Link href="/services" className="text-sm font-medium text-[#0b5fff] hover:underline">
        ← Services
      </Link>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">Platform</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0a1628]">One system of record</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">
        Talent profiles, client CRM, project delivery, and financial operations share one backbone—so leaders see
        utilization, margin, and pipeline without reconciling spreadsheets.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
        <MarketingImage
          src={siteImages.datacenterSpecialist}
          alt="Engineer working with servers and monitoring in a data hall"
          aspect="video"
        />
        <div className="space-y-4 text-slate-600">
          <h2 className="text-xl font-semibold text-[#0a1628]">Reliability & security</h2>
          <p>
            We design for least-privilege access, audit trails, and environments that respect client data boundaries.
            Infrastructure patterns follow cloud-native best practices with observability baked in.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4 text-slate-600 lg:order-1">
          <h2 className="text-xl font-semibold text-[#0a1628]">Distributed teams</h2>
          <p>
            The platform supports globally distributed squads: time zones, approvals, and handoffs are first-class—not an
            afterthought.
          </p>
          <Link href="/dashboard" className="inline-block font-medium text-[#0b5fff] hover:underline">
            App dashboard →
          </Link>
        </div>
        <div className="lg:order-2">
          <MarketingImage
            src={siteImages.remoteGlobalDeveloper}
            alt="Professional working remotely with connectivity visualizations"
            aspect="video"
          />
        </div>
      </div>

      <div className="mt-12">
        <Link href="/api-docs" className="text-sm font-medium text-[#0b5fff] hover:underline">
          API documentation for integrators →
        </Link>
      </div>
    </div>
  );
}

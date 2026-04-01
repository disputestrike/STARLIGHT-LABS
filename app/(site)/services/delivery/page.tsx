import type { Metadata } from "next";
import Link from "next/link";
import { MarketingImage } from "@/components/marketing/MarketingImage";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Delivery & leadership",
  description: "Program execution, delivery management, and global delivery at Starlight Labs.",
};

export default function DeliveryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <Link href="/services" className="text-sm font-medium text-[#0b5fff] hover:underline">
        ← Services
      </Link>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">Delivery & leadership</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0a1628]">Execute with clarity</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">
        Delivery leads, technical program managers, and solution owners align squads to outcomes—milestones, risks, and
        stakeholder communication stay visible end to end.
      </p>

      <div className="mt-12">
        <MarketingImage
          src={siteImages.globalDeliveryTeam}
          alt="Team collaborating with global delivery and talent operations on displays"
          aspect="video"
        />
      </div>

      <div className="mt-12 max-w-3xl space-y-6 text-slate-600 leading-relaxed">
        <h2 className="text-xl font-semibold text-[#0a1628]">Operating model</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Defined ceremonies, documentation, and escalation paths</li>
          <li>Risk and dependency tracking tied to commercial reality</li>
          <li>Executive reporting that matches what engineering actually sees</li>
        </ul>
        <p>
          Special initiatives—integrations, migrations, and critical launches—get dedicated leadership and a clear
          definition of done.
        </p>
        <Link href="/contact" className="inline-block font-medium text-[#0b5fff] hover:underline">
          Talk to delivery →
        </Link>
      </div>
    </div>
  );
}

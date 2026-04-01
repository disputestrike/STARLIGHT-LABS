import type { Metadata } from "next";
import Link from "next/link";
import { MarketingImage } from "@/components/marketing/MarketingImage";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Who we are, how we operate, and how Starlight Labs delivers global engineering talent and client outcomes.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">About us</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-[#0a1628]">Who we are</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">
        Starlight Labs is a Nigerian technology company with an African delivery footprint—founded in 2020. We combine
        academy-style training, rigorous onboarding and HR, and disciplined client work for partners worldwide—supported by
        one internal platform for talent, projects, CRM, and finance.
      </p>

      <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6 text-slate-600 leading-relaxed">
          <h2 className="text-xl font-semibold text-[#0a1628]">History & vision</h2>
          <p>
            Founded in <strong className="text-slate-800">2020</strong> in Nigeria, we set out to close the gap between
            ambitious roadmaps and teams that can ship: too many organizations struggle with opaque outsourcing, weak talent
            pipelines, and tools that do not connect people to profit. Our vision is a trustworthy operating layer for
            engineering delivery—where talent, commercial reality, and client outcomes stay aligned from Lagos to global
            programs.
          </p>
          <h2 className="pt-6 text-xl font-semibold text-[#0a1628]">Mission & values</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-slate-800">Integrity:</strong> transparent utilization, honest risk reporting, and
              contracts we can defend.
            </li>
            <li>
              <strong className="text-slate-800">Craft:</strong> engineering excellence and continuous learning—not
              ticket-churning.
            </li>
            <li>
              <strong className="text-slate-800">Impact:</strong> outcomes clients feel in production and users trust.
            </li>
          </ul>
        </div>
        <MarketingImage
          src={siteImages.executiveLeader}
          alt="Professional leader in a modern office"
          aspect="portrait"
          sizes="(max-width: 1024px) 100vw, 400px"
        />
      </div>

      <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:items-center">
        <MarketingImage
          src={siteImages.leadEngineerIde}
          alt="Software engineer at a workstation with code on screen"
          aspect="video"
        />
        <div className="space-y-6 text-slate-600 leading-relaxed">
          <h2 className="text-xl font-semibold text-[#0a1628]">Innovation & engineering culture</h2>
          <p>
            We invest in internal R&amp;D sprints, reusable accelerators, and safe experimentation with AI-assisted
            development—always paired with human review, security gates, and client-specific compliance. Our engineers
            contribute to shared libraries, patterns, and playbooks so every squad benefits.
          </p>
          <p>
            Technology partnerships and cloud alliances are selected for client fit; we stay vendor-neutral where it
            matters and opinionated where it reduces risk.
          </p>
        </div>
      </div>

      <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <h2 className="text-xl font-semibold text-[#0a1628]">Global delivery footprint</h2>
          <p>
            Regional delivery leads coordinate blended teams across hubs and remote talent. We align on ways of working,
            security, and communication rhythms so distance does not become delay.
          </p>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-sm">
            <p className="font-medium text-[#0a1628]">Regions we serve</p>
            <p className="mt-2 text-slate-600">
              Americas · Europe &amp; Middle East · Africa · Asia-Pacific — with follow-the-sun options for critical
              programs.
            </p>
          </div>
        </div>
        <MarketingImage
          src={siteImages.globalDeliveryTeam}
          alt="Team in a conference room with global delivery and talent operations on screen"
          aspect="video"
        />
      </div>

      <div className="mt-16 border-t border-slate-200 pt-16">
        <h2 className="text-xl font-semibold text-[#0a1628]">Leadership</h2>
        <p className="mt-4 max-w-2xl text-slate-600">
          Biographies and photos of the executive team will appear here as we publish them publicly. Until then, engage
          our team through{" "}
          <Link href="/contact" className="font-medium text-[#0b5fff] hover:underline">
            contact
          </Link>{" "}
          for introductions.
        </p>
      </div>

      <div className="mt-12 space-y-6 text-slate-600 leading-relaxed">
        <h2 className="text-xl font-semibold text-[#0a1628]">Partners & products</h2>
        <p>
          Case studies, flagship programs, and partner logos are published as relationships allow. Explore{" "}
          <Link href="/partnerships" className="font-medium text-[#0b5fff] hover:underline">
            partnerships
          </Link>{" "}
          and{" "}
          <Link href="/case-studies" className="font-medium text-[#0b5fff] hover:underline">
            case studies
          </Link>
          .
        </p>
        <h2 className="pt-6 text-xl font-semibold text-[#0a1628]">Join us</h2>
        <p>
          We hire across engineering, platform, delivery, and talent. Explore{" "}
          <Link href="/careers" className="font-medium text-[#0b5fff] hover:underline">
            careers
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="font-medium text-[#0b5fff] hover:underline">
            contact
          </Link>{" "}
          the team.
        </p>
      </div>
    </div>
  );
}

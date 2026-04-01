import type { Metadata } from "next";
import { ContactForm } from "@/components/marketing/ContactForm";
import { MarketingImage } from "@/components/marketing/MarketingImage";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Starlight Labs for partnerships, careers, foundation programs, and general inquiries.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">Contact</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0a1628]">Let&apos;s talk</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">
        Sales, careers, foundation partnerships, or press—we route every message to the right team. For urgent matters,
        include your time zone and preferred callback window.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start">
        <div className="space-y-8">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            <p className="font-semibold text-[#0a1628]">General &amp; sales</p>
            <p className="mt-2">
              Email:{" "}
              <a href="mailto:hello@starlightlabs.com" className="text-[#0b5fff] hover:underline">
                hello@starlightlabs.com
              </a>
            </p>
            <p className="mt-2">
              Phone:{" "}
              <a href="tel:+18005550199" className="text-[#0b5fff] hover:underline">
                +1 (800) 555-0199
              </a>{" "}
              <span className="text-slate-500">(placeholder—update for production)</span>
            </p>
            <p className="mt-2 text-slate-500">Business hours: follow-the-sun coverage; regional hours on request.</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            <p className="font-semibold text-[#0a1628]">Careers</p>
            <p className="mt-2">
              Email:{" "}
              <a href="mailto:careers@starlightlabs.com" className="text-[#0b5fff] hover:underline">
                careers@starlightlabs.com
              </a>
            </p>
          </div>
          <MarketingImage
            src={siteImages.engineerAtWork}
            alt="Engineer at work in a professional office environment"
            aspect="video"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#0a1628]">Send a message</h2>
          <p className="mt-2 text-sm text-slate-600">
            Your submission is stored for follow-up in line with our privacy policy.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

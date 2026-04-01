import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Starlight Labs handles personal data on this website and related forms.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">Legal</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0a1628]">Privacy policy</h1>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-slate-600">
        <p>
          We collect information you submit through contact and careers forms (such as name, email, company, messages, and
          application materials) to respond to inquiries and manage recruiting. Lawful bases may include consent and
          legitimate interests in operating our business.
        </p>
        <p>
          Data is stored in secured systems with access limited to personnel who need it. We retain information as long as
          needed for the purpose collected and as required by law.
        </p>
        <p>
          Depending on your location, you may have rights to access, correct, delete, or object to certain processing.
          Contact us through the{" "}
          <Link href="/contact" className="text-[#0b5fff] hover:underline">
            contact page
          </Link>{" "}
          to exercise applicable rights.
        </p>
        <p>
          We may use subprocessors for hosting and email delivery; agreements require appropriate safeguards.
        </p>
        <p className="text-slate-500">Last updated: April 2026</p>
      </div>
    </div>
  );
}

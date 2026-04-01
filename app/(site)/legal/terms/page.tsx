import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms of use for the Starlight Labs website and related public content.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">Legal</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0a1628]">Terms of use</h1>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-slate-600">
        <p>
          This website is provided by Starlight Labs for general information. Content may change without notice. Nothing
          here constitutes professional, legal, or financial advice.
        </p>
        <p>
          You agree not to misuse the site, attempt unauthorized access, or use automated means to scrape or overload our
          systems beyond reasonable browsing and indexing permitted by robots rules we publish.
        </p>
        <p>
          Trademarks and branding on this site are owned by their respective owners. Unauthorised use is prohibited.
        </p>
        <p>
          For contractual terms governing services or software, those are set out in separate agreements between you and
          Starlight Labs.
        </p>
        <p className="text-slate-500">Last updated: April 2026</p>
      </div>
    </div>
  );
}

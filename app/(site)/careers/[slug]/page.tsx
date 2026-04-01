import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobBySlug, getAllJobSlugs } from "@/lib/careers/jobs";
import { ApplyForm } from "@/components/marketing/ApplyForm";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllJobSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const job = getJobBySlug(params.slug);
  if (!job) return { title: "Role" };
  return {
    title: job.title,
    description: job.summary,
  };
}

export default function CareerDetailPage({ params }: Props) {
  const job = getJobBySlug(params.slug);
  if (!job) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <Link href="/careers" className="text-sm font-medium text-[#0b5fff] hover:underline">
        ← All roles
      </Link>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">{job.department}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">{job.title}</h1>
      <p className="mt-2 text-sm text-slate-500">
        {job.location} · {job.type}
      </p>
      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50/90 px-4 py-3 text-sm text-slate-800 sm:px-5">
        <p className="font-semibold text-[#0a1628]">Compensation (Nigeria market)</p>
        <p className="mt-1 text-slate-700">{job.compensationNgn}</p>
        <p className="mt-2 text-xs text-slate-500">
          Ranges reflect typical gross pay for similar roles in Nigerian IT services and product employers (Lagos / major
          hubs)—not foreign salaries converted to naira. Final offer depends on interview, level, and budget.
        </p>
      </div>
      <p className="mt-8 text-base leading-relaxed text-slate-600 sm:text-lg">{job.summary}</p>

      <h2 className="mt-12 text-lg font-semibold text-[#0a1628]">What you will do</h2>
      <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-slate-600 sm:text-base">
        {job.responsibilities.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg font-semibold text-[#0a1628]">Required qualifications</h2>
      <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-slate-600 sm:text-base">
        {job.qualifications.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>

      {job.preferredQualifications?.length ? (
        <>
          <h2 className="mt-10 text-lg font-semibold text-[#0a1628]">Preferred qualifications</h2>
          <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-slate-600 sm:text-base">
            {job.preferredQualifications.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </>
      ) : null}

      <div className="mt-14 border-t border-slate-200 pt-10">
        <h2 className="text-lg font-semibold text-[#0a1628]">Apply</h2>
        <p className="mt-2 text-sm text-slate-600">
          Submit your details and resume (PDF or Word, up to 5MB). We use your information only for recruiting and related
          HR processes.
        </p>
        <div className="mt-6">
          <ApplyForm job={job} />
        </div>
      </div>
    </div>
  );
}

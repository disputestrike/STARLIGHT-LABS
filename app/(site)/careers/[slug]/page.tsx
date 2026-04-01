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
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <Link href="/careers" className="text-sm font-medium text-[#0b5fff] hover:underline">
        ← All roles
      </Link>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">{job.department}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">{job.title}</h1>
      <p className="mt-2 text-sm text-slate-500">
        {job.location} · {job.type}
      </p>
      <p className="mt-8 text-lg leading-relaxed text-slate-600">{job.summary}</p>

      <h2 className="mt-12 text-lg font-semibold text-[#0a1628]">Responsibilities</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
        {job.responsibilities.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg font-semibold text-[#0a1628]">Qualifications</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
        {job.qualifications.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>

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

"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

/** Public marketing footer: employees sign in here—no public “register” (staff onboarding is internal/admin). */
export function FooterAccountLinks() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <span
        className="inline-block h-4 w-20 animate-pulse rounded bg-slate-200/80"
        title="Checking sign-in status"
        aria-busy="true"
        aria-label="Checking sign-in status"
      />
    );
  }

  if (session?.user) {
    return (
      <div className="flex flex-col gap-2">
        <span className="truncate text-sm text-slate-600">{session.user.email}</span>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-left text-sm text-slate-600 hover:text-slate-900"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <Link href="/auth/login" className="text-sm text-slate-600 hover:text-slate-900">
      Employee sign-in
    </Link>
  );
}

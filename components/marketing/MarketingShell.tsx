"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/foundation", label: "Foundation" },
  { href: "/careers", label: "Careers" },
  { href: "/news", label: "News" },
  { href: "/partnerships", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

export function MarketingShell({
  children,
  showGoogleSignIn = false,
}: {
  children: React.ReactNode;
  showGoogleSignIn?: boolean;
}) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="text-lg font-semibold tracking-tight text-[#0a1628]">Starlight Labs</span>
          </Link>
          <details className="relative md:hidden">
            <summary className="cursor-pointer list-none rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <div className="absolute right-0 z-50 mt-1 min-w-[12rem] rounded-md border border-slate-200 bg-white py-1 shadow-lg">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
          <nav className="hidden flex-wrap items-center justify-end gap-0.5 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <AuthButtons showGoogleSignIn={showGoogleSignIn} />
            <Link
              href="/auth/login"
              className="hidden rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 sm:inline-block"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="rounded-md bg-[#0b5fff] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0a52cc]"
            >
              Register
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            <div className="sm:col-span-2 lg:col-span-2">
              <p className="text-lg font-semibold text-[#0a1628]">Starlight Labs</p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                Global engineering delivery and talent operations—training, onboarding, HR, and client outcomes on one
                platform.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Company</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/services" className="hover:text-slate-900">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-slate-900">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/foundation" className="hover:text-slate-900">
                    Foundation
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-slate-900">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="hover:text-slate-900">
                    Newsroom
                  </Link>
                </li>
                <li>
                  <Link href="/partnerships" className="hover:text-slate-900">
                    Partnerships
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-slate-900">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Product</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/dashboard" className="hover:text-slate-900">
                    App dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/api-docs" className="hover:text-slate-900">
                    API documentation
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="hover:text-slate-900">
                    Case studies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Legal</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/legal/terms" className="hover:text-slate-900">
                    Terms of use
                  </Link>
                </li>
                <li>
                  <Link href="/legal/privacy" className="hover:text-slate-900">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/cookies" className="hover:text-slate-900">
                    Cookie policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-slate-200 pt-8 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Starlight Labs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function AuthButtons({ showGoogleSignIn }: { showGoogleSignIn: boolean }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="hidden w-16 sm:inline-block" aria-hidden />;
  }

  if (session?.user) {
    return (
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="hidden text-sm font-medium text-slate-600 hover:text-slate-900 sm:inline"
      >
        Sign out
      </button>
    );
  }

  if (!showGoogleSignIn) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="hidden text-sm font-medium text-[#0b5fff] hover:underline sm:inline"
    >
      Google
    </button>
  );
}

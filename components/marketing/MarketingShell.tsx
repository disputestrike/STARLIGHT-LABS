"use client";

import Link from "next/link";
import { FooterAccountLinks } from "@/components/marketing/FooterAccountLinks";
import { NavDropdown, type NavDropdownItem } from "@/components/marketing/NavDropdown";
import { SITE_TAGLINE } from "@/lib/site-tagline";

const servicesItems: NavDropdownItem[] = [
  { href: "/services", label: "All services", description: "Capabilities, pillars, and how we engage" },
  { href: "/services/talent-academy", label: "Talent & academy", description: "Recruiting, learning, readiness" },
  { href: "/services/delivery", label: "Delivery & leadership", description: "Programs, governance, outcomes" },
  { href: "/services/platform", label: "Platform & operations", description: "Talent, CRM, projects, finance" },
];

const industriesItems: NavDropdownItem[] = [
  { href: "/industries", label: "All industries", description: "Sectors and engagement models" },
  { href: "/industries#financial-services", label: "Financial services & banking" },
  { href: "/industries#health-life-sciences", label: "Health & life sciences" },
  { href: "/industries#technology-software", label: "Technology & software" },
  { href: "/industries#energy-industrials", label: "Energy & industrials" },
  { href: "/industries#public-sector-education", label: "Public sector & education" },
  { href: "/industries#retail-logistics-consumer", label: "Retail, logistics & consumer" },
];

const careersItems: NavDropdownItem[] = [
  { href: "/careers#open-roles", label: "All open roles", description: "Current postings and apply" },
  { href: "/careers#experienced-professionals", label: "Experienced professionals", description: "Staff to principal tracks" },
  { href: "/careers#early-career-internships", label: "Early career & internships", description: "Mentored paths into delivery" },
  { href: "/careers#campus-programs", label: "Campus & graduates", description: "Events, cohorts, pipelines" },
];

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900 supports-[padding:max(0px)]:pb-[env(safe-area-inset-bottom)]">
      <header className="sticky top-0 z-50 overflow-visible border-b border-slate-200/90 bg-white/95 backdrop-blur supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex min-h-[3.5rem] max-w-6xl items-center justify-between gap-4 overflow-visible px-4 sm:min-h-16 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="shrink-0 py-2 text-base font-semibold tracking-tight text-[#0a1628] sm:text-lg"
          >
            Starlight Labs
          </Link>
          <details className="relative md:hidden">
            <summary className="flex min-h-[44px] min-w-[44px] cursor-pointer list-none items-center justify-center rounded-md border border-slate-300 px-3 text-sm font-medium text-slate-700 [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <div className="absolute right-0 z-50 mt-1 max-h-[min(80vh,520px)] w-[min(100vw-2rem,20rem)] overflow-y-auto rounded-md border border-slate-200 bg-white py-2 shadow-lg">
              <Link href="/about" className="block min-h-[44px] px-4 py-3 text-sm text-slate-800 hover:bg-slate-50">
                About us
              </Link>
              <p className="px-4 pt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Services</p>
              {servicesItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block min-h-[44px] px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              ))}
              <p className="px-4 pt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Industries</p>
              {industriesItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block min-h-[44px] px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              ))}
              <p className="px-4 pt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Careers</p>
              {careersItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block min-h-[44px] px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/news" className="mt-1 block min-h-[44px] px-4 py-3 text-sm text-slate-800 hover:bg-slate-50">
                News
              </Link>
            </div>
          </details>
          <nav className="ml-auto hidden items-center gap-1 overflow-visible md:flex" aria-label="Primary">
            <Link
              href="/about"
              className="rounded-md px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              About us
            </Link>
            <NavDropdown label="Services" items={servicesItems} />
            <NavDropdown label="Industries" items={industriesItems} />
            <NavDropdown label="Careers" items={careersItems} />
            <Link
              href="/news"
              className="rounded-md px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              News
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
            <div className="sm:col-span-2 lg:col-span-2">
              <Link href="/" className="text-lg font-semibold text-[#0a1628]">
                Starlight Labs
              </Link>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">{SITE_TAGLINE}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Services</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/services" className="hover:text-slate-900">
                    All services
                  </Link>
                </li>
                <li>
                  <Link href="/industries" className="hover:text-slate-900">
                    Industries
                  </Link>
                </li>
                <li>
                  <Link href="/services/talent-academy" className="hover:text-slate-900">
                    Talent &amp; academy
                  </Link>
                </li>
                <li>
                  <Link href="/services/delivery" className="hover:text-slate-900">
                    Delivery &amp; leadership
                  </Link>
                </li>
                <li>
                  <Link href="/services/platform" className="hover:text-slate-900">
                    Platform &amp; operations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">About &amp; platform</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/about" className="hover:text-slate-900">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="hover:text-slate-900">
                    Case studies
                  </Link>
                </li>
                <li>
                  <Link href="/partnerships" className="hover:text-slate-900">
                    Partnerships
                  </Link>
                </li>
                <li>
                  <Link href="/api-docs" className="hover:text-slate-900">
                    API documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Careers &amp; news</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
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
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Connect</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/foundation" className="hover:text-slate-900">
                    Foundation
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-slate-900">
                    Contact
                  </Link>
                </li>
              </ul>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Employee</p>
              <p className="mt-1 text-xs text-slate-500">Staff sign-in only—no public registration on this site.</p>
              <div className="mt-3">
                <FooterAccountLinks />
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-slate-200 pt-8 text-xs text-slate-500">
            <Link href="/legal/terms" className="hover:text-slate-800">
              Terms of use
            </Link>
            <Link href="/legal/privacy" className="hover:text-slate-800">
              Privacy policy
            </Link>
            <Link href="/legal/cookies" className="hover:text-slate-800">
              Cookie policy
            </Link>
          </div>
          <p className="mt-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Starlight Labs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

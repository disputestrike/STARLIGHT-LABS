// app/page.tsx
import Link from "next/link";
import { HeroVisual } from "@/components/marketing/HeroVisual";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-3xl"
        aria-hidden
      />

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-700/80 bg-slate-950/75 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold shadow-lg shadow-blue-500/25">
              S
            </div>
            <span className="text-lg font-bold tracking-tight">Starlight Labs</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/auth/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold shadow-md shadow-blue-600/30 transition hover:bg-blue-500"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="text-center lg:text-left">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">
              Global engineering operations
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              AI-native talent &amp; delivery, end to end.
            </h1>
            <p className="mb-8 max-w-xl text-lg text-slate-300 sm:text-xl lg:mx-0 mx-auto">
              Run bootcamps, staff projects, manage CRM and finance—one platform for global
              engineering operations.
            </p>
            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-start">
              <Link
                href="/auth/register"
                className="rounded-xl bg-blue-600 px-8 py-4 text-center text-lg font-semibold shadow-lg shadow-blue-600/25 transition hover:bg-blue-500"
              >
                Create account
              </Link>
              <Link
                href="#features"
                className="rounded-xl border border-slate-600 bg-slate-800/50 px-8 py-4 text-center text-lg font-semibold backdrop-blur transition hover:border-slate-500 hover:bg-slate-800"
              >
                Explore capabilities
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌍",
                title: "Global Talent Pipeline",
                description: "Access elite engineers from Nigeria and across Africa, trained on modern stacks.",
              },
              {
                icon: "🚀",
                title: "Project Delivery Excellence",
                description: "Agile-native delivery with real-time sprint management and quality assurance.",
              },
              {
                icon: "⚡",
                title: "AI-Powered Operations",
                description: "Crucible AI platform multiplies productivity through automation and integration.",
              },
              {
                icon: "📊",
                title: "CRM & Sales Ops",
                description: "Manage deals, track pipeline, and close contracts with built-in sales tools.",
              },
              {
                icon: "💹",
                title: "Financial Intelligence",
                description: "Track margins, invoicing, and team utilization with real-time dashboards.",
              },
              {
                icon: "🎓",
                title: "Bootcamp Academy",
                description: "Continuous talent pipeline with structured training and placement.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-600/80 bg-slate-800/40 p-6 backdrop-blur transition hover:border-blue-500/40 hover:bg-slate-800/60"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-700/80 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Startup",
                price: "$2,500",
                description: "Per dedicated engineer per month",
                features: ["1 Engineer", "40 hrs/week", "Code reviews", "Email support"],
              },
              {
                name: "Scale",
                price: "$30k",
                description: "For managed teams per month",
                features: ["5-10 Engineers", "Full team", "PM included", "Priority support"],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "Full-service delivery",
                features: ["20+ Engineers", "Multiple teams", "Dedicated ops", "24/7 support"],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-8 rounded-lg border ${
                  plan.highlighted
                    ? "bg-blue-600 border-blue-500 scale-105"
                    : "bg-slate-700/50 border-slate-600"
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-2">{plan.price}</p>
                <p className="text-sm text-slate-300 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="text-green-400">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/register"
                  className={`block w-full rounded-lg py-3 text-center font-semibold transition ${
                    plan.highlighted
                      ? "bg-white text-blue-600 hover:bg-slate-100"
                      : "bg-slate-600 hover:bg-slate-500"
                  }`}
                >
                  Get started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to scale globally?</h2>
          <p className="text-xl text-slate-300 mb-8">Join 500+ companies using Starlight Labs.</p>
          <Link
            href="/auth/register"
            className="px-8 py-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold text-lg inline-block"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/#features" className="hover:text-white transition">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-white transition">About</Link></li>
                <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition">Terms</Link></li>
                <li><Link href="#" className="hover:text-white transition">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-white transition">Twitter</Link></li>
                <li><Link href="#" className="hover:text-white transition">LinkedIn</Link></li>
                <li><Link href="#" className="hover:text-white transition">GitHub</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Starlight Labs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

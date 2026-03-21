// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-sm">
                S
              </div>
              <span className="font-bold text-lg">Starlight Labs</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="px-4 py-2 text-slate-300 hover:text-white transition">
                Login
              </Link>
              <Link href="/auth/register" className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Your AI. Working While You Sleep.
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Negotiates bills, books appointments, finds deals. On every channel. Automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
            >
              Claim my free Loop →
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition font-semibold text-lg"
            >
              Learn More
            </Link>
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
                title: "Global Talent Pipeline",
                description: "Access elite engineers from Nigeria and across Africa, trained on modern stacks.",
              },
              {
                title: "Project Delivery Excellence",
                description: "Agile-native delivery with real-time sprint management and quality assurance.",
              },
              {
                title: "AI-Powered Operations",
                description: "Crucible AI platform multiplies productivity through automation and integration.",
              },
              {
                title: "CRM & Sales Ops",
                description: "Manage deals, track pipeline, and close contracts with built-in sales tools.",
              },
              {
                title: "Financial Intelligence",
                description: "Track margins, invoicing, and team utilization with real-time dashboards.",
              },
              {
                title: "Bootcamp Academy",
                description: "Continuous talent pipeline with structured training and placement.",
              },
            ].map((feature, i) => (
              <div key={i} className="bg-slate-700/50 p-6 rounded-lg border border-slate-600">
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
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
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    plan.highlighted
                      ? "bg-white text-blue-600 hover:bg-slate-100"
                      : "bg-slate-600 hover:bg-slate-500"
                  }`}
                >
                  Get Started
                </button>
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
                <li><Link href="#" className="hover:text-white transition">Features</Link></li>
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

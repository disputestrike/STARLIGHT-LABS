"use client";

import { useEffect, useState } from "react";

/** Rotating emphasis lines—value and delivery, not product buzzwords. */
const HEADLINES = [
  {
    kicker: "Global delivery · Talent operations",
    title: "Outcomes you can measure—teams you can trust.",
  },
  {
    kicker: "Clarity in capacity and cost",
    title: "One honest view of talent, projects, and commercial reality.",
  },
  {
    kicker: "From bench to billable",
    title: "Structured programs, accountable leadership, and delivery that holds up with enterprise clients.",
  },
] as const;

export function HeroRotator() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setI((n) => (n + 1) % HEADLINES.length), 7000);
    return () => window.clearInterval(t);
  }, []);

  const item = HEADLINES[i];

  return (
    <div className="min-h-[5.5rem] sm:min-h-[6.5rem]">
      <p key={`k-${i}`} className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b5fff]">
        {item.kicker}
      </p>
      <h1
        key={`h-${i}`}
        className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-[#0a1628] sm:text-5xl"
      >
        {item.title}
      </h1>
    </div>
  );
}

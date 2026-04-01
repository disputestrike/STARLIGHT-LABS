"use client";

import { useEffect, useState } from "react";

const HEADLINES = [
  {
    kicker: "Engineering the future of global talent",
    title: "Outcomes you can measure—teams you can trust.",
  },
  {
    kicker: "Navigate your next delivery chapter",
    title: "From develop to deploy: one disciplined path to client value.",
  },
  {
    kicker: "AI-first value, human-led execution",
    title: "Models and software in production—not slideware—with responsible guardrails.",
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

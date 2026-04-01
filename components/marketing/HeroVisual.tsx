/** Abstract hero illustration — inline SVG, no external assets */
export function HeroVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-md lg:max-w-lg aspect-square"
      aria-hidden
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-cyan-500/20 blur-2xl" />
      <svg
        viewBox="0 0 400 400"
        className="relative h-full w-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="48"
          y="64"
          width="304"
          height="220"
          rx="16"
          className="stroke-blue-400/60"
          strokeWidth="2"
          fill="url(#g1)"
        />
        <rect x="72" y="96" width="120" height="10" rx="4" fill="rgb(148 163 184 / 0.5)" />
        <rect x="72" y="118" width="200" height="8" rx="4" fill="rgb(148 163 184 / 0.35)" />
        <rect x="72" y="136" width="160" height="8" rx="4" fill="rgb(148 163 184 / 0.35)" />
        <circle cx="320" cy="200" r="36" className="fill-blue-500/30 stroke-blue-400" strokeWidth="2" />
        <path
          d="M304 200 L316 212 L344 184"
          stroke="rgb(96 165 250)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="72" y="180" width="88" height="72" rx="8" className="fill-slate-700/80 stroke-slate-500" strokeWidth="1" />
        <rect x="176" y="180" width="88" height="72" rx="8" className="fill-slate-700/80 stroke-slate-500" strokeWidth="1" />
        <rect x="280" y="180" width="56" height="72" rx="8" className="fill-blue-600/40 stroke-blue-400/50" strokeWidth="1" />
        <defs>
          <linearGradient id="g1" x1="48" y1="64" x2="352" y2="284" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgb(30 58 138 / 0.35)" />
            <stop offset="1" stopColor="rgb(15 23 42 / 0.6)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

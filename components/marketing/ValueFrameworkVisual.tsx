/** Original SVG “delivery framework” — Starlight Labs only (not a third-party diagram). */
export function ValueFrameworkVisual() {
  return (
    <div className="mx-auto w-full max-w-md lg:max-w-none">
      <svg
        viewBox="0 0 400 360"
        className="h-auto w-full drop-shadow-lg"
        aria-hidden
        role="img"
      >
        <defs>
          <linearGradient id="vf-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
          </linearGradient>
          <linearGradient id="vf-ring" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0b5fff" />
          </linearGradient>
        </defs>
        {/* soft hex grid hint */}
        <g opacity="0.15" stroke="white" strokeWidth="0.5" fill="none">
          <path d="M200 20 L260 55 L260 125 L200 160 L140 125 L140 55 Z" />
          <path d="M200 200 L260 235 L260 305 L200 340 L140 305 L140 235 Z" />
          <path d="M80 110 L140 145 L140 215 L80 250 L20 215 L20 145 Z" />
          <path d="M320 110 L380 145 L380 215 L320 250 L260 215 L260 145 Z" />
        </g>
        {/* outer capability ring */}
        <circle cx="200" cy="180" r="118" fill="none" stroke="url(#vf-ring)" strokeWidth="2" opacity="0.85" />
        <circle cx="200" cy="180" r="78" fill="none" stroke="white" strokeWidth="1.5" opacity="0.35" />
        {/* center */}
        <circle cx="200" cy="180" r="44" fill="url(#vf-bg)" stroke="white" strokeWidth="1.5" opacity="0.95" />
        <text x="200" y="172" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" letterSpacing="0.08em">
          CLIENT
        </text>
        <text x="200" y="188" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" letterSpacing="0.08em">
          OUTCOMES
        </text>
        {/* outer labels — Starlight vocabulary */}
        <text x="200" y="48" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="600" letterSpacing="0.06em">
          TALENT
        </text>
        <text x="318" y="120" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="600" letterSpacing="0.06em">
          DELIVERY
        </text>
        <text x="318" y="252" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="600" letterSpacing="0.06em">
          PLATFORM
        </text>
        <text x="200" y="318" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="600" letterSpacing="0.06em">
          TRUST
        </text>
        <text x="82" y="252" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="600" letterSpacing="0.06em">
          INSIGHT
        </text>
        <text x="82" y="120" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="600" letterSpacing="0.06em">
          VELOCITY
        </text>
        {/* inner verbs */}
        <text x="200" y="128" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="500">
          DEVELOP
        </text>
        <text x="268" y="188" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="500">
          DEPLOY
        </text>
        <text x="200" y="248" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="500">
          MEASURE
        </text>
        <text x="132" y="188" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="500">
          GOVERN
        </text>
      </svg>
      <p className="mt-4 text-center text-xs text-slate-300/90 lg:text-left">
        Talent, delivery, and platform connected to measurable outcomes—not slide decks.
      </p>
    </div>
  );
}

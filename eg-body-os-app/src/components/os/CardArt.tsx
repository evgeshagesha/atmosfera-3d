type CardArtKind = "body" | "club" | "system" | "personal";

export function CardArt({ kind }: { kind: CardArtKind }) {
  return (
    <svg viewBox="0 0 88 88" className="h-20 w-20 shrink-0" aria-hidden>
      <defs>
        <linearGradient id={`art-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4f1ea" />
          <stop offset="55%" stopColor="#9a9791" />
          <stop offset="100%" stopColor="#d8d6d0" />
        </linearGradient>
      </defs>
      {kind === "body" ? (
        <>
          <ellipse cx="44" cy="44" rx="28" ry="34" fill="none" stroke={`url(#art-${kind})`} strokeWidth="1.2" />
          <path
            d="M44 18 C 34 28, 32 48, 36 62 M44 18 C 54 28, 56 48, 52 62 M36 40 H52"
            stroke={`url(#art-${kind})`}
            strokeWidth="1.4"
            fill="none"
          />
          <circle cx="44" cy="44" r="38" fill="none" stroke="#f4f1ea" strokeOpacity="0.15" />
        </>
      ) : null}
      {kind === "club" ? (
        <>
          <rect x="18" y="38" width="52" height="12" rx="6" fill={`url(#art-${kind})`} />
          <circle cx="24" cy="44" r="10" fill="#141518" stroke={`url(#art-${kind})`} strokeWidth="3" />
          <circle cx="64" cy="44" r="10" fill="#141518" stroke={`url(#art-${kind})`} strokeWidth="3" />
        </>
      ) : null}
      {kind === "system" ? (
        <>
          <rect x="22" y="26" width="40" height="28" rx="6" fill="none" stroke={`url(#art-${kind})`} />
          <rect x="28" y="34" width="40" height="28" rx="6" fill="#141518" stroke={`url(#art-${kind})`} />
          <polygon points="42,42 58,48 42,54" fill="#f4f1ea" />
        </>
      ) : null}
      {kind === "personal" ? (
        <>
          <circle cx="44" cy="44" r="26" fill="none" stroke={`url(#art-${kind})`} />
          <circle cx="44" cy="44" r="18" fill="none" stroke="#f4f1ea" strokeOpacity="0.35" />
          <circle cx="44" cy="34" r="8" fill={`url(#art-${kind})`} />
          <path d="M28 62 C 32 50, 56 50, 60 62" fill={`url(#art-${kind})`} />
        </>
      ) : null}
    </svg>
  );
}

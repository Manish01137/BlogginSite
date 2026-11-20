/** Decorative wireframe globe with dashed flight paths (pure SVG, no JS). */
export function GlobeLines({ className }: { className?: string }) {
  const R = 300;
  const C = 320;
  const meridians = [15, 30, 45, 60, 75, 90].map((deg) => R * Math.sin((deg * Math.PI) / 180));
  const parallels = [-60, -40, -20, 0, 20, 40, 60].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return { y: C + R * Math.sin(rad), half: R * Math.cos(rad) };
  });

  return (
    <svg viewBox="0 0 640 640" fill="none" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id="globe-fade" cx="35%" cy="35%" r="75%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.15" />
        </radialGradient>
        <mask id="globe-mask">
          <rect width="640" height="640" fill="url(#globe-fade)" />
        </mask>
      </defs>
      <g mask="url(#globe-mask)" stroke="currentColor" strokeWidth="0.75">
        <circle cx={C} cy={C} r={R} />
        {meridians.map((rx) => (
          <ellipse key={rx} cx={C} cy={C} rx={rx} ry={R} />
        ))}
        {parallels.map(({ y, half }) => (
          <line key={y} x1={C - half} x2={C + half} y1={y} y2={y} />
        ))}
      </g>
      {/* Flight paths */}
      <g stroke="#C9A227" strokeWidth="1.25" strokeDasharray="2 6" strokeLinecap="round" opacity="0.75">
        <path d="M210 380 Q 300 170 470 230" />
        <path d="M210 380 Q 330 300 520 400" />
        <path d="M210 380 Q 180 220 270 150" />
      </g>
      <g fill="#C9A227">
        <circle cx="210" cy="380" r="4" />
        <circle cx="470" cy="230" r="3" opacity="0.8" />
        <circle cx="520" cy="400" r="3" opacity="0.8" />
        <circle cx="270" cy="150" r="3" opacity="0.8" />
      </g>
      <circle cx="210" cy="380" r="10" stroke="#C9A227" strokeOpacity="0.4" />
    </svg>
  );
}

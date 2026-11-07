import React from "react";

// One continuous wave path. `period` = length of one full wave in the 2880-wide strip.
// The strip is two identical halves, so the CSS animation can loop with no jump.
const TOTAL = 2880;
const HEIGHT = 160;

function buildWave(period: number, amp: number, base: number, flip = false) {
  const half = period / 2;
  let d = `M0 ${base} `;
  for (let i = 0; i < (TOTAL / period) * 2; i++) {
    const sign = (i % 2 === 0 ? -1 : 1) * (flip ? -1 : 1);
    const x0 = i * half;
    const cy = base + sign * amp * 1.33;
    d += `C${x0 + 0.4 * half} ${cy} ${x0 + 0.6 * half} ${cy} ${x0 + half} ${base} `;
  }
  return `${d}L${TOTAL} ${HEIGHT} L0 ${HEIGHT} Z`;
}

// Same colour as your old divider (#fffef8). Back layers are just see-through copies of it.
const layers = [
  { d: buildWave(1440, 34, 70), opacity: 0.3, cls: "wave-slow" },
  { d: buildWave(720, 26, 98, true), opacity: 0.55, cls: "wave-mid" },
  { d: buildWave(480, 18, 128), opacity: 1, cls: "wave-fast" },
];

export default function Wave() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-0 z-30 h-16 w-full translate-y-px overflow-hidden md:h-28 lg:h-36"
    >
      {layers.map((layer, i) => (
        <svg
          key={i}
          viewBox={`0 0 ${TOTAL} ${HEIGHT}`}
          preserveAspectRatio="none"
          className={`absolute bottom-0 left-0 h-full w-[200%] ${layer.cls}`}
        >
          <path d={layer.d} fill="#fffef8" fillOpacity={layer.opacity} />
        </svg>
      ))}
    </div>
  );
}

"use client";
import { useState } from "react";

type Step = { time: string; title: string; text: string };
type Option = { label: string; steps: Step[] };

export default function ItinerarySwitch({ options }: { options: Option[] }) {
  const [index, setIndex] = useState(0);
  const n = options.length;
  const steps = (options[index] ?? options[0]).steps;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <h2 className="font-bebas text-4xl uppercase tracking-wide text-[#2b1d10]">
          Sample itinerary
        </h2>

        {n > 1 && (
          <div
            role="group"
            aria-label="Safari length"
            className="relative inline-grid rounded-full border border-[#c9a36a] bg-[#fffaf2]/90 p-[3px] shadow-[0_6px_16px_-8px_rgba(97,61,29,0.5)]"
            style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-[3px] left-[3px] rounded-full bg-[#a15f21] transition-transform duration-300"
              style={{
                width: `calc((100% - 6px) / ${n})`,
                transform: `translateX(${index * 100}%)`,
              }}
            />
            {options.map((o, i) => (
              <button
                key={o.label}
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={index === i}
                className={`font-inter relative z-10 min-w-[84px] rounded-full px-3.5 py-2 text-xs font-medium transition-colors duration-300 ${
                  index === i ? "text-white" : "text-[#7a6550]"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <ol className="mt-6 space-y-6 border-l border-[#c9a36a] pl-8">
        {steps.map((s) => (
          <li key={`${s.time}-${s.title}`} className="relative">
            <span className="absolute -left-[39px] top-1 h-3 w-3 rounded-full bg-[#a15f21] ring-4 ring-[#f0eee5]" />
            <p className="font-inter text-xs font-semibold uppercase tracking-wider text-[#a15f21]">
              {s.time}
            </p>
            <h3 className="font-bebas text-2xl tracking-wide text-[#2b1d10]">
              {s.title}
            </h3>
            <p className="font-inter mt-1 text-sm leading-relaxed text-[#5b4733]">
              {s.text}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

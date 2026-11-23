"use client";
/* Put this file at: src/components/booking/BookingFlow.tsx  (create the "booking" folder)

   Opened as:
     /book                                         -> starts at step 1
     /book?service=safari&type=adventure-safari    -> section + type locked, starts at step 2
   service = safari | rental | camping, type = the slug from packages.ts / rentals.ts */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FaArrowLeft,
  FaCampground,
  FaCheckCircle,
  FaMinus,
  FaMotorcycle,
  FaPaw,
  FaPlus,
} from "react-icons/fa";
import {
  FALLBACK_RATE,
  MAX_GUESTS,
  MAX_PERIOD,
  PAYMENT_NOTE,
  getLines,
  hasType,
  isService,
  services,
  type ServiceKey,
} from "@/data/booking";
import { buildQuote, hasQty, money, type Quote } from "@/lib/quote";

const ICONS = {
  safari: FaPaw,
  rental: FaMotorcycle,
  camping: FaCampground,
} as const;

type Form = {
  name: string;
  email: string;
  whatsapp: string;
  date: string;
  hotel: string;
  note: string;
  website: string; // honeypot, must stay empty
};
type Errors = Partial<Record<"date" | "name" | "email" | "whatsapp", string>>;
type Status = "idle" | "sending" | "sent" | "error";

const card =
  "rounded-3xl border border-[#c9a36a] bg-[#fffaf2] p-6 shadow-[0_30px_60px_-30px_rgba(97,61,29,.55)]";
const input =
  "w-full rounded-xl border border-[#d9c7a8] bg-white px-4 py-3 font-inter text-sm text-[#2b1d10] outline-none transition focus:border-[#a15f21] focus:ring-2 focus:ring-[#a15f21]/20";
const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#a15f21] px-7 py-3 font-inter text-sm font-semibold text-white transition-colors hover:bg-[#7d4a19] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a15f21] disabled:cursor-not-allowed disabled:opacity-60";
const ghostBtn =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[#c9a36a] px-6 py-3 font-inter text-sm font-semibold text-[#5b4733] transition-colors hover:bg-[#f0eee5]";

/* ------------------------------------------------------------------ */
/* entry: reads ?service=&type= and restarts the form when they change */
export default function BookingFlow() {
  const sp = useSearchParams();
  const s = sp.get("service");
  const t = sp.get("type");
  return (
    <Flow
      key={`${s ?? ""}|${t ?? ""}`}
      paramService={isService(s) ? s : null}
      paramType={t}
    />
  );
}

function Flow({
  paramService,
  paramType,
}: {
  paramService: ServiceKey | null;
  paramType: string | null;
}) {
  const locked = !!paramService && hasType(paramService, paramType);

  const [step, setStep] = useState<1 | 2 | 3>(locked ? 2 : 1);
  const [service, setService] = useState<ServiceKey | null>(paramService);
  const [type, setType] = useState<string | null>(() => {
    if (locked) return paramType;
    if (paramService && services[paramService].types.length === 1)
      return services[paramService].types[0].slug;
    return null;
  });
  const [guests, setGuests] = useState(2);
  const [period, setPeriod] = useState(1);
  const [extras, setExtras] = useState<Record<string, number>>({});
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    whatsapp: "",
    date: "",
    hotel: "",
    note: "",
    website: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [pickError, setPickError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [ref, setRef] = useState("");
  const [rate, setRate] = useState(FALLBACK_RATE);

  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  /* today (local), the earliest date a guest can pick */
  const today = useMemo(() => {
    const d = new Date();
    const p = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }, []);

  /* today's USD -> LKR rate (same route the rental cards use) */
  useEffect(() => {
    let off = false;
    fetch("/api/rate")
      .then((r) => r.json())
      .then((d) => {
        if (!off && d?.rate > 0) setRate(d.rate);
      })
      .catch(() => {});
    return () => {
      off = true;
    };
  }, []);

  /* bring the top of the form into view when the step changes */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, status]);

  const svc = service ? services[service] : null;
  const lines = useMemo(
    () => (service && type ? getLines(service, type) : []),
    [service, type],
  );
  const quote: Quote | null = useMemo(
    () =>
      service && type
        ? buildQuote({ service, type, guests, period, extras })
        : null,
    [service, type, guests, period, extras],
  );

  /* ---------------------------- handlers ---------------------------- */
  const pickService = (k: ServiceKey) => {
    setService(k);
    setType(services[k].types.length === 1 ? services[k].types[0].slug : null);
    setExtras({});
    setGuests(2);
    setPeriod(1);
    setPickError("");
  };

  const goDetails = () => {
    if (!service || !type) {
      setPickError("Choose a section and a type first.");
      return;
    }
    setPickError("");
    setStep(2);
  };

  const changeGuests = (d: number) => {
    const next = Math.max(1, Math.min(MAX_GUESTS, guests + d));
    if (next === guests) return;
    /* extras set to "everyone" follow the new number; others stay, but never above it */
    setExtras((prev) => {
      const out = { ...prev };
      for (const l of lines) {
        if (hasQty(l) && !l.required && out[l.key]) {
          if (out[l.key] === guests || out[l.key] > next) out[l.key] = next;
        }
      }
      return out;
    });
    setGuests(next);
  };

  const toggleExtra = (key: string, qtyLine: boolean) =>
    setExtras((p) => ({ ...p, [key]: p[key] ? 0 : qtyLine ? guests : 1 }));

  const changeQty = (key: string, d: number) =>
    setExtras((p) => ({
      ...p,
      [key]: Math.max(1, Math.min(guests, (p[key] || 1) + d)),
    }));

  const setField = (k: keyof Form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (k in errors) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const goReview = () => {
    const e: Errors = {};
    if (!form.date) e.date = "Choose a date";
    else if (form.date < today) e.date = "Choose today or a later date";
    if (!form.name.trim()) e.name = "Enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Enter a valid email";
    if (form.whatsapp.replace(/\D/g, "").length < 8)
      e.whatsapp = "Enter your WhatsApp number with the country code";
    setErrors(e);
    if (Object.keys(e).length === 0) setStep(3);
  };

  const send = async () => {
    if (!service || !type) return;
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          type,
          guests,
          period,
          extras,
          rate,
          ...form,
          name: form.name.trim(),
          email: form.email.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || "failed");
      setRef(data.ref);
      setStatus("sent");
    } catch (err) {
      setServerError(
        err instanceof Error && err.message !== "failed"
          ? err.message
          : "We could not send your booking. Please try again.",
      );
      setStatus("error");
    }
  };

  /* ------------------------------ views ----------------------------- */
  const stepNames = ["Choose", "Your details", "Review"];

  if (status === "sent") {
    return (
      <div ref={topRef} className="scroll-mt-28">
        <div className={`${card} mx-auto max-w-xl text-center`}>
          <FaCheckCircle className="mx-auto size-12 text-[#a15f21]" aria-hidden="true" />
          <h2 className="mt-4 font-bebas text-4xl uppercase tracking-wide text-[#2b1d10]">
            Request sent
          </h2>
          <p className="mt-3 font-inter text-sm leading-6 text-[#5b4733]">
            Thank you, {form.name.trim()}. We will check your booking and email
            a PDF with every cost listed to {form.email.trim()}.
          </p>
          <p className="mt-4 font-inter text-xs text-[#7a6550]">
            Your reference: <b className="text-[#2b1d10]">{ref}</b>
          </p>
          <Link href="/" className={`${primaryBtn} mt-7`}>
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={topRef} className="scroll-mt-28">
      {/* step bar */}
      <ol className="mb-8 grid grid-cols-3 gap-3">
        {stepNames.map((n, i) => (
          <li
            key={n}
            aria-current={step === i + 1 ? "step" : undefined}
            className={`border-t-4 pt-2 font-inter text-xs sm:text-sm ${
              step >= i + 1
                ? "border-[#a15f21] font-semibold text-[#2b1d10]"
                : "border-[#d9c7a8] text-[#9a8a77]"
            }`}
          >
            {i + 1}. {n}
          </li>
        ))}
      </ol>

      {/* ------------------------- STEP 1: choose ------------------------- */}
      {step === 1 && (
        <div className={card}>
          <h2 className="font-bebas text-3xl uppercase tracking-wide text-[#2b1d10]">
            What would you like to book?
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {(Object.keys(services) as ServiceKey[]).map((k) => {
              const Icon = ICONS[k];
              const on = service === k;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => pickService(k)}
                  aria-pressed={on}
                  className={`cursor-pointer rounded-2xl border bg-white p-5 text-left transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a15f21] ${
                    on
                      ? "border-2 border-[#a15f21]"
                      : "border-[#d9c7a8] hover:border-[#a15f21]"
                  }`}
                >
                  <Icon className="size-6 text-[#a15f21]" aria-hidden="true" />
                  <span className="mt-3 block font-bebas text-2xl uppercase tracking-wide text-[#2b1d10]">
                    {services[k].label}
                  </span>
                  <span className="block font-inter text-xs text-[#7a6550]">
                    {services[k].tagline}
                  </span>
                </button>
              );
            })}
          </div>

          {svc && (
            <div className="mt-8">
              <h3 className="font-bebas text-2xl uppercase tracking-wide text-[#2b1d10]">
                {svc.typeTitle}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {svc.types.map((t) => (
                  <button
                    key={t.slug}
                    type="button"
                    onClick={() => {
                      setType(t.slug);
                      setExtras({});
                      setPickError("");
                    }}
                    aria-pressed={type === t.slug}
                    className={`cursor-pointer rounded-full border px-5 py-2 font-inter text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a15f21] ${
                      type === t.slug
                        ? "border-[#a15f21] bg-[#a15f21] text-white"
                        : "border-[#c9a36a] text-[#5b4733] hover:bg-[#a15f21]/10"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {pickError && (
            <p role="alert" className="mt-4 font-inter text-sm text-[#b42318]">
              {pickError}
            </p>
          )}

          <div className="mt-8 flex justify-end">
            <button type="button" onClick={goDetails} className={primaryBtn}>
              Continue
            </button>
          </div>
        </div>
      )}

      {/* ------------------------ STEP 2: details ------------------------- */}
      {step === 2 && svc && quote && (
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
          <div className={card}>
            {/* what they chose */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#2b1d10] px-3 py-1.5 font-inter text-[11px] font-semibold uppercase tracking-widest text-white">
                  {svc.label}
                </span>
                <span className="rounded-full border border-[#c9a36a] px-3 py-1.5 font-inter text-xs font-semibold text-[#5b4733]">
                  {quote.typeLabel}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="cursor-pointer font-inter text-sm font-semibold text-[#a15f21] underline underline-offset-4 hover:text-[#7d4a19]"
              >
                Change
              </button>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label={svc.dateLabel} error={errors.date} htmlFor="b-date">
                <input
                  id="b-date"
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={(e) => setField("date", e.target.value)}
                  className={input}
                />
              </Field>

              {svc.hasGuests && (
                <Counter
                  label="Guests"
                  value={guests}
                  min={1}
                  max={MAX_GUESTS}
                  onChange={changeGuests}
                />
              )}
              {svc.periodLabel && (
                <Counter
                  label={svc.periodLabel}
                  value={period}
                  min={1}
                  max={MAX_PERIOD}
                  onChange={(d) =>
                    setPeriod((p) => Math.max(1, Math.min(MAX_PERIOD, p + d)))
                  }
                />
              )}

              <Field label="Full name" error={errors.name} htmlFor="b-name">
                <input
                  id="b-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder="Your name"
                  className={input}
                />
              </Field>
              <Field label="Email" error={errors.email} htmlFor="b-email">
                <input
                  id="b-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="name@email.com"
                  className={input}
                />
              </Field>
              <Field label="WhatsApp number" error={errors.whatsapp} htmlFor="b-wa">
                <input
                  id="b-wa"
                  type="tel"
                  autoComplete="tel"
                  value={form.whatsapp}
                  onChange={(e) => setField("whatsapp", e.target.value)}
                  placeholder="+94 77 123 4567"
                  className={input}
                />
              </Field>
              {service !== "rental" && (
                <Field label="Hotel or pickup place" htmlFor="b-hotel">
                  <input
                    id="b-hotel"
                    type="text"
                    value={form.hotel}
                    onChange={(e) => setField("hotel", e.target.value)}
                    placeholder="Where are you staying"
                    className={input}
                  />
                </Field>
              )}
            </div>

            <div className="mt-5">
              <Field label="Notes (optional)" htmlFor="b-note">
                <textarea
                  id="b-note"
                  rows={3}
                  value={form.note}
                  onChange={(e) => setField("note", e.target.value)}
                  placeholder="Allergies, special requests"
                  className={input}
                />
              </Field>
            </div>

            {/* honeypot: hidden from people, bots fill it */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => setField("website", e.target.value)}
                />
              </label>
            </div>

            {/* included and optional */}
            <h3 className="mt-10 font-bebas text-2xl uppercase tracking-wide text-[#2b1d10]">
              Included and optional
            </h3>
            <p className="font-inter text-sm text-[#7a6550]">
              Tick what you want. Items you do not tick are not included and not
              charged.
            </p>

            <ul className="mt-3 divide-y divide-[#d9c7a8]/70 border-y border-[#d9c7a8]/70">
              {lines.map((l) => {
                const q = quote.lines.find((x) => x.key === l.key);
                const on = !!q?.included;
                const qtyLine = hasQty(l);
                return (
                  <li key={l.key} className="flex items-start gap-3 py-3">
                    <input
                      id={`x-${l.key}`}
                      type="checkbox"
                      checked={on}
                      disabled={l.required}
                      onChange={() => toggleExtra(l.key, qtyLine)}
                      className="mt-1 size-4 cursor-pointer accent-[#a15f21] disabled:cursor-not-allowed"
                    />
                    <div className="min-w-0 flex-1">
                      <label
                        htmlFor={`x-${l.key}`}
                        className="cursor-pointer font-inter text-sm font-semibold text-[#2b1d10]"
                      >
                        {l.label}
                        {l.required && (
                          <span className="ml-2 rounded-md bg-[#f0eee5] px-2 py-0.5 font-inter text-[11px] font-medium text-[#7a6550]">
                            Always included
                          </span>
                        )}
                      </label>
                      <p className="font-inter text-xs text-[#7a6550]">{l.hint}</p>

                      {/* how many guests is it for? */}
                      {qtyLine && !l.required && on && svc.hasGuests && (
                        <div className="mt-2 flex items-center gap-2 font-inter text-xs text-[#5b4733]">
                          For
                          <button
                            type="button"
                            onClick={() => changeQty(l.key, -1)}
                            aria-label={`Fewer guests for ${l.label}`}
                            className="grid size-7 cursor-pointer place-items-center rounded-full border border-[#c9a36a] bg-white text-[#a15f21] transition hover:bg-[#f0eee5]"
                          >
                            <FaMinus className="size-2.5" aria-hidden="true" />
                          </button>
                          <b className="min-w-4 text-center text-sm text-[#2b1d10]">
                            {extras[l.key]}
                          </b>
                          <button
                            type="button"
                            onClick={() => changeQty(l.key, 1)}
                            aria-label={`More guests for ${l.label}`}
                            className="grid size-7 cursor-pointer place-items-center rounded-full border border-[#c9a36a] bg-white text-[#a15f21] transition hover:bg-[#f0eee5]"
                          >
                            <FaPlus className="size-2.5" aria-hidden="true" />
                          </button>
                          of {guests} guest{guests === 1 ? "" : "s"}
                        </div>
                      )}
                    </div>
                    <span className="font-inter text-sm font-semibold text-[#2b1d10]">
                      {l.price === 0 ? "Free" : money(l.price)}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex justify-end">
              <button type="button" onClick={goReview} className={primaryBtn}>
                Review booking
              </button>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28">
            <PriceSummary quote={quote} rate={rate} />
          </aside>
        </div>
      )}

      {/* ------------------------- STEP 3: review ------------------------- */}
      {step === 3 && svc && quote && (
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
          <div className={card}>
            <h2 className="font-bebas text-3xl uppercase tracking-wide text-[#2b1d10]">
              Check your details
            </h2>

            <dl className="mt-4 divide-y divide-[#d9c7a8]/70 border-y border-[#d9c7a8]/70 font-inter text-sm">
              <Row k="Booking" v={`${svc.label} - ${quote.typeLabel}`} />
              <Row k={svc.dateLabel} v={form.date} />
              {svc.hasGuests && <Row k="Guests" v={String(guests)} />}
              {svc.periodLabel && <Row k={svc.periodLabel} v={String(period)} />}
              <Row k="Name" v={form.name.trim()} />
              <Row k="Email" v={form.email.trim()} />
              <Row k="WhatsApp" v={form.whatsapp.trim()} />
              {form.hotel.trim() && <Row k="Pickup" v={form.hotel.trim()} />}
              {form.note.trim() && <Row k="Notes" v={form.note.trim()} />}
            </dl>

            <h3 className="mt-8 font-bebas text-2xl uppercase tracking-wide text-[#2b1d10]">
              What happens next
            </h3>
            <ol className="mt-2 list-decimal space-y-1 pl-5 font-inter text-sm text-[#5b4733]">
              <li>We receive your request and check availability.</li>
              <li>We email you a PDF with every cost listed.</li>
              <li>You confirm by reply or on WhatsApp.</li>
            </ol>
            <p className="mt-3 font-inter text-xs text-[#7a6550]">{PAYMENT_NOTE}</p>

            {status === "error" && (
              <p role="alert" className="mt-5 font-inter text-sm text-[#b42318]">
                {serverError}
              </p>
            )}

            <div className="mt-8 flex flex-wrap justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={status === "sending"}
                className={ghostBtn}
              >
                <FaArrowLeft className="size-3" aria-hidden="true" />
                Back
              </button>
              <button
                type="button"
                onClick={send}
                disabled={status === "sending"}
                className={primaryBtn}
              >
                {status === "sending" ? "Sending..." : "Send booking request"}
              </button>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28">
            <PriceSummary quote={quote} rate={rate} />
          </aside>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* small pieces */

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block font-inter text-xs font-semibold text-[#7a6550]"
      >
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1 font-inter text-xs text-[#b42318]">
          {error}
        </p>
      )}
    </div>
  );
}

function Counter({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (delta: number) => void;
}) {
  return (
    <div>
      <span className="mb-1.5 block font-inter text-xs font-semibold text-[#7a6550]">
        {label}
      </span>
      <div className="flex items-center justify-between rounded-xl border border-[#d9c7a8] bg-white px-2 py-1.5">
        <button
          type="button"
          onClick={() => onChange(-1)}
          disabled={value <= min}
          aria-label={`Fewer ${label.toLowerCase()}`}
          className="grid size-9 cursor-pointer place-items-center rounded-full border border-[#c9a36a] bg-[#fffaf2] text-[#a15f21] transition hover:bg-[#f0eee5] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FaMinus className="size-3" aria-hidden="true" />
        </button>
        <span aria-live="polite" className="font-inter text-sm font-semibold text-[#2b1d10]">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(1)}
          disabled={value >= max}
          aria-label={`More ${label.toLowerCase()}`}
          className="grid size-9 cursor-pointer place-items-center rounded-full border border-[#c9a36a] bg-[#fffaf2] text-[#a15f21] transition hover:bg-[#f0eee5] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FaPlus className="size-3" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-6 py-2.5">
      <dt className="text-[#7a6550]">{k}</dt>
      <dd className="text-right font-medium text-[#2b1d10]">{v}</dd>
    </div>
  );
}

function PriceSummary({ quote, rate }: { quote: Quote; rate: number }) {
  const lkr = Math.round((quote.total * rate) / 100) * 100;
  const svc = services[quote.service];
  return (
    <div className={card}>
      <h2 className="font-bebas text-3xl uppercase tracking-wide text-[#2b1d10]">
        Your price
      </h2>
      <p className="font-inter text-xs text-[#7a6550]">
        {quote.typeLabel}
        {svc.hasGuests && ` - ${quote.guests} guest${quote.guests === 1 ? "" : "s"}`}
      </p>

      <ul className="mt-4 divide-y divide-[#d9c7a8]/70 border-y border-[#d9c7a8]/70">
        {quote.lines.map((l) => (
          <li
            key={l.key}
            className={`flex justify-between gap-4 py-2.5 font-inter text-sm ${
              l.included ? "text-[#2b1d10]" : "text-[#9a8a77]"
            }`}
          >
            <span>
              {l.label}
              <span className="block text-xs text-[#7a6550]">{l.detail}</span>
            </span>
            <span className="font-semibold">
              {l.included ? (l.amount === 0 ? "Free" : money(l.amount)) : "-"}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="font-inter text-sm font-semibold text-[#2b1d10]">Total</span>
        <span className="font-bebas text-4xl tracking-wide text-[#2b1d10]">
          {money(quote.total)}
        </span>
      </div>
      <p className="text-right font-inter text-xs text-[#7a6550]">
        about Rs {lkr.toLocaleString("en-US")}
      </p>
      <p className="mt-4 font-inter text-[11px] leading-4 text-[#9a8a77]">
        Every cost is listed above. There are no other charges. Rupee price is
        approximate.
      </p>
    </div>
  );
}

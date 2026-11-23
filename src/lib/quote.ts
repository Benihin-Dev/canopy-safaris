/* Put this file at: src/lib/quote.ts  (create the "lib" folder if it is missing)

   The price maths lives here ONCE. The booking form uses it to show the live
   price, and the server (api/booking) uses it again before saving, so a guest
   can never change a price from the browser. */

import {
  MAX_GUESTS,
  MAX_PERIOD,
  getLines,
  hasType,
  isService,
  services,
  type Line,
  type ServiceKey,
} from "@/data/booking";

export type Selection = {
  service: ServiceKey;
  type: string; // slug
  guests: number;
  period: number; // days or nights
  extras: Record<string, number>; // line key -> quantity (0 = not included)
};

export type QuoteLine = {
  key: string;
  label: string;
  included: boolean;
  required: boolean;
  qty: number;
  detail: string; // "2 of 4 guests x $8"
  amount: number;
};

export type Quote = {
  service: ServiceKey;
  type: string;
  typeLabel: string;
  guests: number;
  period: number;
  lines: QuoteLine[];
  total: number;
};

export const money = (n: number) => `$${Math.round(n * 100) / 100}`;

/* does this line have a "how many guests" number? */
export const hasQty = (l: Line) => l.mode === "person" || l.mode === "personNight";

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, Math.floor(Number.isFinite(n) ? n : min)));

export function buildQuote(sel: Selection): Quote | null {
  if (!isService(sel.service) || !hasType(sel.service, sel.type)) return null;

  const svc = services[sel.service];
  const guests = svc.hasGuests ? clamp(sel.guests, 1, MAX_GUESTS) : 1;
  const period = svc.periodLabel ? clamp(sel.period, 1, MAX_PERIOD) : 1;
  const periodWord = svc.periodLabel === "Nights" ? "night" : "day";
  const plural = (n: number) => (n === 1 ? "" : "s");

  const lines: QuoteLine[] = getLines(sel.service, sel.type).map((l) => {
    const raw = Number(sel.extras?.[l.key] ?? 0);
    const qty = hasQty(l)
      ? l.required
        ? guests
        : clamp(raw, 0, guests)
      : 1;
    const included = !!l.required || raw > 0;

    let amount = 0;
    let detail = "";
    const who = qty === guests ? `${guests} guest${plural(guests)}` : `${qty} of ${guests} guests`;

    if (l.mode === "person") {
      amount = l.price * qty;
      detail = `${who} x ${money(l.price)}`;
    } else if (l.mode === "personNight") {
      amount = l.price * qty * period;
      detail = `${who} x ${period} ${periodWord}${plural(period)} x ${money(l.price)}`;
    } else if (l.mode === "day") {
      amount = l.price * period;
      detail = `${period} ${periodWord}${plural(period)} x ${money(l.price)}`;
    } else {
      amount = l.price;
      detail = `1 x ${money(l.price)}`;
    }
    if (l.price === 0) detail = "Included";

    return {
      key: l.key,
      label: l.label,
      included,
      required: !!l.required,
      qty: included ? qty : 0,
      detail: included ? detail : "Not included",
      amount: included ? amount : 0,
    };
  });

  const total = lines.reduce((sum, l) => sum + l.amount, 0);
  const typeLabel = svc.types.find((t) => t.slug === sel.type)?.label ?? sel.type;

  return {
    service: sel.service,
    type: sel.type,
    typeLabel,
    guests,
    period,
    lines,
    total,
  };
}

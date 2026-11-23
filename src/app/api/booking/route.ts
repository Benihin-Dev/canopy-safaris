/* Put this file at: src/app/api/booking/route.ts

   The form posts here. This route:
   1. checks the details,
   2. works out the price AGAIN from your price file (src/data/booking.ts),
   3. sends everything to your Google Apps Script, which fills the Google
      Sheet and saves the PDF to Drive.
   The Apps Script address and the secret stay on the server (.env.local). */

import { NextResponse } from "next/server";
import { MAX_GUESTS, MAX_PERIOD, hasType, isService, services } from "@/data/booking";
import { buildQuote } from "@/lib/quote";

const SCRIPT_URL = process.env.BOOKING_SCRIPT_URL;
const SECRET = process.env.BOOKING_SECRET;

const text = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const fail = (error: string, status = 400) =>
  NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  if (!SCRIPT_URL || !SECRET) {
    return fail("Booking is not set up yet. Please message us on WhatsApp.", 500);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail("Something went wrong. Please try again.");
  }

  /* hidden "website" box: only bots fill it. Pretend it worked. */
  if (text(body.website, 100)) return NextResponse.json({ ok: true, ref: "CS-0000" });

  const service = text(body.service, 20);
  const type = text(body.type, 60);
  if (!isService(service) || !hasType(service, type)) {
    return fail("Choose what you would like to book.");
  }

  const name = text(body.name, 80);
  const email = text(body.email, 120);
  const whatsapp = text(body.whatsapp, 30);
  const date = text(body.date, 10);

  if (!name) return fail("Enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Enter a valid email.");
  if (whatsapp.replace(/\D/g, "").length < 8) return fail("Enter your WhatsApp number.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return fail("Choose a date.");

  /* today in Sri Lanka, so a guest booking early morning is not rejected */
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Colombo" });
  if (date < today) return fail("Choose a date that is today or later.");

  const svc = services[service];
  const guests = Number(body.guests);
  const period = Number(body.period);
  if (svc.hasGuests && !(guests >= 1 && guests <= MAX_GUESTS)) {
    return fail(`Guests must be between 1 and ${MAX_GUESTS}.`);
  }
  if (svc.periodLabel && !(period >= 1 && period <= MAX_PERIOD)) {
    return fail(`${svc.periodLabel} must be between 1 and ${MAX_PERIOD}.`);
  }

  const extras: Record<string, number> = {};
  if (body.extras && typeof body.extras === "object") {
    for (const [k, v] of Object.entries(body.extras as Record<string, unknown>)) {
      extras[k] = Number(v) || 0;
    }
  }

  const quote = buildQuote({ service, type, guests, period, extras });
  if (!quote) return fail("Choose what you would like to book.");

  const rate = Number(body.rate);
  const lkr = rate > 0 && rate < 100000 ? Math.round((quote.total * rate) / 100) * 100 : 0;

  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      /* text/plain avoids a CORS pre-flight. Apps Script reads the JSON text. */
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        secret: SECRET,
        section: svc.label,
        type: quote.typeLabel,
        date,
        guests: svc.hasGuests ? quote.guests : "",
        periodLabel: svc.periodLabel ?? "",
        period: svc.periodLabel ? quote.period : "",
        name,
        email,
        whatsapp,
        hotel: text(body.hotel, 160),
        note: text(body.note, 600),
        lines: quote.lines,
        total: quote.total,
        lkr,
      }),
      cache: "no-store",
    });

    const data = await res.json();
    if (!data?.ok) throw new Error(data?.error || "script error");

    return NextResponse.json({ ok: true, ref: data.ref });
  } catch {
    return fail(
      "We could not send your booking. Please try again or message us on WhatsApp.",
      502,
    );
  }
}

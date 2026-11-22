/* Put this file at: src/app/api/rate/route.ts
   It returns today's USD -> LKR rate. The rate comes from the free
   open.er-api.com service (updates once a day, attribution required)
   and is cached on the server for 1 hour, so visitors never call the
   service directly and it never gets rate-limited. */

import { NextResponse } from "next/server";

/* used only if the live rate cannot be loaded. Update it now and then. */
const FALLBACK_RATE = 300;

export async function GET() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("bad status");

    const data = await res.json();
    const rate = data?.rates?.LKR;
    if (typeof rate !== "number" || !(rate > 0)) throw new Error("no rate");

    return NextResponse.json(
      { rate, live: true, updated: data.time_last_update_utc ?? null },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch {
    return NextResponse.json({ rate: FALLBACK_RATE, live: false, updated: null });
  }
}

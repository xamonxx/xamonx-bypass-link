import { NextRequest, NextResponse } from "next/server";
import { BypassError, isSupportedUrl, runBypass, SUPPORTED_HOSTS } from "@/lib/bypass";

export const runtime = "nodejs";
// Capped at 60s to fit Vercel's Hobby plan function duration limit. Keep
// this in sync with TIMEOUT_MS in lib/bypass.ts (kept lower, with headroom
// for browser launch + response overhead) so runBypass's own graceful
// NODE_ERR_TIMEOUT fires before the platform kills the request outright.
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body harus JSON." }, { status: 400 });
  }

  const url = (body as { url?: unknown })?.url;
  if (typeof url !== "string" || url.trim() === "") {
    return NextResponse.json({ error: "Field 'url' wajib diisi." }, { status: 400 });
  }

  if (!isSupportedUrl(url)) {
    return NextResponse.json(
      {
        error: `Situs tidak didukung. Situs yang didukung: ${SUPPORTED_HOSTS.join(", ")}.`,
      },
      { status: 422 }
    );
  }

  try {
    const finalUrl = await runBypass(url);
    return NextResponse.json({ finalUrl });
  } catch (err) {
    // Only BypassError's own curated messages are safe to show verbatim —
    // anything else (an uncaught exception from a code path that isn't
    // runBypass's own try/catch) could leak stack traces or infra details,
    // so it's logged server-side and replaced with a generic message.
    if (err instanceof BypassError) {
      return NextResponse.json({ error: err.message }, { status: 502 });
    }
    console.error("[api/bypass] Unexpected error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan tak terduga di server. Coba lagi dalam beberapa saat." },
      { status: 502 }
    );
  }
}

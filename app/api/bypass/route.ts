import { NextRequest, NextResponse } from "next/server";
import { isSupportedUrl, runBypass, SUPPORTED_HOSTS } from "@/lib/bypass";

export const runtime = "nodejs";
// NOTE: Vercel caps this per plan (historically ~10s Hobby / up to 60-300s
// Pro+, subject to change) — confirm against your actual plan before
// deploying. If the platform's cap is lower than this, requests get killed
// mid-flight with a raw platform timeout instead of runBypass's own
// NODE_ERR_TIMEOUT response.
export const maxDuration = 90;

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
    const message = err instanceof Error ? err.message : "Gagal memproses link.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

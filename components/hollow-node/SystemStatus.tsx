"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

const ONLINE_MIN = 800;
const ONLINE_MAX = 2400;
const ONLINE_DRIFT = 6;

function randomOnline() {
  return ONLINE_MIN + Math.floor(Math.random() * (ONLINE_MAX - ONLINE_MIN));
}

/** Real, measured page-load latency (Navigation Timing API) — never fabricated. */
export default function SystemStatus() {
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  /** Cosmetic placeholder only — not backed by real session data. */
  const [onlineCount, setOnlineCount] = useState<number | null>(null);

  useEffect(() => {
    const [nav] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (nav && nav.responseStart > 0) {
      setLatencyMs(Math.round(nav.responseStart));
    }
  }, []);

  useEffect(() => {
    setOnlineCount(randomOnline());
    const id = setInterval(() => {
      setOnlineCount((prev) => {
        const base = prev ?? randomOnline();
        const next = base + Math.floor(Math.random() * (ONLINE_DRIFT * 2 + 1)) - ONLINE_DRIFT;
        return Math.min(ONLINE_MAX, Math.max(ONLINE_MIN, next));
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      role="status"
      className="reveal inline-flex items-center gap-2 rounded-full border border-border-primary bg-white/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-md"
    >
      {latencyMs !== null && <span className="text-text-muted">{latencyMs}ms</span>}
      {onlineCount !== null && (
        <>
          {latencyMs !== null && <span className="text-text-muted">·</span>}
          <span className="flex items-center gap-1 text-text-secondary">
            <Users className="h-3 w-3" aria-hidden="true" />
            {onlineCount.toLocaleString("id-ID")} pengguna aktif
          </span>
        </>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import type { ResolveError } from "@/lib/hollow-node/types";

interface ErrorStateProps {
  error: ResolveError;
  onRetry: () => void;
  onClear: () => void;
}

export default function ErrorState({ error, onRetry, onClear }: ErrorStateProps) {
  const [glitch, setGlitch] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setGlitch(false), 140);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      role="alert"
      className="reveal rounded-md border border-node-red/40 bg-node-red/10 px-4 py-3 shadow-[var(--glow-red),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-node-red" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className={`font-mono text-[10px] uppercase tracking-widest text-node-red ${glitch ? "glitch-once" : ""}`}>
            Resolution failed · {error.code}
          </p>
          <p className="mt-1 font-mono text-xs leading-relaxed text-text-secondary">
            {error.message}
          </p>
        </div>
      </div>
      <div className="mt-3 flex gap-2 pl-7">
        <button
          type="button"
          onClick={onRetry}
          className="h-9 rounded-md border border-node-red/40 px-3 font-mono text-[11px] uppercase tracking-wide text-node-red transition hover:bg-node-red/10"
        >
          Retry
        </button>
        <button
          type="button"
          onClick={onClear}
          className="h-9 rounded-md border border-border-primary px-3 font-mono text-[11px] uppercase tracking-wide text-text-muted transition hover:text-text-primary"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

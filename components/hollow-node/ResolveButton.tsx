"use client";

import { Loader2, Zap } from "lucide-react";

interface ResolveButtonProps {
  loading: boolean;
}

export default function ResolveButton({ loading }: ResolveButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      aria-busy={loading}
      className="group relative flex h-14 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-md border border-border-primary bg-white/[0.06] px-6 font-display text-sm font-semibold uppercase tracking-widest text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] !outline-none backdrop-blur-md transition-all hover:-translate-y-px hover:border-cyan-neon/50 hover:bg-white/[0.1] hover:shadow-glow-cyan focus-visible:border-cyan-neon/60 focus-visible:shadow-glow-cyan active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:w-[168px]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        <Zap
          className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
          aria-hidden="true"
        />
      )}
      {loading ? "Resolving" : "Execute"}
    </button>
  );
}

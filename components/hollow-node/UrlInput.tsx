"use client";

import { Link2, X } from "lucide-react";

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function UrlInput({ value, onChange, disabled }: UrlInputProps) {
  return (
    <div className="relative flex-1">
      <label htmlFor="shortlink-url" className="sr-only">
        URL shortlink
      </label>
      <Link2
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-cyan-neon/70"
      />
      <input
        id="shortlink-url"
        type="url"
        inputMode="url"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        required
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://shortlink.example/..."
        className="h-14 w-full rounded-md border border-border-primary bg-white/[0.05] pl-11 pr-11 font-mono text-[16px] text-text-primary placeholder:text-text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] !outline-none backdrop-blur-md transition focus:border-cyan-neon focus:bg-white/[0.08] focus:shadow-glow-cyan disabled:opacity-50"
      />
      {value && !disabled && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Bersihkan input"
          className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded text-text-muted transition hover:text-text-primary"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

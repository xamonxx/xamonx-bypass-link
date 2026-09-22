"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import clsx from "clsx";

interface CopyButtonProps {
  value: string;
}

export default function CopyButton({ value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard API unavailable; ignore
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Salin link tujuan"
        className={clsx(
          "flex h-11 min-w-11 items-center justify-center rounded-md border px-3 text-[11px] font-medium transition",
          copied
            ? "border-node-green/60 bg-node-green/10 text-node-green"
            : "border-border-primary text-text-secondary hover:border-node-green/50 hover:text-node-green"
        )}
      >
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      </button>
      <span
        role="status"
        className={clsx(
          "pointer-events-none absolute -top-8 right-0 whitespace-nowrap rounded bg-black/90 px-2 py-1 font-mono text-[10px] text-node-green transition-opacity",
          copied ? "opacity-100" : "opacity-0"
        )}
      >
        Copied to clipboard
      </span>
    </div>
  );
}

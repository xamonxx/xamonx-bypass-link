"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import CopyButton from "./CopyButton";

interface DestinationResultProps {
  url: string;
}

export default function DestinationResult({ url }: DestinationResultProps) {
  const [glitch, setGlitch] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setGlitch(false), 140);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      role="status"
      className="reveal rounded-md border border-node-green/40 bg-node-green/10 px-4 py-3 shadow-[var(--glow-green),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md"
    >
      <p
        className={`mb-2 font-mono text-[10px] uppercase tracking-widest text-node-green ${glitch ? "glitch-once" : ""}`}
      >
        ✓ Target acquired
      </p>
      <div className="flex items-center gap-2">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-11 min-w-0 flex-1 items-center gap-1.5 truncate rounded font-mono text-sm text-text-primary hover:text-node-green hover:underline"
        >
          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-node-green" aria-hidden="true" />
          <span className="truncate">{url}</span>
        </a>
        <CopyButton value={url} />
      </div>
    </div>
  );
}

import { Globe2 } from "lucide-react";
import { SUPPORTED_HOSTS } from "@/lib/shared/hosts";

export default function SupportedNodes() {
  return (
    <section
      aria-label="Situs yang didukung"
      className="reveal glass-surface flex w-full max-w-terminal flex-col items-center gap-3 p-4"
      style={{ animationDelay: "450ms" }}
    >
      <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">
        <Globe2 className="h-3 w-3 text-cyan-neon/70" aria-hidden="true" />
        Supported nodes
        <span className="text-text-muted/60">· {SUPPORTED_HOSTS.length}</span>
      </p>
      <ul className="flex flex-wrap justify-center gap-2">
        {SUPPORTED_HOSTS.map((host) => (
          <li
            key={host}
            className="flex items-center gap-1.5 rounded-full border border-border-primary bg-white/5 px-3 py-1.5 font-mono text-[12px] text-text-secondary transition hover:-translate-y-px hover:border-cyan-neon/40 hover:bg-white/[0.08] hover:text-text-primary"
          >
            {host}
          </li>
        ))}
      </ul>
    </section>
  );
}

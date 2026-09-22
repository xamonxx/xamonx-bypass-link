import { formatElapsed } from "@/lib/hollow-node/useElapsed";

interface NodeActivityProps {
  currentText: string;
  elapsedMs: number;
}

export default function NodeActivity({ currentText, elapsedMs }: NodeActivityProps) {
  return (
    <div className="flex items-center justify-between font-mono text-xs text-cyan-neon">
      <p className="term-cursor">
        <span className="text-text-muted">$ </span>
        {currentText}
      </p>
      <span className="tabular-nums text-text-muted">{formatElapsed(elapsedMs)}</span>
    </div>
  );
}

import { Check } from "lucide-react";
import type { LogStage } from "@/lib/hollow-node/types";

interface TerminalLogProps {
  stages: LogStage[];
  elapsedMs: number;
}

/** Renders only the stages that have already been superseded (checked off). */
export default function TerminalLog({ stages, elapsedMs }: TerminalLogProps) {
  const elapsedSeconds = elapsedMs / 1000;
  const reachedCount = stages.filter((s) => elapsedSeconds >= s.atSeconds).length;
  const completed = stages.slice(0, Math.max(reachedCount - 1, 0));

  if (completed.length === 0) return null;

  return (
    <ul className="flex flex-col gap-1">
      {completed.map((stage) => (
        <li
          key={stage.module}
          className="flex items-center gap-2 font-mono text-[11px] text-text-muted"
        >
          <Check className="h-3 w-3 shrink-0 text-node-green" aria-hidden="true" />
          <span className="text-node-green/80">{stage.module}</span>
          <span>{stage.text}</span>
        </li>
      ))}
    </ul>
  );
}

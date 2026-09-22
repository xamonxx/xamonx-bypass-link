import type { FormEvent } from "react";
import UrlInput from "./UrlInput";
import ResolveButton from "./ResolveButton";
import NodeActivity from "./NodeActivity";
import TerminalLog from "./TerminalLog";
import DestinationResult from "./DestinationResult";
import ErrorState from "./ErrorState";
import { LOG_STAGES } from "@/lib/hollow-node/constants";
import type { ResolveError, Status } from "@/lib/hollow-node/types";

interface ResolverPanelProps {
  url: string;
  onUrlChange: (value: string) => void;
  status: Status;
  onSubmit: (e: FormEvent) => void;
  result: string;
  error: ResolveError | null;
  elapsedMs: number;
  onRetry: () => void;
  onClear: () => void;
}

export default function ResolverPanel({
  url,
  onUrlChange,
  status,
  onSubmit,
  result,
  error,
  elapsedMs,
  onRetry,
  onClear,
}: ResolverPanelProps) {
  const elapsedSeconds = elapsedMs / 1000;
  const currentStage =
    [...LOG_STAGES].reverse().find((s) => elapsedSeconds >= s.atSeconds) ?? LOG_STAGES[0];

  return (
    <div
      className="reveal node-panel w-full max-w-terminal p-4 sm:p-5"
      style={{ animationDelay: "310ms" }}
    >
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">
        xamonx://resolver
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <UrlInput value={url} onChange={onUrlChange} disabled={status === "loading"} />
        <ResolveButton loading={status === "loading"} />
      </form>

      <div aria-live="polite" className="mt-3">
        {status === "loading" && (
          <div className="reveal flex flex-col gap-2 rounded-md border border-border-primary bg-black/25 px-4 py-3 backdrop-blur-md">
            <TerminalLog stages={LOG_STAGES} elapsedMs={elapsedMs} />
            <NodeActivity currentText={currentStage.text} elapsedMs={elapsedMs} />
          </div>
        )}

        {status === "error" && error && (
          <ErrorState error={error} onRetry={onRetry} onClear={onClear} />
        )}

        {status === "success" && <DestinationResult url={result} />}
      </div>
    </div>
  );
}

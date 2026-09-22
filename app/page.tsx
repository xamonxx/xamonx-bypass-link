"use client";

import { useState, type FormEvent } from "react";
import NodeHeader from "@/components/hollow-node/NodeHeader";
import ResolverPanel from "@/components/hollow-node/ResolverPanel";
import SupportedNodes from "@/components/hollow-node/SupportedNodes";
import { useElapsed } from "@/lib/hollow-node/useElapsed";
import type { ErrorCode, ResolveError, Status } from "@/lib/hollow-node/types";

function classifyError(httpStatus: number | null, message: string): ResolveError {
  let code: ErrorCode = "NODE_ERR_UNKNOWN";
  if (httpStatus === null) code = "NODE_ERR_NETWORK";
  else if (httpStatus === 422) code = "NODE_ERR_UNSUPPORTED";
  else if (httpStatus === 502) code = "NODE_ERR_TIMEOUT";
  return { code, message };
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState("");
  const [error, setError] = useState<ResolveError | null>(null);
  const elapsedMs = useElapsed(status === "loading");

  async function resolve(target: string) {
    setStatus("loading");
    setError(null);
    setResult("");

    try {
      const res = await fetch("/api/bypass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: target }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(classifyError(res.status, data.error ?? "Terjadi kesalahan."));
        setStatus("error");
        return;
      }

      setResult(data.finalUrl);
      setStatus("success");
    } catch {
      setError(classifyError(null, "Tidak bisa menghubungi server."));
      setStatus("error");
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    resolve(url);
  }

  function handleRetry() {
    if (url.trim()) resolve(url);
  }

  function handleClear() {
    setStatus("idle");
    setError(null);
    setResult("");
  }

  return (
    <main className="relative min-h-screen font-body">
      <div className="cyber-backdrop" aria-hidden="true">
        <div className="cyber-grid" />
        <div className="cyber-scanline" />
        <div className="cyber-vignette" />
        <div className="cyber-noise" />
      </div>

      <div
        className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-8"
        style={{
          paddingTop: "max(1.5rem, env(safe-area-inset-top))",
          paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
        }}
      >
        <NodeHeader />

        <ResolverPanel
          url={url}
          onUrlChange={setUrl}
          status={status}
          onSubmit={handleSubmit}
          result={result}
          error={error}
          elapsedMs={elapsedMs}
          onRetry={handleRetry}
          onClear={handleClear}
        />

        <SupportedNodes />
      </div>
    </main>
  );
}

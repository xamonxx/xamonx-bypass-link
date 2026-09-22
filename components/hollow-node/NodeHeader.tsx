import SystemStatus from "./SystemStatus";
import Wordmark from "./Wordmark";

export default function NodeHeader() {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="mb-4">
        <SystemStatus />
      </div>

      <div className="reveal mb-2" style={{ animationDelay: "90ms" }}>
        <Wordmark />
      </div>

      <p
        className="reveal max-w-md font-mono text-xs leading-relaxed text-text-secondary sm:text-sm"
        style={{ animationDelay: "190ms" }}
      >
        Tempel shortlink. AI akan menangani sisanya.
        <br />
        <span className="text-text-muted">
          Resolving redirect, verifikasi, dan destination secara otomatis.
        </span>
      </p>
    </header>
  );
}

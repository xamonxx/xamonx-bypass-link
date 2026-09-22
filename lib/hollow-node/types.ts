export type Status = "idle" | "loading" | "success" | "error";

export type ErrorCode =
  | "NODE_ERR_UNSUPPORTED"
  | "NODE_ERR_TIMEOUT"
  | "NODE_ERR_NETWORK"
  | "NODE_ERR_UNKNOWN";

export interface ResolveError {
  code: ErrorCode;
  message: string;
}

export interface LogStage {
  /** Seconds elapsed before this stage is considered "current". */
  atSeconds: number;
  module: string;
  text: string;
}

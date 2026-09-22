import type { LogStage } from "./types";

export const LOG_STAGES: LogStage[] = [
  { atSeconds: 0, module: "AI", text: "menganalisis struktur link" },
  { atSeconds: 1.2, module: "VISION", text: "merender halaman via headless browser" },
  { atSeconds: 4, module: "REASONING", text: "mengenali pola & strategi verifikasi" },
  { atSeconds: 8, module: "BYPASS", text: "mengeksekusi solusi verifikasi otomatis" },
  { atSeconds: 14, module: "REDIRECT", text: "melacak rantai redirect ke tujuan akhir" },
];

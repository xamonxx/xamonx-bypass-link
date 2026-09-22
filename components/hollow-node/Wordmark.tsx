"use client";

import { useEffect, useState } from "react";

const FIRST = "XAMONX";
const SECOND = "BYPASS LINK";
const FINAL = `${FIRST} ${SECOND}`;
const SCRAMBLE_CHARS = "01#$%&XZQKV";
const DECODE_MS = 550;
const FRAME_MS = 65;

function scrambledFrame(progress: number): string {
  return FINAL.split("")
    .map((ch, i) => {
      if (ch === " ") return ch;
      const revealAt = (i / FINAL.length) * 0.85;
      if (progress >= revealAt) return ch;
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    })
    .join("");
}

export default function Wordmark() {
  const [display, setDisplay] = useState(FINAL);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    setDisplay(scrambledFrame(0));
    const start = performance.now();
    let frame: ReturnType<typeof setTimeout>;

    const tick = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / DECODE_MS, 1);
      if (progress >= 1) {
        setDisplay(FINAL);
        setGlitch(true);
        const clear = setTimeout(() => setGlitch(false), 140);
        return () => clearTimeout(clear);
      }
      setDisplay(scrambledFrame(progress));
      frame = setTimeout(tick, FRAME_MS);
    };

    frame = setTimeout(tick, FRAME_MS);
    return () => clearTimeout(frame);
  }, []);

  const words = display.split(" ");
  const accent = words.pop() ?? "";
  const rest = words.join(" ");

  return (
    <h1
      aria-label={FINAL}
      className={`select-none font-display text-4xl font-bold tracking-tight sm:text-6xl ${glitch ? "glitch-once" : ""}`}
    >
      <span className="text-text-primary">{rest}</span>{" "}
      <span className="text-sky-400">{accent}</span>
    </h1>
  );
}

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        panel: "var(--panel)",
        "panel-hover": "var(--panel-hover)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        cyan: { neon: "rgb(var(--cyan-rgb) / <alpha-value>)" },
        magenta: { neon: "rgb(var(--magenta-rgb) / <alpha-value>)" },
        node: {
          green: "rgb(var(--green-rgb) / <alpha-value>)",
          yellow: "rgb(var(--yellow-rgb) / <alpha-value>)",
          red: "rgb(var(--red-rgb) / <alpha-value>)",
        },
        border: {
          primary: "var(--border-primary)",
          active: "var(--border-active)",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        "glow-cyan": "var(--glow-cyan)",
        "glow-magenta": "var(--glow-magenta)",
        "glow-green": "var(--glow-green)",
        "glow-red": "var(--glow-red)",
      },
      maxWidth: {
        terminal: "800px",
      },
    },
  },
  plugins: [],
};

export default config;

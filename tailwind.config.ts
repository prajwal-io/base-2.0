import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          base: "#FAF7F2",
          subtle: "#F4EFE6",
          card: "#FFFFFF",
          dark: "#12161A",
          "dark-surface": "#182026",
          "dark-border": "#28323B",
        },
        charcoal: {
          950: "#111215",
          900: "#1C1E22",
          800: "#2D3139",
          700: "#4A4E57",
          600: "#5D626D",
          500: "#717682",
          400: "#8E93A0",
          300: "#A0A5B1",
          200: "#D5D8E0",
          100: "#ECEEF2",
        },
        brand: {
          orange: "#EA580C",
          "orange-hover": "#D94E07",
          amber: "#F59E0B",
          "amber-light": "#FEF3C7",
          "amber-dark": "#D97706",
          cyan: "#00C0E8",
          "cyan-bright": "#00D4FF",
          teal: "#0891B2",
          "dark-pill": "#142528",
          "dark-pill-hover": "#1D3539",
        },
        border: {
          subtle: "#E8E3DA",
          strong: "#D4CDC2",
          dark: "#28323B",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        pill: "0 4px 20px -2px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)",
        photo: "0 12px 32px -4px rgba(20, 20, 20, 0.12), 0 4px 12px -2px rgba(20, 20, 20, 0.06)",
        card: "0 8px 24px -2px rgba(28, 25, 23, 0.05)",
        glow: "0 0 25px rgba(245, 158, 11, 0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
        editorial: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

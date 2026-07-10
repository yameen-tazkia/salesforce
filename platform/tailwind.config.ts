import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: "#eefaf4",
          100: "#d5f2e3",
          200: "#aee4cb",
          300: "#7dd0ae",
          400: "#48b58c",
          500: "#199a70",
          600: "#0c8259",
          700: "#0b674a",
          800: "#0a523c",
          900: "#084332",
          950: "#04261d",
        },
        navy: {
          50: "#f2f4fa",
          100: "#e2e7f3",
          200: "#c5cde6",
          300: "#9dabd2",
          400: "#6e81b8",
          500: "#4d5f9e",
          600: "#3a4983",
          700: "#303b6a",
          800: "#232b50",
          900: "#151b38",
          950: "#0a0f24",
        },
        teal: {
          50: "#effafb",
          100: "#d6f1f5",
          200: "#b2e3eb",
          300: "#7dcddc",
          400: "#41aec5",
          500: "#1f94ac",
          600: "#0e94ae",
          700: "#14707f",
          800: "#175261",
          900: "#174452",
          950: "#082c37",
        },
        gold: {
          50: "#fbf8ef",
          100: "#f5edd4",
          200: "#ead9a7",
          300: "#dec173",
          400: "#d3ab4d",
          500: "#c69a3a",
          600: "#b8860b",
          700: "#8f6410",
          800: "#775114",
          900: "#654416",
          950: "#3a2409",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.4s ease both",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F7F5EE",
        paper: "#FCFBF7",
        ink: "#1B241E",
        forest: {
          50: "#EAF2EC",
          100: "#CFE2D5",
          200: "#9FC5AB",
          300: "#6BA57E",
          400: "#3E8459",
          500: "#1F6B3E",
          600: "#155A32",
          700: "#0F4C2A",
          800: "#0B3D22",
          900: "#082F1A",
        },
        gold: {
          50: "#FBF3E1",
          100: "#F4E1B3",
          200: "#EACB7C",
          300: "#DFB44B",
          400: "#D4A017",
          500: "#B9860E",
          600: "#96690A",
          700: "#734F08",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,76,42,0.06), 0 8px 24px -12px rgba(15,76,42,0.18)",
      },
      borderRadius: {
        arch: "999px 999px 12px 12px",
      },
    },
  },
  plugins: [],
};
export default config;

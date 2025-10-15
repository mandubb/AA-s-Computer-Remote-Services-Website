import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "neon-cyan": "#19F9FF",
        "neon-blue": "#4D7CFE",
        "neon-magenta": "#FF5BFF",
        "midnight": "#050712",
        "midnight-900": "#05030a",
        "midnight-800": "#080c1a",
        "midnight-700": "#0d1228",
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "var(--font-rajdhani)", "sans-serif"],
        body: ["var(--font-inter)", "var(--font-roboto-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-line": "linear-gradient(90deg, rgba(25,249,255,0.15) 1px, transparent 1px), linear-gradient(0deg, rgba(25,249,255,0.15) 1px, transparent 1px)",
        "radial-neon": "radial-gradient(circle at 20% 20%, rgba(77,124,254,0.25), transparent 25%), radial-gradient(circle at 80% 30%, rgba(255,91,255,0.2), transparent 35%), radial-gradient(circle at 50% 70%, rgba(25,249,255,0.25), transparent 30%)",
      },
      boxShadow: {
        "neon": "0 0 20px rgba(25,249,255,0.35), 0 0 40px rgba(77,124,254,0.25)",
        "neon-magenta": "0 0 20px rgba(255,91,255,0.4), 0 0 40px rgba(255,91,255,0.25)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "gradient": "gradient 8s ease infinite",
        "pulse-slow": "pulse-slow 6s ease-in-out infinite",
        "glow": "glow 4s ease-in-out infinite",
        "bounce": "bounce 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.85" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(25,249,255,0.25), 0 0 20px rgba(77,124,254,0.25)" },
          "50%": { boxShadow: "0 0 25px rgba(25,249,255,0.45), 0 0 55px rgba(255,91,255,0.35)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

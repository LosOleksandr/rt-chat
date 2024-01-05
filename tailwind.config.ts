import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        accentHover: "hsl(var(--accent-hover))",
        danger: "hsl(var(--danger))",
        success: "hsl(vat(--success))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        typewriter: {
          from: {
            maxWidth: "0",
          },
          to: {
            maxWidth: "470px",
          },
        },
        blink: {
          from: {
            "border-right-color": "transparent",
          },
          to: {
            "border-right-color": "black",
          },
        },
        shake: {
          "0%": {
            marginLeft: "0rem",
          },
          "25%": {
            marginLeft: "0.5rem",
          },
          "75%": {
            marginLeft: "-0.5rem",
          },
          "100%": {
            marginLeft: "0rem",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        typewriter: "typewriter 3s steps(45) forwards, blink 1s infinite",
        shaking: "shake 0.2s ease-in-out 0s 2",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

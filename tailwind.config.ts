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
    screens: {
      xs: "330px",
      sm: "640px",
      md: "1024px",
      lg: "1280px",
      xl: "1440px",
    },
    extend: {
      colors: {
        background: {
          DEFAULT: "hsl(var(--background))",
          secondary: "hsl(var(--background-secondary))",
          foreground: "hsl(var(--background-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          hover: "hsl(var(--accent-hover))",
          foreground: "hsl(var(--accent-foreground))",
        },
        danger: {
          DEFAULT: "hsl(var(--danger))",
          hover: "hsl(var(--danger-hover))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          hover: "hsl(var(--success-hover))",
        },
        border: {
          DEFAULT: "hsl(var(--border))",
          foreground: "hsl(var(--border-foreground))",
        },
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

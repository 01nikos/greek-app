import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0F19",
          900: "#0B0F19",
          800: "#111726",
          700: "#1A2235",
          600: "#252F47",
          500: "#3A4663",
        },
        paper: {
          DEFAULT: "#F2EDE0",
          dim: "#C9C2B0",
          mute: "#8A8472",
        },
        aegean: {
          DEFAULT: "#3D7AAD",
          deep: "#1F4A78",
          light: "#6FA8D6",
        },
        terracotta: {
          DEFAULT: "#C2724A",
          deep: "#8E4E2C",
          light: "#E0A07E",
        },
        olive: {
          DEFAULT: "#7A8C5C",
          deep: "#4F5E3A",
        },
      },
      fontFamily: {
        display: ['"GFS Didot"', "Georgia", "serif"],
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Manrope"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "flip": "flip 0.6s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flip: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(180deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

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
        rose: {
          DEFAULT: "#EBA5B8",
          50: "#FCF4F6",
          100: "#F8E4EA",
          200: "#F3CCD7",
          300: "#EBA5B8",
          400: "#E37E99",
          500: "#D65A7C",
          600: "#BE3C60",
        },
        blush: {
          DEFAULT: "#F8DDE5",
          50: "#FEFAFB",
          100: "#FCF2F5",
          200: "#F8DDE5",
          300: "#F2C4D1",
        },
        ivory: {
          DEFAULT: "#FFF8F9",
          50: "#FFFFFF",
          100: "#FFF8F9",
          200: "#FFF0F3",
        },
        burgundy: {
          DEFAULT: "#4A1A2C",
          50: "#F7EEF1",
          100: "#EDD6DE",
          200: "#D9ADC0",
          300: "#BF7D9C",
          400: "#9A4B71",
          500: "#752E4E",
          600: "#5E233C",
          700: "#4A1A2C",
          800: "#36111F",
          900: "#220812",
        },
        gold: {
          DEFAULT: "#C9A36B",
          light: "#DFBE8C",
          dark: "#A68048",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(74, 26, 44, 0.08)',
        'card': '0 4px 16px -4px rgba(74, 26, 44, 0.1)',
        'drawer': '-4px 0 24px -2px rgba(74, 26, 44, 0.18)',
      },
    },
  },
  plugins: [],
};

export default config;


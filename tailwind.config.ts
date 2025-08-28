import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Natural & Fresh Palette
        primary: "#059669", // Emerald Green
        secondary: "#F9FAF5", // Soft Beige
        accent: "#14B8A6", // Teal (for buttons)
        accentHover: "#0D9488", // Hover teal
        highlight: "#FACC15", // Golden for tags or highlights
        textPrimary: "#1F2937", // Dark gray for text
        textSecondary: "#4B5563", // Medium gray
      },
      fontFamily: {
        // Fonts: heading = Playfair Display, body = League Spartan
         body: ['var(--font-league-spartan)', 'sans-serif'],
        heading: ['var(--font-playfair-display)', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;

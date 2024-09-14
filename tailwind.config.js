/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light Mode (VSCode-like)
        light_primary: "#ffffff", // Main background
        light_primary_low: "#f3f4f6", // Lighter background for panels
        light_secondary: "#1e1e1e", // Text and icons color
        light_neutral: "#6a737d", // Neutral grays for subtle UI elements
        light_accent: "#007acc", // Accent color (blue in VSCode)
        light_hover: "#005f9e", // Hover color for accent elements

        // Dark Mode (VSCode-like)
        dark_primary: "#1e1e1e", // Main background (editor background)
        dark_primary_low: "#252526", // Lighter background for panels
        dark_secondary: "#d4d4d4", // Text and icons color (light gray)
        dark_neutral: "#3c3c3c", // Neutral dark grays for UI elements
        dark_accent: "#569cd6", // Accent color (blue in VSCode dark)
        dark_hover: "#4a8fb0", // Hover color for accent elements

        // Global
        emerald: "#10B981", // Global color used for success buttons, etc.
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#f5f5dc", // Light beige
          DEFAULT: "#d8c9a7", // Beige
          dark: "#c8b997", // Dark beige
        },
        secondary: {
          light: "#34568b", // Light navy
          DEFAULT: "#1e3a6e", // Navy
          dark: "#0f224a", // Dark navy
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};

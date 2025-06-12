/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Fredoka One'", "sans-serif"],
        poppins: ["'Poppins'", "sans-serif"],
      },
      scrollBehavior: ["responsive"],
    },
  },
  plugins: [],
}
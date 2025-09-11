/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      fontFamily: {
        sans: ['Poppins','ui-sans-serif','system-ui','-apple-system','Segoe UI','Roboto','Arial','sans-serif'],
        display: ['Fredoka','Poppins','system-ui','sans-serif'],
      },
      colors: {
        brand:  { DEFAULT: '#6366F1' },  // Indigo 500
        accent: { DEFAULT: '#FB923C' },  // Orange 400
        surface:{ DEFAULT: '#F8FAFC', dark:'#0F172A' },
      },
      borderRadius: { sticker: '1.25rem' },
      boxShadow: {
        soft: '0 6px 24px -8px rgba(2,6,23,.12)',
        card: '0 10px 30px -12px rgba(2,6,23,.15)',
      },
      spacing: { section: '6rem', 'section-md': '8rem' },
    },
  },
  plugins: [],
};
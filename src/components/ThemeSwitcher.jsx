import { useEffect, useState } from "react";
import { m } from "framer-motion"; // On utilise m pour le rebond fluide

export default function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <m.button
      whileTap={{ scale: 0.95 }} // => petit rebond rapide au clic
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="ml-4 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-200 text-gray-800 dark:text-gray-600 font-semibold transition-all duration-500
                 hover:ring-4 hover:ring-indigo-300 hover:shadow-md dark:hover:ring-indigo-500 dark:hover:shadow-indigo-500/30"
    >
      {isDarkMode ? "☀️ Light" : "🌙 Dark"}
    </m.button>
  );
}

import { LazyMotion, m } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link, useLocation } from "react-router-dom";
import { loadMotionFeatures } from "@/lib/motion";
import { prefetchRoute } from "@/lib/prefetchRoute";

export default function Header() {
  const location = useLocation();

  return (
    <LazyMotion features={loadMotionFeatures}>
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 transition hover:opacity-80"
          >
            Minimoji
          </Link>
        </m.div>

        {/* Navigation + CTA + Switch */}
        <div className="flex items-center space-x-6">

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Link
              to="/concept"
              onMouseEnter={() => prefetchRoute('/concept')}
              className={`transition hover:text-indigo-600 dark:hover:text-indigo-400 ${
                location.pathname === "/concept" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
              }`}
            >
              Concept
            </Link>
            <Link
              to="/galerie"
              onMouseEnter={() => prefetchRoute('/galerie')}
              className={`transition hover:text-indigo-600 dark:hover:text-indigo-400 ${
                location.pathname === "/galerie" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
              }`}
            >
              Galerie
            </Link>
            
          </nav>

          {/* Call To Action */}
          <Link
            to="/creer"
            onMouseEnter={() => prefetchRoute('/creer')}
            className="hidden md:inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full text-sm transition"
          >
            Créer mon Dessin Animé
          </Link>

          {/* Theme Switcher */}
          <ThemeSwitcher />
        </div>
      </div>
    </header>
    </LazyMotion>
  );
}

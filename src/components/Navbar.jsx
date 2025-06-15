import { useState } from 'react';
import { motion } from 'framer-motion';
import ThemeSwitcher from './ThemeSwitcher';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <motion.div
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
        </motion.div>

        {/* Desktop nav + CTA */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-8 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Link
              to="/concept"
              className={`transition hover:text-indigo-600 dark:hover:text-indigo-400 ${
                location.pathname === "/concept" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
              }`}
            >
              Concept
            </Link>
            <Link
              to="/galerie"
              className={`transition hover:text-indigo-600 dark:hover:text-indigo-400 ${
                location.pathname === "/galerie" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
              }`}
            >
              Galerie
            </Link>
            <Link
              to="/tarifs"
              className={`transition hover:text-indigo-600 dark:hover:text-indigo-400 ${
                location.pathname === "/tarifs" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
              }`}
            >
              Tarifs
            </Link>
          </nav>

          <Link
            to="/creer"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full text-sm transition"
          >
            Créer mon Dessin Animé
          </Link>
        </div>

        {/* Right side: ThemeSwitcher + Burger icon */}
        <div className="flex items-center gap-4">
          {/* Theme Switcher visible sur toutes tailles */}
          <ThemeSwitcher />

          {/* Burger icon pour mobile */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 pt-2 space-y-4 bg-white dark:bg-gray-900 shadow-md">
          <nav className="flex flex-col space-y-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
            <Link
              to="/concept"
              className={`transition hover:text-indigo-600 dark:hover:text-indigo-400 ${
                location.pathname === "/concept" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              Concept
            </Link>
            <Link
              to="/galerie"
              className={`transition hover:text-indigo-600 dark:hover:text-indigo-400 ${
                location.pathname === "/galerie" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              Galerie
            </Link>
            <Link
              to="/tarifs"
              className={`transition hover:text-indigo-600 dark:hover:text-indigo-400 ${
                location.pathname === "/tarifs" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              Tarifs
            </Link>
            <Link
              to="/creer"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full text-center transition"
              onClick={() => setIsOpen(false)}
            >
              Créer mon Dessin Animé
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
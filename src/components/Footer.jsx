import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer
        id="footer"
        className="relative bg-indigo-600 transition-colors duration-500 text-white font-sans px-2 py-8 pt-16"
      >
        <div className="max-w-6xl mx-auto flex flex-col gap-6 text-center items-center [@media(min-width:968px)]:flex-row [@media(min-width:968px)]:justify-between">
          {/* Bloc gauche avec logo et année */}
          <div className="bg-indigo-700 rounded-lg px-6 py-3 shadow-md text-center">
            <p className="text-sm font-semibold text-white">
              Minimoji by Breizhstorm
            </p>
            <p className="text-xs text-indigo-100">
              © 2025 – Tous droits réservés
            </p>
          </div>

          {/* Bloc liens */}
          <nav className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-base sm:text-sm md:text-lg text-white">
            <Link
              to="/concept"
              className="transform transition-transform duration-300 hover:scale-105 hover:text-indigo-200"
            >
              Concept
            </Link>
            <Link
              to="/galerie"
              className="transform transition-transform duration-300 hover:scale-105 hover:text-indigo-200"
            >
              Galerie
            </Link>
            <Link
              to="/mentions-legales"
              className="transform transition-transform duration-300 hover:scale-105 hover:text-indigo-200"
            >
              Mentions légales
            </Link>
            <Link
              to="/cgu-cgv"
              className="transform transition-transform duration-300 hover:scale-105 hover:text-indigo-200"
            >
              CGU – CGV
            </Link>
          </nav>
          <div className="mt-6 sm:mt-0 text-center">
            <Link
              to="/creer"
              className="bg-white hover:bg-gray-200 text-gray-900 font-semibold py-2 px-5 rounded-full text-sm font-poppins transition"
            >
              Créer mon Dessin Animé
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
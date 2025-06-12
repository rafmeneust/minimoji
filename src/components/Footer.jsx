import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="bg-[#FFF] dark:bg-gray-900 transition-colors duration-500 text-gray-700 dark:text-gray-100 font-sans px-2 py-8 mt-20"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:justify-between items-center gap-6 sm:gap-0 text-center sm:text-left">
        {/* Bloc gauche avec logo et année */}
        <div>
          <p className="font-bold dark:text-gray-100 text-lg flex items-center gap-1">
            <span role="img" aria-label="dino">🦕</span> MonDessinAnimé
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-100 mt-1">
            © {currentYear} – Tous droits réservés
          </p>
        </div>

        {/* Bloc liens */}
        <nav className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-gray-600 dark:text-gray-100">
          <Link
            to="/"
            className="transform transition-transform duration-300 hover:scale-105 hover:text-gray-900 dark:hover:text-indigo-300"
          >
            Concept
          </Link>
          <Link
            to="/galerie"
            className="transform transition-transform duration-300 hover:scale-105 hover:text-gray-900 dark:hover:text-indigo-300"
          >
            Galerie
          </Link>
          <Link
            to="/infos-legales"
            className="transform transition-transform duration-300 hover:scale-105 hover:text-gray-900 dark:hover:text-indigo-300"
          >
            Créer mon Dessin Animé
          </Link>
        </nav>
      </div>
    </footer>
  );
}
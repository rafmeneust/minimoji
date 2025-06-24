import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import NotFoundIllustration from '/404.svg';

export default function NotFound() {
  useEffect(() => {
    document.title = "Page non trouvée - Minimoji";
  }, []);

  return (
    <main
      role="main"
      aria-labelledby="page-title"
      className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900 text-center px-6"
    >
      <motion.h1
        id="page-title"
        className="text-5xl sm:text-6xl font-extrabold text-black mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404 - Page introuvable
      </motion.h1>

      <img
        src={NotFoundIllustration}
        alt="Le magicien et le dinosaure cherchent leur chemin sur une carte"
        className="w-72 h-auto mb-6"
        role="presentation"
      />

      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Oups ! Cette page semble avoir disparu…
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Nos héros sont perdus, carte en main, à la recherche du bon chemin.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-orange-400 hover:bg-orange-600 text-white font-semibold rounded-full transition"
        aria-label="Retour à la page d’accueil"
      >
        Retour à l’accueil
      </Link>
    </main>
  );
}
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Pitch from "../components/Pitch";
import { Helmet } from "react-helmet";

export default function Tarifs() {
  return (
    <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Helmet>
        <title>Tarifs Minimoji – Vidéos animées à partir des dessins d’enfants</title>
        <meta
          name="description"
          content="Découvrez les prix Minimoji : Formule Mini, Classique et Grand Héros. Transformez les dessins de vos enfants en vidéos féeriques, dès 8,99 €, livrées en 24h."
        />
        <link rel="canonical" href="https://minimoji.fr/tarifs" />

        {/* Open Graph */}
        <meta property="og:title" content="Tarifs Minimoji – Vidéos animées à partir des dessins d’enfants" />
        <meta property="og:description" content="Formules Mini, Classique, Grand Héros – dès 8,99 €. Livraison rapide de vidéos féeriques basées sur les dessins de vos enfants." />
        <meta property="og:url" content="https://minimoji.fr/tarifs" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://minimoji.fr/images/preview-form.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tarifs Minimoji – Vidéos animées à partir des dessins d’enfants" />
        <meta name="twitter:description" content="Formules magiques dès 8,99 €. Mini-films personnalisés créés à partir des dessins d’enfants, livrés rapidement." />
        <meta name="twitter:image" content="https://minimoji.fr/images/preview-form.jpg" />
      </Helmet>
      {/* Hero section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nos formules magiques 
        </motion.h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Choisissez la formule qui correspond à votre univers.  
          Chaque dessin peut devenir un souvenir animé, à offrir ou à garder précieusement.
        </p>
      </section>


      {/* Tarifs cards */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Carte 1 */}
        <div className="bg-indigo-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">Formule Mini</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">10 sec d’animation douce, idéale pour tester la magie.</p>
          <div className="text-3xl font-extrabold mb-4">8,99 €</div>
          <p className="mt-4 inline-block bg-white text-gray-700 dark:text-gray-800 text-sm px-5 py-1 rounded-full shadow">
            Livré en 24h
          </p>
        </div>

        {/* Carte 2 */}
        <div className="relative bg-indigo-100 dark:bg-gray-700 p-6 rounded-2xl shadow-md text-center border-4 border-indigo-400 transform transition-transform duration-300 hover:scale-105">
          <div className="absolute -top-3 right-4 translate-y-[-30%]">
            <span className="bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              Recommandée
            </span>
          </div>
          <h2 className="text-xl font-bold text-indigo-700 dark:text-white mb-2">Formule Classique</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">20 sec d’aventure animée avec transitions et surprise.</p>
          <div className="text-3xl font-extrabold mb-4">13,99 €</div>
          <p className="mt-4 inline-block bg-white text-gray-700 dark:text-gray-800 text-sm px-5 py-1 rounded-full shadow">
            Livré en 24h – recommandé
          </p>
        </div>

        {/* Carte 3 */}
        <div className="bg-indigo-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">Formule Grand Héros</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">30 sec avec musique personnalisée, intro & final magique.</p>
          <div className="text-3xl font-extrabold mb-4">19,99 €</div>
          <p className="mt-4 inline-block bg-white text-gray-700 dark:text-gray-800 text-sm px-5 py-1 rounded-full shadow">
            Livré en 48h
          </p>
        </div>
      </section>
      <div className="text-center mt-8">
  <Link
    to="/creer"
    className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-full text-lg transition"
  >
    Créer mon Dessin Animé
  </Link>
</div>
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  <Pitch />
</motion.div>

    </main>
  );
}
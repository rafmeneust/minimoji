import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export default function Concept() {
  return (
    <>
      <Helmet>
        <title>Concept Minimoji — Donnez vie aux dessins d’enfants</title>
        <meta
          name="description"
          content="Découvrez comment Minimoji transforme les dessins d’enfants en films animés magiques, en 3 étapes simples. Une expérience féérique pour petits et grands."
        />
        <link rel="canonical" href="https://minimoji.fr/concept" />

        {/* Open Graph */}
        <meta property="og:title" content="Concept Minimoji — Donnez vie aux dessins d’enfants" />
        <meta property="og:description" content="Découvrez comment Minimoji transforme les dessins d’enfants en films animés magiques, en 3 étapes simples. Une expérience féérique pour petits et grands." />
        <meta property="og:url" content="https://minimoji.fr/concept" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://minimoji.fr/images/preview-form.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Concept Minimoji — Donnez vie aux dessins d’enfants" />
        <meta name="twitter:description" content="Découvrez comment Minimoji transforme les dessins d’enfants en films animés magiques, en 3 étapes simples." />
        <meta name="twitter:image" content="https://minimoji.fr/images/preview-form.jpg" />
      </Helmet>
      <main className="bg-white dark:bg-gray-900 transition-colors duration-500 text-gray-900 dark:text-gray-100 font-sans">
      <section className="px-10 sm:px-6 md:px-10 py-20 max-w-3xl mx-auto">

        {/* Accroche principale */}
         <motion.h1
          className="text-3xl sm:text-4xl lg:text-4xl font-extrabold mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Une dessin aujour'hui, un film magique dès demain ✨
        </motion.h1>
        <p className="text-lg sm:text-xl leading-relaxed text-center text-indigo-700 dark:text-indigo-300 mb-12">
          Confiez‑le à notre magicien… et réveillez‑vous avec la magie
        </p>

        {/* Étapes du rituel */}
        <div className="space-y-16">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <h2 className="text-xl sm:text-2xl font-bold">1. Remettez le parchemin</h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
              Envoyez une photo ou un scan du dessin de votre enfant — même bancal, même griffonné. L’essentiel, c’est l’élan créatif. Vous pouvez y ajouter une note vocale ou un petit texte si vous souhaitez enrichir l’histoire. Pas obligatoire, mais notre magicien aime les détails !
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <h2 className="text-xl sm:text-2xl font-bold">2. Le magicien s’en empare</h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
              Il analyse les lignes, les couleurs, l’énergie du dessin. Puis, d’un coup de baguette, il en fait une animation. Fidèle, mais prolongée. Une mini‑histoire naît, pleine de douceur ou de folie, selon l’inspiration de l’œuvre.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <h2 className="text-xl sm:text-2xl font-bold">3. Réception du film (sous 24 h) </h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
              Vous recevez un lien sécurisé contenant la vidéo en HD, sans watermark. Elle est prête à être projetée, partagée ou transformée en souvenir : certains l’intègrent dans un album, d’autres la collent au dos du dessin via QR code.
            </p>
          </motion.div>
        </div>
          {/* CTA final */}
         <div className="mt-16 text-center">
          <motion.a
            href="/creer"
            className="inline-block px-6 py-3 bg-[#FB923C] hover:bg-orange-600 text-white rounded-full font-semibold text-base transition"
            whileHover={{ scale: 1.05 }}
          >
            Je confie le dessin au magicien
          </motion.a>
          <img src="/step2.png" alt="Illustration étape 2" className="mx-auto mt-6 w-40 h-40 object-contain" />
        </div>
      </section>
      <div className="relative w-full overflow-hidden bg-transparent">


  <style>
    {`
      @keyframes blob {
        0%   { transform: scale(1) translate(0px, 0px) rotate(0deg); }
        33%  { transform: scale(1.05) translate(5px, -5px) rotate(2deg); }
        66%  { transform: scale(0.95) translate(-5px, 5px) rotate(-2deg); }
        100% { transform: scale(1) translate(0px, 0px) rotate(0deg); }
      }
    `}
  </style>
</div>
      <section className="bg-[#FEF9E9] dark:bg-gray-900 transition-colors duration-500 w-full">
  <div className="px-10 sm:px-6 md:px-10 py-20 max-w-3xl mx-auto font-sans" id="galerie">
    
    <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10">Préparez la magie ✨</h2>

    {/* Formats */}
    <div className="mt-16">
      <div className="bg-white/60 dark:bg-white/10 rounded-xl p-6 shadow-sm backdrop-blur-sm transition-transform duration-300 ease-in-out hover:scale-105">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Formats au choix</h3>
        <p className="text-base text-gray-700 dark:text-gray-300">
          Portrait, paysage ou carré — le magicien adapte l’histoire et la vidéo à votre demande.
        </p>
      </div>
    </div>

    {/* Confiance & légalité */}
    <div className="mt-16">
      <div className="bg-white/60 dark:bg-white/10 rounded-xl p-6 shadow-sm backdrop-blur-sm transition-transform duration-300 ease-in-out hover:scale-105">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Confiance & légalité</h3>
        <ul className="list-disc list-inside space-y-1 text-base text-gray-700 dark:text-gray-300">
          <li>Respect strict du droit à l’image</li>
          <li>Aucune utilisation commerciale sans accord écrit</li>
          <li>Vous restez pleinement propriétaire des fichiers</li>
        </ul>
      </div>
    </div>

    {/* Tarifs / accessibilité */}
    <div className="mt-16">
      <div className="bg-white/60 dark:bg-white/10 rounded-xl p-6 shadow-sm backdrop-blur-sm transition-transform duration-300 ease-in-out hover:scale-105">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Prix tout doux</h3>
        <p className="text-base text-gray-700 dark:text-gray-300">
          La magie est accessible à toutes les bourses. Pas d’abonnement, pas de mauvaise surprise. Une seule formule, un petit prix. Et beaucoup d’émerveillement.
        </p>
        <p className="mt-3 text-xs text-gray-600 dark:text-gray-400 italic">
          Besoin d’un format ou d’une idée spéciale ? Chuchotez‑la, le magicien adore les défis.
        </p>
      </div>
    </div>
          <div className="text-center">
            <a
              href="/galerie"
              className="inline-block mt-10 px-6 py-3 bg-indigo-600 hover:bg-indigo-800 text-white rounded-full font-semibold text-base transition mb-10"
            >
              Voir la galerie magique
            </a>
          </div>

  </div>
</section>
      </main>
    </>
  );
}

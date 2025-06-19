import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

export default function Galerie() {
  return (
    <>
      <Helmet>
        <title>Galerie | Minimoji - Les dessins s’animent</title>
        <meta name="description" content="Découvrez des exemples de dessins transformés en mini-films animés. Magie, émotions et créativité enfantine au cœur de notre galerie." />
        <meta name="keywords" content="galerie, animation, dessins enfants, vidéos magiques, exemples Minimoji, mini-films créatifs" />
        <meta property="og:title" content="Galerie | Minimoji - Les dessins s’animent" />
        <meta property="og:description" content="Plongez dans notre galerie d’exemples et voyez comment les dessins prennent vie grâce à Minimoji." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://minimoji.fr/galerie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Galerie | Minimoji - Les dessins s’animent" />
        <meta name="twitter:description" content="Plongez dans notre galerie d’exemples et voyez comment les dessins prennent vie grâce à Minimoji." />
        <meta name="twitter:image" content="https://minimoji.fr/images/preview-form.jpg" />
        <meta name="twitter:site" content="@minimoji_fr" />
      </Helmet>
      <main className="bg-white dark:bg-gray-900 transition-colors duration-500 text-gray-900 dark:text-gray-100 font-sans">
      <section className="px-10 sm:px-6 md:px-10 py-20 max-w-3xl mx-auto">

        {/* Accroche principale */}
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-snug mb-8 text-center">
        Un dessin aujourd’hui, un film magique dès demain.
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed text-center text-indigo-700 dark:text-indigo-300 mb-12">
          Confiez‑le à notre magicien… et réveillez‑vous avec la magie ✨
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

        {/* Formats */}
        <div className="mt-16">
        <div className="mt-8 border-t pt-6 border-gray-300 dark:border-gray-600"></div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Formats au choix</h3>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
            Portrait, paysage ou carré — le magicien adapte l’histoire et la vidéo à votre demande.
          </p>
        </div>

        {/* Confiance & légalité */}
        <div className="mt-16">
        <div className="mt-8 border-t pt-6 border-gray-300 dark:border-gray-600"></div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Confiance & légalité</h3>
          <ul className="list-disc list-inside space-y-1 text-base text-gray-700 dark:text-gray-300">
            <li>Respect strict du droit à l’image</li>
            <li>Aucune utilisation commerciale sans accord écrit</li>
            <li>Vous restez pleinement propriétaire des fichiers</li>
          </ul>
        </div>

        {/* Tarifs / accessibilité */}
        <div className="mt-16">
        <div className="mt-8 border-t pt-6 border-gray-300 dark:border-gray-600"></div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Prix tout doux</h3>
          <p className="text-base text-gray-700 dark:text-gray-300">
            La magie est accessible à toutes les bourses. Pas d’abonnement, pas de mauvaise surprise. Une seule formule, un petit prix. Et beaucoup d’émerveillement.
          </p>
          <p className="mt-3 text-xs text-gray-600 dark:text-gray-400 italic">
            Besoin d’un format ou d’une idée spéciale ? Chuchotez‑la, le magicien adore les défis.
          </p>
        </div>

        {/* CTA final */}
        <div className="mt-16 text-center">
          <motion.a
            href="#create"
            className="inline-block px-6 py-3 bg-[#FB923C] hover:bg-orange-600 text-white rounded-full font-semibold text-base transition"
            whileHover={{ scale: 1.05 }}
          >
            Je confie le dessin au magicien
          </motion.a>
        </div>

      </section>
    </main>
    </>
  );
}

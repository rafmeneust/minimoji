import { Helmet } from "react-helmet";
import { LazyMotion, m } from "framer-motion";
import { loadMotionFeatures } from "@/lib/motion";

export default function Galerie() {
  return (
    <LazyMotion features={loadMotionFeatures}>
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

        {/* Section galerie – secrets, témoignages, appel à contribution */}
        <div className="mt-20">
          <div className="border-t pt-6 border-gray-300 dark:border-gray-600"></div>
          <div className="space-y-12">

            {/* Secrets du magicien */}
            <div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Les secrets du magicien</h4>
              <p className="text-base text-gray-700 dark:text-gray-300">
                Chaque dessin contient une intention, une histoire, un geste. Le magicien Minimoji interprète cette énergie enfantine à l’aide de l’IA et d’un savoir-faire artisanal : il détecte les éléments narratifs, amplifie l’émotion du trait, puis génère un court métrage animé fidèle à la spontanéité du dessin. Ici, pas de modèle figé — chaque création est un prototype magique, pensé pour révéler la beauté du chaos enfantin.
              </p>
            </div>

            {/* Témoignages */}
            <div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Ils ont tenté l’expérience</h4>
              <ul className="space-y-2 text-base text-gray-700 dark:text-gray-300 list-disc list-inside">
                <li>“Mon fils s’est vu en héros, il en a pleuré de joie.” – Camille, maman émerveillée</li>
                <li>“On l’a projeté à l’école : standing ovation dans la classe !” – Thomas, enseignant en CE2</li>
                <li>“Le dessin prenait déjà toute la place sur le frigo, maintenant il vit sur nos téléphones, et nos cœurs.” – Inès</li>
              </ul>
            </div>

            {/* Appel à contribution */}
            <div className="text-center">
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Faites partie de la galerie</h4>
              <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                Vous êtes parent, enseignant ou curieux ? Offrez à votre enfant l’opportunité de voir son imagination prendre vie. Chaque mois, certains dessins sont sélectionnés pour intégrer notre galerie magique.
              </p>
              <m.a
                href="/creer"
                className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold text-base transition"
                whileHover={{ scale: 1.05 }}
              >
                Créer mon dessin animé
              </m.a>
            </div>

          </div>
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
          <m.a
            href="#create"
            className="inline-block px-6 py-3 bg-[#FB923C] hover:bg-orange-600 text-white rounded-full font-semibold text-base transition"
            whileHover={{ scale: 1.05 }}
          >
            Je confie le dessin au magicien
          </m.a>
        </div>

      </section>
    </main>
    </>
    </LazyMotion>
  );
}

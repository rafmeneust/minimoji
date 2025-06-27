import { motion } from "framer-motion";
import { useState, useRef } from "react";

const videos = [
  {
    src: "/video1.mp4",
    title: "Le dragon de Milo",
    subtitle: "Par Raphaël, 4 ans",
  },
  {
    src: "/video2.mp4",
    title: "La maison magique de Lila",
    subtitle: "Par Lucas, 7 ans",
  },
  {
    src: "/video3.mp4",
    title: "Le chat Croquette",
    subtitle: "Par Alice, 6 ans",
  },
  {
    src: "/video4.mp4",
    title: "La danse du doudou panda",
    subtitle: "Par Maëlis, 6 ans",
  },
];

export default function GaleriePage() {
  const [hovered, setHovered] = useState(null);
  const [activeTag, setActiveTag] = useState("tous");

  return (
    <main className="bg-white dark:bg-gray-900 transition-colors duration-500 text-gray-900 dark:text-gray-100 font-sans">
      <section className="px-4 sm:px-6 md:px-10 py-20 max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-snug mb-4 text-center">
          Ils ont dessiné… et la magie a fait le reste
        </h1>
        <p className="text-base sm:text-lg text-center text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Voici une sélection de vidéos magiques, créées à partir de vrais dessins d’enfants. Chaque film est une aventure unique.
        </p>

        {/* Grille de vidéos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {videos.map((vid, index) => {
            return (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-2xl group bg-gray-100 dark:bg-gray-800"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: index * 0.05 }}
                onMouseEnter={() => {
                  const video = document.getElementById(`video-${index}`);
                  if (video) {
                    video.muted = false;
                  }
                }}
                onMouseLeave={() => {
                  const video = document.getElementById(`video-${index}`);
                  if (video) {
                    video.muted = true;
                  }
                }}
                onClick={() => {
                  const video = document.getElementById(`video-${index}`);
                  if (video) {
                    video.muted = !video.muted;
                  }
                }}
              >
                <video
                  id={`video-${index}`}
                  src={vid.src}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  className="relative z-10 w-full aspect-[9/16] object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white z-20">
                  <h3 className="text-sm font-semibold truncate">{vid.title}</h3>
                  <p className="text-xs opacity-80 truncate">{vid.subtitle}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Étapes de transformation sous forme de cartes */}
        <div className="mt-24 grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "1. Le dessin est reçu",
              description:
                "Un parent envoie le dessin de son enfant via notre formulaire sécurisé. Tous les formats sont acceptés — photo, scan ou simple croquis.",
            },
            {
              title: "2. La magie opère",
              description:
                "Notre magicien numérique analyse le dessin, choisit un style, et transforme l’univers graphique en scénario animé sur-mesure.",
            },
            {
              title: "3. Le mini-film est livré",
              description:
                "En moins de 24h, le dessin devient une vidéo à partager. Un souvenir magique que l’on garde et que l’on montre fièrement.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-indigo-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg`}
            >
              <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{step.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-24 px-4 bg-white dark:bg-gray-800 py-10 rounded-xl shadow-md">
          <p className="text-base sm:text-lg text-gray-800 dark:text-gray-300 max-w-xl mx-auto mb-6">
            Et si le prochain dessin devenait le vôtre ? En moins de 24h, notre magicien transforme l’imaginaire de votre enfant en un souvenir vidéo inoubliable.
          </p>
          <a
            href="/concept"
            className="inline-block px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-medium transition transform hover:scale-105"
          >
            Voir comment ça marche
          </a>
        </div>
      </section>
    </main>
  );
}
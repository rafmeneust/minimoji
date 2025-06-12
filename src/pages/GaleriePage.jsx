import { motion } from "framer-motion";
import { useState, useRef } from "react";

const videos = [
  {
    src: "/video1.mp4",
    title: "Le dragon de Milo",
    subtitle: "Par Raphaël, 4 ans",
    tag: "aventures",
  },
  {
    src: "/video2.mp4",
    title: "La maison magique de Lila",
    subtitle: "Par Lucas, 7 ans",
    tag: "magie douce",
  },
  {
    src: "/video3.mp4",
    title: "Le vaisseau intergalactique",
    subtitle: "Par Alice, 6 ans",
    tag: "science-fiction",
  },
  {
    src: "/video4.mp4",
    title: "La danse du doudou panda",
    subtitle: "Par Maëlis, 6 ans",
    tag: "animaux",
  },
  {
    src: "/video5.mp4",
    title: "Super-Nuage contre Pluie-Monstre",
    subtitle: "Par Corentin, 7 ans",
    tag: "monstres",
  },
  {
    src: "/video6.mp4",
    title: "La fée du jardin secret",
    subtitle: "Par Marina, 5 ans",
    tag: "magie douce",
  },
];

const tags = ["tous", "animaux", "monstres", "magie douce", "aventures", "science-fiction"];

export default function GaleriePage() {
  const [hovered, setHovered] = useState(null);
  const [activeTag, setActiveTag] = useState("tous");
  const filteredVideos = activeTag === "tous" ? videos : videos.filter((v) => v.tag === activeTag);

  return (
    <main className="bg-[#dcedec] dark:bg-gray-900 transition-colors duration-500 text-gray-900 dark:text-gray-100 font-sans">
      <section className="px-4 sm:px-6 md:px-10 py-20 max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-snug mb-4 text-center">
          Ils ont dessiné… et la magie a fait le reste
        </h1>
        <p className="text-base sm:text-lg text-center text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Voici une sélection de vidéos magiques, créées à partir de vrais dessins d’enfants. Chaque film est une aventure unique.
        </p>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tags.map((tag) => (
             <button
              key={tag}
              onClick={() => setActiveTag(tag.toLowerCase())}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                activeTag === tag.toLowerCase()
                  ? "bg-indigo-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700"
              }`}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          ))}
        </div>

        {/* Grille de vidéos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredVideos.map((vid, index) => {
            const [isReady, setIsReady] = useState(false);
            const [isMuted, setIsMuted] = useState(true);
            const videoRef = useRef(null);

            const toggleMute = () => {
              if (videoRef.current) {
                const newMuted = !videoRef.current.muted;
                videoRef.current.muted = newMuted;
                setIsMuted(newMuted);
              }
            };

            return (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-2xl group bg-gray-100 dark:bg-gray-800"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: index * 0.05 }}
                onMouseEnter={() => {
                  if (videoRef.current) {
                    videoRef.current.muted = false;
                    setIsMuted(false);
                  }
                }}
                onMouseLeave={() => {
                  if (videoRef.current) {
                    videoRef.current.muted = true;
                    setIsMuted(true);
                  }
                }}
                onClick={toggleMute}
              >
                {/* Skeleton loader */}
                {!isReady && (
                  <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700 z-0" />
                )}

                {/* Icône audio en haut à droite */}
                <div className="absolute top-2 right-2 z-30 text-white text-xl pointer-events-none select-none drop-shadow-md">
                  {isMuted ? "🔇" : "🔊"}
                </div>

                <video
                  ref={videoRef}
                  src={vid.src}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  onCanPlayThrough={() => setIsReady(true)}
                  className={`relative z-10 w-full aspect-[9/16] object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out ${
                    isReady ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                />

                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white z-20">
                  <h3 className="text-sm font-semibold truncate">{vid.title}</h3>
                  <p className="text-xs opacity-80 truncate">{vid.subtitle}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-24 px-4">
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
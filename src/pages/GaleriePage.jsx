import React from "react";
import { motion } from "framer-motion";
import { useState, useRef, useMemo } from "react";

const videos = [
  {
    src: "/video1.mp4",
    title: "Rayon d’Éveil",
    subtitle: "Par Raphaël, 4 ans",
  },
  {
    src: "/video2.mp4",
    title: "Folie sucrée",
    subtitle: "Par Lucas, 7 ans",
  },
  {
    src: "/video3.mp4",
    title: "Félin d'Ombre",
    subtitle: "Par Alice, 6 ans",
  },
  {
    src: "/video4.mp4",
    title: "Tracé de Rêve",
    subtitle: "Par Maëlis, 8 ans",
  },
  {
    src: "/video5.mp4",
    title: "Ballet d’Étoiles",
    subtitle: "Par Noa, 9 ans",
  },
  {
    src: "/video6.mp4",
    title: "Tortue géniale",
    subtitle: "Par Clémentin, 11 ans",
  },
  {
    src: "/video7.mp4",
    title: "Pomme de Reinette",
    subtitle: "Par Yanis, 7 ans",
  },
  {
    src: "/video8.mp4",
    title: "L'oiseau et le hibou",
    subtitle: "Par Egonn, 5 ans",
  },
];

/** Seeded PRNG (Mulberry32) */
function mulberry32(a) {
  let t = a >>> 0;
  return function () {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher–Yates shuffle with seed (stable per page load) */
function shuffleWithSeed(arr, seed) {
  const rng = mulberry32(seed >>> 0);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function GaleriePage() {
  const [hovered, setHovered] = useState(null);
  const [activeTag, setActiveTag] = useState("tous");
  // Pick a random seed once per mount; keeps order stable for this session
  const seedRef = useRef(Math.floor(Math.random() * 0xffffffff));
  const shuffledVideos = useMemo(() => shuffleWithSeed([...videos], seedRef.current), []);
  const videoRefs = useRef(shuffledVideos.map(() => React.createRef()));
  const [isMuted, setIsMuted] = useState(shuffledVideos.map(() => true));

  const fadeVolume = (video, from, to, duration, callback) => {
    if (!video) return;
    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      video.volume = from + (to - from) * progress;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (callback) callback();
      }
    };
    requestAnimationFrame(step);
  };

  const handleMouseEnter = (index) => {
    const video = videoRefs.current[index].current;
    if (video) {
      try {
        video.muted = false;
        const p = video.play?.();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } catch (err) {}
      fadeVolume(video, 0, 1, 300);
      setIsMuted((prev) => {
        const next = [...prev];
        next[index] = false;
        return next;
      });
    }
  };

  const handleMouseLeave = (index) => {
    const video = videoRefs.current[index].current;
    if (video) {
      fadeVolume(video, 1, 0, 300, () => {
        video.muted = true;
        setIsMuted((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
      });
    }
  };

  const handleKeyToggle = (index, e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const video = videoRefs.current[index].current;
      if (!video) return;
      if (video.muted) {
        try {
          video.muted = false;
          const p = video.play?.();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } catch (err) {}
        fadeVolume(video, 0, 1, 300);
        setIsMuted((prev) => {
          const next = [...prev];
          next[index] = false;
          return next;
        });
      } else {
        fadeVolume(video, 1, 0, 300, () => {
          video.muted = true;
          setIsMuted((prev) => {
            const next = [...prev];
            next[index] = true;
            return next;
          });
        });
      }
    }
  };

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
          {shuffledVideos.map((vid, index) => {
            return (
              <motion.div
                key={index}
                className="card relative p-0 w-full rounded-2xl overflow-hidden transition-all duration-300 bg-white dark:bg-gray-800 group shadow-[0_10px_30px_-8px_rgba(99,102,241,0.25)] hover:scale-[1.02] hover:ring-4 hover:ring-indigo-400/60 hover:shadow-[0_22px_80px_-10px_rgba(99,102,241,0.55)]"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: index * 0.05 }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => {
                  const video = videoRefs.current[index].current;
                  if (video) {
                    if (video.muted) {
                      try {
                        video.muted = false;
                        const p = video.play?.();
                        if (p && typeof p.catch === "function") p.catch(() => {});
                      } catch (err) {}
                      fadeVolume(video, 0, 1, 300);
                      setIsMuted((prev) => {
                        const next = [...prev];
                        next[index] = false;
                        return next;
                      });
                    } else {
                      fadeVolume(video, 1, 0, 300, () => {
                        video.muted = true;
                        setIsMuted((prev) => {
                          const next = [...prev];
                          next[index] = true;
                          return next;
                        });
                      });
                    }
                  }
                }}
                role="group"
                tabIndex={0}
                aria-label={`Aperçu vidéo ${index + 1}`}
                onKeyDown={(e) => handleKeyToggle(index, e)}
              >
                <video
                  ref={videoRefs.current[index]}
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
              className={`bg-white dark:bg-white/10 p-6 rounded-2xl text-center transition-all duration-300 shadow-[0_10px_30px_-8px_rgba(99,102,241,0.25)] hover:scale-[1.02] hover:ring-4 hover:ring-indigo-400/60 hover:shadow-[0_22px_80px_-10px_rgba(99,102,241,0.55)]`}
            >
              <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{step.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-24 px-4 dark:bg-gray-800 py-10 rounded-xl">
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
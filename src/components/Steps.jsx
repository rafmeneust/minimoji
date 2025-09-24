import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// --- Cloudinary player URL builder (nested params support) ---
const buildCloudinarySrc = ({ cloudName, publicId, profile, player = {}, source = {}, cloudinary = {} }) => {
  const qs = new URLSearchParams();
  qs.set("cloud_name", cloudName);
  qs.set("public_id", publicId);
  if (profile) qs.set("profile", profile);

  const append = (prefix, obj) => {
    Object.entries(obj).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      if (typeof v === "object" && !Array.isArray(v)) {
        append(`${prefix}[${k}]`, v);
      } else if (Array.isArray(v)) {
        v.forEach((item, idx) => {
          if (item === undefined || item === null) return;
          if (typeof item === "object") {
            append(`${prefix}[${k}][${idx}]`, item);
          } else {
            qs.set(`${prefix}[${k}][${idx}]`, String(item));
          }
        });
      } else {
        qs.set(`${prefix}[${k}]`, String(v));
      }
    });
  };

  if (player && Object.keys(player).length) append("player", player);
  if (source && Object.keys(source).length) append("source", source);
  if (cloudinary && Object.keys(cloudinary).length) append("cloudinary", cloudinary);

  return `https://player.cloudinary.com/embed/?${qs.toString()}`;
};

const child = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 16,
      bounce: 0.12,
    },
  },
};

const items = [
  {
    step: "1",
    title: "Téléchargez le dessin\nde votre enfant.",
    icon: "/dessin.svg",
    color: "bg-yellow-200 text-yellow-800",
  },
  {
    step: "2",
    title: "Notre magicien transforme\nl'oeuvre en animation.",
    icon: "/step-2.svg",
    color: "bg-pink-200 text-pink-800",
  },
  {
    step: "3",
    title: "Recevez votre mini-film\nen moins de 24h.",
    icon: "/mobile-phone.svg",
    color: "bg-blue-200 text-blue-800",
  },
];

export function StepsDefault() {
  const playerSrc = buildCloudinarySrc({
    cloudName: "dwl7ufet9",
    publicId: "video5_f0pcxa",
    profile: "minimoji",
    player: {
      // Comportement
      autoplay: true,
      muted: true,          // autoplay silencieux
      playsinline: true,    // iOS inline
      controls: true,
      loop: true,
      preload: "metadata",
      fluid: true,
      // Branding (bleu/indigo)
      colors: {
        base: "#EEF2FF",   // Indigo 100 (barre de contrôle)
        accent: "#6366F1", // Indigo 500 (seek/volume)
        text: "#0F172A",   // Slate 900 (icônes/texte)
      },
    },
    // Réduction de volume perçue à ~40% par défaut (optionnel)
    // Note: applique une transformation audio non destructive au flux livré
    source: {
      transformation: { effect: "volume:40" },
    },
  });
  return (
    <section className="section bg-[#E6F0FF] dark:bg-gray-900 transition-colors duration-500 text-center relative overflow-hidden">
      {/* Ligne horizontale desktop */}
      <div className="hidden sm:block absolute top-[64px] left-1/2 w-[80%] h-[2px] -translate-x-1/2 z-0" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="container-pg"
      >
        <motion.h2
          variants={child}
          className="mb-6 text-center max-w-2xl mx-auto"
        >
          Comment ça marche ?
        </motion.h2>

        <motion.p
          variants={child}
          className="text-gray-700 dark:text-gray-300 transition-colors duration-500 max-w-3xl mx-auto mt-4"
        >
          En quelques clics, donnez vie aux dessins de votre enfant et créez un souvenir unique, animé avec tendresse et magie.
        </motion.p>
        <div className="w-full max-w-4xl mx-auto mt-10 mb-16 rounded-2xl overflow-hidden shadow-card border border-white/70 dark:border-white/20 bg-white/90 dark:bg-white/10 aspect-video">
          <iframe
            src={playerSrc}
            title="Démonstration Minimoji — vidéo"
            width="640"
            height="360"
            style={{ height: 'auto', width: '100%', aspectRatio: '640 / 360' }}
            loading="lazy"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            frameBorder="0"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-12 lg:gap-24 mt-10">
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={child}
              className="flex flex-col items-center text-gray-700 dark:text-gray-300 max-w-[420px] z-10"
            >
              {/* Image animée */}
              <motion.img
                src={item.icon}
                alt={`Étape ${item.step}`}
                loading="lazy"
                className="w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-4 cursor-pointer object-contain"
                whileHover={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -4, 4, -2, 2, 0],
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              />

              {/* Bulle de numéro animée */}
              <motion.div
                whileHover={{ scale: 1.4 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className={`w-12 h-12 flex items-center justify-center rounded-full ${item.color} text-xl font-bold mb-2 cursor-pointer`}
              >
                {item.step}
              </motion.div>

              {/* Texte */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="card bg-white dark:bg-white p-5 shadow-[0_10px_30px_-8px_rgba(99,102,241,0.18)] hover:shadow-[0_22px_80px_-10px_rgba(99,102,241,0.45)] hover:ring-2 hover:ring-indigo-400/50 transition-shadow duration-300"
              >
                <p className="text-sm font-medium text-gray-900 whitespace-pre-line leading-snug">
                  {item.title}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
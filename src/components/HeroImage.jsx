import { motion } from "framer-motion";

const child = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

export default function HeroImage() {
  return (
    <motion.div
      variants={child}
      className="relative w-full max-w-[600px] mx-auto mt-4 overflow-hidden px-4"
    >
      {/* Image complète */}
      <picture>
        <source
          media="(max-width: 768px)"
          srcSet="/hero-mobile.png"
          type="image/png"
        />
        <img
          src="/hero-min.png"
          alt="Avant/après dessin animé"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto object-contain max-h-[60vh] relative z-0"
          loading="eager"
        />
      </picture>

      {/* Étiquette prix */}
      <div className="absolute top-4 right-3 bg-white text-gray-800 px-3 py-1 rounded-xl shadow-lg text-[0.75rem] font-medium leading-tight">
        <span className="block text-[1rem] font-normal">à partir de</span>
        <span className="text-[1.30rem] font-extrabold">8.99 €</span>
      </div>

      {/* Wrapper pour centrer le texte sous la seconde image */}
      <div className="absolute z-10 translate-y-[00%] left-1/2 -translate-x-1/2 bottom-0 sm:bottom-2 md:translate-x-0 md:left-auto md:right-3">
        <div className="bg-[#53DC84] text-white px-3 py-1 rounded-md text-s font-bold font-poppins shadow-md w-max">
          20 sec de vidéos
        </div>
      </div>
    </motion.div>
  );
}
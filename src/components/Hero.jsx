import { motion } from "framer-motion";
import HeroImage from "./HeroImage";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const child = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 160,
      damping: 12,
      bounce: 0.3,
    },
  },
};

export default function Hero() {
  return (
    <section className="pt-24 pb-20 sm:pt-40 sm:pb-32 flex flex-col justify-center items-center text-center px-6 bg-white dark:bg-gray-800 transition-colors duration-500 font-sans">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row-reverse items-center gap-10 w-full px-4"
      >
        {/* Texte + CTA */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start space-y-4 max-w-md px-4 w-full">
          <motion.h1
            variants={child}
            className="text-[1.75rem] sm:text-[2rem] font-extrabold text-gray-800 dark:text-gray-100 leading-tight tracking-wide"
          >
            Faites vivre les dessins<br /> de vos enfants ✨
          </motion.h1>

          <motion.p
            variants={child}
            className="text-sm text-gray-700 dark:text-gray-400 font-medium leading-snug font-poppins"
          >
            Transformez leurs chefs-d’œuvre en mini-films
            <br />remplis de magie. une photo suffit.
            <br />En quelques clics, l’imaginaire prend vie.
          </motion.p>

          <motion.a
            href="/creer"
            variants={child}
            className="px-5 py-2 bg-orange-400 hover:bg-orange-600 text-white text-sm font-semibold font-poppins rounded-full shadow-md"
          >
            Créer mon Dessin animé
          </motion.a>

          <motion.p
            variants={child}
            className="text-xs text-gray-500 dark:text-gray-400 font-medium italic font-poppins"
          >
            À partir de 8,99 € – livré en 24h 🕐
          </motion.p>
        </div>
        {/* Image */}
        <motion.div
          variants={child}
          className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full mx-auto flex justify-center"
        >
          <HeroImage />
        </motion.div>
        
      </motion.div>
    </section>
  );
}

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
      className="relative w-[500px] mx-auto mt-4"
    >
      {/* Image complète */}
      <img
        src="/public/hero-min.png"
        alt="Avant/après dessin animé"
        className="w-full lg:w-[760px]"
      />

      {/* Étiquette prix */}
      <div className="absolute top-4 right-3 bg-white text-gray-800 px-3 py-1 rounded-xl shadow-lg text-[0.75rem] font-medium leading-tight">
        <span className="block text-[1rem] font-normal">à partir de</span>
        <span className="text-[1.30rem] font-extrabold">13.99 €</span>
      </div>

      {/* Wrapper pour centrer le texte sur la moitié droite */}
      <div className="absolute bottom-6 left-1/2 w-1/2 flex justify-center">
        <div className="bg-[#53DC84] text-white px-3 py-1 rounded-md text-s font-bold font-poppins">
          20 sec de vidéos
        </div>
      </div>
    </motion.div>
  );
}
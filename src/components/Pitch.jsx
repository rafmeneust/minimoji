import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import CTAButton from "./CTAButton";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.3 },
  },
};

const paragraph = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 14 },
  },
};

const lines = [
  "Un dessin, et tout commence.",
  "Une aventure se dessine, un héros s’invente, un monde s’ouvre.",
  "Les rêves prennent des couleurs,",
  "les gribouillis se mettent à bouger,",
  "doucement, naturellement.",
  "En quelques clics, l’imaginaire devient réel.",
  "Et ce simple dessin… devient un trésor à garder.",
];

export default function Pitch() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yCat = useTransform(scrollYProgress, [0, 1], [60, -100]);
  const yBoy = useTransform(scrollYProgress, [0, 1], [-30, 70]);
  const yDino = useTransform(scrollYProgress, [0, 1], [250, -160]); 

  const smoothCat = useSpring(yCat, { stiffness: 10, damping: 3 });
  const smoothBoy = useSpring(yBoy, { stiffness: 40, damping: 6 });
  const smoothDino = useSpring(yDino, { stiffness: 10, damping: 3 });

  return (
    <section
      ref={ref}
      className="relative bg-[#fff] dark:bg-gray-800 transition-colors duration-500 py-24 px-6 font-sans overflow-hidden"
      id="pitch"
    >
      {/* Image Chat à droite */}
      <motion.img
        src="/cat-fly.svg"
        alt="Chat magique"
        className="absolute w-24 sm:w-48 top-10 right-4 sm:right-8 z-0 max-w-full"
        style={{ y: smoothCat }}
        whileHover={{ scale: 1.20, rotate: 3 }}
        transition={{ type: "spring", stiffness: 200 }}
      />

      {/* Image Garçon à droite, plus bas */}
      <motion.img
        src="/magic-paper.svg"
        alt="Garçon qui dessine"
        className="absolute w-32 sm:w-48 md:w-56 bottom-0 left-4 sm:left-10 z-0 max-w-full"
        style={{ y: smoothBoy }}
        whileHover={{ scale: 1.30, rotate: -4 }}
        transition={{ type: "spring", stiffness: 200, }}
      />

      {/* Image Dinosaure, flottante */}
      <motion.img
        src="/dino.svg"
        alt="Dinosaure"
        className="absolute z-10 top-[35%] sm:top-[38%] md:top-[40%] lg:top-[42%]
             left-[50%] sm:left-[55%] md:left-[52%] lg:left-[50%]
             w-32 sm:w-48 md:w-64 lg:w-80 max-w-full"
        style={{ y: smoothDino }}
        whileHover={{ scale: 1.30, rotate: 3 }}
        transition={{ type: "spring", stiffness: 200 }}
      />

      {/* Texte principal */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        className="max-w-2xl sm:ml-[15rem] ml-8 space-y-4 text-left z-10 relative"
      >
        <motion.h2
          variants={paragraph}
          className="mb-6 text-left font-display"
        >
          Votre enfant, <br />
          acteur de son univers magique
        </motion.h2>

        {lines.map((text, index) => (
          <motion.p
            key={index}
            variants={paragraph}
            className="text-base text-gray-800 dark:text-gray-400 transition-colors duration-500 leading-relaxed"
          >
            {text}
          </motion.p>
        ))}

        <motion.div variants={paragraph} className="pt-6">
          <CTAButton label="Découvrir la Galerie" href="/galerie" />
        </motion.div>
      </motion.div>
    </section>
  );
}
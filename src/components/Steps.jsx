import { motion } from "framer-motion";
import CTAButton from "./CTAButton";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
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

const items = [
  {
    step: "1",
    title: "Téléchargez le dessin\nde votre enfant.",
    icon: "/step1.png",
    color: "bg-yellow-200 text-yellow-800",
  },
  {
    step: "2",
    title: "Notre magicien transforme\nl'oeuvre en animation.",
    icon: "/step2.png",
    color: "bg-pink-200 text-pink-800",
  },
  {
    step: "3",
    title: "Recevez votre mini-film\nen moins de 24h.",
    icon: "/step3.png",
    color: "bg-blue-200 text-blue-800",
  },
];

// VERSION 1 - CLASSIQUE
export function StepsDefault() {
  return (
    <section className="py-10 md:py-28 bg-[#e6f0ff] dark:bg-gray-900 transition-colors duration-500 text-center font-sans relative overflow-hidden">
      {/* Ligne horizontale desktop */}
      <div className="hidden sm:block absolute top-[64px] left-1/2 w-[80%] h-[2px] -translate-x-1/2 z-0" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto px-6"
      >
        <motion.h2
          variants={child}
          className="text-3xl sm:text-4xl md:text-4xl font-extrabold mb-10 text-center text-gray-900 dark:text-white leading-snug max-w-2xl mx-auto"
        >
          Comment ça marche ?
        </motion.h2>

        <motion.p
        variants={child}
        className="text-base sm:text-lg text-gray-600 dark:text-gray-400 transition-colors duration-500 max-w-2xl mx-auto mt-4 sm:max-w-3xl md:max-w-4xl px-6"
      >
      En quelques clics, donnez vie aux dessins de votre enfant et créez un souvenir unique, animé avec tendresse et magie.
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center items-center lg:gap-24 gap-12 sm:gap-30 mt-10">
        {items.map((item, index) => (
  <motion.div
    key={index}
    variants={child}
    className="flex flex-col items-center text-gray-700 max-w-[420px] z-10"
  >
    {/* Image animée */}
    <motion.img
      src={item.icon}
      alt={`Étape ${item.step}`}
      loading="lazy"
      className="w-32 h-32 mb-4 cursor-pointer object-contain"
      whileHover={{
        scale: [1, 1.2, 1],
        rotate: [0, -4, 4, -2, 2, 0],
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    />

    {/* Bulle de numéro animée */}
    <motion.div
      whileHover={{ scale: 1.4 }}
      whileTap={{ scale: 0.9 }}
      className={`w-10 h-10 flex items-center justify-center rounded-full ${item.color} text-lg font-bold mb-2 cursor-pointer`}
    >
      {item.step}
    </motion.div>

    {/* Texte */}
    <div className="bg-white/60 dark:bg-white/10 rounded-xl p-4 shadow-sm backdrop-blur-sm">
      <p className="text-sm font-medium dark:text-white transition-colors duration-500 whitespace-pre-line leading-snug font-poppins">
        {item.title}
      </p>
    </div>
  </motion.div>
))}
        </div>

        <motion.div variants={child} className="mt-12">
        </motion.div>
        <div className="bg-white/60 dark:bg-white/10 rounded-xl p-6 shadow-sm backdrop-blur-sm mt-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="flex flex-wrap justify-center text-base sm:text-lg max-w-3xl mx-auto text-gray-900 font-poppins dark:text-gray-400 transition-colors duration-500 leading-relaxed px-6"
          >
            {"Chaque dessin cache une histoire. En 24h, nous la transformons en mini-film animé : un souvenir unique, à partager et garder précieusement."
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="mr-1"
                >
                  {word}
                </motion.span>
              ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
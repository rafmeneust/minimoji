import { m } from "framer-motion";

const child = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 16,
      bounce: 0.12,
    },
  },
};

export default function HeroImage() {
  const heroDesktop = (width) =>
    `https://res.cloudinary.com/dwl7ufet9/image/upload/f_auto,q_auto,w_${width},c_fill,dpr_auto/hero-min_p6b85v.png`;

  const heroMobile = (width) =>
    `https://res.cloudinary.com/dwl7ufet9/image/upload/f_auto,q_auto,w_${width},c_fill,dpr_auto/hero-mobile_ds8xfg.png`;

  return (
    <m.div
      variants={child}
      className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto mt-4 overflow-hidden"
    >
      {/* Image complète */}
      <picture>
        <source
          media="(max-width: 768px)"
          srcSet={`${heroMobile(480)} 480w, ${heroMobile(720)} 720w, ${heroMobile(960)} 960w`}
          sizes="(max-width: 480px) 90vw, (max-width: 768px) 80vw, 480px"
        />
        <img
          src={heroDesktop(960)}
          srcSet={`${heroDesktop(640)} 640w, ${heroDesktop(960)} 960w, ${heroDesktop(1200)} 1200w`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
          alt="Avant/après dessin animé"
          className="w-full mx-auto object-contain max-h-[60vh] relative z-0"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          width="1200"
          height="800"
          style={{ aspectRatio: "3 / 2" }}
        />
      </picture>

      {/* Étiquette prix */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 md:left-auto md:right-3 md:translate-x-0 bg-white/95 text-gray-900 px-3 py-1.5 rounded-sticker shadow-soft text-xs font-display leading-tight ring-1 ring-gray-200 dark:bg-white/10 dark:text-white dark:ring-white/20">
        <span className="block text-sm font-bold">à partir de</span>
        <span className="text-xl font-bold">3.49 €</span>
      </div>

      {/* Wrapper pour centrer le texte sous la seconde image */}
      <div className="absolute z-10 left-1/2 -translate-x-1/2 bottom-0 sm:bottom-2 md:translate-x-0 md:left-auto md:right-3">
        <div className="bg-emerald-500 text-white px-3 py-1.5 rounded-sticker text-xl font-display font-bold shadow-soft w-max">
          6 sec de vidéo
        </div>
      </div>
    </m.div>
  );
}

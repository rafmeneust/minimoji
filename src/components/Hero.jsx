import { motion } from "framer-motion";
import HeroImage from "./HeroImage";
import { useRef, useLayoutEffect, useState } from "react";

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
      stiffness: 200,
      damping: 24,
      bounce: 0.5,
    },
  },
};

function ScribbleWord({ children }) {
  const ref = useRef(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      setBox({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const padX = 24;
  const padY = 22;      // a bit more vertical room to avoid clipping
  const stroke = 12;    // thinner stroke for a lighter scribble
  const w = box.w + padX;
  const h = box.h + padY;
  const cx = w / 2;
  const cy = h / 2 + 4; // slightly lower to sit under the baseline
  const rx1 = Math.max(0, w / 2 - stroke / 2);
  const ry1 = Math.max(0, h / 2 - stroke / 2);

  const d1 = `M ${cx - rx1} ${cy} A ${rx1} ${ry1} 0 1 1 ${cx + rx1} ${cy} A ${rx1} ${ry1} 0 1 1 ${cx - rx1} ${cy}`;
  const rx2 = rx1 * 0.94;
  const ry2 = ry1 * 0.92;
  const d2 = `M ${cx - rx2} ${cy} A ${rx2} ${ry2} 0 1 1 ${cx + rx2} ${cy} A ${rx2} ${ry2} 0 1 1 ${cx - rx2} ${cy}`;

  return (
    <span ref={ref} className="relative inline-block px-1 pb-2 overflow-visible">
      <span className="relative z-10">{children}</span>
      {w > 0 && h > 0 && (
        <svg
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-1 z-0 -rotate-6 overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="scribbleGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#8183faff" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
            {/* Rough crayon texture */}
            <filter id="scribbleNoise">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="10" seed="340" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
          <motion.path
            d={d1}
            fill="none"
            stroke="url(#scribbleGrad)"
            strokeWidth={stroke}
            strokeLinecap="round"
            filter="url(#scribbleNoise)"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 1.3, ease: [0.33, 1, 0.68, 1] }}
          />
          <motion.path
            d={d2}
            fill="none"
            stroke="url(#scribbleGrad)"
            strokeWidth={stroke * 0.66}
            strokeLinecap="round"
            filter="url(#scribbleNoise)"
            opacity="0.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 1.0, ease: [0.33, 1, 0.68, 1] }}
          />
        </svg>
      )}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="section flex flex-col justify-center items-center text-center bg-white dark:bg-gray-800 transition-colors duration-500 font-sans">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-pg flex flex-col-reverse lg:flex-row-reverse items-center gap-12 w-full"
      >
        {/* Texte + CTA */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start space-y-4 max-w-md px-4 w-full">
          <motion.h1
          variants={child}
          className="mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Faites vivre les <ScribbleWord>dessins</ScribbleWord> de vos enfants
        </motion.h1>

          <motion.p
            variants={child}
            className="font-sans text-sm text-gray-700 dark:text-gray-300 font-normal leading-snug"
          >
            Transformez leurs chefs-d’œuvre en mini-films remplis de magie. Une photo suffit.
            <strong> En quelques clics, l’imaginaire prend vie.</strong>
          </motion.p>
          
          <motion.p
            variants={child}
            className="font-sans text-xs text-gray-500 dark:text-gray-400 font-normal italic"
          >
            À partir de 3,49 € – livré en 1h 🕐
          </motion.p>
        </div>
        {/* Image */}
        <motion.div
          variants={child}
          className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto flex justify-center"
        >
          <HeroImage />
        </motion.div>
        
      </motion.div>
    </section>
  );
}

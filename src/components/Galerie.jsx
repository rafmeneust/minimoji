import { LazyMotion, m } from "framer-motion";
import { useState, useRef, useLayoutEffect } from "react";
import VerticalScribble from "../components/VerticalScribble";
import { loadMotionFeatures } from "@/lib/motion";

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
            <linearGradient id="scribbleGrad-galerie" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#8183FA" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
            {/* Rough crayon texture */}
            <filter id="scribbleNoise-galerie">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="10" seed="340" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
          <m.path
            d={d1}
            fill="none"
            stroke="url(#scribbleGrad-galerie)"
            strokeWidth={stroke}
            strokeLinecap="round"
            filter="url(#scribbleNoise-galerie)"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ delay: 0.2, duration: 1.1, ease: [0.33, 1, 0.68, 1] }}
          />
          <m.path
            d={d2}
            fill="none"
            stroke="url(#scribbleGrad-galerie)"
            strokeWidth={stroke * 0.66}
            strokeLinecap="round"
            filter="url(#scribbleNoise-galerie)"
            opacity="0.4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ delay: 0.35, duration: 1.0, ease: [0.33, 1, 0.68, 1] }}
          />
        </svg>
      )}
    </span>
  );
}

export default function Galerie() {
  const [videosInView, setVideosInView] = useState([false, false, false, false, false, false, false, false]);
  const [isMuted, setIsMuted] = useState([true, true, true, true, true, true, true, true]);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const videoRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleInView = (index) => {
    setVideosInView((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const handleMouseEnter = (index) => {
    const video = videoRefs[index].current;
    if (video) {
      video.muted = false;
      fadeVolume(video, 0, 1, 300);
      setIsMuted((prev) => {
        const next = [...prev];
        next[index] = false;
        return next;
      });
    }
    setHoveredVideo(index);
  };

  const handleMouseLeave = (index) => {
    const video = videoRefs[index].current;
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
    setHoveredVideo(null);
  };

  // Fonction pour faire un fade de volume
  const fadeVolume = (video, from, to, duration, callback) => {
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;

    const volumeStep = (to - from) / steps;

    video.volume = from;

    const interval = setInterval(() => {
      currentStep++;
      video.volume = Math.min(Math.max(from + volumeStep * currentStep, 0), 1);

      if (currentStep >= steps) {
        clearInterval(interval);
        if (callback) callback();
      }
    }, stepTime);
  };

  return (
    <LazyMotion features={loadMotionFeatures}>
      <section className="section relative bg-white dark:bg-gray-900 transition-colors duration-500 font-sans" id="galerie">
      <div className="relative">
          <VerticalScribble
            className="absolute -left-10 -top-2 -z-10"
            height={260}
            width={70}
            amplitude={26}
            turns={5}
            stroke={10}
          />
        </div>
      <div className="container-xl text-center">
        {/* Titre */}
        <h2 className="mb-6">
          Leurs <ScribbleWord>dessins</ScribbleWord> prennent vie 🦖
        </h2>
        

        {/* Paragraphe */}
        <p className="font-sans text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
          Un simple coup de crayon... et des mondes prennent vie. Chaque dessin devient une aventure animée, pleine d'émotions et de magie. Découvrez les trésors de créativité de nos artistes en herbe.
        </p>

        {/* Galerie */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
          {["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4", "video5.mp4", "video6.mp4", "video7.mp4", "video8.mp4"].map((videoSrc, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: index * 0.1 }}
              onViewportEnter={() => handleInView(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className={`card p-0 w-full rounded-2xl overflow-hidden transition-all duration-300 bg-white shadow-[0_10px_30px_-8px_rgba(99,102,241,0.25)] ${
                hoveredVideo === index
                  ? "scale-[1.02] ring-4 ring-indigo-400/60 shadow-[0_22px_80px_-10px_rgba(99,102,241,0.55)]"
                  : ""
              }`}
            >
              {videosInView[index] && (
                <div className="aspect-[4/5] w-full">
                  <video
                    ref={videoRefs[index]}
                    src={`/${videoSrc}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      hoveredVideo === index ? "filter-none" : "grayscale"
                    }`}
                  />
                </div>
              )}
            </m.div>
          ))}
        </div>

        {/* CTA voir plus */}
        <div className="mt-10 flex justify-center">
          <a href="/galerie" className="btn-ghost">voir la galerie</a>
        </div>
      </div>
    </section>
    </LazyMotion>
  );
}

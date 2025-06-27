import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function Galerie() {
  const [videosInView, setVideosInView] = useState([false, false, false, false]);
  const [isMuted, setIsMuted] = useState([true, true, true, true]);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const videoRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

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
    <section className="relative pt-40 px-6 pb-20 bg-[#dcedec] dark:bg-gray-900 transition-colors duration-500 font-sans" id="galerie">
      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">

        {/* Titre */}
        <h3 className="text-2xl sm:text-3xl md:text-4xl dark:text-white font-extrabold text-gray-900 mb-6">
          Leurs dessins prennent vie 🦖
        </h3>

        {/* Paragraphe */}
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          Un simple coup de crayon... et des mondes prennent vie. Chaque dessin devient une aventure animée, pleine d'émotions et de magie. Découvrez les trésors de créativité de nos artistes en herbe.
        </p>

        {/* Galerie */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4"].map((videoSrc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: index * 0.1 }}
              onViewportEnter={() => handleInView(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className={`w-full rounded-lg overflow-hidden transition-all duration-300 ${
                hoveredVideo === index ? "scale-105 ring-4 ring-indigo-300 shadow-xl" : ""
              }`}
            >
              {videosInView[index] && (
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
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
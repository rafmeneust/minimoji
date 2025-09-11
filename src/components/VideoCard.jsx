import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function VideoCard({ vid, index }) {
  const [isReady, setIsReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  return (
    <motion.div
      key={index}
      className="relative overflow-hidden rounded-2xl group bg-gray-100 dark:bg-gray-800"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeInOut", delay: index * 0.05 }}
      onMouseEnter={() => {
        if (videoRef.current) {
          videoRef.current.muted = false;
          setIsMuted(false);
        }
      }}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
        }
      }}
      onClick={toggleMute}
    >
      {!isReady && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700 z-0" />
      )}

      <div className="absolute top-2 right-2 z-30 text-white text-xl pointer-events-none select-none drop-shadow-md">
        {isMuted ? "🔇" : "🔊"}
      </div>
s
      <video
        ref={videoRef}
        src={vid.src}
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        onCanPlayThrough={() => setIsReady(true)}
        className={`relative z-10 w-full aspect-[9/16] object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out ${
          isReady ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      />

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white z-20">
        <h3 className="text-sm font-semibold truncate">{vid.title}</h3>
        <p className="text-xs opacity-80 truncate">{vid.subtitle}</p>
      </div>
    </motion.div>
  );
}
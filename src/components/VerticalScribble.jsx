// src/components/VerticalScribble.jsx
import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Gribouillis vertical texturé (crayon) avec animation de tracé.
 * Props clés :
 * - height, width : dimension du SVG
 * - turns : nombre d’oscillations (haut->bas)
 * - amplitude : largeur de l’oscillation
 * - stroke : épaisseur du trait
 * - delay, duration : timing de l’animation
 * - className : positionnement (absolute/relative)
 */
export default function VerticalScribble({
  height = 280,
  width = 80,
  turns = 6,
  amplitude = 28,
  stroke = 10,
  delay = 0.2,
  duration = 1.2,
  rotate = -8,
  className = "",
  gradientId = "vs-grad",
  noiseId = "vs-noise",
}) {
  // Chemin sinusoïdal lissé du haut vers le bas
  const pathD = useMemo(() => {
    const segs = 160;
    const pts = [];
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;                 // 0 → 1
      const y = t * height;
      const x = width / 2 + amplitude * Math.sin(2 * Math.PI * turns * t);
      pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
    }
    return pts.join(" ");
  }, [height, width, amplitude, turns]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`pointer-events-none ${className}`}
      style={{ rotate: `${rotate}deg` }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          {/* lavande → indigo (système brand) */}
          <stop offset="0%" stopColor="#8183FA" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        {/* Texture crayon */}
        <filter id={noiseId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="6" seed="42" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* couche 1 (plus marquée) */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={stroke}
        strokeLinecap="round"
        filter={`url(#${noiseId})`}
        opacity="0.55"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration, ease: [0.33, 1, 0.68, 1] }}
      />
      {/* couche 2 (plus légère) */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={stroke * 0.6}
        strokeLinecap="round"
        filter={`url(#${noiseId})`}
        opacity="0.35"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.15, duration: duration + 0.1, ease: [0.33, 1, 0.68, 1] }}
      />
    </svg>
  );
}
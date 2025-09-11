# Minimoji — Code bundle pour audit

## Arborescence (filtrée)

```
src
  App.jsx
  assets
    .DS_Store
  components
    .DS_Store
    BlockyDivider.jsx
    BlockyDividerBottom.jsx
    ColorPicker.jsx
    CTAButton.jsx
    DinoPopup.jsx
    DrawingCanvas.jsx
    Footer.jsx
    Galerie.jsx
    Header.jsx
    helmet.jsx
    Hero.jsx
    HeroImage.jsx
    Loader.jsx
    Navbar.jsx
    Pitch.jsx
    SaveExportButtons.jsx
    ScrollTop.jsx
    ScrollToTop.jsx
    SignInUpload.jsx
    Steps.jsx
    Testimonials.jsx
    ThemeSwitcher.jsx
    Toolbar.jsx
    TriangleDivider.jsx
    VideoCard.jsx
  index.css
  lib
    firebaseClient.js
  main.jsx
  pages
    .DS_Store
    cgu-cgv.jsx
    Concept.jsx
    Confirmation.jsx
    Form.jsx
    Galerie.jsx
    GaleriePage.jsx
    Home.jsx
    mentions-legales.jsx
    NotFound.jsx
    Tarifs.jsx
  router.jsx
public
  .DS_Store
  404.svg
  apple-touch-icon.png
  cat-fly.svg
  colis.svg
  dessin.svg
  dino.svg
  favicon-96x96.png
  favicon.ico
  favicon.svg
  hero-min.png
  hero-mobile.png
  icon-192.png
  icon-512.png
  images
    .DS_Store
    preview-form.jpg
  magic-paper.svg
  manisfest.json
  mobile-phone.svg
  pop.wav
  potion1.svg
  potion2.svg
  potion3.svg
  robots.txt
  site.webmanifest
  sitemap.xml
  step-2.svg
  testimonial-1.svg
  testimonial-2.svg
  video1.mp4
  video2.mp4
  video3.mp4
  video4.mp4
  wave.svg
  web-app-manifest-192x192.png
  web-app-manifest-512x512.png
package.json
vite.config.js
.env.example
```

## Fichiers


### src/App.jsx
```jsx
import SEO from "./components/helmet";
import { useState, useEffect, lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import { Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import { StepsDefault } from "./components/Steps";
import Pitch from "./components/Pitch";
import DinoPopup from "./components/DinoPopup";
import Testimonials from "./components/Testimonials";
import BlockyDivider from "./components/BlockyDivider";
import BlockyDividerBottom from "./components/BlockyDividerBottom";
import Galerie from "./components/Galerie";
import NotFound from "./pages/NotFound";
import SignInUpload from "./components/SignInUpload";

const Form = lazy(() => import("./pages/Form"));
const Concept = lazy(() => import("./pages/Concept"));
const GaleriePage = lazy(() => import("./pages/GaleriePage"));
const Tarifs = lazy(() => import("./pages/Tarifs"));
const MentionsLegales = lazy(() => import("./pages/mentions-legales"));
const CGUCGV = lazy(() => import("./pages/cgu-cgv"));
const Confirmation = lazy(() => import("./pages/Confirmation"));

function HomePage() {
  return (
    <>
      <SEO
        title="Minimoji - Donnez vie aux dessins de vos enfants"
        description="Transformez les dessins d’enfants en mini-films animés en 24h. Magique, ludique, et 100% personnalisé."
        canonical="https://www.minimoji.fr"
      >
        <meta property="og:title" content="Minimoji - Donnez vie aux dessins de vos enfants" />
        <meta property="og:description" content="Transformez les dessins d’enfants en mini-films animés en 24h. Magique, ludique, et 100% personnalisé." />
        <meta property="og:image" content="https://minimoji.fr/images/preview-form.jpg" />
        <meta property="og:url" content="https://www.minimoji.fr" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Minimoji - Donnez vie aux dessins de vos enfants" />
        <meta name="twitter:description" content="Transformez les dessins d’enfants en mini-films animés en 24h. Magique, ludique, et 100% personnalisé." />
        <meta name="twitter:image" content="https://minimoji.fr/images/preview-form.jpg" />
      </SEO>
      <Hero />
      <SignInUpload />
      <BlockyDivider />
      <StepsDefault />
      <BlockyDividerBottom />
      <Pitch />
      <Galerie />
      <Testimonials />
    </>
  );
}

function App() {
  const location = useLocation();
  const [showDino, setShowDino] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDino(true);
    }, 90000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 100); // pour laisser le temps au DOM d'être prêt
      }
    }
  }, [location]);

  return (
    <HelmetProvider>
      <DinoPopup isVisible={showDino} onClose={() => setShowDino(false)} />
      <div className="scroll-smooth bg-white dark:bg-gray-900 transition-colors duration-500 text-gray-900 dark:text-gray-100">
        <ScrollToTop key={location.pathname} /> 
        <Navbar />
        <Suspense fallback={<div>Chargement...</div>}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/concept" element={<Concept />} />
            <Route path="/galerie" element={<GaleriePage />} />
            <Route path="/creer" element={<Form />} />
            <Route path="/tarifs" element={<Tarifs />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/cgu-cgv" element={<CGUCGV />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
```


### src/components/BlockyDivider.jsx
```jsx
export default function BlockyDivider() {
  return (
    <div className="w-full overflow-hidden leading-none bg-white dark:bg-gray-900 transition-colors duration-500 -mt-px">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[100px] fill-current text-[#E6F0FF] dark:text-gray-900 transition-colors duration-500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="70" width="100" height="50" />
        <rect x="100" y="60" width="80" height="60" />
        <rect x="180" y="90" width="120" height="30" />
        <rect x="300" y="60" width="80" height="60" />
        <rect x="380" y="80" width="100" height="40" />
        <rect x="480" y="50" width="70" height="70" />
        <rect x="550" y="85" width="90" height="35" />
        <rect x="640" y="60" width="120" height="60" />
        <rect x="760" y="75" width="80" height="45" />
        <rect x="840" y="65" width="60" height="55" />
        <rect x="900" y="90" width="100" height="30" />
        <rect x="1000" y="70" width="90" height="50" />
        <rect x="1090" y="60" width="80" height="60" />
        <rect x="1170" y="95" width="90" height="25" />
        <rect x="1260" y="80" width="100" height="40" />
        <rect x="1360" y="70" width="100" height="50" />
      </svg>
    </div>
  );
}
```


### src/components/BlockyDividerBottom.jsx
```jsx
export default function BlockyDividerBottom() {
  return (
    <div className="w-full overflow-hidden leading-none transition-colors duration-500 -mt-px">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[100px] fill-current text-[#E6F0FF] dark:text-gray-900 transition-colors duration-500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="100" height="50" />
        <rect x="100" y="0" width="80" height="60" />
        <rect x="180" y="0" width="120" height="30" />
        <rect x="300" y="0" width="80" height="60" />
        <rect x="380" y="0" width="100" height="40" />
        <rect x="480" y="0" width="70" height="70" />
        <rect x="550" y="0" width="90" height="35" />
        <rect x="640" y="0" width="120" height="60" />
        <rect x="760" y="0" width="80" height="45" />
        <rect x="840" y="0" width="60" height="55" />
        <rect x="900" y="0" width="100" height="30" />
        <rect x="1000" y="0" width="90" height="50" />
        <rect x="1090" y="0" width="80" height="60" />
        <rect x="1170" y="0" width="90" height="25" />
        <rect x="1260" y="0" width="100" height="40" />
        <rect x="1360" y="0" width="100" height="50" />
      </svg>
    </div>
  );
}
```


### src/components/CTAButton.jsx
```jsx
export default function CTAButton({ label, href = "#", onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="inline-block px-6 py-3 rounded-full bg-indigo-500 text-white font-semibold text-sm shadow-md hover:bg-indigo-600 transition-all"
    >
      {label}
    </a>
  );
}
```


### src/components/ColorPicker.jsx
```jsx
import React from "react";

export default function ColorPicker({ color, setColor }) {
  return (
    <input
      type="color"
      value={color}
      onChange={(e) => setColor(e.target.value)}
      className="w-10 h-10 border-none cursor-pointer rounded"
    />
  );
}
```


### src/components/DinoPopup.jsx
```jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sound = new Audio("/pop.wav");

export default function DinoPopup() {
  const [show, setShow] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
      sound.play();
    }, 90000);

    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("DINO15");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Fond flouté */}
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Popup */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-6 rounded-2xl shadow-2xl dark:shadow-black/30 text-center max-w-sm relative overflow-hidden transition-colors duration-500">

              {/* Bouton ✕ de fermeture */}
              <button
                onClick={() => setShow(false)}
                className="absolute top-2 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white transition text-2xl font-bold"
                aria-label="Fermer"
              >
                &times;
              </button>

              {/* Dino animé */}
              <motion.div
                animate={{ x: ["-70px", "70px", "-70px"] }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                className="relative w-24 h-24 mx-auto"
              >
                <motion.img
                  src="/dino.svg"
                  alt="Dino"
                  className="absolute top-0 left-0 w-full origin-center"
                  animate={{
                    scaleX: [1, 1, -1, -1, 1],
                    y: [0, -5, 0, 5, 0]
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-black/10 dark:bg-white/10"
                  animate={{
                    scaleX: [.9, 1.1, .9],
                    opacity: [0.6, 0.4, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </motion.div>

              {/* Texte principal */}
              <h3 className="text-lg font-extrabold leading-tight tracking-wide mt-4">
                Coucou, moi c’est Dino !
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Tu viens de débloquer un trésor magique !
              </p>
              <p className="text-sm font-extrabold leading-tight tracking-wide">
                15% de réduction !
              </p>

              {/* Code promo animé */}
              {showPromo && (
                <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4"
              >
                <div className="inline-flex items-center gap-2 justify-center px-6 py-3 rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-white font-mono text-xl">
                  <span className="select-all">Code : DINO15</span>
                  <button
                    onClick={handleCopy}
                    className="text-sm bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600 transition"
                  >
                    {copied ? "✅" : "Copier"}
                  </button>
                </div>
              </motion.div>
              )}

              {/* Bouton "J'en profite" */}
              {!showPromo && (
                <div className="mt-6 flex justify-center">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition"
                    onClick={() => setShowPromo(true)}
                  >
                    J'en profite
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```


### src/components/DrawingCanvas.jsx
```jsx
import React, { useState, useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";

export default function DrawingCanvas({ color, tool, clearCanvas, onClearComplete, stageRef }) {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (clearCanvas) {
      setLines([]);
      onClearComplete();
    }
  }, [clearCanvas, onClearComplete]);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, color, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine = { ...lastLine, points: [...lastLine.points, point.x, point.y] };
    setLines([...lines.slice(0, -1), lastLine]);
  };

  const handleMouseUp = () => setIsDrawing(false);

  return (
    <Stage
      ref={stageRef}
      width={660}
      height={400}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      style={{ background: "#fff", border: "1px solid #ccc" }}
    >
      <Layer>
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke={line.tool === "eraser" ? "#fff" : line.color}
            strokeWidth={line.tool === "eraser" ? 20 : 3}
            tension={0.7}
            bezier
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation={line.tool === "eraser" ? "destination-out" : "source-over"}
          />
        ))}
      </Layer>
    </Stage>
  );
}
```


### src/components/Footer.jsx
```jsx
import { Link } from "react-router-dom";

// ⚠️ CSS for the shape divider must be added to a global stylesheet or Tailwind config:
/*
.custom-shape-divider-top-1750170631 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.custom-shape-divider-top-1750170631 svg {
  position: relative;
  display: block;
  width: calc(169% + 1.3px);
  height: 70px;
}

.custom-shape-divider-top-1750170631 .shape-fill {
  fill: #FFFFFF;
}

@media (max-width: 767px) {
  .custom-shape-divider-top-1750170631 svg {
    width: calc(158% + 1.3px);
    height: 70px;
  }
}
*/

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer
        id="footer"
        className="relative bg-indigo-600 transition-colors duration-500 text-white font-sans px-2 py-8 pt-16"
      >
        <div className="max-w-6xl mx-auto flex flex-col gap-6 text-center items-center [@media(min-width:968px)]:flex-row [@media(min-width:968px)]:justify-between">
          {/* Bloc gauche avec logo et année */}
          <div className="bg-indigo-700 rounded-lg px-6 py-3 shadow-md text-center">
            <p className="text-sm font-semibold text-white">
              Minimoji by Breizhstorm
            </p>
            <p className="text-xs text-indigo-100">
              © 2025 – Tous droits réservés
            </p>
          </div>

          {/* Bloc liens */}
          <nav className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-base sm:text-sm md:text-lg text-white">
            <Link
              to="/concept"
              className="transform transition-transform duration-300 hover:scale-105 hover:text-indigo-200"
            >
              Concept
            </Link>
            <Link
              to="/galerie"
              className="transform transition-transform duration-300 hover:scale-105 hover:text-indigo-200"
            >
              Galerie
            </Link>
            <Link
              to="/mentions-legales"
              className="transform transition-transform duration-300 hover:scale-105 hover:text-indigo-200"
            >
              Mentions légales
            </Link>
            <Link
              to="/cgu-cgv"
              className="transform transition-transform duration-300 hover:scale-105 hover:text-indigo-200"
            >
              CGU – CGV
            </Link>
          </nav>
          <div className="mt-6 sm:mt-0 text-center">
            <Link
              to="/creer"
              className="bg-white hover:bg-gray-200 text-gray-900 font-semibold py-2 px-5 rounded-full text-sm font-poppins transition"
            >
              Créer mon Dessin Animé
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
```


### src/components/Galerie.jsx
```jsx
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
```


### src/components/Header.jsx
```jsx
import { motion } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 transition hover:opacity-80"
          >
            Minimoji
          </Link>
        </motion.div>

        {/* Navigation + CTA + Switch */}
        <div className="flex items-center space-x-6">

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Link
              to="/concept"
              className={`transition hover:text-indigo-600 dark:hover:text-indigo-400 ${
                location.pathname === "/concept" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
              }`}
            >
              Concept
            </Link>
            <Link
              to="/galerie"
              className={`transition hover:text-indigo-600 dark:hover:text-indigo-400 ${
                location.pathname === "/galerie" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
              }`}
            >
              Galerie
            </Link>
            
          </nav>

          {/* Call To Action */}
          <Link
            to="/creer"
            className="hidden md:inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full text-sm transition"
          >
            Créer mon Dessin Animé
          </Link>

          {/* Theme Switcher */}
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
```


### src/components/Hero.jsx
```jsx
import { useEffect } from "react";
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
          className="text-3xl sm:text-4xl lg:text-4xl font-extrabold mb-1"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Faites vivre les dessins de vos enfants
        </motion.h1>

          <motion.p
            variants={child}
            className="text-sm text-gray-700 dark:text-gray-400 font-medium leading-snug font-poppins"
          >
            Transformez leurs chefs-d’œuvre en mini-films remplis de magie. une photo suffit.
            <strong> En quelques clics, l’imaginaire prend vie.</strong>
          </motion.p>

          <motion.a
            href="/creer"
            variants={child}
            className="w-full sm:w-auto px-5 py-2 bg-orange-400 hover:bg-orange-600 text-white text-sm font-semibold font-poppins rounded-full shadow-md text-center transform hover:scale-105 ease-in-out"
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

```


### src/components/HeroImage.jsx
```jsx
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
      className="relative w-full max-w-[600px] mx-auto mt-4 overflow-hidden px-4"
    >
      {/* Image complète */}
      <picture>
        <source
          media="(max-width: 768px)"
          srcSet="https://res.cloudinary.com/dwl7ufet9/image/upload/f_auto,q_auto/hero-mobile_ds8xfg.png"
          type="image/png"
        />
        <img
          src="https://res.cloudinary.com/dwl7ufet9/image/upload/f_auto,q_auto/hero-min_p6b85v.png"
          alt="Avant/après dessin animé"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto object-contain max-h-[60vh] relative z-0"
          loading="eager"
        />
      </picture>

      {/* Étiquette prix */}
      <div className="absolute top-4 right-3 bg-white text-gray-800 px-3 py-1 rounded-xl shadow-lg text-[0.75rem] font-medium leading-tight">
        <span className="block text-[1rem] font-normal">à partir de</span>
        <span className="text-[1.30rem] font-extrabold">8.99 €</span>
      </div>

      {/* Wrapper pour centrer le texte sous la seconde image */}
      <div className="absolute z-10 translate-y-[00%] left-1/2 -translate-x-1/2 bottom-0 sm:bottom-2 md:translate-x-0 md:left-auto md:right-3">
        <div className="bg-[#53DC84] text-white px-3 py-1 rounded-md text-s font-bold font-poppins shadow-md w-max">
          20 sec de vidéos
        </div>
      </div>
    </motion.div>
  );
}
```


### src/components/Loader.jsx
```jsx
export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500 font-sans">
      <img
        src="/src/pubic/dino.svg"
        alt="Chargement Dino"
        className="w-20 h-20 animate-spin-slow mb-4"
      />
      <p className="text-sm">Un petit dino arrive... Patience !</p>
    </div>
  );
}
```


### src/components/Navbar.jsx
```jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import ThemeSwitcher from './ThemeSwitcher';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 transition hover:opacity-80"
          >
            Minimoji
          </Link>
        </motion.div>

        {/* Desktop nav + CTA */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-8 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Link
              to="/concept"
              className={`transition hover:text-indigo-600 dark:hover:text-indigo-400 ${
                location.pathname === "/concept" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
              }`}
            >
              Concept
            </Link>
            <Link
              to="/galerie"
              className={`transition hover:text-indigo-600 dark:hover:text-indigo-400 ${
                location.pathname === "/galerie" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
              }`}
            >
              Galerie
            </Link>
            <Link
              to="/tarifs"
              className={`transition hover:text-indigo-600 dark:hover:text-indigo-400 ${
                location.pathname === "/tarifs" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
              }`}
            >
              Tarifs
            </Link>
          </nav>

          <Link
            to="/creer"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full text-sm transition"
          >
            Créer mon Dessin Animé
          </Link>
        </div>

        {/* Right side: ThemeSwitcher + Burger icon */}
        <div className="flex items-center gap-4">
          {/* Theme Switcher visible sur toutes tailles */}
          <ThemeSwitcher />

          {/* Burger icon pour mobile */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 pt-2 space-y-4 bg-white dark:bg-gray-900 shadow-md">
          <nav className="flex flex-col items-center space-y-4 text-gray-700 dark:text-gray-300 text-xl font-medium mt-4 text-center">
            <Link
              to="/concept"
              className={`transition hover:text-indigo-600 dark:hover:text-indigo-400 ${
                location.pathname === "/concept" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              Concept
            </Link>
            <Link
              to="/galerie"
              className={`transition hover:text-indigo-600 dark:hover:text-indigo-400 ${
                location.pathname === "/galerie" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              Galerie
            </Link>
            <Link
              to="/tarifs"
              className={`transition hover:text-indigo-600 dark:hover:text-indigo-400 ${
                location.pathname === "/tarifs" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              Tarifs
            </Link>
            <Link
              to="/creer"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 w-full rounded-full text-center transition"
              onClick={() => setIsOpen(false)}
            >
              Créer mon Dessin Animé
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
```


### src/components/Pitch.jsx
```jsx
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
          className="text-2xl sm:text-3xl md:text-3xl font-extrabold mb-8 text-left text-gray-900 dark:text-gray-300 transition-colors duration-500 leading-snug max-w-2xl mx-auto"
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
```


### src/components/SaveExportButtons.jsx
```jsx
import React from "react";
import { motion } from "framer-motion";

export default function SaveExportButtons({ stageRef }) {
  const handleExport = () => {
    if (!stageRef.current) return;
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const link = document.createElement("a");
    link.download = "dessin-minimoji.png";
    link.href = uri;
    link.click();
  };

  return (
    <div className="mt-8 text-center">
      <motion.button
        onClick={handleExport}
        className="inline-block px-6 py-4 bg-[#FB923C] hover:bg-orange-600 text-white rounded-full font-semibold transition"
        whileHover={{ scale: 1.05 }}
      >
        Exporter en PNG
      </motion.button>
    </div>
  );
}
```


### src/components/ScrollToTop.jsx
```jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // On attend un tout petit temps pour éviter de perturber l’animation d’entrée
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 10); // Tu peux jouer avec ce timing

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
```


### src/components/ScrollTop.jsx
```jsx
// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
```


### src/components/SignInUpload.jsx
```jsx
import { useState } from 'react';
import { auth, provider } from '../lib/firebaseClient';
import { signInWithPopup } from 'firebase/auth';

// --- Config côté client ---
const MAX_FILE_MB = 5; // limite raisonnable
const ACCEPT_PREFIX = 'image/';

export default function SignInUpload() {
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadInfo, setUploadInfo] = useState(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  // Utilitaire pour POST JSON + remonter proprement l'erreur serveur
  const postJSON = async (url, body) => {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body ?? {})
    });
    let data = null;
    try {
      data = await resp.json();
    } catch (_) {
      /* ignore json parse error */
    }
    if (!resp.ok) {
      const msg = data?.error || data?.message || `${url} ${resp.status}`;
      throw new Error(msg);
    }
    return data;
  };

  const signIn = async () => {
    setError('');
    try {
      const cred = await signInWithPopup(auth, provider);
      setUser(cred.user);
      console.log('[auth] user', cred.user?.uid);
    } catch (e) {
      console.error('[auth] error', e);
      setError(e.message || 'Erreur connexion Google');
    }
  };

  const handleFile = async (file) => {
    setError('');
    setUploadInfo(null);

    try {
      if (!file) throw new Error('Aucun fichier.');
      if (!file.type?.startsWith(ACCEPT_PREFIX)) {
        throw new Error('Seules les images sont acceptées.');
      }
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        throw new Error(`Image trop lourde (> ${MAX_FILE_MB} Mo).`);
      }

      setUploading(true);
      console.log('[upload] start', file?.name, file?.size);

      // 1) Récupérer une signature côté serveur
      const params = {
        folder: 'minimoji-uploads',
        timestamp: Math.floor(Date.now() / 1000), // secondes
      };

      const { signature, timestamp, apiKey, cloudName } = await postJSON('/api/cloudinary-sign', { params });
      if (!signature || !timestamp || !apiKey || !cloudName) {
        throw new Error('Réponse de signature invalide.');
      }
      console.log('[upload] signature OK', { cloudName, hasSig: !!signature });

      // 2) Upload signé directement chez Cloudinary
      const form = new FormData();
      form.append('file', file);
      form.append('api_key', apiKey);
      form.append('timestamp', String(timestamp));
      form.append('folder', params.folder);
      form.append('signature', signature);

      // (Facultatif) support d'un preset non signé si défini dans l'env (ex: en CI
      // ou pour dépannage). On ne l’envoie QUE s’il existe.
      const preset = import.meta?.env?.VITE_CLOUDINARY_UPLOAD_PRESET;
      if (preset) form.append('upload_preset', preset);

      const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
      const upResp = await fetch(url, { method: 'POST', body: form });
      const body = await upResp.json().catch(() => null);
      if (!upResp.ok) {
        const msg = body?.error?.message || `Upload Cloudinary échoué (${upResp.status})`;
        console.error('[upload] cloudinary error body =', body);
        throw new Error(msg);
      }

      console.log('[upload] done', body);
      setUploadInfo({ public_id: body.public_id, secure_url: body.secure_url });
    } catch (e) {
      console.error('[upload] error', e);
      setError(e.message || 'Erreur upload');
    } finally {
      setUploading(false);
    }
  };

  const createJob = async () => {
    setError('');
    setCreating(true);
    try {
      if (!auth.currentUser) throw new Error('Connecte-toi d’abord.');
      if (!uploadInfo?.public_id) throw new Error('Upload une image avant.');

      const idToken = await auth.currentUser.getIdToken();
      const resp = await fetch('/api/create-job', {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ uploadId: uploadInfo.public_id, prompt: '' }),
      });
      const data = await resp.json().catch(() => null);
      if (!resp.ok) throw new Error(data?.error || `create-job ${resp.status}`);
      console.log('[job] created', data);
      alert(`Job créé: ${data.jobId}`);
    } catch (e) {
      console.error('[job] error', e);
      setError(e.message || 'Erreur création du job');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-12 rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/70">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-violet-600 dark:text-violet-300">
        ✨ Essai Minimoji
      </h3>

      {!user ? (
        <button
          onClick={signIn}
          className="px-4 py-2 rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-violet-600 text-white hover:bg-violet-500"
        >
          Se connecter avec Google
        </button>
      ) : (
        <p className="p-3 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
          Connecté : <strong>{user.displayName || user.email}</strong>
        </p>
      )}

      <label
        htmlFor="file-upload"
        className="block cursor-pointer rounded-xl border-2 border-dashed border-zinc-300 p-6 text-center hover:border-violet-400 hover:bg-violet-50/40 dark:border-zinc-600 dark:hover:bg-violet-500/10 mt-4"
      >
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Choisir un dessin à uploader</p>
        <p className="mt-1 text-xs text-zinc-500">{uploading ? 'Upload en cours…' : 'Formats acceptés : JPG, PNG (≤ 20 Mo)'}
        </p>
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        className="hidden"
        disabled={!user || uploading}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {uploadInfo && (
        <>
          <img src={uploadInfo.secure_url} alt="" className="mt-4 h-24 w-24 rounded-lg border object-cover" />
          <p className="text-xs text-zinc-500">ID : {uploadInfo.public_id}</p>
        </>
      )}

      <button
        onClick={createJob}
        disabled={!user || !uploadInfo || creating}
        className="mt-6 px-4 py-2 rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-emerald-500 text-white hover:bg-emerald-400"
      >
        {creating ? 'Création…' : 'Générer (crée un job)'}
      </button>

      {error && (
        <p className="mt-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm dark:bg-red-900/20 dark:text-red-300">
          ⚠ {error}
        </p>
      )}

      <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
        Astuce: si ça bloque, vérifie que <code>vercel dev</code> tourne sur <code>:3000</code> (API)
        et que <code>npm run dev</code> tourne sur <code>:5173</code> (front). Regarde l’onglet Réseau.
      </p>
    </div>
  );
}
```


### src/components/Steps.jsx
```jsx
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
    icon: "/dessin.svg",
    color: "bg-yellow-200 text-yellow-800",
  },
  {
    step: "2",
    title: "Notre magicien transforme\nl'oeuvre en animation.",
    icon: "/step-2.svg",
    color: "bg-pink-200 text-pink-800",
  },
  {
    step: "3",
    title: "Recevez votre mini-film\nen moins de 24h.",
    icon: "/mobile-phone.svg",
    color: "bg-blue-200 text-blue-800",
  },
];

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
        <div className="w-full max-w-4xl mx-auto mt-10 mb-16 rounded-lg overflow-hidden shadow-lg aspect-video">
          <iframe
        src="https://player.cloudinary.com/embed/?cloud_name=dwl7ufet9&public_id=video5_f0pcxa&profile=minimoji&player[autoplay]=false"
        width="640"
        height="360"
        style={{ height: 'auto', width: '100%', aspectRatio: '640 / 360' }}
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
        frameBorder="0"
      />
        </div>

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
      transition={{ duration: 0.2 }}
    />

    {/* Bulle de numéro animée */}
    <motion.div
      whileHover={{ scale: 1.4 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={`w-10 h-10 flex items-center justify-center rounded-full ${item.color} text-lg font-bold mb-2 cursor-pointer`}
    >
      {item.step}
    </motion.div>

    {/* Texte */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="bg-white/60 dark:bg-white/10 rounded-xl p-4 shadow-sm backdrop-blur-sm hover:shadow-lg"
    >
      <p className="text-sm font-medium dark:text-white transition-colors duration-500 whitespace-pre-line leading-snug font-poppins">
        {item.title}
      </p>
    </motion.div>
  </motion.div>
))}
        </div>

        <motion.div variants={child} className="mt-12">
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="bg-white/60 dark:bg-white/10 rounded-xl p-6 shadow-sm backdrop-blur-sm hover:shadow-lg mt-10"
        >
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
        </motion.div>
      </motion.div>
    </section>
  );
}
```


### src/components/Testimonials.jsx
```jsx
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "C’est juste trop génial.",
    text: "Mon fils passe son temps à regarder ses propres dessins. Il les commente, les met en scène… Je ne pensais pas qu’une simple animation pouvait autant le captiver !",
    avatar: "/testimonial-1.svg",
  },
  {
    name: "Quelle diablerie !",
    text: "Mes petits-enfants pensent que je maîtrise une force occulte. C’est devenu un rituel du dimanche : on regarde leurs créations comme un court-métrage. Merci Minimoji !",
    avatar: "/testimonial-2.svg",
  },
];

export default function Testimonials() {
  return (
    <section className=" dark:bg-gray-900 transition-colors duration-500 py-32 px-4 sm:px-6 md:px-8 font-sans">
      <h2 className="text-2xl sm:text-3xl md:text-3xl font-extrabold mb-12 text-center text-gray-900 dark:text-white leading-snug max-w-2xl mx-auto">
        Ils ont transformé <br className="sm:hidden" />
        le rêve de leurs enfants
      </h2>

      <div className="max-w-5xl w-full mx-auto px-2 sm:px-4 md:px-0 grid gap-6 sm:gap-8 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1, y: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0 }}
            className="flex items-start gap-4 bg-white/90 dark:bg-white/10 backdrop-blur-lg p-5 sm:p-6 rounded-3xl shadow-md hover:shadow-3xl border border-white/90 dark:border-white/20 ease-out transition-shadow duration-500"
          >
            <motion.img
              src={t.avatar}
              alt={t.name}
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover cursor-pointer"
              whileHover={{
                scale: [1, 1.15, 1],
                rotate: [0, -4, 4, -2, 2, 0],
              }}
              transition={{ duration: 0.4 }}
            />
            <div className="text-left">
              <p className="font-bold text-gray-800 dark:text-gray-100 text-sm sm:text-base mb-2">
                {t.name}
              </p>
              <p className="text-sm sm:text-[0.95rem] md:text-base leading-snug text-gray-700 dark:text-gray-300 font-poppins">
                {t.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```


### src/components/ThemeSwitcher.jsx
```jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // On utilise motion pour faire le rebond fluide

export default function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <motion.button
      whileTap={{ scale: 0.95 }} // => petit rebond rapide au clic
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="ml-4 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-200 text-gray-800 dark:text-gray-600 font-semibold transition-all duration-500
                 hover:ring-4 hover:ring-indigo-300 hover:shadow-md dark:hover:ring-indigo-500 dark:hover:shadow-indigo-500/30"
    >
      {isDarkMode ? "☀️ Light" : "🌙 Dark"}
    </motion.button>
  );
}
```


### src/components/Toolbar.jsx
```jsx
import React from "react";
import ColorPicker from "./ColorPicker";

export default function Toolbar({ color, setColor, tool, setTool, onClear }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      <ColorPicker color={color} setColor={setColor} />
      <button
        onClick={() => setTool("pen")}
        className={`px-4 py-2 rounded-full font-semibold transition ${
          tool === "pen" ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
        }`}
      >
        ✏️ Crayon
      </button>
      <button
        onClick={() => setTool("eraser")}
        className={`px-4 py-2 rounded-full font-semibold transition ${
          tool === "eraser" ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
        }`}
      >
        🧽 Gomme
      </button>
      <button
        onClick={onClear}
        className="px-4 py-2 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600 transition"
      >
        Effacer tout
      </button>
    </div>
  );
}
```


### src/components/TriangleDivider.jsx
```jsx
export default function TriangleDivider() {
  return (
    <div
      className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 z-10"
      aria-hidden="true"
    >
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-[128%] h-[100px]"
      >
        <path
          d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z"
          className="fill-white dark:fill-gray-800"
        ></path>
      </svg>
    </div>
  );
}
```


### src/components/VideoCard.jsx
```jsx
function VideoCard({ vid, index }) {
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
```


### src/components/helmet.jsx
```jsx
import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, canonical, image }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <html lang="fr" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content="fr_FR" />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
```


### src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply font-poppins;
}
html {
  scroll-behavior: smooth;
}
```


### src/lib/firebaseClient.js
```js
// src/lib/firebaseClient.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Lis les variables d'env exposées par Vite (préfixe VITE_)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,          // optionnel
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, // optionnel
  appId: import.meta.env.VITE_FIREBASE_APP_ID,                          // optionnel
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,          // optionnel
};

// Petit helper pour masquer la clé dans les logs de dev
const mask = (s) => (typeof s === "string" && s.length > 10 ? `${s.slice(0, 6)}…${s.slice(-4)}` : s);

// Garde-fous en dev : on veut au minimum ces 3 champs
if (import.meta.env.DEV) {
  const missing = [];
  if (!firebaseConfig.apiKey) missing.push("VITE_FIREBASE_API_KEY");
  if (!firebaseConfig.authDomain) missing.push("VITE_FIREBASE_AUTH_DOMAIN");
  if (!firebaseConfig.projectId) missing.push("VITE_FIREBASE_PROJECT_ID");

  if (missing.length) {
    // Message clair si Vite n’a pas (re)chargé le .env
    // ou si les variables ne sont pas nommées avec le préfixe VITE_
    // (Vite n’expose QUE celles qui commencent par VITE_)
    console.error(
      `[firebase] Variables manquantes: ${missing.join(", ")}.
Vérifie ton .env, les noms (préfixe VITE_), et **redémarre** le serveur Vite.`
    );
  } else {
    console.info(
      `[firebase] Config OK (dev): apiKey=${mask(firebaseConfig.apiKey)}, authDomain=${firebaseConfig.authDomain}, projectId=${firebaseConfig.projectId}`
    );
  }
}

// Initialise l’app une seule fois
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Exports
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;
```


### src/main.jsx
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```


### src/pages/Concept.jsx
```jsx
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import DrawingCanvas from "../components/DrawingCanvas";
import Toolbar from "../components/Toolbar";
import SaveExportButtons from "../components/SaveExportButtons";
import { useRef, useState } from "react";

export default function Concept() {
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState("pen");
  const [clearCanvas, setClearCanvas] = useState(false);
  const stageRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Concept Minimoji — Donnez vie aux dessins d’enfants</title>
        <meta
          name="description"
          content="Découvrez comment Minimoji transforme les dessins d’enfants en films animés magiques, en 3 étapes simples. Une expérience féérique pour petits et grands."
        />
        <link rel="canonical" href="https://minimoji.fr/concept" />

        {/* Open Graph */}
        <meta property="og:title" content="Concept Minimoji — Donnez vie aux dessins d’enfants" />
        <meta property="og:description" content="Découvrez comment Minimoji transforme les dessins d’enfants en films animés magiques, en 3 étapes simples. Une expérience féérique pour petits et grands." />
        <meta property="og:url" content="https://minimoji.fr/concept" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://minimoji.fr/images/preview-form.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Concept Minimoji — Donnez vie aux dessins d’enfants" />
        <meta name="twitter:description" content="Découvrez comment Minimoji transforme les dessins d’enfants en films animés magiques, en 3 étapes simples." />
        <meta name="twitter:image" content="https://minimoji.fr/images/preview-form.jpg" />
      </Helmet>
      <main className="bg-white dark:bg-gray-900 transition-colors duration-500 text-gray-900 dark:text-gray-100 font-sans">
      <section className="px-10 sm:px-6 md:px-10 py-20 max-w-3xl mx-auto">

        {/* Accroche principale */}
         <motion.h1
          className="text-3xl sm:text-4xl lg:text-4xl font-extrabold mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Une dessin aujour'hui, un film magique dès demain ✨
        </motion.h1>
        <p className="text-lg sm:text-xl leading-relaxed text-center text-indigo-700 dark:text-indigo-300 mb-12">
          Confiez‑le à notre magicien… et réveillez‑vous avec la magie
        </p>

        {/* Étapes du rituel */}
        <div className="space-y-16">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <h2 className="text-xl sm:text-2xl font-bold">1. Remettez le parchemin</h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
              Envoyez une photo ou un scan du dessin de votre enfant — même bancal, même griffonné. L’essentiel, c’est l’élan créatif. Vous pouvez y ajouter une note vocale ou un petit texte si vous souhaitez enrichir l’histoire. Pas obligatoire, mais notre magicien aime les détails !
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <h2 className="text-xl sm:text-2xl font-bold">2. Le magicien s’en empare</h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
              Il analyse les lignes, les couleurs, l’énergie du dessin. Puis, d’un coup de baguette, il en fait une animation. Fidèle, mais prolongée. Une mini‑histoire naît, pleine de douceur ou de folie, selon l’inspiration de l’œuvre.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <h2 className="text-xl sm:text-2xl font-bold">3. Réception du film (sous 24 h) </h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
              Vous recevez un lien sécurisé contenant la vidéo en HD, sans watermark. Elle est prête à être projetée, partagée ou transformée en souvenir : certains l’intègrent dans un album, d’autres la collent au dos du dessin via QR code.
            </p>
          </motion.div>
        </div>
          {/* CTA final */}
         <div className="mt-16 text-center">
          <motion.a
            href="/creer"
            className="inline-block px-6 py-3 bg-[#FB923C] hover:bg-orange-600 text-white rounded-full font-semibold text-base transition"
            whileHover={{ scale: 1.05 }}
          >
            Je confie le dessin au magicien
          </motion.a>
          <img src="/step-2.svg" alt="Illustration étape 2" className="mx-auto mt-6 w-40 h-40 object-contain" />
        </div>
      </section>
      <div className="relative w-full overflow-hidden bg-transparent">


  <style>
    {`
      @keyframes blob {
        0%   { transform: scale(1) translate(0px, 0px) rotate(0deg); }
        33%  { transform: scale(1.05) translate(5px, -5px) rotate(2deg); }
        66%  { transform: scale(0.95) translate(-5px, 5px) rotate(-2deg); }
        100% { transform: scale(1) translate(0px, 0px) rotate(0deg); }
      }
    `}
  </style>
</div>
      <section className="bg-[#FEF9E9] dark:bg-gray-900 transition-colors duration-500 w-full">
  <div className="px-10 sm:px-6 md:px-10 py-20 max-w-3xl mx-auto font-sans" id="galerie">
    
    <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10">Préparez la magie ✨</h2>

    {/* Formats */}
    <div className="mt-16">
      <div className="bg-white/60 dark:bg-white/10 rounded-xl p-6 shadow-sm backdrop-blur-sm transition-transform duration-300 ease-in-out hover:scale-105">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Formats au choix</h3>
        <p className="text-base text-gray-700 dark:text-gray-300">
          Portrait, paysage ou carré — le magicien adapte l’histoire et la vidéo à votre demande.
        </p>
      </div>
    </div>

    {/* Confiance & légalité */}
    <div className="mt-16">
      <div className="bg-white/60 dark:bg-white/10 rounded-xl p-6 shadow-sm backdrop-blur-sm transition-transform duration-300 ease-in-out hover:scale-105">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Confiance & légalité</h3>
        <ul className="list-disc list-inside space-y-1 text-base text-gray-700 dark:text-gray-300">
          <li>Respect strict du droit à l’image</li>
          <li>Aucune utilisation commerciale sans accord écrit</li>
          <li>Vous restez pleinement propriétaire des fichiers</li>
        </ul>
      </div>
    </div>

    {/* Tarifs / accessibilité */}
    <div className="mt-16">
      <div className="bg-white/60 dark:bg-white/10 rounded-xl p-6 shadow-sm backdrop-blur-sm transition-transform duration-300 ease-in-out hover:scale-105">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Prix tout doux</h3>
        <p className="text-base text-gray-700 dark:text-gray-300">
          La magie est accessible à toutes les bourses. Pas d’abonnement, pas de mauvaise surprise. Une seule formule, un petit prix. Et beaucoup d’émerveillement.
        </p>
        <p className="mt-3 text-xs text-gray-600 dark:text-gray-400 italic">
          Besoin d’un format ou d’une idée spéciale ? Chuchotez‑la, le magicien adore les défis.
        </p>
      </div>
    </div>
          <div className="text-center">
            <a
              href="/galerie"
              className="inline-block mt-10 px-6 py-3 bg-indigo-600 hover:bg-indigo-800 text-white rounded-full font-semibold text-base transition mb-10"
            >
              Voir la galerie magique
            </a>
          </div>

  </div>
</section>
      <section className="px-10 sm:px-6 md:px-10 py-20 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10">Dessin (2D)</h2>
        <Toolbar
          color={color}
          setColor={setColor}
          tool={tool}
          setTool={setTool}
          onClear={() => setClearCanvas(true)}
        />
        <DrawingCanvas
          color={color}
          tool={tool}
          clearCanvas={clearCanvas}
          onClearComplete={() => setClearCanvas(false)}
          stageRef={stageRef}
        />
        <div className="flex justify-center mb-4">
          <SaveExportButtons stageRef={stageRef} />
        </div>
      </section>
      </main>
    </>
  );
}

```


### src/pages/Confirmation.jsx
```jsx
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Dino from "/public/dino.svg";
import { motion } from "framer-motion";

export default function Confirmation() {
  return (
    <>
      <Helmet>
        <title>Confirmation – Minimoji</title>
        <meta name="description" content="Votre dessin a bien été envoyé. Merci de faire confiance à Minimoji !" />
      </Helmet>

      <section className="min-h-screen bg-purple-100 dark:bg-gray-900 flex flex-col justify-center items-center text-center px-4 py-16">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md max-w-md">
          {/* Dino animé */}
          <motion.div
            animate={{ x: ["-70px", "70px", "-70px"] }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="relative w-24 h-24 mx-auto mb-4"
          >
            <motion.img
              src={Dino}
              alt="Dino"
              className="absolute top-0 left-0 w-full origin-center"
              animate={{
                scaleX: [1, 1, -1, -1, 1],
                y: [0, -5, 0, 5, 0]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-black/10 dark:bg-white/10"
              animate={{
                scaleX: [.9, 1.1, .9],
                opacity: [0.6, 0.4, 0.6]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </motion.div>
          <h1 className="text-3xl font-extrabold text-primary-500 dark:text-white mb-4">Merci pour votre envoi !</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">Votre dessin a bien été reçu. Un mini-film sera généré et envoyé dans un délai de 24h.</p>
          <Link
            to="/"
            className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-2 rounded-full transition"
          >
            Retour à l’accueil
          </Link>
        </div>
      </section>
    </>
  );
}
```


### src/pages/Form.jsx
```jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export default function Form() {
  const [preview, setPreview] = useState(null);
  const location = useLocation();
  const [plan, setPlan] = useState("mini");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedPlan = params.get("plan");
    if (["mini", "classique", "grand"].includes(selectedPlan)) {
      setPlan(selectedPlan);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...body,
          email: body.email || "meneust.r@gmail.com", // valeur fallback si jamais
        }),
      });

      if (response.ok) {
        toast.success("✉️ Votre dessin a bien été envoyé !");
        setTimeout(() => navigate("/confirmation"), 2000);
      } else {
        const errorText = await response.text();
        console.error("Erreur:", errorText);
        toast.error("Une erreur est survenue, veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      toast.error("Une erreur est survenue, veuillez réessayer.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Créer mon dessin animé – Minimoji</title>
        <meta name="description" content="Soumettez facilement un dessin d’enfant pour le transformer en mini-film animé personnalisé. Formulaire simple et rapide, envoi sécurisé et réponse sous 24h." />
        <meta property="og:title" content="Créer mon dessin animé – Minimoji" />
        <meta property="og:description" content="Soumettez facilement un dessin d’enfant pour le transformer en mini-film animé personnalisé. Formulaire simple et rapide, envoi sécurisé et réponse sous 24h." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://minimoji.fr/creer" />
        <meta property="og:image" content="https://minimoji.fr/images/preview-form.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Créer mon dessin animé – Minimoji" />
        <meta name="twitter:description" content="Soumettez facilement un dessin d’enfant pour le transformer en mini-film animé personnalisé. Formulaire simple et rapide, envoi sécurisé et réponse sous 24h." />
        <meta name="twitter:image" content="https://minimoji.fr/images/preview-form.jpg" />
        <link rel="canonical" href="https://minimoji.fr/creer" />
      </Helmet>
      <Toaster position="bottom-center" />
      <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-6">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-2">
              Créer mon dessin animé
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Transformez un dessin d’enfant en mini-film animé en quelques clics ✨
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="plan" value={plan} />

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Prénom de l’enfant</label>
              <input type="text" name="child_name" className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400" />

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Titre du dessin</label>
              <input type="text" name="drawing_title" className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400" />

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Histoire ou explication</label>
              <textarea name="story" className="textarea textarea-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Style graphique</label>
                <select name="style" className="select select-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400">
                  <option>Cartoon</option>
                  <option>Aquarelle magique</option>
                  <option>Crayon de couleur</option>
                  <option>Pixel pastel</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Ambiance sonore</label>
                <select name="ambiance" className="select select-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400">
                  <option>Poétique</option>
                  <option>Aventureuse</option>
                  <option>Magique</option>
                  <option>Énergique</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Voix off</label>
                <select name="voiceover" className="select select-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400">
                  <option value="true">Avec voix-off</option>
                  <option value="false">Sans voix-off</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Dessin de votre enfant</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                className="file-input file-input-bordered w-full"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
              {preview && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Aperçu de l’image :</p>
                  <img src={preview} alt="Aperçu du dessin" className="w-full max-w-xs mx-auto rounded shadow" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Adresse email du parent</label>
              <input type="email" name="email" required className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400" />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-5 py-2 bg-orange-400 hover:bg-orange-600 text-white text-sm font-semibold font-poppins rounded-full shadow-md"
              >
                Envoyer le dessin ✨
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

```


### src/pages/Galerie.jsx
```jsx
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

export default function Galerie() {
  return (
    <>
      <Helmet>
        <title>Galerie | Minimoji - Les dessins s’animent</title>
        <meta name="description" content="Découvrez des exemples de dessins transformés en mini-films animés. Magie, émotions et créativité enfantine au cœur de notre galerie." />
        <meta name="keywords" content="galerie, animation, dessins enfants, vidéos magiques, exemples Minimoji, mini-films créatifs" />
        <meta property="og:title" content="Galerie | Minimoji - Les dessins s’animent" />
        <meta property="og:description" content="Plongez dans notre galerie d’exemples et voyez comment les dessins prennent vie grâce à Minimoji." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://minimoji.fr/galerie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Galerie | Minimoji - Les dessins s’animent" />
        <meta name="twitter:description" content="Plongez dans notre galerie d’exemples et voyez comment les dessins prennent vie grâce à Minimoji." />
        <meta name="twitter:image" content="https://minimoji.fr/images/preview-form.jpg" />
        <meta name="twitter:site" content="@minimoji_fr" />
      </Helmet>
      <main className="bg-white dark:bg-gray-900 transition-colors duration-500 text-gray-900 dark:text-gray-100 font-sans">
      <section className="px-10 sm:px-6 md:px-10 py-20 max-w-3xl mx-auto">

        {/* Accroche principale */}
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-snug mb-8 text-center">
        Un dessin aujourd’hui, un film magique dès demain.
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed text-center text-indigo-700 dark:text-indigo-300 mb-12">
          Confiez‑le à notre magicien… et réveillez‑vous avec la magie ✨
        </p>

        {/* Section galerie – secrets, témoignages, appel à contribution */}
        <div className="mt-20">
          <div className="border-t pt-6 border-gray-300 dark:border-gray-600"></div>
          <div className="space-y-12">

            {/* Secrets du magicien */}
            <div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Les secrets du magicien</h4>
              <p className="text-base text-gray-700 dark:text-gray-300">
                Chaque dessin contient une intention, une histoire, un geste. Le magicien Minimoji interprète cette énergie enfantine à l’aide de l’IA et d’un savoir-faire artisanal : il détecte les éléments narratifs, amplifie l’émotion du trait, puis génère un court métrage animé fidèle à la spontanéité du dessin. Ici, pas de modèle figé — chaque création est un prototype magique, pensé pour révéler la beauté du chaos enfantin.
              </p>
            </div>

            {/* Témoignages */}
            <div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Ils ont tenté l’expérience</h4>
              <ul className="space-y-2 text-base text-gray-700 dark:text-gray-300 list-disc list-inside">
                <li>“Mon fils s’est vu en héros, il en a pleuré de joie.” – Camille, maman émerveillée</li>
                <li>“On l’a projeté à l’école : standing ovation dans la classe !” – Thomas, enseignant en CE2</li>
                <li>“Le dessin prenait déjà toute la place sur le frigo, maintenant il vit sur nos téléphones, et nos cœurs.” – Inès</li>
              </ul>
            </div>

            {/* Appel à contribution */}
            <div className="text-center">
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Faites partie de la galerie</h4>
              <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                Vous êtes parent, enseignant ou curieux ? Offrez à votre enfant l’opportunité de voir son imagination prendre vie. Chaque mois, certains dessins sont sélectionnés pour intégrer notre galerie magique.
              </p>
              <motion.a
                href="/creer"
                className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold text-base transition"
                whileHover={{ scale: 1.05 }}
              >
                Créer mon dessin animé
              </motion.a>
            </div>

          </div>
        </div>

        {/* Formats */}
        <div className="mt-16">
        <div className="mt-8 border-t pt-6 border-gray-300 dark:border-gray-600"></div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Formats au choix</h3>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
            Portrait, paysage ou carré — le magicien adapte l’histoire et la vidéo à votre demande.
          </p>
        </div>

        {/* Confiance & légalité */}
        <div className="mt-16">
        <div className="mt-8 border-t pt-6 border-gray-300 dark:border-gray-600"></div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Confiance & légalité</h3>
          <ul className="list-disc list-inside space-y-1 text-base text-gray-700 dark:text-gray-300">
            <li>Respect strict du droit à l’image</li>
            <li>Aucune utilisation commerciale sans accord écrit</li>
            <li>Vous restez pleinement propriétaire des fichiers</li>
          </ul>
        </div>

        {/* Tarifs / accessibilité */}
        <div className="mt-16">
        <div className="mt-8 border-t pt-6 border-gray-300 dark:border-gray-600"></div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Prix tout doux</h3>
          <p className="text-base text-gray-700 dark:text-gray-300">
            La magie est accessible à toutes les bourses. Pas d’abonnement, pas de mauvaise surprise. Une seule formule, un petit prix. Et beaucoup d’émerveillement.
          </p>
          <p className="mt-3 text-xs text-gray-600 dark:text-gray-400 italic">
            Besoin d’un format ou d’une idée spéciale ? Chuchotez‑la, le magicien adore les défis.
          </p>
        </div>

        {/* CTA final */}
        <div className="mt-16 text-center">
          <motion.a
            href="#create"
            className="inline-block px-6 py-3 bg-[#FB923C] hover:bg-orange-600 text-white rounded-full font-semibold text-base transition"
            whileHover={{ scale: 1.05 }}
          >
            Je confie le dessin au magicien
          </motion.a>
        </div>

      </section>
    </main>
    </>
  );
}

```


### src/pages/GaleriePage.jsx
```jsx
import { motion } from "framer-motion";
import { useState, useRef } from "react";

const videos = [
  {
    src: "/video1.mp4",
    title: "Rayon d’Éveil",
    subtitle: "Par Raphaël, 4 ans",
  },
  {
    src: "/video2.mp4",
    title: "Folie sucrée",
    subtitle: "Par Lucas, 7 ans",
  },
  {
    src: "/video3.mp4",
    title: "Félin d'Ombre",
    subtitle: "Par Alice, 6 ans",
  },
  {
    src: "/video4.mp4",
    title: "Tracé de Rêve",
    subtitle: "Par Maëlis, 8 ans",
  },
];

export default function GaleriePage() {
  const [hovered, setHovered] = useState(null);
  const [activeTag, setActiveTag] = useState("tous");

  return (
    <main className="bg-white dark:bg-gray-900 transition-colors duration-500 text-gray-900 dark:text-gray-100 font-sans">
      <section className="px-4 sm:px-6 md:px-10 py-20 max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-snug mb-4 text-center">
          Ils ont dessiné… et la magie a fait le reste
        </h1>
        <p className="text-base sm:text-lg text-center text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Voici une sélection de vidéos magiques, créées à partir de vrais dessins d’enfants. Chaque film est une aventure unique.
        </p>

        {/* Grille de vidéos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {videos.map((vid, index) => {
            return (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-2xl group bg-gray-100 dark:bg-gray-800"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: index * 0.05 }}
                onMouseEnter={() => {
                  const video = document.getElementById(`video-${index}`);
                  if (video) {
                    video.muted = false;
                  }
                }}
                onMouseLeave={() => {
                  const video = document.getElementById(`video-${index}`);
                  if (video) {
                    video.muted = true;
                  }
                }}
                onClick={() => {
                  const video = document.getElementById(`video-${index}`);
                  if (video) {
                    video.muted = !video.muted;
                  }
                }}
              >
                <video
                  id={`video-${index}`}
                  src={vid.src}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  className="relative z-10 w-full aspect-[9/16] object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white z-20">
                  <h3 className="text-sm font-semibold truncate">{vid.title}</h3>
                  <p className="text-xs opacity-80 truncate">{vid.subtitle}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Étapes de transformation sous forme de cartes */}
        <div className="mt-24 grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "1. Le dessin est reçu",
              description:
                "Un parent envoie le dessin de son enfant via notre formulaire sécurisé. Tous les formats sont acceptés — photo, scan ou simple croquis.",
            },
            {
              title: "2. La magie opère",
              description:
                "Notre magicien numérique analyse le dessin, choisit un style, et transforme l’univers graphique en scénario animé sur-mesure.",
            },
            {
              title: "3. Le mini-film est livré",
              description:
                "En moins de 24h, le dessin devient une vidéo à partager. Un souvenir magique que l’on garde et que l’on montre fièrement.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-indigo-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg`}
            >
              <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{step.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-24 px-4 bg-white dark:bg-gray-800 py-10 rounded-xl shadow-md">
          <p className="text-base sm:text-lg text-gray-800 dark:text-gray-300 max-w-xl mx-auto mb-6">
            Et si le prochain dessin devenait le vôtre ? En moins de 24h, notre magicien transforme l’imaginaire de votre enfant en un souvenir vidéo inoubliable.
          </p>
          <a
            href="/concept"
            className="inline-block px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-medium transition transform hover:scale-105"
          >
            Voir comment ça marche
          </a>
        </div>
      </section>
    </main>
  );
}
```


### src/pages/Home.jsx
```jsx
import Hero from '../components/Hero';
import StepsDefault  from "../components/Steps";
import Pitch from "../components/Pitch";

export default function Home() {
  return (
    <>
      <Hero />
      <BlockyDivider />
      <StepsDefault />
      <Pitch />
      <Testimonials />
      <Footer />
    </>
  );
}
```


### src/pages/NotFound.jsx
```jsx
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import NotFoundIllustration from '/404.svg';

export default function NotFound() {
  useEffect(() => {
    document.title = "Page non trouvée - Minimoji";
  }, []);

  return (
    <main
      role="main"
      aria-labelledby="page-title"
      className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900 text-center px-6"
    >
      <motion.h1
        id="page-title"
        className="text-5xl sm:text-6xl font-extrabold text-black mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404 - Page introuvable
      </motion.h1>

      <img
        src={NotFoundIllustration}
        alt="Le magicien et le dinosaure cherchent leur chemin sur une carte"
        className="w-72 h-auto mb-6"
        role="presentation"
      />

      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Oups ! Cette page semble avoir disparu…
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Nos héros sont perdus, carte en main, à la recherche du bon chemin.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-orange-400 hover:bg-orange-600 text-white font-semibold rounded-full transition"
        aria-label="Retour à la page d’accueil"
      >
        Retour à l’accueil
      </Link>
    </main>
  );
}
```


### src/pages/Tarifs.jsx
```jsx
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Pitch from "../components/Pitch";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useEffect, useRef } from "react";

export default function Tarifs() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (selected && buttonRef.current) {
      buttonRef.current.classList.add("animate-bounce");
      const timeout = setTimeout(() => {
        buttonRef.current.classList.remove("animate-bounce");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [selected]);

  return (
    <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Helmet>
        <title>Tarifs Minimoji – Vidéos animées à partir des dessins d’enfants</title>
        <meta
          name="description"
          content="Découvrez les prix Minimoji : Formule Mini, Classique et Grand Héros. Transformez les dessins de vos enfants en vidéos féeriques, dès 8,99 €, livrées en 24h."
        />
        <link rel="canonical" href="https://minimoji.fr/tarifs" />

        {/* Open Graph */}
        <meta property="og:title" content="Tarifs Minimoji – Vidéos animées à partir des dessins d’enfants" />
        <meta property="og:description" content="Formules Mini, Classique, Grand Héros – dès 8,99 €. Livraison rapide de vidéos féeriques basées sur les dessins de vos enfants." />
        <meta property="og:url" content="https://minimoji.fr/tarifs" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://minimoji.fr/images/preview-form.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tarifs Minimoji – Vidéos animées à partir des dessins d’enfants" />
        <meta name="twitter:description" content="Formules magiques dès 8,99 €. Mini-films personnalisés créés à partir des dessins d’enfants, livrés rapidement." />
        <meta name="twitter:image" content="https://minimoji.fr/images/preview-form.jpg" />
      </Helmet>
      {/* Hero section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nos formules magiques 
        </motion.h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Choisissez la formule qui correspond à votre univers.  
          Chaque dessin peut devenir un souvenir animé, à offrir ou à garder précieusement.
        </p>
      </section>


      {/* Tarifs cards */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Carte 1 */}
        <button
          onClick={() => setSelected("mini")}
          aria-label="Choisir la formule Mini"
          className={`bg-indigo-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 ${
            selected === "mini" ? "border-4 border-indigo-400 dark:bg-gray-700" : ""
          }`}
        >
          <img src="/potion1.svg" alt="Potion bleue - Formule Mini" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">Formule Mini</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">10 sec d’animation douce, idéale pour tester la magie.</p>
          <div className="text-3xl font-extrabold mb-4">8,99 €</div>
          <p className="mt-4 inline-block bg-white text-gray-700 dark:text-gray-800 text-sm px-5 py-1 rounded-full shadow">
            Livré en 24h
          </p>
        </button>

        {/* Carte 2 */}
        <button
          onClick={() => setSelected("classique")}
          aria-label="Choisir la formule Classique"
          className={`relative p-6 rounded-2xl shadow-md text-center transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 ${
            selected === "classique"
              ? "bg-indigo-50 dark:bg-gray-800 border-4 border-indigo-400"
              : "bg-indigo-50 dark:bg-gray-800 border-0"
          }`}
        >
          <div className="absolute -top-3 right-4 translate-y-[-30%]">
            <span className="bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              Recommandée
            </span>
          </div>
          <img src="/potion2.svg" alt="Potion violette - Formule Classique" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-indigo-700 dark:text-white mb-2">Formule Classique</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">20 sec d’aventure animée avec transitions et surprise.</p>
          <div className="text-3xl font-extrabold mb-4">13,99 €</div>
          <p className="mt-4 inline-block bg-white text-gray-700 dark:text-gray-800 text-sm px-5 py-1 rounded-full shadow">
            Livré en 24h – recommandé
          </p>
        </button>

        {/* Carte 3 */}
        <button
          onClick={() => setSelected("grand")}
          aria-label="Choisir la formule Grand Héros"
          className={`bg-indigo-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 ${
            selected === "grand" ? "border-4 border-indigo-400 dark:bg-gray-700" : ""
          }`}
        >
          <img src="/potion3.svg" alt="Potion dorée - Formule Grand Héros" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">Formule Grand Héros</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">30 sec avec musique personnalisée, intro & final magique.</p>
          <div className="text-3xl font-extrabold mb-4">19,99 €</div>
          <p className="mt-4 inline-block bg-white text-gray-700 dark:text-gray-800 text-sm px-5 py-1 rounded-full shadow">
            Livré en 48h
          </p>
        </button>
      </section>
      <div className="text-center mt-8">
        <Link
          ref={buttonRef}
          to={selected ? `/creer?plan=${selected}` : "/creer"}
          aria-label="Aller vers le formulaire pour créer un dessin animé"
          className={`inline-block ${
            selected ? "bg-orange-500 hover:bg-orange-600" : "bg-indigo-500 hover:bg-indigo-600"
          } text-white font-semibold py-3 px-6 rounded-full text-lg transition`}
        >
          Créer mon Dessin Animé
        </Link>
      </div>
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  <Pitch />
</motion.div>

    </main>
  );
}
```


### src/pages/cgu-cgv.jsx
```jsx
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export default function CGUCGV() {
  return (
    <div className="py-12 px-6">
      <Helmet>
        <title>Conditions Générales d’Utilisation et de Vente - Minimoji</title>
        <meta name="description" content="Consultez les CGU-CGV de Minimoji : conditions d’utilisation, droits d’auteur, modalités de commande, délais, annulations, et politique d’IA pour un service transparent et sécurisé." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Conditions Générales d’Utilisation et de Vente - Minimoji" />
        <meta property="og:description" content="Consultez les CGU-CGV de Minimoji : conditions d’utilisation, droits d’auteur, modalités de commande, délais, annulations, et politique d’IA." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.minimoji.fr/cgu-cgv" />
      </Helmet>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-6"
      >
        Conditions Générales d’Utilisation et de Vente
      </motion.h1>

      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Objet des CGU-CGV</h2>
        <p>
          Les présentes Conditions Générales d’Utilisation et de Vente (ci-après les « CGU-CGV ») régissent l’utilisation du site <strong>www.minimoji.fr</strong>, édité par la société BREIZHSTORM - Meneust Raphaël, ainsi que les modalités de commande des prestations proposées sur le site.
        </p>
        <h2 className="text-lg font-semibold mt-6">Champ d’application</h2>
        <p>
          Les présentes Conditions Générales d’Utilisation et de Vente (CGU-CGV) s’appliquent à tout utilisateur accédant au site www.minimoji.fr, qu’il soit simple visiteur ou client effectuant une commande. Elles régissent l’ensemble des services proposés sur le site, en France et à l’international, dès lors que l’accès est techniquement possible. Le site s’adresse prioritairement à un public familial et particulier.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Description du service</h2>
        <p>
          Le site a pour objet de permettre à ses utilisateurs de commander des animations courtes, générées à partir de dessins d’enfants fournis par les utilisateurs eux-mêmes. Ces contenus sont produits de manière semi-automatisée grâce à des technologies d’intelligence artificielle, puis livrés sous forme de mini-clips personnalisés.
        </p>
        <h2 className="text-lg font-semibold mt-6">Format et livraison des vidéos</h2>
        <p>
          Les animations sont livrées sous format vidéo MP4, en orientation horizontale ou verticale selon la demande. La vidéo est accessible via un lien privé, hébergé sur un drive sécurisé, avec accès illimité.
        </p>
        <h2 className="text-lg font-semibold mt-6">Usage autorisé</h2>
        <p>
          Le service proposé est destiné principalement à un usage familial et non commercial. Toutefois, l’éditeur ne saurait restreindre certains usages dès lors qu’ils respectent les droits d’auteur et l’esprit du projet.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Licence d’utilisation et droits cédés</h2>
        <p>
          Les vidéos créées à partir des dessins fournis par l’utilisateur sont destinées à un usage personnel, familial ou éducatif. Minimoji concède un droit d’usage non exclusif et non commercial sur les créations remises. Toute exploitation commerciale (vente, monétisation, diffusion publique) nécessite une autorisation écrite préalable. Minimoji conserve un droit moral sur les productions, notamment pour les valoriser à titre d’exemple ou de démonstration avec accord préalable.
        </p>
        <h2 className="text-lg font-semibold mt-6">Nature du service</h2>
        <p>
          Minimoji est un service à but ludique. Il ne s’agit en aucun cas d’un outil éducatif, thérapeutique ou médical. Toute utilisation relevant de ces champs relèverait d’une interprétation personnelle et n’engage en rien la responsabilité du site ou de son éditeur.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Acceptation des conditions</h2>
        <p>
          En naviguant sur le site ou en passant commande, l’utilisateur accepte sans réserve l’ensemble des clauses décrites ci-dessous.
        </p>
        <h2 className="text-lg font-semibold mt-6">Commande et paiement</h2>
        <p>
          Le processus de commande se déroule directement via le formulaire en ligne accessible sur la page <a href="/creer" className="text-orange-500 font-semibold hover:underline">Créer mon dessin animé</a>. L’utilisateur est invité à fournir les informations nécessaires à la personnalisation de son animation, ainsi qu’à procéder au paiement sécurisé par carte bancaire via la plateforme Stripe. La commande est considérée comme valide uniquement après réception du paiement complet.
        </p>
        <h2 className="text-lg font-semibold mt-6">Tarifs et promotions</h2>
        <p>
          Les tarifs des prestations sont indiqués en euros toutes taxes comprises sur la page dédiée, en vigueur au moment de la commande. L’éditeur se réserve le droit de modifier les prix à tout moment, mais les prestations seront facturées sur la base des tarifs en vigueur au moment de l’enregistrement de la commande.
          Des promotions ponctuelles peuvent être proposées sur le site. Elles sont valables uniquement pendant la période spécifiée et dans les conditions affichées sur les supports de communication officiels de Minimoji.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Délai de réalisation</h2>
        <p>
          Le délai de livraison indiqué lors de la commande est estimatif. L’éditeur s’engage à fournir les meilleures conditions de traitement, généralement sous 24 à 48 heures, hors week-ends et jours fériés. En cas de surcharge exceptionnelle, l’utilisateur sera informé par email du nouveau délai estimé. En l’absence de livraison sous 7 jours après commande, l’utilisateur pourra demander le remboursement intégral de sa commande.
        </p>
        <h2 className="text-lg font-semibold mt-6">Rétractation et annulation</h2>
        <p>
          Conformément à l’article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture de biens confectionnés selon les spécifications du consommateur ou nettement personnalisés. Ainsi, toute commande passée sur Minimoji étant une création sur mesure, elle est ferme et définitive dès validation du paiement.
          <br /><br />
          Toutefois, si l’utilisateur souhaite annuler sa commande dans l’heure qui suit le paiement, et si la production n’a pas encore débuté, un remboursement intégral pourra être envisagé. Toute demande doit être formulée par e-mail à l’adresse <strong>meneust.r@gmail.com</strong>.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Réclamation et médiation</h2>
        <p>
          En cas de réclamation, l’utilisateur est invité à contacter le service client à l’adresse suivante : <strong>meneust.r@gmail.com</strong>. Conformément à l’article L612-1 du Code de la consommation, l’utilisateur peut également recourir à une procédure de médiation conventionnelle en cas de litige non résolu amiablement, sous réserve d’éligibilité à ce dispositif.
        </p>
        <h2 className="text-lg font-semibold mt-6">Responsabilités</h2>
        <p>
          L’éditeur s’efforce de maintenir le site accessible et fonctionnel en tout temps. Des interruptions temporaires peuvent cependant survenir pour des raisons de maintenance, de mises à jour ou de dysfonctionnements techniques. Ces interruptions ne sauraient donner lieu à une quelconque indemnisation.
          <br /><br />
          Les contenus présents sur le site, notamment les tarifs, délais et visuels, sont fournis à titre indicatif et peuvent être modifiés sans préavis. Ils ne constituent pas un engagement contractuel.
          <br /><br />
          Le site ne contient aucun lien tiers, à l’exception de l’interface de paiement Stripe utilisée pour finaliser les commandes. Toute tentative de contournement du formulaire, d’envoi de contenu inapproprié ou d’exploitation malveillante (scraping, injection de code, etc.) fera l’objet de poursuites et pourra entraîner un bannissement immédiat de l’utilisateur.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Contenus refusés ou inappropriés</h2>
        <p>
          Minimoji se réserve le droit de refuser toute commande incluant des dessins ou descriptions à caractère haineux, violent, discriminatoire, sexuel ou enfreignant les droits d’autrui. Toute tentative de soumission abusive entraînera l’annulation de la commande et pourra faire l’objet d’un signalement ou de poursuites.
        </p>

        <h2 className="text-lg font-semibold mt-6">Droit applicable et litiges</h2>
        <p>
          Les présentes conditions sont soumises au droit français. En cas de litige ou de différend, une solution amiable sera recherchée en priorité entre les parties. À défaut d'accord, le litige sera porté devant les tribunaux compétents de Nantes, sauf disposition légale impérative contraire.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Modification des CGU-CGV</h2>
        <p>
          L’éditeur se réserve le droit de modifier à tout moment les présentes CGU-CGV afin de les adapter à l’évolution des services proposés ou à la législation en vigueur. Les utilisateurs seront informés des mises à jour via le site, et il leur appartient de consulter régulièrement la dernière version en ligne.
        </p>
        <h2 className="text-lg font-semibold mt-6">Usage de l’intelligence artificielle</h2>
        <p>
          Les animations sont partiellement générées à l’aide de technologies d’intelligence artificielle. En passant commande, l’utilisateur accepte que des éléments puissent être interprétés ou stylisés de manière automatique. Minimoji veille à la qualité finale de la vidéo, mais ne saurait être tenu responsable de divergences artistiques mineures liées à ces processus automatiques.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Service client et contact</h2>
        <p>
          Pour toute question, réclamation ou demande d’information complémentaire, l’utilisateur peut contacter le service client à l’adresse suivante : <strong>meneust.r@gmail.com</strong>.
          Le traitement des demandes se fait dans les meilleurs délais, en général sous 48 heures ouvrées.
        </p>

        <h2 className="text-lg font-semibold mt-6">Archivage et preuve</h2>
        <p>
          Les enregistrements informatisés conservés dans les systèmes informatiques de Minimoji seront considérés comme les preuves des communications, commandes et paiements intervenus entre les parties.
          Ces informations sont archivées de manière sécurisée pendant une durée maximale de 6 mois.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Force majeure</h2>
        <p>
          Minimoji ne pourra être tenu responsable en cas d’inexécution ou de retard dans l’exécution de ses obligations résultant d’un événement de force majeure, tel que défini par la jurisprudence des juridictions françaises. Sont notamment considérés comme cas de force majeure les grèves, les pannes techniques, les catastrophes naturelles, les coupures de réseau ou tout autre événement extérieur et imprévisible.
        </p>

        <h2 className="text-lg font-semibold mt-6">Indépendance des clauses</h2>
        <p>
          Si une ou plusieurs stipulations des présentes conditions générales sont tenues pour non valides ou déclarées comme telles en application d’une loi, d’un règlement ou à la suite d’une décision définitive d’une juridiction compétente, les autres stipulations garderont toute leur force et leur portée.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Entrée en vigueur</h2>
        <p>
          Les présentes Conditions Générales d’Utilisation et de Vente sont entrées en vigueur le 1er juillet 2025. Toute mise à jour future sera signalée via une notification sur le site et indiquera sa date de prise d’effet. Les utilisateurs sont invités à consulter régulièrement cette page afin de se tenir informés de toute modification.
        </p>
      </div>
    </div>
  );
}
```


### src/pages/mentions-legales.jsx
```jsx
import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export default function MentionsLegales() {
  return (
    <>
      <Helmet>
        <title>Mentions légales – Minimoji</title>
        <meta name="description" content="Retrouvez toutes les mentions légales du site Minimoji : éditeur, hébergeur, données personnelles, propriété intellectuelle et responsabilités." />
        <meta property="og:title" content="Mentions légales – Minimoji" />
        <meta property="og:description" content="Informations légales concernant le site Minimoji, son éditeur BREIZHSTORM – Meneust Raphaël, et les données personnelles collectées." />
        <meta property="og:url" content="https://www.minimoji.fr/mentions-legales" />
        <meta property="og:type" content="website" />
      </Helmet>
      <section className="max-w-3xl mx-auto px-6 py-12 text-center font-poppins text-gray-800 dark:text-gray-100">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-8"
      >
        Mentions légales
      </motion.h1>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md space-y-4 text-left">
        <p><strong>Nom commercial :</strong><br />Minimoji – une marque éditée par <strong>BREIZHSTORM – Meneust Raphaël</strong></p>

        <p><strong>Statut juridique :</strong><br />Entreprise individuelle (auto-entrepreneur)</p>

        <p><strong>SIRET :</strong><br />852 885 987 00010</p>

        <p><strong>Adresse du siège social :</strong><br />29 rue de la Pelleterie, 44000 Nantes, France</p>

        <p><strong>Téléphone :</strong><br />06 59 81 64 93</p>

        <p><strong>Adresse e-mail :</strong><br />meneust.r@gmail.com</p>

        <p><strong>Directeur de la publication :</strong><br />Raphaël Meneust</p>

        <p><strong>Nom de domaine :</strong><br />www.minimoji.fr (enregistré via Hostinger)</p>

        <p><strong>Conditions Générales d’Utilisation :</strong><br />
        Consultables à l’adresse suivante : <a href="/cgu-cgv" className="text-indigo-600 dark:text-indigo-400 hover:underline">www.minimoji.fr/cgu</a>
        </p>
      </div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md space-y-4 text-left mt-10">
        <p><strong>Hébergeur du site :</strong></p>
        <p><strong>Vercel Inc.</strong><br />
        440 N Barranca Ave #4133<br />
        Covina, CA 91723<br />
        États-Unis<br />
        <a href="https://vercel.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">https://vercel.com</a></p>
      </div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md space-y-4 text-left mt-10">
        <p><strong>Propriété intellectuelle :</strong></p>
        <p>Le site <strong>www.minimoji.fr</strong>, son design, son identité visuelle ainsi que l’ensemble de son contenu (textes, illustrations, animations, code source, UX/UI, logo) sont des créations originales protégées au titre de la propriété intellectuelle.</p>
        <p>Ces éléments sont la propriété exclusive de <strong>BREIZHSTORM – Meneust Raphaël</strong>, sauf mention contraire. Toute reproduction, diffusion, modification ou exploitation sans autorisation écrite préalable est strictement interdite.</p>
        <p>Les vidéos animées produites à partir des dessins soumis par les utilisateurs peuvent être librement partagées à des fins non commerciales, notamment sur les réseaux sociaux, sous réserve de ne pas altérer le message, ni porter atteinte aux droits des tiers.</p>
        <p>La marque <strong>Minimoji</strong> est utilisée dans un cadre commercial mais n’est pas déposée à l’INPI à ce jour.</p>
      </div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md space-y-4 text-left mt-10">
        <p><strong>Données personnelles :</strong></p>
        <p>Les informations collectées sur le site <strong>www.minimoji.fr</strong> via le formulaire « Créez votre dessin animé » (nom de l’enfant, prénom du parent, adresse e-mail, image(s) fournie(s), et message éventuel) sont strictement nécessaires au traitement de la demande et à la création d’une vidéo personnalisée.</p>
        <p>Ces données sont conservées pendant une durée fixe de <strong>6 mois</strong>, puis archivées de manière sécurisée. Elles peuvent être supprimées à tout moment sur simple demande de l’utilisateur par e-mail.</p>
        <p>Les données ne sont accessibles qu’à <strong>BREIZHSTORM – Meneust Raphaël</strong> et ne sont transmises à aucun tiers, partenaire, prestataire ou plateforme commerciale. Aucune donnée ne sera exploitée à des fins publicitaires ou partagée sans consentement explicite.</p>
        <p>Les fichiers sont hébergés sur un espace de stockage privé et sécurisé, chiffré, sans accès externe non autorisé.</p>
        <p>Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’opposition et de suppression de vos données. Pour exercer vos droits, vous pouvez écrire à l’adresse suivante : <a href="mailto:meneust.r@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">meneust.r@gmail.com</a>.</p>
        <p>Le site <strong>n’utilise aucun cookie ni service de mesure d’audience</strong>.</p>
      </div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md space-y-4 text-left mt-10">
        <p><strong>Responsabilité :</strong></p>
        <p>Minimoji s’efforce de maintenir le site accessible à tout moment. Toutefois, des interruptions temporaires peuvent survenir pour des raisons de maintenance, de mises à jour ou en cas de dysfonctionnement technique. Ces interruptions ne sauraient en aucun cas remettre en cause les commandes passées ni ouvrir droit à indemnisation.</p>
        <p>Le site contient uniquement un lien vers la plateforme de paiement sécurisée Stripe pour le traitement des commandes. Aucun autre service tiers ni contenu externe n’est embarqué.</p>
        <p>Toute tentative de contournement des dispositifs de sécurité (formulaire, validation d’images), d’exploitation malveillante (envoi de contenus abusifs ou illicites, injection de code, scrapping, etc.) est strictement interdite et pourra faire l’objet de poursuites judiciaires.</p>
        <p>Minimoji met tout en œuvre pour assurer l’exactitude et la mise à jour des informations présentées sur le site. Toutefois, certaines données (délais de livraison, prix, contenus éditoriaux) peuvent être modifiées à tout moment sans préavis, et ne constituent pas un engagement contractuel de la part de l’éditeur.</p>
      </div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md space-y-4 text-left mt-10">
        <p><strong>Contact :</strong></p>
        <p>Pour toute question relative au site, à vos données personnelles ou aux présentes mentions légales, vous pouvez contacter l’éditeur à l’adresse suivante : <a href="mailto:meneust.r@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">meneust.r@gmail.com</a>.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md space-y-4 text-left mt-10">
        <p><strong>Loi applicable & juridiction compétente :</strong></p>
        <p>Le présent site est soumis au droit français. En cas de litige, et à défaut de résolution amiable, compétence est attribuée aux tribunaux français compétents, conformément aux règles de droit commun.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md space-y-4 text-left mt-10">
        <p><strong>Accessibilité :</strong></p>
        <p>Le site <strong>www.minimoji.fr</strong> est conçu pour être accessible sur la plupart des navigateurs modernes. Si vous constatez un problème d’accessibilité ou un dysfonctionnement, vous pouvez le signaler à l’adresse suivante : <a href="mailto:meneust.r@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">meneust.r@gmail.com</a>.</p>
      </div>
    </section>
    </>
  );
}

```


### src/router.jsx
```jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Ajoute d'autres routes ici au besoin */}
    </Routes>
  );
}
```


### public/404.svg
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1029">
  <!-- Generator: Adobe Illustrator 29.6.0, SVG Export Plug-In . SVG Version: 2.1.1 Build 207)  -->
  <defs>
    <style>
      .st0 {
        fill: #487454;
      }

      .st1 {
        fill: #bdbe6f;
      }

      .st2 {
        fill: #4f7c69;
      }

      .st3 {
        fill: #cfcfa4;
      }

      .st4 {
        fill: #bca889;
      }

      .st5 {
        fill: #39396a;
      }

      .st6 {
        fill: #1d2340;
      }

      .st7 {
        fill: #eabb8f;
      }

      .st8 {
        fill: #baa787;
      }

      .st9 {
        fill: #497452;
      }

      .st10 {
        fill: #9c9a58;
      }

      .st11 {
        fill: #da8941;
      }

      .st12 {
        fill: #9b9958;
      }

      .st13 {
        fill: #71a376;
      }

      .st14 {
        fill: #3a396a;
      }

      .st15 {
        fill: #477353;
      }

      .st16 {
        fill: #64868e;
      }

      .st17 {
        fill: #1c2140;
      }

      .st18 {
        fill: #b9a686;
      }

      .st19 {
        fill: #ebbc8f;
      }

      .st20 {
        fill: #1e2340;
      }

      .st21 {
        fill: #1d213f;
      }

      .st22 {
        fill: #bdbd6e;
      }

      .st23 {
        fill: #1c213e;
      }

      .st24 {
        fill: #517f6b;
      }

      .st25 {
        fill: #bba88a;
      }

      .st26 {
        fill: #bdbd6f;
      }

      .st27 {
        fill: #d5d1ca;
      }

      .st28 {
        fill: #b85f44;
      }

      .st29 {
        fill: #1d2240;
      }

      .st30 {
        fill: #1c213f;
      }

      .st31 {
        fill: #39386a;
      }

      .st32 {
        fill: #73a478;
      }

      .st33 {
        fill: #f5ddbe;
      }

      .st34 {
        fill: #1a203f;
      }

      .st35 {
        fill: #9b9957;
      }

      .st36 {
        fill: #ebbc90;
      }

      .st37 {
        fill: #97c9cf;
      }

      .st38 {
        fill: #1d223f;
      }

      .st39 {
        fill: #96c8cf;
      }

      .st40 {
        fill: #65878f;
      }

      .st41 {
        fill: #ebbb8f;
      }

      .st42 {
        fill: #507e6a;
      }

      .st43 {
        fill: #bba889;
      }

      .st44 {
        fill: #f4ddbe;
      }

      .st45 {
        fill: #71a276;
      }
    </style>
  </defs>
  <g id="Calque_1">
    <g>
      <path class="st29" d="M776.4,507.9c-1.5-.8-7.8-2.7-8.2-3.3-.7-1.1,0-8.4-.4-11.1-1.9-11.4-16.3-19-25.7-23.2l11.9-16.1c16.4,7.4,33.7,1.1,45.1-11.9,2-2.3,6.7-10.9,7.2-11.3,2-1.4,9.4-.9,12.1-1.4,22.2-3.4,45-11.7,57.4-31.6,26.4-42.2-25.3-87.6-55.6-110.5l-14.2-69.3c.1-2.4,9.1-10.5,12.4-10.5,10.8,2.8,21.2,7.1,32.3,8.8,8.4,1.3,33.6,4.7,36.8-5.7,3.3-10.8-6.8-20.5-13-28.1-21.5-25.9-53.1-64.9-77.5-86.5-26.4-23.4-41-17.7-69.7-1.7-51.4,28.6-96.3,74.3-136.3,116.7-42-1.8-140.2,7.9-127.5,70.6,7.3,35.8,54.1,66.1,86.6,77-5.4,29.1-13.9,61.5-2.8,90.3,5.9,15.2,17.1,27.1,28.6,38.2-6.1,6.8-8.7,14.4-9.3,23.5-27.9,14-52.6,35.2-69.5,61.5l-80-17.5c17.3-17.4,24.8-43,19.5-67-3.8-17.2-35.8-70.6-47.6-85.4-19-23.9-46.8-36.4-76.7-40.8-4.6-9.8-16.3-31.1-26.5-35-17.1-6.5-33,21.6-38.7,34.2-10.4-10.2-37.9-26.8-50.9-14.4-10.3,9.8-4.9,36.4-4.1,49.4-20.6-7.1-51.3-7.8-43.3,22.8,3.4,12.8,11.6,21,15.7,31.3.4,1,.7,1.8.5,3-9.3.9-30,10.5-32.5,20-5.4,20.5,25.7,40.6,38.5,52-26.5,9.2-49.2,27.6-21,52.5,8.1,7.2,16.8,11,26,16,.7.4,2.8.3,2,2-1.4,2.7-29.6,9.6-34.7,22.3-5.4,13.4,9.9,28.3,18.7,36.8l12,9.5c-10.2.8-32.9,4.8-37.1,15.4-3.7,9.5,3.3,23.1,7.6,31.6,2.3,4.5,9.7,11.4,4.1,15-3,1.9-11.9-1.6-16.2-1.9-25.9-2.3-28.9,11.6-31.4,33.9-15.4-13.6-31.4-21-42.9,1.6-.6,1.2-1,4.1-1.2,4.3-1,.8-6.9-1.3-10.4,4.2-5.9,9.2,8.3,26.6,14.4,33.5,30.4,34,82.3,50.8,127,50.5-3,15.8-11.7,32.2,4.7,43.8,17.8,12.6,75.3,16.3,94.3,5.6,12.7-7.2,10-21.8,1.6-31.4-2.3-2.6-15.2-11.5-15.3-12.5,0-.9,3.2-6.6,4.5-7.3,3.7-2.1,11.2-1.1,15.3-3.2v19.5c0,5.3,5.8,13.7,10.1,16.9,16.1,12.1,67,12.1,85.7,5.9,9.6-3.2,15.9-7.9,15.3-18.8-.9-15.4-18.9-21.8-31-26.5,2.9-6.1,7-11.7,9.5-18,6-15.1,7.2-30.2,5.3-46.2-.4-3.2-2.5-7.2-2.6-10.2,0-5.3,3.7-14.7,4.3-20.5,4.4,5.1,12.2,6.1,18.5,6v72.6c.6,7.3,3.1,7.1,9.2,8.8,22.2,6.1,46.4,9.3,68.8,14.7,1.6,1.7-7.1,33.6-6,39.5,1.5,7.6,27.8,15,35,17,13.1,3.8,26,4.6,38.3,7.5,1,.2,1.2,2.2,2.3,2.9,2.7,1.7,33.3,4.7,38.9,5.1,68.2,5.1,156.9,1.2,222.9-17.1,8.7-2.4,36-9.6,37.5-19.5.9-5.8-3.9-23.7-5.3-30.6-4.5-22.3-10.2-44.5-14.7-66.8,32.3-5.5,57.2-28.8,61.9-61.6,10.2-71.6-57.5-185.4-120.5-219.3ZM362,610.3c-3.6-4.7-12.5-16.9-14-22-.6-2,.4-1.2,1.4-1.5,8.4-2.5,17.5-3,25.5-7l13,58c-9.1-8.3-18.5-17.7-26-27.5Z"/>
      <path class="st13" d="M262,766.8c-.9-.8-4.3-3.2-5.1-3.5-3.8-1.5-8,2.5-6.8,6.8s11.4,11.1,13.8,14.2c13.4,17.2,13.6,35.1,6,55-1.7,4.6-9.5,16.8-9.1,19.9.8,5.4,18,14,21.9,20.2s3.9,9.1-.3,12.3c-.6-5.3-9.3-22.7-16-15-5.1,5.9,7.5,11.4,5.5,19-2.8-.7-12.2,2.3-13.9.9s.2-15.4-7.7-15.9c-10.8-.7-1.6,14.1-3.4,16-11.8,0-47.2-3.1-52.8-14.7s4.9-27.8,6.5-37.1c2.4-14.8,1.8-30.3-4.2-44.2-3-6.8-9.2-15.7-13.5-4.6l8,21.1v24.5c-23,0-45.8-4.3-67.2-12.3-27.2-10.1-55.9-28.4-67.8-55.7h29.5c16.3,0,41.3-13,54-23,50.4-40.1,52.9-106.2,48.5-165.5-4-53.4-22-119.6,6.6-168.4,32.2-55,127.9-58.7,173.9-20.1,17.1,14.4,40.5,56.1,51.1,76.9s8.4,56.8-14.5,77.5c-2.5,1-24.6-6-29.6-6.4-15.4-1.4-3.1,16.4-3.4,24.9-31.5,11.4-66.3,12.7-99.2,6.7-4.9-.9-16.9-6.9-18.7,0s22.2,11.5,27.5,12.2c18.1,2.4,37.1,2,55.3.2,3.2,10.1,11,18.9,15.3,28.2s3.1,11.1,4.8,15.7l-3.3.4c-28.8-15.4-63-1.1-76.4,27.7l-3.3,2.8c-.9,3.4-11.9,11.1-15.2,11.8-4.8.9-10.1-11.5-10.9-15.4l-4.4-15.5c-5.4-2.9-5.6,2.2-5,6.5,1.8,11.8,8.4,21.5,15.2,30.9l-.5,2c-4.1,2.4-7.4,13.3-.4,10.2,10.8-15.3,25.9-25.6,44.8-28.3,27.8-3.9,32.5,8.7,6.2,12.5-16.2,5.7-4.9,11.8,5.5,15.8,17.1,14.9-2.1,14.6-14,11.4-3.6-.2-6.8,1.6-9.2,4.2-20.8,34.7-63.9,26.1-76.5-10.3-5.5-10.2-8.1-2.4-5.2,5.2,7.9,21,31.6,38,54.7,33.5l2.8,1.5,1.6,2.5c-.4,7.4-.3,14.8.4,22.1l-2,2.3Z"/>
      <path class="st19" d="M732.9,351.9c1.5,9.4,3.8,18.9,7.9,27.6s8.7,12.7,9,14c.8,3-5.9,8.2-.3,12.2,6.3,4.5,10.9-7.9,15.9-11.9s6.4-4.4,10.1-4.9c36.6-5,28.6,60.2-9.1,56.9-5.6-.5-11.2-5.2-15.7-3.8s-13.2,17.4-16.2,20.8c-45.6,52-140.3,54.3-173.7-11.3s1.3-82.9,4.2-122c14.5-3.8,27.1-12.2,37.6-22.7.9-.2,7.4,7.7,9.5,9.4,13.2,10.6,29.4,14.4,46,11.1s4.7-2.3,5.5-2.3,8.4,7.5,10,8.7c18.5,14.1,35.8,19,59.4,18.1Z"/>
      <path class="st44" d="M537,592.8l2.3,29.4c0,2.6-.5,5.2-1.3,7.6.9.3.9.7,0,1l-.9,2c-10.1,1.8-16.4,8.3-20.1,17.6-11.2,28.5-3.1,33.6,24.9,28.3l1.1,2.1c.2-.9.6-.9,1,0,2.5,3.3,3.7,12.7,1,16v1l-2.5.7c-9.4-6.8-17.1-3.5-25.9,1.7l-17.4,3.1c-19.2,2.1-22,30.8-4.2,36.9,21.7,3.1,29.2,12.9,29.3,35,2.5,10.8,11.9,29.6,25.2,19.9l2.5.7,2.1.7c1.9,19.3,3.9,38.6,5.8,57.9l-1.9,1.4-138.9-31.1-.2-70.2c9.9-4,23.5-9.1,23.1-22.1s-3.4-7.8-2.9-9.8c.8-3.1,6.3-4.3,5.8-12.1s-8.6-14.2-8.7-15.1,1.5-2.5,1.7-4.1c2-17.7-19.4-22.2-32.9-23.5l-26.1-109.4c.7-1.1,3.1-.4,4.2-.2,50.4,7.5,103.1,26.3,153.8,34.7Z"/>
      <path class="st5" d="M810,419.8v-15.5c0-1.6-3.9-9.8-3.9-12s1.8-4.9,2-8c1.7-26.2-14.1-38.6-33.1-53-37.7-28.5-85-47.7-131.1-57.9-29.7-6.6-66.2-12.4-95.1-.4-31.9,13.1-31.4,55.4,5.2,57.8,0,2.6-1.7,16.9-3.5,17-13.6-5.7-27.1-12.3-39-21-28.2-20.6-60.2-60-18.2-86.2,60.7-37.9,198.7-5.4,261.4,22,36.4,15.9,101,56.7,114.4,95.6,13.6,39.8-25.6,59.2-59,61.5Z"/>
      <path class="st5" d="M877,206.8c-13.6.6-27.2-1.6-40.2-5.3s-15-6.7-20.3-6.2-11.4,8.8-12.9,8.5c-1.1-.7-1.2-1.4-1.5-2.5-3.5-15.2-6.3-30.4-10.6-45.4-7.5-7.5-10.4-1.1-9.2,7.2,2.5,17.3,10.9,36.9,13.3,54.7l12,60c-61.4-37.6-132-56.9-203.5-63.5,17.5-20.3,36.8-39.4,57-57,20.5-17.9,77.6-64,103.5-65.5s26.7,14.3,35.6,23.5c22.9,23.7,50.6,55.2,70.9,81.1,1.3,1.6,7.7,8.9,6,10.5Z"/>
      <path class="st31" d="M553,903.8c-2.4,2.3-43.8-9.5-49.8-11.7s-12.5-3.2-12.2-8.6c.6-9,5.1-20.3,6-29.6l63.4,14,94.3-25.8c27.6,3.3,55.1,14.1,82,21.5l5.3-.2,52.2-19.8,1.6-1.4-1.9-71.4c7.5,11.3,16.6,17.2,30,19.7l19.9,91.9c0,2.3-4.3,3.6-6.3,4.6-18,8.8-41.7,13.2-61.5,16.5-70.3,11.7-142.5,11.9-213.2,5.3,1-5.4,3.1-27.1-2-29.5s-8-.1-8,4v20.5Z"/>
      <path class="st5" d="M798,751.8c10.9-1.4,7.4,1.7,10.5,9,7.1,16.5,24.1,14.1,30.3-1.7s4-23.5,4.2-32.8c.5-20.9-.6-44-13-61.5,5.6-.3,11.9,2,16.7,4.8s16.4,17.7,21.9,13.3c5.7-4.6-4.7-12.3-8.1-15.1-7.9-6.4-17.5-12.2-28-13s-9.5,1.2-11.8.8c-5.2-.8-17.9-14.2-26.7-11.8,1.9-10.3.7-21,1-31.5.4-15.3,3.1-34.9,1.1-50-1-7.9-8.6-5.3-14-3.9-14.4,3.5-29,11-43.5,14.5l-97-19.1-102.1,28c-9.2-1.3-20-3.2-28.9-5.9s-2,.5-1.4-1.5,7.4-10.2,9.5-12.5c14.3-16.3,32.7-31.3,52.2-40.8,1.8-.2,7,6.3,8.8,7.8,22,17.6,51.5,22.4,78.9,23.1,37,1,79.7-8.3,104.1-38.1,38,17.7,68.9,53.7,89.2,89.8,20.2,35.8,49.7,108.3,25.6,146.2-17.5,27.6-71.3,47.8-79.4,2.1Z"/>
      <path class="st3" d="M357,632.8c7.1,19.4,11.3,34.1,16.3,54.2s2.3,3.9,2.6,5.5-2.9,8.9-2.9,12.8c-.1,10.6,7.2,14.8,7.8,18.1s-1.6,8.2-1.7,10.9c-1.2,17.2-2,29.8-8.8,46.2-14.3,33.9-53.2,53.3-88.2,57.3,8.3-26.9,1.5-52.8-20-71,0-9.1-1.7-17.9,0-27l1.4-2.4c10.9-3.9,19.8-12.5,26-22,5.4-3.1,11.7-3.5,19-1.1,18,.7,18.5-14.1,6.6-24-6.4-5.3-7.1-6.9,2.3-8.1,16.1-4.1,14.2-20.2-2.4-22.9s-26.9,1.1-38.8,5.7l-2.2-1.2c13-33.3,51.1-49.7,83-31Z"/>
      <path class="st44" d="M651,566.8c29.4,4.4,58.3,11.8,87.5,17.1l47.5-15.1-3,88c-11.3-.5-32.4-4.4-40,6l-2.4-1.1c-1.3-2.8-1.8-16.2,1.4-17.9l1-23c-1.6-11.7-2.7-23.5-1.3-35.3-.5,1-2.1,1.7-4.7,2l-.9,82.7c1.3.5,2.3,1.4,3,2.6-1.7,1.6-4.4.9-6.7,1.8-5.4,1.9-9.1,8.2-9.3,13.8s4.9,11.3,4.9,12-3.1,2.9-3.6,5.2c-2.2,9.3,5.2,19.3,11.8,25.3l2,3v50.8l-2,1.2c-1.4,3-9.9,3.9-13.3,3.9-8.6,0-19.9-5-23.4-13.3-2.6-18.9-20.2-23.3-36.8-23.7l-1.4-1.9-2.2-2.8c-.5-3.1-1.8-22.3-.9-23s2.4-.4,3.2-.5c12.7,4.4,26.2-1,28.5-15,.7-14.9,6.5-21.9,20.7-26.5,11.4-14.8,1.8-45.1-20.2-30.8-3.6,1.8-6,1.7-7.3-.4l-1.3-2.7c6.7-21.4-1.4-46.4-26.5-48.2l-2.2-2.2c-.6-.4-1.2-.8-1.7-1.3-2.8-2.9-3.4-22.7-3.4-28-1.5-2.8.3-3.3,3-2.7Z"/>
      <path class="st44" d="M561,787.8l.9-3.1c5.8-3.3,9.1-9.7,9.7-16.2-.4-13.3,1.8-24,13.9-31.7,2.8-4.9,3.4-10.5,1.9-16.9,3.1-10.1,17-4.1,20.7,3l9.7,15.3c3.2,3.3,7.6,7,10.9,1.8l7.4-13.9c2.5-5.2,12.2-11.9,15-5.3,1.4-1,1.8-.5,1,1l2.1,2,.8,25.1c.3,1.9.1,3.1-1.9,3.8-2.1,2.6-5.2,4.8-9.3,6.5-11.4,10.4-16.2,40.3,7.5,35.6l1.8,2c2-.6,2.7-.7,4,.7s1.8,26.6,1.6,30.4l-1.6,2.9c-30.4,7.6-60.4,17.2-91,24l-2.1-.7c-1.9-20.5-3.8-40.9-5.7-61.4l1.7-2.8c-2-1.7-1.7-2.4,1-2Z"/>
      <path class="st11" d="M797,382.8c-13.1-8.3-27.5-6-39.4,3-6-7.6-11.4-18.2-13.3-27.7s-.7-14.8-2.7-16.3-25.3-1.3-30.8-2.2c-17.7-2.8-35.4-15-45.2-29.8s-5.2-11.9-7.5-12.5c-12.3-3.2-5.4,14.9-1.1,19.6-13.2,3.2-27-.5-37.5-9s-7.1-6.6-7.8-8.3c-1.1-2.6,2-12.1-5.1-11.5s-12,12.1-16.2,15.7c-10.8,9.4-38.7,24.3-50.5,10.5-16.7-19.6,15.9-34.4,31.6-36.4,60.3-7.5,162.9,30,207.9,70.9,9.4,8.6,20.9,20.2,17.5,34Z"/>
      <path class="st19" d="M749,674.8c1.4-10.4,18.5-8.7,26.5-8s24,6.4,26.6,4.5c5.9-7.4-7.6-9-8.1-11.2s-.2-7.1,1.5-7.3c5.2-.4,22.4,13.5,26,17.9,10.6,13.2,13.9,38.7,7.3,54.3-13.2,31.1-73.7,13.5-90.3-7.3-1.3-1.6-7.2-9.1-3-10s17.7,7.8,21,9c6.7,2.4,25.8,8.9,31.9,6.8,3.6-1.2,2.7-6.6-.3-8.3-11.9-1.6-46-11-52.4-20.5s.8-12.1,9.7-10.7c12.5,2,27.3,11.5,41.7,12.3s11.7-4.5,5.3-9.3c-15.2-.9-29.4-6.6-43.3-12.2Z"/>
      <path class="st44" d="M642,564.8c1.1,1.3,1.8,2.8,2.2,4.4-.1,10.5.8,20.3,2.8,29.6l-1.5,2.3c-6.7,1.3-12.1,5.8-15.9,11.3l-2.7.4-2.1.7c-2-1.8-4.6-1.9-7.1-1.2-11.6,5.8-20.2,8.7-33.4,6.9-6.2,5.8-12.7,10.6-19.6,14.3-4.4,1-15.1.6-17.8-2.7-1.3.8-1.8.3-1-1l-2-1-2.3-31c-1.3-1.7-2.2-3.3-2.6-5l103-28Z"/>
      <path class="st44" d="M743,735.8c11.2,7.6,25.5,12.8,38.9,15.1,2.1,8.3.7,16.9,1.1,25.4.8,15.9,2.5,32,3.1,47.9,0,2.6.6,9.7-1,11-13.1,5.4-26.6,9.8-40,14.5-.8,0-1.9-.3-2-.9-.2-1.9-.4-18.8,0-19.7s1.2-1.1,2-1.4l.3-2.2c14.4-6.6,11.9-30-1.5-36.4l-.7-2.4-2-.9v-48.9l2-1.2Z"/>
      <path class="st45" d="M392.9,875.8c-3.3,2.1-3.2-3.5-4.5-5.9-2.4-4.3-9.9-12.7-14.9-8.1s7.8,13,8.5,18c-4.6,1-9.2,2.5-14,2,.6-6.1-10.1-22.8-16.1-14.5-3.6,5,4.6,10.9,6.1,15.6-13.2-.7-46.3,0-53.2-13.3s-1.1-16.5-1.8-24c25.8-8.9,52-21.2,67.9-44.3l7.2-11.3c1,14.5-2.9,28.3-9.5,41-2.2,4.3-8.3,10.3-7.4,15.2,1.7,9,32.3,11.1,32.7,26.3s-.8,3.3-.9,3.4Z"/>
      <path class="st14" d="M657,542.8l24-11.5c20.4-8.4,28.4-30.4,42-44,1.2-1.2,7.9-6.6,9.1-7,3.5-1.2,11.3,2.4,14.6,4.3,29.6,17-9.1,40.6-26.2,47.2-19.3,7.5-42.8,11.8-63.5,11Z"/>
      <path class="st44" d="M738,828.8l1.5,1.9c-.4,6.6-.1,13.2.7,19.8l-2.1,1.3c-24.2-2.9-52.8-18.1-76-21,1.3-3.1,1.3-6.5,0-10.4v-21.2s2-1.4,2-1.4c3.4-1.3,6.7.3,10.1,4.9,11.5,20.4,39.8,24.7,61.5,24.4l2.4,1.7Z"/>
      <path class="st5" d="M639,540.8c-16.1,0-58.1-13.5-60.9-31.6-.8-4.8,1.7-16.5,7.9-15s10.6,5.8,13.6,7.4,7.9,2.4,9.9,4.1,4.7,7.8,6.6,10.4c7.1,9.3,14.3,16.8,22.8,24.7Z"/>
      <path class="st19" d="M702,500.8c-10.1,11.7-23.1,21.9-37.3,28.2s-12.9,5.5-16.5,5.6c-6.1.3-20.8-19.4-25.2-24.3,5.4-.9,11.1,1.3,16.5,1.5,21.5,1.1,42.8-2.7,62.5-11Z"/>
      <path class="st41" d="M384.1,699.8c9.4,1.7,19.9,4.7,29.5,5s12.5-2,16.8-.8,6.8,8.9,2.7,12.3c-12.4,10.3-56.3,8.4-48.9-16.4Z"/>
      <path class="st15" d="M172,535.8l5,46c-7.2-2.5-29.9-19.2-29.9-26.5s18.1-18.8,24.9-19.5Z"/>
      <path class="st15" d="M239,368.8c-6,1-11.3,4.3-16.7,6.8l-20.3,14.2c-.1-6.5-3.7-33.7,2-36.5,8.5-4.2,29.7,8,35,15.5Z"/>
      <path class="st15" d="M169,508.8c-7.4-4.3-27.4-23.1-26.9-31.5s21.1-14.1,26.9-15.5v47Z"/>
      <path class="st15" d="M178,651.8c-1.3,1.5-13-9.4-14.5-11-3.4-3.6-10.9-12.5-10.6-17.5s19.2-13.7,25.1-16.5v45Z"/>
      <path class="st43" d="M739,672.8c-.4.3-3.9-.2-5,0l1-88h8c0,12,0,24,0,36l-1,23c0,6.1-.9,13.3,1,19-2.4,3.2-3.6,9.6-4,10Z"/>
      <path class="st2" d="M189,405.8c-6.8,11.8-12.9,23.8-16.5,37-4.6-7.2-17.8-29.1-14-37s24.7-3.1,30.5,0Z"/>
      <path class="st7" d="M396,671.8c.1,0,.2,1.7.9,2.5,5.4,5.4,24.4,3,30.5,11.5s.4,7-3.2,8.7c-7.5,3.4-32.1-.8-38.6-5.9s9.4-17.6,10.3-16.9Z"/>
      <path class="st42" d="M300,360.8c-14.5-.8-28.7,1.4-43,3,3.4-6.6,15.1-27.1,22.7-27.8,5.8-.5,17.1,19.9,20.3,24.8Z"/>
      <path class="st0" d="M173,673.8c-1.9,13.9-9.2,26.3-14.5,39-3.9-4.6-13.6-24-12.1-29s21.1-8.6,26.6-10Z"/>
      <path class="st43" d="M560,789.8l6,65c-1.4.3-3.7,2.2-5.7,2l-2.3-1-6-60c-1.5-1.3-.9-1.9,1-1,.3-3.2,4.1-7.1,7-5Z"/>
      <path class="st36" d="M390,728.8c9,2.2,17.1,3.8,26.5,3s12.3-3,12.9-2.9c3.7.9,2.5,6.4.1,8.9-10,10.3-41.8,11.2-39.5-9Z"/>
      <path class="st18" d="M743,735.8v51c-1.5,2.5-6.2,1.8-7-1v-55c.8.7,5.7,4.1,7,5Z"/>
      <path class="st32" d="M392.7,656.1c.3.5,1.4,5.4,1.3,5.7s-3.4,1.1-4.7,1.9-8.8,6.8-9.3,6.2l-10-34c5.1,4,9.3,9.1,14,13.5s8.1,5.7,8.7,6.8Z"/>
      <path class="st24" d="M139,735.8c.5,1.9-.8,1.9-1.7,2.8-2.2,2.2-23.8,17.8-25.3,16.2.9-19.1,8.4-24.9,27-19Z"/>
      <path class="st25" d="M539,592.8c1.1.3,2.3,1.3,3.7,1.2,1.5,1,3.1,31.2,3.3,35.8-1.2,2.6-7.7,3.3-8,0-1-11.1-2.1-22.7-2.8-33.8-.1-2.2-.2-2,1.8-3.2.6.1,1.5-.2,2,0Z"/>
      <path class="st8" d="M664,797.8v22.5c0,4.1,3.7,9.1-2,10.5-1.6-.2-3.4.1-5,0-1.6-10.1,0-20.8-1.9-30.7s.9-3.9-2.1-3.3c-.2-5,10.7-3.6,11,1Z"/>
      <path class="st4" d="M651,566.8c-3.6-.3-1.1.9-1.1,2.6.3,9.7.7,20,3.1,29.4-1.2,2.8-4.5,2.6-6,0-1.2-1.2-2.8-.2-3.1-2.4-1.3-10.4-1.4-21.1-1.9-31.6,2.8.4,6.4,1.6,9,2Z"/>
      <path class="st4" d="M745,827.8v22c-1,.4-3,2.9-4.8,2.9l-2.2-.9c1.1-7.7-2.9-15.5,0-23,0-3,6-3.8,7-1Z"/>
      <path class="st9" d="M68,762.8c5.6-11.2,11.1-7.7,19.7-2.2s1.8-.1,1.3,2.2h-21Z"/>
      <path class="st17" d="M262,739.8c-18.8,4.3-36.7-3.2-49-17.5s-15.3-21.1-11-27.1c6.7-9.3,11.7,9.7,14.2,13.9,13,21,40.4,29.1,59.4,10.7s9.6-16.4,19.9-16.1c4.9.2,26.7,6.7,15.6-5.5s-22-6.2-15.9-16.8,18.7-5.1,22.9-9.1.3-4-2.6-4.4c-20.8-2.6-40.9,4.6-54.9,19.9s-7.8,13.7-12.6,7.6,4.1-12.3,4.1-13.1-6.4-7.8-7.8-10.2c-3-5.3-10.4-22.7-7.3-27.9s5.8-3.3,7.8-1.2,5,27.2,13.9,30.7c5.1-2.8,10.1-7.5,15.4-9.9,12.2-5.7,38.9-11.1,50.5-3s4.8,4.6,5.3,6.7c2.3,10.1-3.7,13.7-12,16.6s-6.6,0-5.8,2.2c12.1,5.1,20.3,24.8,3.4,29.4s-10.5-.5-17-.9-7,2.6-12,8-14.6,14.7-24.5,17Z"/>
      <path class="st6" d="M277.7,451c16.7-3.6,22.1,32.8,4,29.6-10.7-1.9-14.9-27.2-4-29.6Z"/>
      <path class="st30" d="M319.7,555.6c-2.6,2.6-15.2-1-20.2-.7s-8.6,1.3-11.7,2.3-12.6,6.9-13.8,2.1c-3.1-12.7,25.2-15.2,33.4-14.2,4.2.5,18.3,4.8,12.4,10.6Z"/>
      <path class="st29" d="M369.7,462.5c-9.7,9.6-22.4-10.3-16.1-21.6,8.2-14.7,24.7,13.1,16.1,21.6Z"/>
      <path class="st17" d="M388.3,494.1c3.5-3.9,9.3-1.9,9.8,3.2s-5.7,19.1-12.7,13.6.3-13.9,2.9-16.8Z"/>
      <path class="st30" d="M333.7,500.9c4.8-1.3,20.3,9.6,12.9,14.9s-23.5-12-12.9-14.9Z"/>
      <path class="st30" d="M628.8,435.6c-2.9,2.9-14.3.5-17.8-1.2-8.7-4.2-11.6-17.6-6.4-25.5s6.5-4.8,9.5-7.5,9.1-13.8,14.5-8.5c5.4,5.4-3.7,13.1-7.5,16.5s-11.8,5.3-7.9,12.9,11.1,2.9,14.9,6,2.7,5.3.7,7.3Z"/>
      <path class="st29" d="M675.7,376c17.2-3.6,12.5,38.7-4,30.6-11.2-5.5-6.5-28.4,4-30.6Z"/>
      <path class="st38" d="M594.7,367c18.6-5.5,15.1,27.8,4.8,29.8-18.2,3.5-13.4-27.2-4.8-29.8Z"/>
      <path class="st23" d="M636.8,453.1c6.8-.9,25.4-.6,28.8,6.8s.3,5.4-1.5,6.5c-3.6,2.1-11.3-2.7-15.8-3.2s-10,.1-15.5,1.9-8.5,6-10.5-.9,9.5-10.3,14.6-11Z"/>
      <path class="st30" d="M701.9,364.7c-5.4,3.4-14.5-8.9-21.8-10.4s-21.6,2-16.6-8.4c4.5-9.3,33.9,2.4,38.6,10.4s1.4,7.4-.2,8.4Z"/>
      <path class="st30" d="M595.8,334.1c5.2-.8,12.6-.5,17.2,2.3s6.2,6.5,1.6,9.5-6.6-1-10.5-1.6-8.4,0-12.3,1.8-8.5,8.9-13.2,3.7,11.7-14.9,17.2-15.7Z"/>
      <path class="st21" d="M773.7,404c3.9-.7,11.6-.7,12.3,4.3,1,7.2-7.9,5.7-12.1,6.9s-7.3,5.7-11.5,2.6c-7.6-5.5,6.1-12.9,11.3-13.8Z"/>
      <path class="st26" d="M547,630.8c6.5-.3,12.4,2.3,18.8.3,6.9-2.1,12.4-12.9,18.9-14.1s9.1,1.3,14.5.5c9.2-1.3,20.1-13,27.8-4.7l.5,3c-10.6,18.3-.6,37.8,11.4,52.6l11.3,13.5-.2,2.8c.7,2.4,1.3,5.1,1.8,7.9l-1.8,1.6c3.3,1,3.1,13.4,0,15,4.5-1,3.9,9.7,1,11.5-19.2-6-15.6,37.4-34,19.5s-10.4-23.1-21.5-23.6c-9-.4-5.5,4.7-5.4,9.5.2,13.6-4.3,11.2-11,19.1-10,11.7.2,24.1-11.5,37.5-2.3,2.6-4.6,3.3-6.5,5-.8,0-2-.2-2.1-.7-3.4-27.7-5.2-56-6.9-83.7l1.9-1.5,1.3-2c10.1,0,3.4-7.1-1-11l.6,10.5-1.9,1.5c-2.5,3-7.5-.2-8-4-.5-5.3-1.6-10.6-1-16,.7-1.7,2.3-1.9,4.7-.8l-3.6-47.9,1.9-1.3Z"/>
      <path class="st1" d="M545,697.8c5.7,26.6,7.5,54.6,9,81.9.3,5-.4,10.1-1,15.1-.6.5-.9.9-1,1-12.2,9.2-19.6,1.6-25.8-9.7s-3.7-13.9-5.3-23.7c-4.3-25.7-27.8-12.1-37.1-28.9s-3.2-17.6.8-23.6c7.1-10.6,21.3-8.5,31.4-11.6s7.7-4.8,11.5-5.5c6.4-1,12.4,1.1,17.4,4.9Z"/>
      <path class="st26" d="M538,630.8c3.7,5.4,4.5,14.5,5,21.3,1.8,9.9,1.8,19.5,0,28.7-9.7-.8-23.4,6.3-30.5-3-5.8-7.6,2-29.6,7.2-36.8s12.2-10.5,18.3-10.3Z"/>
      <path class="st40" d="M433.3,659.5c-6.2-6.7-5.5-23.7.1-30.7s17.2-8.3,23-16c3.3-4.5,3.6-9.4,9.5-12.5,16.1-8.3,30.1,7.3,21.8,23.8s-13.8,11-19.7,17.3-4.8,11.5-8,16c-6.1,8.5-19.5,10-26.7,2.1Z"/>
      <path class="st10" d="M553,700.8c1.5-1.1,2-.5,1,1l1,21.5,6,64.5c-.4.4-.6,1.6-1,2-1.2,1.1-5.1,3.6-7,5-2-32.4-5-64.7-8-97,0-.3,0-.7,0-1,2.2,2.5,5.8,2.9,8,4Z"/>
      <path class="st12" d="M546,629.8c.7.1,1,.3,1,1l4,53c-2.3-1.1-4.4-2.6-7-3s-.7,0-1,0c-.4-9.5-1-19.1-2-28.5s-2.3-14.4-3-21.5,0-.7,0-1c2.5.3,5.7-.4,8,0Z"/>
      <path class="st22" d="M488.7,665.9c7.2-1.4,13,16.6,11.1,22.2s-17.8,2.1-19.7-4.1,1.9-16.8,8.5-18.1Z"/>
      <path class="st26" d="M683,651.8c11.4-.9,19.2-11.9,28.8-.3s7.8,25.9-.1,33-7.3,3-10,4.5c-11.6,6.6-7.1,16.7-11.9,27.1-5.6,12-19.2,14.2-30.7,9.8,1.5,7.9,1.4,16.8,2,25-.1,2.8-6.7,4.6-8,2l-1-31c.9-1.4,2.7-1.6,5.2-.4l-1-21.4c-1.2-3.7-1.2-6.8-.2-9.2,11-9.9,18.4-24.3,24.6-38.1l2.4-.9Z"/>
      <path class="st16" d="M661,750.8c9.3-.7,26.9,3,33.4,10.1,8.1,8.9,2.3,17.7,16.9,24.1s14.2,1.5,24.7.8,5.3.5,7,1c12,3.8,16.3,19.2,12.7,30.2s-6.1,9.2-10.7,10.8-5.3.7-7,1c-15.1,2.5-36.9-3.1-50.7-9.8-12.5-6.1-11.4-16.5-23.3-21.2s-3.9-1.9-6.6-2-4.1,1-4.4,1c-16.5.3-21.8-.8-19.9-19.4,1.4-13.8,6.8-20.8,19.9-24.6s5.6-1.8,8-2Z"/>
      <path class="st34" d="M647,598.8c1.7-.2,4.2,0,6,0,29.3,1.2,38.2,27.9,30,53-2.6,7.8-9,19-13.6,25.9s-8,13.6-13.4,13.1c-2.7,1.3-6.9-3.1-6-6-17-19.7-40.1-44.8-23-72,4.6-7.3,11.1-12.9,20-14Z"/>
      <path class="st33" d="M754.5,654.8c-.4-.1-4.9-4.1-6.5-4.5,4.6-2.1,2.7-15.8,6.5-16.2s14.5,5.3,14.3-1-2.1-4.5-2.7-4.9-6,3-6.9-1,7.1-2.8,8.3-5.6c3.5-8.7-3.1-5.7-4.4-10.3s2.7,0,2-2c-2.4-6.3-12.1,5.9-12-3.1s3.7-.9,4.5-.8c2.7.3,4.6-4.7,5-4.7,0,2.4,3.8,3.4,4.3,4.2.8,1.3-.4,3.6,1.2,5.3s6.2.8,7.1,2.1c-.4,4,1,8,1,11.9s-2.2,7.5-1.9,8.9,2.3,2,2.6,3.2-1.3,2.8-.3,4.4,5.3,2.5,5.6,3.7c.7,2.7-.5,7.3,0,10.3-7-1.3-21.5,1.8-27.5,0Z"/>
      <path class="st33" d="M776.9,573.9c2,1.4-1.4,8.3,0,10.9-5.4-6.4-7.1.2-11.7.8-6.1.9.4-5-3.3-7.8,2.8-1.7,5.8,0,8.1-.4s3.7-5.7,6.8-3.5Z"/>
      <path class="st33" d="M776,598.8c-4,9.5-6.5-1.2-13,1,2.8-4.1,8.9.1,13-1Z"/>
      <path class="st33" d="M784,597.8c-2,.3-1.6.2-2.3-1.2-1.9-4.4.2-7.6,1.3-11.8,1.7-.2.9,2.3,1,3.5.1,3.2,0,6.4,0,9.5Z"/>
      <path class="st33" d="M770,586.8c0,2.3,4.3,12-1,7.3s-.7-9.5,1-7.3Z"/>
      <path class="st33" d="M742,643.8c0-7.4-.8-15.9,1-23,0,7.4.8,15.9-1,23Z"/>
      <path class="st33" d="M758.5,617.8c2.7-.6,3.4,4.4,1,5s-3.4-4.4-1-5Z"/>
      <path class="st33" d="M745,657.8c-.1-1.9-.3-4.4,2-5,1.4,3.6,3.5,5-2,5Z"/>
      <path class="st33" d="M747,586.8v4c-4,0-3.9-4,0-4Z"/>
      <path class="st26" d="M578.2,807.6c-5.4-5.4,3.1-32,15.8-26.2s-1.4,24.7-9,27-5.3.7-6.8-.8Z"/>
      <path class="st35" d="M650,684.8c1.2,1.4,5.2,4.5,6,6,4.3,8.3,1.1,24.8,4,34-.3.3-7.2-2.5-8-3s-.8-.3-1-1c-.5-2.1.3-6,0-8.5s-1-2.6-1-3v-15c0-2.1-2.6-6.4,0-9.5Z"/>
      <path class="st44" d="M554,701.8c-.6,0-.8-.9-1-1l-1-16c7.9,4.6,18.4,17.4,2,17Z"/>
      <path class="st37" d="M470.7,604c12.8-2.9,17.2,8.4,11.5,18.5-4.2,7.4-12.3,8.9-17.2,13.8-6.7,6.6-6.3,21.8-17.5,22.6-12.7.9-13.7-9.1-12.5-19.6s18.6-13.2,25.4-22.6,4.2-11.3,10.3-12.7Z"/>
      <path class="st39" d="M661,790.8c2.6-4.8.1-9.8,0-14.4s1-13.5-1-19.5c11.9-.9,27.6,1.1,33.2,13.3s1.8,11.5,10.1,16.9c14.6,9.6,25.4,2.8,39,6s12.3,21.1,3.7,27.2c-11.9,8.4-46,.4-57.8-7-9.1-5.7-12.4-22.5-27.1-22.4Z"/>
      <path class="st39" d="M654,758.8c-.9,4.4,2.5,30.4,1,31.9s-13.6,2-15.8-1.6c-4.4-7,3-31.4,14.9-30.4Z"/>
      <path class="st28" d="M658,681.8c-16.7-16.3-40.5-42.1-25-66.5,10.8-17,36-11.8,43.9,5.1,9.4,20.4-8.1,44.8-18.9,61.4Z"/>
      <path class="st30" d="M665.6,644.4c-6.6,8.2-23,7-25.3-4.3-4.1-20.3,18.6-31.2,27.5-12.5s2.6,10.9-2.2,16.8Z"/>
      <path class="st27" d="M650.8,626c12.8-1.8,13.3,15.8,4.5,17.6-10.6,2.2-15.1-16.1-4.5-17.6Z"/>
    </g>
  </g>
  <g id="Calque_2">
    <g>
      <path class="st20" d="M206.8,171c-15.4,3.3-32.6,14.6-37.5,30.1-3.6,11.6.7,26.7,15.1,23.1,10.9-2.7,9.7-21,24.9-24.6,7.2-1.7,16.8,1.1,18.9,9.2,3.7,14.2-25,30.4-18.1,51.5,3.6,10.9,18.3,12.8,24.9,3.4,3.3-4.7,3.4-14.1,6.1-20.2,3-6.9,8.8-11.9,12.5-18,19.4-32-15-61.2-46.8-54.4Z"/>
      <path class="st20" d="M226.7,282.3c-14.1,4.9-10.6,29,4.8,29.3,25.6.6,19.5-37.9-4.8-29.3Z"/>
    </g>
    <g>
      <path class="st20" d="M329.9,113c-10.9-2.5-25.5-.2-33.2,8.4-5.8,6.4-7.5,17.5,2.9,19.5,7.9,1.5,12.5-10.8,23.5-8.5,5.1,1,10.6,5.7,9.5,11.5-1.8,10.3-25.2,12.3-27,28.1-.9,8.1,8.1,13.7,15.1,9.6,3.6-2.1,6.4-8.1,10-11.3,4-3.6,9.2-5.1,13.5-8,22.1-15,8.4-44.1-14.2-49.2Z"/>
      <path class="st20" d="M309.8,191.1c-10.6-1-15.4,15.7-5.6,20.4,16.4,8,23.9-18.8,5.6-20.4Z"/>
    </g>
    <g>
      <path class="st20" d="M340.5,262.3c-7.8.9-16.8,5.8-19.9,13.2-2.3,5.6-.9,13.3,6.5,12.1,5.5-.9,5.7-10,13.4-11.1,3.6-.5,8.3,1.3,8.9,5.4,1.2,7.2-13.7,14-11.2,24.7,1.3,5.5,8.5,7.1,12.2,2.8,1.8-2.2,2.3-6.8,3.9-9.8,1.8-3.3,4.9-5.5,7-8.4,11-15-4.7-30.9-20.8-29Z"/>
      <path class="st20" d="M345.5,318.2c-7.2,1.8-6.5,13.9,1.1,14.7,12.7,1.4,11.3-17.9-1.1-14.7Z"/>
    </g>
  </g>
</svg>
```


### public/cat-fly.svg
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Calque_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1536">
  <!-- Generator: Adobe Illustrator 29.5.1, SVG Export Plug-In . SVG Version: 2.1.0 Build 141)  -->
  <defs>
    <style>
      .st0 {
        fill: #1c1b73;
      }

      .st1 {
        fill: #f1a552;
      }

      .st2 {
        fill: #f4b949;
      }

      .st3 {
        fill: #3f3b75;
      }

      .st4 {
        fill: #55949e;
      }

      .st5 {
        fill: #2b6179;
      }

      .st6 {
        fill: #131465;
      }

      .st7 {
        fill: #181f8f;
      }

      .st8 {
        fill: #f1ad42;
      }

      .st9 {
        fill: #1c1c74;
      }

      .st10 {
        fill: #212077;
      }

      .st11 {
        fill: #31657d;
      }

      .st12 {
        fill: #ef9f4b;
      }

      .st13 {
        fill: #1c3e57;
      }

      .st14 {
        fill: #0d1a36;
      }

      .st15 {
        fill: #464379;
      }

      .st16 {
        fill: #33697f;
      }

      .st17 {
        fill: #5f598e;
      }

      .st18 {
        fill: #e8874f;
      }

      .st19 {
        fill: #ee9e49;
      }

      .st20 {
        fill: #397084;
      }

      .st21 {
        fill: #1b354e;
      }

      .st22 {
        fill: #19354f;
      }

      .st23 {
        fill: #38366d;
      }

      .st24 {
        fill: #2c637b;
      }

      .st25 {
        fill: #e39032;
      }

      .st26 {
        fill: #434077;
      }

      .st27 {
        fill: #474479;
      }

      .st28 {
        fill: #14324c;
      }

      .st29 {
        fill: #1a25a6;
      }

      .st30 {
        fill: #f2b342;
      }

      .st31 {
        fill: #f2a856;
      }

      .st32 {
        fill: #121254;
      }

      .st33 {
        fill: #605f67;
      }

      .st34 {
        fill: #55949d;
      }

      .st35 {
        fill: #1823a7;
      }

      .st36 {
        fill: #ed9c46;
      }

      .st37 {
        fill: #f2b242;
      }

      .st38 {
        fill: #386d82;
      }

      .st39 {
        fill: #222073;
      }

      .st40 {
        fill: #396f83;
      }

      .st41 {
        fill: #d97329;
      }

      .st42 {
        fill: #30677d;
      }

      .st43 {
        fill: #12314b;
      }

      .st44 {
        fill: #101456;
      }

      .st45 {
        fill: #34677e;
      }

      .st46 {
        fill: #f2b241;
      }

      .st47 {
        fill: #1c3d56;
      }

      .st48 {
        fill: #376d82;
      }

      .st49 {
        fill: #fde5b4;
      }

      .st50 {
        fill: #54949d;
      }

      .st51 {
        fill: #d76f27;
      }

      .st52 {
        fill: #1a1974;
      }

      .st53 {
        fill: #fce5b2;
      }

      .st54 {
        fill: #5b5c67;
      }

      .st55 {
        fill: #f09c62;
      }

      .st56 {
        fill: #30677c;
      }

      .st57 {
        fill: #454278;
      }

      .st58 {
        fill: #15344e;
      }

      .st59 {
        fill: #f09b62;
      }

      .st60 {
        fill: #151469;
      }

      .st61 {
        fill: #e8a035;
      }

      .st62 {
        fill: #2b6178;
      }

      .st63 {
        fill: #fde5b3;
      }

      .st64 {
        fill: #e6844c;
      }
    </style>
  </defs>
  <path class="st63" d="M725,1052l-2.3-.9c-2.1-6.8-4.3-13.6-7.3-20.1-7-15.1-12.2-21.2-28.5-25.5l-.8-2.5-2.3.8c-4.7-4.4-9.4-8.8-14-13.3l.2-2.5c4.5-1.4,8.8-.1,13,2l3.9-1.5c29.7,4.5,56.1-8,81.5-20.9,8.9-4.2,18.3-3.1,26.9,1.5,42.2,29.1,42-32.1,9.8-43.6l-1.1-2.5c-17.2-8-35.7-2.9-52.7,3h-2.3s-1.8,2.9-1.8,2.9c-9,4.6-19.8,9.1-29.6,11.8s-8.5,1.1-12.6.3c-9.2.7-18.9,1.3-28-1-.8,2.9-5.3.7-5-2-5.1,2.2-15.4-1.4-17-7-3.4-1.4-4-11.6-2-14-2.5-13.4-4.8-26.7-7-40-2.6.4-2.8-.1-1-2-.6-.6-1.2-1.2-1.7-1.9-2.2-3.2-5.9-34.3-4.5-37.9s.7-1.5,1.2-2.2c-.8-.2-1.6-.6-2.1-1.3s0-15.3.3-17.3l1.8-1.5c-1-2.4.3-3.3,2.7-2.4,26.6,19.1,54.4,36.4,83.3,51.8l3,3.5c8.2,6.7,14,5,22.9,2.2l4.1.8,3-.4c7.7,5.2,15.8,10.2,25,12l2,2.4c12.1.9,23.4.3,35-3,.6-2.9,6.9-8.8,10-8,3.4-4.1,5.6-8.8,6.7-14.1l2.3-.9-1-1.5c5.1-30-19.8-46.3-43.1-58.4-1.5-1.3-2-2.2-1-4.1-1.6-.6-2.2-2.3-1.8-5-.9-1.9-1.9-3.6-3.2-5-2.7-.8-5.4-1.7-7.7-3.3-44.3-30.8-89.2-60.4-134.6-89.3l-2.7-3.3c-5.7-.3-13.6-6.1-16-11l3.6-3c38.3-10.6,73.9-34.1,95.1-67.9l2.3-1.1c1.3-1.5,3.1-1.4,5.3.4l11.1,10c10.5,6.7-9.5-10.4-12.4-11.9v-2.6c0,0-.8-3.6-.8-3.6,4.4-9.9,7.8-20.1,10.3-30.6l2.5-2.7,2.8-1.1c20.5,9.5,20.1,8.6-1.2-2.4l-.6-2.5c-1.9-2.6-1.5-12.2,0-15.4,35.6-42.7,59.6-97.7,67.4-153.6l2.6-5.1c1.2-16.4.9-32.7-1-49l-2.3-.6c-4.7-10.2-21-9-30.6-7.5-56.2,8.8-102.8,36.1-149.7,67.8-25.4-9.7-51.5-18-78.7-21.1l-5.8-2.6c-6.1.9-11.8.6-17-1,0,1.7-.6,1.7-2,0-8.5.9-17.6,1.5-26.2,1s-4.1-.3-6.2-2.8c-26.2-45.3-58.5-87.6-97.6-121.3l-2,.7c-8.9-6-13.9,4.5-16.4,11.8-8.7,25.1-16.3,49.5-19.2,76.2l-2.5,3.4c-2.1,25.9-3.3,52-3,78l2.4,5.1c1.7,13.8,4.2,27.3,7.5,40.5-4.1,9.3-7.8,18.9-11,28.7l-2.9,2.7c-1.4.4-2.8.4-4.3,0-16.7-4.4-32.5-6.7-49.7-7-7.2-1.3-2.3,3.8,3.5,2.6l.5,1.4c16.3.2,34.1,2.5,49,9,.9,3.4.6,7.3-.9,11.6.1,4.7-.9,8.5-3.1,11.4-2.1,2.2-4.7,2.2-8,0-.2.9-.5.9-1,0-8.9.9-17.9,1.6-27,2l-1,1.8c-4.3.8-8.1,1.4-12,1.2-6.4.6-8.6,2.1-6.5,4.5,17.1-3.6,34.5-4.8,51.9-5.6l3.6,2.1,1.9,3.9c-1,58.6,39.4,104.9,91.9,126.6l3.2,3.6c-.2.9-.6.8-1,0-11.3,1.2-22.9.8-34-1-9.6-1.7-18.9-4.6-28-8l-2.6.2c-18.9-9.5-36.8-20.3-54-32.4-3.9-1.9-4.3-2.1-8.2-1s-1.6-.1-2.3-.7c-.8.2-1.7.2-2.3-.5-15.9-20-38.7-45.7-66-45.1l-1.7-1.4-3.8-3.9c-21.8-38.3-43-76.9-63.6-115.9l-1.6-5.2-1-2.1c12.2-14,8.2-34.6-12-36-29.1-2-29.8,40-2.3,42.1l1.3,1.9c2.8,3.2,5.6,6.5,7.6,10.2,16.7,33.8,33.4,67.6,49.6,101.7s1.6,3.9,2.2,5.9,1.2,4.1,1.6,6.2l-.2,2.4c-5.7,3.4-10.2,8.8-12.5,15l-2.3.6c-1.3,9.9-.3,18,3.6,27.2-.7,1.4-.9,3-.6,4.8l3,2.4c9.6,24.9,30.9,42.5,52.4,57.1l1.6,3.5c.2,1.9-.4,4-1.8,6.4,0,8.8,31.8,31.9,38.9,37,13,9.2,26.6,17.5,40.5,25.1l2.4,3.5c8.6,3.7,17.2,7.5,25.9,11.5,4.1,0,9.3.7,11.6,4.1,3.5.2,6.4,1,8.5,2.4.3,1,.7,1.9.8,2.9.9,5.1-4.2,25.3-5.9,32.1s-1.7,3.5-2.9,5c.9,8.2.4,16.6-1.5,25.4,0,7-1.1,13.6-3.5,19.6l1.3,1.7c-.7,3.3-1.1,6.7-1.3,10.3-.6,3.3-.8,6.6-.5,9.9,2.4.4,1.8,1.4-.5,2.1.5,21,1.2,42,3,63,1,1,2.1,2.1,2.5,3.4,1.9,6.6,4.1,16.4,2.5,22.6,2.4,8.6,4,17.3,5,26,1.4,1.4,2.6,2.9,3.3,4.8,3.5,8.9,7,20,7.7,29.2,4.3,11.3,8.3,22.7,12,34l2.6,1,8.4,19.5-1,2.5c-67.2-14.9-132-42-186.9-83.6C45.8,864.8-6.1,600.4,126.2,393.7c87.9-137.3,231.7-208.8,394.2-206.6,273.7,3.7,477.5,238.2,447.5,510.3-16.4,148.3-110,287-242.9,354.6Z"/>
  <path class="st29" d="M687.6,1039.8l-2.6,2.2c-1.6,16-11.5,30.6-24.4,39.8l-2.6-.8c-1.8,1-4,1.5-6,2-2.6.5-20.5,3.2-19-.7.2-.5.6-.9,1-1.3-17-3.2-35.1-8.2-50-17-.8.1-1.6.2-2.4.1-.8,0-1.5-.1-2-.5-28.7-18.5-46.5-50.3-59.4-81-1.5-.4-2.2-.8-2.3-2.6-.3.9-.7.9-1,0l-3.1,1.4c-19.8-3.5-38.6-10.2-56.6-19.7,17.7,16.8,35.3,33.5,56.6,46.7l2.1,3.5.4,9.1.6-1.1c2.6,6.1,4.2,12.9,4.7,20.3,2.4,7.1,3.5,14,3.3,20.7,1.3,6.4,3.4,12.7,6.4,19,3.5,7,3.4,12.4-.4,16,2.6,0,2.7,1.2,1,3,1.5,3.1-3,4-4,1-18.5,16.1-43.1,25.8-68.1,25.2l-2.9-2.2c-5.6-.5-12.5-2.5-16.6-6.4-3.8-3.5-11.8-16.7-14.4-21.6-3.3-6.3-7.1-16.2-10-23-3.5-11.2-7.5-22.5-12-34-4.2-11.2-8.1-22.4-11-34-1-9.3-2.7-17.9-5-26-1.7-8.7-3.9-17.2-5-26-1.8-20.8-2.5-42.1-3-63,0-3.8.2-5.5,1-12,.3,3.1.5,6,.9,8.8-.6-6-.7-12.9.1-18.8,6.2,1.7,12.6,3.4,19,5l4.4-.9c14.1,4.4,28.3,7.4,42.6,8.8l1,2.1,2-.6c15.7,6.5,34.8,8.9,51.9,7.2,2.1-1.8,3.8-2,5.1-.6,1.1-3.5,7-2.8,6,1,4.4-.2,9.1-.2,13.5,0,1.3,0,2.6,1,3,1h25c.4,0,1.7-1,3-1,4.8-.2,9.8-.1,14.5,0l.9-2.1,36-5.1c5.5-1.8,10.9-2.4,16.2-1.7,5.6-4.2,12.1-5.9,19-5,0,.3.8,1.1,1,2,2.2,13.6,4.5,27,7,40,.8,0,1.9,11.8,2,14l2,2.6.2,27.3c.7,12.6,1.6,18.4,13.1,24.8l-.3,2.3c3.5,3,14,13.8,16,15l2,2.6c1.2,11.5,1,22.9-.5,34.2Z"/>
  <path class="st49" d="M528.8,1260.2c45.4.3,144,2.9,183.8,20.6,30.3,13.4-8,26.1-21.6,29.7-67.8,17.7-160.4,15.1-230.5,12.4-39.5-1.5-99.6-3.4-135.8-18.2-43.7-17.8,12.7-29.6,29.9-32.6,54.3-9.8,119-12.2,174.2-11.9Z"/>
  <path class="st4" d="M532,1099c2.7-1.2,4.9,1.6,3,4,11.1,27.7-14.1,96.1-40,112-1.5-.7-2.3-.6-2,1-8.4,4.2-11.9,4.8-21,3-3.2-1.4-5-3.3-5.8-6.8-.4,2.1-1.5,3-3.2,2.8-5.3-4.4-8.3-10.6-9-17.5-1.9-18.8.4-40,2-58.5,28.5-1.9,52.8-19,72-39,1.3-.4,3.2,0,4-1Z"/>
  <path class="st53" d="M518,980c1.4.3,3.2.4,4.1,1.7,12.7,31.2,32.1,64.8,61.9,82.3,16,7.3,32.8,13.1,50,17,0,.5,0,.8.5,1,5.8,1.3,11.6,1.1,17.5,1-6.8,1.5-10.2,2.7-16.7,4.8-15.3,4.8-31.2,6.9-46.9,10.1l-53.4,5.1c-.4-1-2.5-2.9-3-4s-1.2-2-1-3c3.8-3.6,3.9-8.8.5-15.6-3-6.4-5.2-12.8-6.5-19.4-4.1-13.2-7.2-27.4-8-41-1.1-13.2-.5-26.9,1-40Z"/>
  <path class="st4" d="M725,1052c6.9,24.1,14.8,73.6-23,74-3.3-1.3-6-3.7-8.2-7.2,1.7,2.7,1.8,4.8.2,6.2-14.2-3.5-23-21-30-33l-.5-2.4c6.3-5.2,11-10.9,13.8-18.8s6.1-19,7.7-28.8c3.4-13,1.1-25.8,1-39,4.2,2.6,12.1,3.6,17.3,7.2,10.2,7,18.3,29.9,21.7,41.8Z"/>
  <path class="st40" d="M528,1100c-2.1,4.4-6,8.6-9.5,12-15,14.4-38.3,26.4-59.1,28.9s-3.9,1.1-3.4-1.9c.4-5.3-.3-10.7,1-16,16.4,1.4,34.5-3.2,49-10.5s15.1-10.4,22-12.5Z"/>
  <path class="st20" d="M685,1042c.2,11.3-2.8,24.3-8.1,34.4-1.2,2.3-1.2,2-2.3,4.6s-8,8-10.5,11.1c-2.1-3.6-4.3-7.2-6-11,12.3-6.6,23.5-25.8,27-39Z"/>
  <path class="st8" d="M818.7,1089.4c5.4,3.5,5.1,13.8-2.1,14.7-18.2,2.4-10.6-22.9,2.1-14.7Z"/>
  <path class="st56" d="M495,1215c-.6.4-1.3.7-2,1-6.9-2.6-9.1-15.5-4.5-21,.4,7.4,3.4,13.5,6.5,20Z"/>
  <path class="st45" d="M694,1125l-4.8-12.7.7-5.3c1.9,7.3,7.9,12.9,12,19-3.7,0-4.7-.2-8-1Z"/>
  <path class="st16" d="M463,1215c.5-1.7,1.9-5.2,1.9-6.6s-3.1-1.1-2.6-5.7,1.3-5.5,2.8-5.7c-.7,6.2,2.1,11.8,4.1,17.4l2.9,4.6c-4.9-1-4.9-.6-9-4Z"/>
  <path class="st4" d="M400,246c17.2,13.4,28.4,33,38.3,52.2,12.4,23.9,22.3,49.9,27.4,76.4s0,0,0,0l32.3-7.1s0,0,0,0l2.9,2.3s0,0,0,0c4.3.2,8.6.2,12.9.2s7.9-.4,11.8,0,.3,0,.5,0c1.1.1,2.3.2,3.3-.2.3-.1.6-.4,1-.5,2-.9,4.7-.2,6.7,0l7.6.5c11.9.9,23.7,2.5,35.3,5.1s23,5.8,34.2,9.7,12.7,4.6,19,7.2,0,0,0,0c41.6-28.4,90-58,140.5-66.5,10.1-1.7,21.3-3.9,31.4-1,4.5,1.3,9.1,4.2,10.5,9,2.4,8.3,1.9,18.9,1.9,27.5,0,4.3.3,9.2,0,13.6s-.3,6.9-.7,8.6c-5.4,51.5-28.3,106.3-58.6,148-2.2,3-9,9.5-9.9,12.1-1.5,4.4.4,9.5-1.5,13.9s0,0,0,0l-3.9.5s0,0,0,0c-27.3-11.5-55.3-16.6-84.8-17.2-6.7-.1-23.8,2.6-7.6,2.9,16.5-.4,31.9-.6,48.9,2.9s39.8,9.7,44.9,14.9,1.1,1.3,1.6,2.1,0,0,0,0c-1.8,13.1-7.5,24.7-12,36.9s0,0,0,0l-4.4-.8s0,0,0,0c-24.4-17.7-52.7-32.2-82.3-38-7.3-1.4-.1,3,3.7,3.4,15.5,3.7,29.9,7.9,44.6,15.3s30.2,16,33.4,21.7.7,1.6,1,2.4,0,0,0,0c-.2,2.5-1.9,4.3-3.2,6.3-22.4,32.9-59.4,56.3-97.8,65.7,0,0,0,0,0,0-.5.7-1.1,1.3-1.8,1.8-5,3.9-38.4,5.8-46.9,5.9s0,0,0,0l-4.3-1.7s0,0,0,0c-6.1,2.3-13.2,2.2-19.7,2.1-24.4-.7-56.6-2.8-79.8-9.8-.8-.3-1.6-.7-2.3-1.3s-1.4-1.2-2.1-1.9,0,0,0,0c-.5.7-1.1,1.2-2,1.4-1.3.4-22.8-7.6-24.4-8.4,0-1.1-.7-2.1-1.6-2.5-27.2-11.6-52.9-28.4-70.8-52.2-17.1-22.9-26.7-52.6-25.2-81.3s0,0,0,0l2-1.9s0,0,0,0c8.8,1,55.8,4.4,21.9-.8,0,0,0,0,0,0l-21.4-1.2s0,0,0,0l-2.4-2s0,0,0,0c.3-7.6,1.4-15.9,4-23s0,0,0,0l3-1.2s0,0,0,0c11.6,3.6,22.9,7.6,34,11.9,1.6-1-31.9-14.3-34.3-14.1s0,0,0,0l-1.8-2.6s0,0,0,0c1.7-5.4,3.2-10.9,5.2-16.2s6.6-13.3,6.7-15.3-3.9-14.9-4.7-19.3c-1.5-8.7-2.7-17.4-3.3-26.2s0,0,0,0c-.3-25.9.9-52.2,3-78,3.2-25.1,10.3-58.9,20.5-82,3.7-8.4,6.8-16.2,17.8-11.8s1.4,1.6,1.7,1.8Z"/>
  <path class="st17" d="M382,653c9.1,3.4,18.4,6.3,28,8l5,1c15.8,9.9,31.6,19.9,47.6,29.9,3.5-2.2,7.5-2.4,6.1,2.8,4.4.9,7.1,2.6,8.2,5.3l1.8,1.7c3.9,17.2,8.9,34,15.1,50.5,10.4-15.4,24.2-28.3,38.4-40.6l4.7-1.6c.2-.9.5-.9,1,0l5.9-2.2c24.4-1.5,49.4-6.2,71.6-14.8l25.4-6.9,4.1.9c46.8,30.2,101.4,62.2,145,96,4.4,2.8,3.1,5.3-4,7.7l-3,2.3v2.4c-17.6,16.8-34.4,43.6-37,67.6,1.3,1.3.6,2.6-2,3.9.9.7,1.9,1.9,1.6,3-1,3.7-14.7-1.4-16.6-3.9-27.8-12.2-59.5-35.4-85.3-52.2-.9-.6-3.1-3-3.7-.8h-2.2c-8.1-7.2-16.1-14.4-24.2-21.7-.9,1.1.9,24.6,3.6,27.8-2.3,1.6-.7,11.2,0,13.5,3.1,1.3,2.7,3.3,1.4,6.1-7.9,1.5-15.8,2.7-23.7,3.4-27,3-54,3.7-81,2-18.5-6.4-40.4-7.4-60-8-.7.5-1.3.9-2.1,1.3-7.9,3.5-52.6-10-62.7-14.1l-3.2-3.1c2.1-13.5,5.6-26.6,8-40l-1.9-1.2c-8.5-.7-10.8-2.8-6.9-6.4,2.8,0,7.8-.3,9.7-2.3s8.7-33.9,9.2-37.5c-2.9,9.5-15.5,46.1-30.5,40.9-8.6-4.2-17.2-8.1-25.7-11.5-24.3-12.8-54.5-32.3-74-51.5-6-5.9-15-13-6-20.5,11-8.5,19.9-22.6,27.3-34.9s11.4-20.8,15.9-31.7l3.9-4.4c3.2-2.9,5.7-2.4,9.4-.9,7.9,3.1,21.4,14.3,29.7,19.3s18.5,11,27.9,15.6Z"/>
  <path class="st4" d="M828.7,968.2c-1.8,6.1-5.6,10.4-12.2,10.8-12.6.9-22.7-13-38-12.1-9.9.6-26.9,11.8-37.3,15.8-20,7.7-37.2,10.5-58.2,7.2l-6.2-2.5c-3.6-15.6-6.8-31.3-9.6-47.2,0-2.2,3.1-2.2,4.8-2.2,1.5.4,4.7,2,5,2,.7.1,1.4.2,2.2.3,8.5,1.2,17.3.2,25.8.7,4.1-1.5,8.7-1.4,13-2.5,11-2.7,20.6-8.6,31-12.5,16.9-6.3,38.2-12.5,55-3,18.2,6.1,30.5,26.2,24.7,45.2Z"/>
  <path class="st34" d="M315,619c-10.1,26.5-25.2,51.5-44,72.5-.8.6-2.1-1-3-1.5-23.6-15.6-48.1-35.5-57-63-.8-4.5.1-5.8,2.6-3.8-7-8.3-6.6-18.1-5.6-28.2,1.8-6.9,8.4-15,15-18,1.5.8,2.8,1.8,3.9,3.2,7.6,15.8,15.9,31.2,24.5,46.5s5.2,9.1,8.8,9.3c9.2.4-6.1-11.2-8.6-12.2-7.2-6.5-11.2-21.9-5.3-30.2s5.9-6.6,8.7-3.7c.8-.3.4-.7-1-1h-2.4c-1.8-1.4-8.6-14.7-6.6-17,4.1-2.1,9.5-.4,13.8.7,20.7,5.3,38.7,24.1,52.2,39.8,1.5,1.8,3.5,4.2,4,6.5Z"/>
  <path class="st4" d="M840,857c-2.5,4.1-4.5-1-4.7-4.2l-2.9-4.5c5.1,8.1,6,16.2-1.4,23.7-3.3,3.3-5.4,6-10,8-10.4,4.6-23.9,4.9-35,3-12.7-2.2-20-7.5-30-14-3.8.2-10.6-1.6-10-6-3-2.4-2.4-3.1-1.5-7,3.3-15.8,24.6-54.7,38.5-63,3.7-4.6,8.5-4.4,12,0,1,.5,1.6,2.3,2.6,2.8,24.1,12.7,50.1,29.6,42.4,61.2Z"/>
  <path class="st43" d="M176,447c24.7,40.7,45.3,83.8,69,125s5.7,12.9,9,17c.9-.2,1.2.1,1,1-13.7,3.6-10.7,23.2-3,31.5s20.3,11.5,9.9,16-9-4.5-11.1-7.9c-10-16-19.3-35.9-27.8-52.7-20.9-41-39.6-83.2-61-124,.4-2,2.5-3.4,6.5-4.2,3-2.1,5.6-2.7,7.5-1.8Z"/>
  <path class="st37" d="M454,836c.6.5,1.2,1.3,1,2-4.1,13.8-6.1,27.3-4.4,41.8l-1.6,2.1c-1.3-.4-4.4.2-6.4-.1-15-2.7-27.1-6.1-41.6-9.9-6.2-1.2-12.3-3.1-18.3-5.6-.8,1.7-1.3,1.2-1.7-1.4.6-15.1,2.7-30.3,5-45,22.1,7.1,44.5,15.4,68,16Z"/>
  <path class="st11" d="M530,369c1.5,2.5,1.5,2-1.2,1.7-11-1.2-20.7,1.9-30.8-1.3l-33.9,7.6c-2.6-16.9-8.3-33.9-14.7-49.8-11.7-28.9-27.8-58.7-49.3-81.2,18.6,11,34.1,30,48,46.5,20.1,24,38.1,49.4,53,77,9.7-.2,19.3-.7,29-.5Z"/>
  <path class="st36" d="M825.5,660c5.8,7.2,4.3,17.4,7.7,26.2s9.7,13.2,17.9,17.1c3.7,1.8,22.3,5.8,14.6,9.8-4.3,2.2-10.1,2.6-15.4,5.6-17.6,10-13.5,24.2-19.8,39.2s-3.6,6-5.6,1.6-3.1-16.2-6.4-23.6-8.4-13.8-16.8-17.2-23.2-5.2-14-10.7,11.9-2.3,17-5c11-5.7,16.3-19.3,18.2-30.8.7-4.2-1.3-9.1,2.6-12.4Z"/>
  <path class="st12" d="M262.6,367.4c-5.8-5.8-14.7-5.9-20.6-9.9s11.1-8.5,14.6-10.3c7.5-3.7,11.2-10.7,13.6-18.4s3.8-24,4.8-24.7c2.1-1.4,4.6.7,5.4,2.9,5.2,14.2,2.7,29.8,18.3,39.7,3.3,2.1,16.5,5.4,15.1,9.8s-11.4,4.1-14.3,5.8c-15.4,8.8-12.6,28.5-17.6,42.4-6.5,17.7-9.4-13-10.5-17.6s-4.2-14.9-8.9-19.6Z"/>
  <path class="st19" d="M218,757c2.5,3.6-10.6,7.6-13.3,9.2-8.3,5-11.8,11.6-14.2,20.8s-.8,16.6-6,22c-2.8,0-7.1-23-8.7-27.2-3-7.6-7-12.8-14.2-16.8s-10.4-3.5-11.5-4.5-1.9-3.9.2-4.8c3.8-1.6,9.6-1.2,14.5-3.5,7.7-3.6,10.8-10.5,12.7-18.3s1-14.1,2.7-18.3c4.5-11.1,7.9,12.6,8.5,14.5,3,9.9,8.5,19.4,18.3,23.7,2.2,1,10.9,2.8,11.2,3.3Z"/>
  <path class="st46" d="M176,447c-2,1.9-11.3,5.8-14,6-9.7.9-21.1-8-22.8-17.7-6.9-40.7,56.4-35.5,42.8,2.3s-5.6,9.1-6.1,9.4Z"/>
  <path class="st15" d="M629,676c5.7,3,10.7,7.5,16,11l-29.9,8.1c-.4,6.1-1.1.8-1.7.8-1.9,0-10.5,3.8-13.4,4.6-19.1,5.1-42.4,9.2-62,9.5-.5-.6-1-1.7-.6-2,7-5.8,26.4-21.3,33.5-24.7l5.1-1.3c18.3-1.2,34.9-1.6,53-6Z"/>
  <path class="st1" d="M847.5,533c3-.7,4,7.9,5,10,2.6,5.6,7.1,11.4,12.6,14.4,3.5,1.9,7.4,2,9.9,5.1-7.9,5.7-15.9,6.4-20.5,16.5-1.5,3.3-2.6,14-6,14s-4.7-9.7-6-13c-4.2-10.4-10.6-11.4-19.5-16.5,4-5.8,11-5.5,16-12s7.5-18.3,8.5-18.5Z"/>
  <path class="st27" d="M415,662c9.6.8,19.3.8,29,0,.3,0,.7,0,1,0,6.7,1.1,19.1,6.9,27,9,2.1,5,3.5,10.4,4.3,16.4,1.9,4.6,2.5,8.7,1.7,12.6-.3.9-.7.9-1,0-2.6-1.1-10.4-3.6-12-5s4-1,2-3-3.3,2.3-5.4,2.1-.7-1.7-1.3-2c-14.9-8.4-28.4-16.3-42.4-26.4s-3-1.4-2.9-3.6Z"/>
  <path class="st61" d="M643.8,874.5c-1.1,1.7-3.4,2.6-6.1,3.3-3,.8-6,1.6-9.1,2.1-9.7,1.9-10.7-6.2-11.6-13.4-.6-4.4-1.9-10.2-2.9-15.1-.9-4.2-1-8.8,2.3-11.9,3.7-3.5,10.8-6,16.3-7.1,6.2-1.4,8,2,8.4,7.6.7,7.3,1.5,15,2.6,22.4.4,4.2,2.1,8.9.2,11.9h0Z"/>
  <path class="st57" d="M640.8,813.1c.9,2.5.9,5.5.8,9-.1,2.7,0,5.7-.6,8.3-1,4.4-6.1,5-9.9,6.3-3,.9-6.1,1.8-9,2.7-7.2,2.3-12.9,5.5-20.4,5.5-1.4,0-9.5-1.8-7.5-2.6s9.3-1.3,13-2c3.6-.7,10.1-.6,8.9-4.5-.9-3.3-1.9-6.8-1.8-10.4,0-4.3,0-8.6-1.2-12.8-1.6-6.2-1.4-12.8-1.8-19.1-.7-9.7,4.2-4.9,8.9-.3,3.9,3.9,7.6,6.8,12.3,10.5,3.2,2.6,7.2,6,8.2,9.3v.2Z"/>
  <path class="st38" d="M672,938l-3.1,2.4c4.1,13.9,5,28.7,8.6,42.6s1.4,6,6,5.9l-.5,1c-4.3-.7-8.7-1.3-13-2-4.5-3.8-10.8-6.4-12.8-12.7-3.4-10.7-1.6-32.4-2.2-44.3,5.5,4.1,10.6,5.3,17,7Z"/>
  <path class="st47" d="M747,557c3.9,1.7,11.7,5.9,15.3,8.2s5.1,2.6,4.7,4.3c-.9,4.4-10.5-2.4-12.6-3.3s-5.6-2-8.4-3.1c-22.9-9.2-44.5-16.5-69.5-18-5.3-.3-31.5.9-33.5-.5-3.7-2.5,1.5-5.2,4.5-5.5,30.3-3.5,71.7,5.7,99.5,18Z"/>
  <path class="st13" d="M734,600c3.7,2.8,15.1,11.3,17,14.5s.1,5.5-3.4,3.4-8.9-8.3-12.7-11.3-4-1.9-4.9-2.6c-17.1-12.9-33.5-22.8-54-30.5s-23.6-5.6-31.7-9.3-2-1.3-2.8-2.2c1.1-5.1,7.2-2.5,10.7-1.7,28.5,6.2,58.9,22,81.8,39.7Z"/>
  <path class="st26" d="M348,762c.6-2,3,0,4,.5,7.2,3.5,14.3,7.3,21.7,10.4,8.6-1.7,13.5-6.7,17.5-14.2,8-15.1,13.3-34.4,19.5-50.5s.6-2.9,2.3-3.2l-16.5,67.1c-4.3,1.4-6.7,3.2-11.5,1.9,1.1,1-.1,2.9,0,2.9.3.2,6.8,1.2,7.5,1.1l1-3c2.3,1.6.8,3.1.5,5-16.2-2.7-31.6-10.4-46-18Z"/>
  <path class="st21" d="M299,486c17.8-.9,36.9,2.3,54,7s20.5,6.6,29,10.5,7.6,2.7,10,6c-.8.8-1.6,2.1-2.7,2.4-1.9.5-20.4-8-24.3-9.3s-8.7-2.3-13-3.5c-17.9-5.2-30.5-6.9-49-9-1.1,0-1.9-.4-1.9-1.5-8,.8-8.1-4.5-2.1-2.5Z"/>
  <path class="st31" d="M249.7,840.2c15.9-3.3,18.7,21.6,1.8,21.2s-13.7-18.8-1.8-21.2Z"/>
  <path class="st22" d="M348,522c9.3.2,21.4.5,30.4,2.1s6.7.6,8.6,3.4c0,2.7-2.5,2.4-4.5,2.6-8.9.5-24.4-1.8-34.5-2.1s-19.6-.9-29.5,0-18.3,3.9-26,4-2-2.8-1.4-3.9,6.2-1.2,7.9-1.1c13.5-1.2,27.1-2.3,41-3.2v-1.8c2.7,0,5.4,0,8,0Z"/>
  <path class="st42" d="M831,872c9.7-13.2-2.2-26.2-11-36,7.2,2.4,13.4,9,16.9,15.6s0,5.5,3.1,5.4c-1.8,7.5-3.9,9.8-9,15Z"/>
  <path class="st33" d="M299,486c-1.1,0-3.3-.7-3,1,16.2,0,32.7,1.6,48.5,5.3s.2,1.3,1,1.5c1.9.5,5.5.7,7.5.3.3,1.1-.3,2.5-1.5,2.7-2.6.4-12.7-3.6-16.2-4.3-9.3-1.8-20.3-2.9-29.8-3.5-1.8-.1-2.9-2.4-2.6,1.1-2.5-.3-8.3,0-9.5-2-1.8-2.8,3.9-4.4,5.5-2Z"/>
  <path class="st54" d="M340,522l4,2-1.5,1.6c-16.8.1-33.6,1.5-50,5.4v-1.8c1.7,1.6,1.3-1.1,2.1-1.2,1.6-.2,5.1,1,7.4,0,.3-1.7-1.9-1-3-1,3.6-1.4,9.3-2.8,13-3,9.1-.4,18.1-1.1,27-2,.3,0,.7,0,1,0Z"/>
  <path class="st24" d="M208,595c1.9,3.4-.3,7.3,0,11.5.5,6.8,6.5,14.9,10.6,20.4s5.4,4.2,3.9,6.1c-3.3-4-10.6-3.8-10.5-10l-1,4c-3.5-10.8-6-20.3-3-32Z"/>
  <path class="st3" d="M756,869c-9.6,3.1-19.1,5.2-27-3,3.7,1.6,9.4,4.5,13.1,4.5s2.9-.6,1.4-1.5l-4.5-1,7-5c2.9,2.4,7.1,4.1,10,6Z"/>
  <path class="st9" d="M380,889l3,63c-2.6-20.9-3.1-42-3-63Z"/>
  <path class="st23" d="M795,793c0,0-.6.7-1.7.3-4.8-1.8-5.2-3.4-10.3-.3,1.3-2.1,3.2-3.9,5-5.5,2.8-2.3,5.8-.1,2-4.5,4.2,3.3,6.1,2.2,5,10Z"/>
  <path class="st60" d="M653,917c0,0,.1,1.2-1,1-.3-12.3-4.3-24-6.6-36s-1.3-4.1.6-5c2.3,13.3,6.8,26.4,7,40Z"/>
  <path class="st44" d="M444,662c-5.7,3.5-13.5,1.2-19.5.9s-4.4,1.3-5.9,1.1,0-1.4-3.6-2-2.8-.4-5-1c11,1.1,23.5-.1,34,1Z"/>
  <path class="st7" d="M401,872c-.1,0-.8,1.2-3,.6-5.4-1.5-10.6-4.1-16-5.6v20h-1c0-3.3,0-6.7,0-10s-.1-8,0-12l20,7Z"/>
  <path class="st0" d="M416,1072c-4.6-10.9-9-22.6-12-34,3.6,9.7,8.4,19.6,11.9,29.6s2.3,3.4.1,4.4Z"/>
  <path class="st10" d="M410,661c-11.1-1.1-18-3.1-28-8,9.4,2.4,18.6,5.5,28,8Z"/>
  <path class="st14" d="M339,522c.4,3.6-1,1-2.6,1.1-7.9.4-17.2.4-24.4.9,9-.8,17.9-1.8,27-2Z"/>
  <path class="st52" d="M393,1004c-2.2-8.6-3.3-17.3-5-26l1-.5c.8,7.3,2.9,14.5,4.4,21.7s1.6,3.9-.3,4.8Z"/>
  <path class="st30" d="M617,840c2.6,1.4-1,.1-1,2.4-.1,11,4.3,21.4,4.2,32.5,0,0,1.6-.8,1.8-1,.1,1.3.1,2.5.2,3.8,0,.3,0,.5.1.8.3.6,1.2.6,1.9.6s1.6.2,1.6.9c-5.2,1.3-10.4,2.7-15.7,3.6,0,0-37.2,5.3-37.2,5.3-5.8.6-12,1.3-17.5,1-7.9.8-17,.8-25,0-5.3.1-10.8-.2-16.5-1-.8-1.4-4.6-1.3-6-1l-1.3-2.9c3.9-12,5.4-24.4,5.2-37l2.1-3.1,3-1.1c26.3,1.6,52.7.7,79-.9,7-.8,13.9-2.6,21-3Z"/>
  <path class="st41" d="M514,844c.9.3.9.6,0,1-.4,7.3-.1,15.1-1.1,22.4-.9,6.6-3.2,14.1-4.9,20.6-1.7.4-2.8,2.6-6.5,3-12.5,1.5-39.4-2.3-50.9-7.2-.9-.4-1.5-1.8-1.6-1.8-2.3-8.1-.2-40.2,5-46s4.1-2.1,6.5-2.1c10.7.2,27.9,2.6,38.9,4.2,4.4.6,13,.9,14.6,5.9Z"/>
  <path class="st32" d="M516,1012c-11.1-6.2-20.9-14.9-31.3-22.2l-38.7-35.8c2.7,1.4,5.5,2.7,8.3,4,10.6,5,26.5,13.4,39,16.3s3.4.3,5.8-.4l-1,2c6.2,1.8,12.7,2.5,19,4,.4,10.6-.3,21.4-1,32Z"/>
  <path class="st6" d="M517,1020l-1,5c0-4.3,0-8.7,0-13,0-10.7-.4-21.4,1-32,.3,0,.7,0,1,0,.5,13.4-1.8,26.6-1,40Z"/>
  <path class="st39" d="M531,1096c.1-.7,1.7-1.9,2-3.5,1.4-7.9-5.6-18.9-8-27-.4-1.3-1.9-3.6,0-4.5,2.1,6.9,11.2,26.7,9.6,32s-1.6,3-3.6,3Z"/>
  <path class="st55" d="M679,416c18.5-24.5,80.5-67.3,111.5-68.1,5.9-.1,8.5,1.4,9.4,7.6,2.1,14.2-1.3,34.3-4.4,48.4-8.3,38.4-26.2,76.7-53.5,105-4.2-17.5-12.7-34.7-23.2-49.3-2.4-3.4-6.2-8.7-8.8-11.7-1.2-1.9,0-2.8,1.8-3.6l21.2-8.1c.4-.8-4.3-3.7-5.2-3.9-4.2,1.6-20.6,0-14.5-6.7,3.6-1.1,28.2-11.8,27.7-13.9s-2-4.2-4.9-3.4c-17.7,3.1-35.5,6.6-53.5,10.3-2.4.3-4,0-3.5-2.8Z"/>
  <path class="st59" d="M433.8,364.7c-.3,1.5-3.6-3.1-5-3.5-5-3.4-9.1-5.4-14.7-7.2s-1.2,3.2,0,3.7l12.9,15.1c2.5,4.7-1.6,6.4-5.7,3.7-3.8-3.4-7.9-4.9-12.5-4.5,5.8,6,11.9,11.8,18.4,17.3l6.7,2.6c-22.7,10.3-39.3,26.7-52.9,44.1-5.9-30.2-6.6-61.8-4-92.5,1-12,3.2-25.7,5.5-37.5s5.8-26.4,7-28c2.5-3.2,7.2,3,8.9,5.1,13,15.9,29.9,61.3,35.4,81.6Z"/>
  <path class="st43" d="M503,538c0,8.1-4.1,13,3.7,18.8,13.4,10,32.7,8,47,1.4s13.5-10.5,14.4-.7c1.1,12.1-21,41.1-30.8,48.4-33,24.7-51.6,10.5-64.5-23.1-1.9-5-4.3-17.5-6.3-20.7s-8.3-4.9-11.4-8.6-10.1-18.2,0-17.5c-.4,19.3,21.4,26.7,37.2,18.7,8.3-4.2,4.7-8.5,6.3-16.8-8.6-4.6-21.4-11.6-19.4-23.4s27-7.5,34.9-5c32.1,9.9,10.1,27.4-11,28.5Z"/>
  <path class="st48" d="M576,682l-38,28c-.3,0-.7,0-1,0-9.2,3.4-21.6,1.6-31.3,0-8.6-1.4-17-3.7-25.1-6.8l-2.6-3.1c-2.7-6.7-4.2-14.6-5.7-21.8s-1.7-5-.3-7.2c25.1,6.8,55.4,10.1,81.4,11s15.2-.7,22.6,0Z"/>
  <path class="st18" d="M679,416c1.7,1.4,3.1.8,5,.6,11.5-1.4,22.3-4.7,33.2-6.9s23.3-5.1,24.8-2.7-.9,1.9-.9,2.5,2.7-.1,1.7,2.8c-1.5,4.6-24.4,13.6-29.9,15.7,3.4,3.7,10.5,3,15.1,2.5l8.9,5c-2.3,4.8-22.2,7.9-27,12.5-9.2-10.5-21.9-20.3-33.5-28-.6-.8,1.8-3.1,2.5-4Z"/>
  <path class="st58" d="M592.8,480.3c14.4-2,26.6,8.1,31.3,21.2,1.9,5.3,7.1,24.3.9,27-9.5,4.3-8.5-8.9-10.1-14.9-6.3-23.5-23.4-29.2-36.7-6.9s-3,11.6-8.2,9.9c-9.2-3-2.6-14.2.6-19.5,4.7-7.8,12.7-15.5,22.2-16.8Z"/>
  <path class="st28" d="M455.2,496.8c-1.5-1.5-1.4-8.5-2.1-11.4-3.8-15.5-17.2-20.6-26.3-6-2.4,3.9-7.2,20.5-13.4,13.7-4.3-4.7,1.2-15.3,4-20.1,16.1-27.4,46.6-11.8,46.6,17.5,0,5.2-5,10.1-8.8,6.2Z"/>
  <path class="st64" d="M429.6,392.8c-5.4-.7-9.8-5-13.7-8.6-3.6-3.5-9.4-7.1-9.1-11.2,1.3-2.9,6.2-1.4,8.8-.9,2,.3,6.7,2.6,7.7,1.2.3-.7-.8-2.8-2.7-5.3-2.6-3.5-6.4-7.3-8-11.5-1.6-4.1.2-5.9,3.4-5.8,3,.3,5.4,1.7,8.2,3.2,4.5,2.3,8.5,6.7,10.4,11.7,1.5,3.7,2.2,8,3.1,12,1.7,6.5.5,15.9-7.8,15.1h-.2Z"/>
  <path class="st50" d="M537,710c-10.1,9.3-20.8,18.2-30,28.5-4.3,4.8-7.7,10.2-11.7,15.3s0,1.8-2.3,1.3c-8.3-17.4-11.7-36.3-16-55,.3.1.7-.1,1,0,20.4,8.2,36.6,10,59,10Z"/>
  <path class="st35" d="M595,842l1,1c-27.2,3.2-54.7,1.7-82,2,0-.3.1-.7,0-1,1-1.7,3.7-1.1,5.4-.9,21.9,2.3,53.5,1.4,75.6-1.1Z"/>
  <path class="st62" d="M254,589c4.9-2.5,14-2.1,18,1.5s1.7,1.5.5,1.5c-3.5-2.3-14.9-.6-17.5-2s-.7-.6-1-1Z"/>
  <path class="st5" d="M796,855c-.2-1.8,2.1-.9,3-.5,6.3,2.3,16.3,11.5,16.5,18.5s-2.7,4.8-4.5.5c-3.3-7.7-6.4-15.1-15-18.5Z"/>
  <path class="st2" d="M476.7,850.2c4.9-.9,9.6-.2,12.7,3.8,8.8,11.5-4.6,28.2-18.1,20.1-9.9-5.9-5.1-22.1,5.4-24Z"/>
  <path class="st51" d="M518.8,581.3c9.7-1.1,21.2,1,28.2,8.3-14.2,19.3-44.2,35.3-61.9,10.8,6.7-10.3,21.7-17.7,33.7-19.1Z"/>
  <path class="st25" d="M487.8,863.8c-.2.3-1.7.5-2.2,1.3-2,3-3.6,7-8.9,5.8s-6.6-16.9,5.5-15.3c3.2.4,7,6,5.7,8.3Z"/>
</svg>
```


### public/colis.svg
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Calque_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 386 324">
  <!-- Generator: Adobe Illustrator 29.5.1, SVG Export Plug-In . SVG Version: 2.1.0 Build 141)  -->
  <defs>
    <style>
      .st0 {
        fill: #232d45;
      }

      .st1 {
        fill: #020c32;
      }

      .st2 {
        fill: #010a32;
      }

      .st3 {
        fill: #181e3a;
      }

      .st4 {
        fill: #262f46;
      }

      .st5 {
        fill: #040515;
      }

      .st6 {
        fill: #03092a;
      }

      .st7 {
        fill: #1b1e2c;
      }

      .st8 {
        fill: #020208;
      }

      .st9 {
        fill: #fcd68b;
      }

      .st10 {
        fill: #b4906f;
      }

      .st11 {
        fill: #fce39a;
      }

      .st12 {
        fill: #0e1435;
      }
    </style>
  </defs>
  <path class="st4" d="M347,82v85c0,.3,0,.7,0,1-.2,1.3-.4,2.4-1.1,1.3l-.3,35.3c-.9,3-.8,4.8.4,5.4-.2,3.6-.3,12.7-2.7,15-47.4,26.8-95.8,52-144.8,75.9-8.6-2.4-16.9-6.2-25.1-9.8-38.8-17-84.7-35.6-121.5-55.5-5.6-3-11-4.6-11.8-11.7.4-7.1.7-14.3.4-21.3s.7,7.9.1,8.2c-1.7-1.4-1.5-11.7-1.5-13.9v-79c.1-7.2-.6-15.3.1-22.4s.9-9.4,4.5-11.5c49.6-22,99.9-42.6,151-61.1,3.2-.5,6,1.1,8.9,1.9,39,11.8,83.6,30,121.7,45.3,5,2,20.8,6.8,21.8,11.7Z"/>
  <path class="st8" d="M347,167v-85c-.3,28.3.4,56.7,0,85Z"/>
  <path class="st5" d="M39,197c-.3-26.3-.4-52.7,0-79v79Z"/>
  <path class="st7" d="M347,168c-.2,13.9-.3,28.1-1,42-3.7,3-1-4-1-5.5.3-11-.5-22.1,0-33.1s-1-4,2-3.5Z"/>
  <path class="st4" d="M40,224c-.6-5.7-.2-14.1,0-20s-.8-4.2,1-4c-.6,7.8,1.3,16.5-1,24Z"/>
  <path class="st9" d="M95,148c.2,1.5-.3,2,1,3.5,3.5,4,34.8,18.6,37.9,16.5s.1-8.1,0-10.4c-.2-8.1-.2-16.4.5-24.5,8,3.1,54,25.3,58.9,23.9s1.9-2.3,1.6-3.9l-58-25,144.5-68.6,56.1,21.5c4.5,1.7-1.2,2.3-2.9,3.2-39.8,19.9-84.1,41.5-122.3,63.7-1.8,1-7.1,3.8-7.8,5.2-2.2,3.8.2,4.7,3.5,4,6.1,0-1.3,4.4-5,3-.3,2.4-.6,4.8-1,7-1.8-1.6-.1-10-3.5-10s-2.4,10.5-2.5,13c2.1,18.8,1.6,38,1,57-2.3,9.9-.4,20.9-1,31,1.3,11.8,1.2,24.4,0,36-2.8.9-35.8-15.7-41.3-18.2-20.3-9.1-41.1-17.4-61.4-26.6-12.4-5.7-33.5-13.9-44-21-5-3.4-3.9-4.9-4.3-10.2v-120c-1.4-.6-1.4-3.4,0-4,.3-.1.8-1.3,1.9-.6,16,7.2,31.8,15.2,47.9,21.7.4,1.9,0,3.9.1,5.9.9,8.9.6,18.1,0,27Z"/>
  <path class="st9" d="M340,220c-2,.3-16.9,10.3-20.3,12.2-38.8,21.6-78.8,41.1-118.2,61.8-.8-10.1-.6-20.4-.5-30.5,0-1.7.6-2.8,1-5.5-.2-29.7-1.3-61.5,0-91,.1-2.9-.7-4.4,1-7,1.7-2.6,3-2.1,6-2,0-.5-1-.9-1-1,0-.6,7.6-4.8,9-5.5,40.4-22.3,82.7-41.5,123.1-64,1.6-1.2,1.5.2,1.9.5,1,43.3.5,88.9-2,132Z"/>
  <path class="st9" d="M240,44l-121.4,55.1-21.4,10.7c-16.3-6.3-32.7-13.9-48.2-22.3,48.1-20.9,96.7-40.8,145.9-59l45.1,15.5Z"/>
  <path class="st10" d="M104,113c10.5-6.9,27.5-13.7,39.3-19.2,34.3-15.9,69.2-30.6,103.4-46.6,9.8,1.7,18.3,7.7,28.3,8.8l-144,69.6c-1.1.6-1.9.3-3,0-6.5-1.6-16.7-9.7-24-11.6-.2-.1-.2-.5,0-1Z"/>
  <path class="st10" d="M104,113l1,.5c-.2.5-.8.3-1,.5-1.6,1.4-3.3,3.5-1.8,5.9s23.4,9.2,26.4,12.1c1.7,9.4-1,19.3,1.5,28.5.1,2.2-13.5-3.8-14.7-4.3-3.4-1.5-13.2-5.4-14.6-8.4s-1.3-27.9-.7-31.2,2.4-2.5,4-3.5Z"/>
  <path class="st3" d="M342,88c2.7,2.1.8,5.2.9,8.5,1,32.4.6,66.6-.9,98.9-.4,8.5.1,17.1-1.1,25.5-.6.2-.9-1-1-1l2-132Z"/>
  <path class="st4" d="M45,94c0,1.3.1,2.7,0,4v23c-.6,25.7-.9,52-1,79,.2,4.2.6,8.5,1,13v2l-2,1.5.2-122.4c.6-.4,1.4,0,1.8-.1Z"/>
  <path class="st11" d="M45,218c0-1,0-2,0-3s0-1.3,0-2c-.8-4.3-1-8.8,0-13-1-26.3-.8-52.7,0-79,0-8.1-.8-14.3,0-23v120Z"/>
  <path class="st1" d="M196,170l2-1.5v77c-1.4,1.6-1-1.1-1-2-.2-5.5,0-11,0-16.5,0-19.1-.5-38-1-57Z"/>
  <path class="st2" d="M196,294v-36c1.4,1.3,1.4,4.7,1.4,6.5,0,7.8.4,19.8-.4,27s.4,2.4-1,2.5Z"/>
  <path class="st6" d="M95,148c-.9-8.3.3-18.4,0-27,1.8,6.5,1.1,14.6,1,21.5s.6,4.4-1,5.5Z"/>
  <path class="st0" d="M267,228c-.4-9.7-.7-19.5-.7-29.3l-1.3-.7c-3.5,2.1-13,8-11.6-1s11.2-25,14.4-30.6,5.7-12.3,11.4-11.2,22.7,16.1,24.8,18.3c7,7.3-9.5,8.1-10.9,12.2-2,7.9,2.6,28.7-1.1,34.9-1.7,2.8-17.9,13.7-21,14.1s-2.4-4.9-4.1-6.6Z"/>
  <path class="st12" d="M45,200c-.3.9-.6.9-1,0,0-24.5-.3-49,0-73.5s-.6-4.4,1-5.5c.3,26.3-.2,52.7,0,79Z"/>
  <path class="st4" d="M45,213c-1.8-3.3-1-8.9-1-13h1c0,4.3-.1,8.7,0,13Z"/>
  <path class="st10" d="M273,198.5c-.1-1.6-.7-5.2-1-7-1-5.7-7.9.6-10.5,2.5-.8.1-.6-.9-.5-1.5,1.3-8,12.7-22.9,16-31.1,1.1-1,1.7,0,2.6.5,1.8,1,19.3,14,18.4,15.1-7.7,1.6-9.4,4-10,11.5s1.4,25.7-.5,29.5-14.5,9.9-15.5,9c-.4-1.1,1-2.2,1-2.5,0-8.2.7-18,0-26Z"/>
</svg>
```


### public/dessin.svg
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Calque_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 397 406">
  <!-- Generator: Adobe Illustrator 29.5.1, SVG Export Plug-In . SVG Version: 2.1.0 Build 141)  -->
  <defs>
    <style>
      .st0 {
        fill: #67ac75;
      }

      .st1 {
        fill: #fdcd6c;
      }

      .st2 {
        fill: #fde7bc;
      }

      .st3 {
        fill: #fccb6b;
      }

      .st4 {
        fill: #fdf7eb;
      }

      .st5 {
        fill: #273048;
      }

      .st6 {
        fill: #fde9c1;
      }

      .st7 {
        fill: #fde4b6;
      }

      .st8 {
        fill: #fccc6c;
      }

      .st9 {
        fill: #fdcc6c;
      }

      .st10 {
        fill: #fdcc6d;
      }

      .st11 {
        fill: #68ad76;
      }

      .st12 {
        fill: #61a86f;
      }

      .st13 {
        fill: #fccb6a;
      }

      .st14 {
        fill: #fdc395;
      }

      .st15 {
        fill: #fdcc6a;
      }

      .st16 {
        fill: #fdf6ea;
      }

      .st17 {
        fill: #749ad3;
      }

      .st18 {
        fill: #65ab73;
      }

      .st19 {
        fill: #fdf7ec;
      }

      .st20 {
        fill: #fecf73;
      }
    </style>
  </defs>
  <path class="st5" d="M5,347c-1.8-1-5.5.9-3.6-5l30.1-48.9c4.3-5.1,11.3-1.8,12.6-3.6,3.5-11.4,7.8-22.5,10.8-34,6.1-23.1,7.7-50.2,18.7-71.3,11-21,32.3-35,48.2-51.8l-16.4-74.3c-1-7.1-3.4-8.5,4.3-10.7,56.1-11.8,112.3-22.8,168.5-34.5,15.4-3.2,34.5-9.7,49.5-11.5s4.4-.4,6.6.7l60.2,278.1-226.1,50.5c-1,0-2.4-.8-3-1.5-2.7-2.9-6.5-26.8-8.2-32.9s.2-2.5-1.3-2.2c-3.2,7.1-9.5,16.1-15,21.5s-15.9,9.6-19.8,15.2-4,7.3-4,8c-.3,2.9,7.8,5.5,3.3,18.3s-19,39.5-23.5,45.5-4.7-.4-6-1.5v-3.1c7-13.6,13.9-27.1,20.9-40.5,4.8-7.8,2.3-11-4.2-15.8-21.8-16.2-45.7-32.1-69.5-44.4l-30.8,49.8h-2.3Z"/>
  <path class="st17" d="M91,401c-3.8-3.3-20-9.2-26-12.5-17.5-9.5-35.8-21.2-51.4-33.6-2.9-2.3-5.3-6.2-8.5-8l31.5-51c2.2-2.3,5.2.4,7.4,1.6,18.9,10.4,44.1,27.5,61.8,40.2,4.3,3.1,12,7.8,10.6,14s-5,11-6.6,14.5c-5.7,11.8-12.6,23.2-18.7,34.8h-.1Z"/>
  <path class="st4" d="M388.9,275.9l-219.7,48-22.1-98.4c8.8-13.7,27.8-41.2,24.7-57.7-1.7-9.4-12.5-13.3-21-11.5s-9.8,8.7-14.7,11.8l-26-115L330,7.4l58.8,268.5h.1Z"/>
  <path class="st14" d="M130.8,173.8l-32.3,32.2c-1.8,3.5-6.8,6-5.4,10.4,2.5,7.6,11.3-7.9,12.9-9.8,12.9-15,27.9-28.1,42-42,5.2-4.2,16.1-2.9,17.7,4.2,2.9,12.9-13.7,38.8-21,49.6s-6.2,6.6-8,10c-5.1,9.1-2,13.9-2.8,23.2s-4.9,19.8-8.5,26.5-11.3,14.6-4,13,13.5-19.2,15-24c3.7-12,2-16.5,2.5-27.4s2.9-11.1,4.1-6c3.9,17.3,7.8,34.7,11.6,52-5.5,10.2-12.3,20.7-21.1,28.4s-17.6,9.8-21,21l-64.5-41.5c4.2-9.9,8-20.8,10.9-31.1,6-21.3,8.1-45.2,15.4-65.6s31.1-40.2,49.2-57.8c2.3,11.5,5.8,23.2,7.3,34.8h0Z"/>
  <path class="st11" d="M264,182c6.9-2.6,19-1.6,25.3-4.2s7.4-15.5,13.7-12.3c4.9,2.4-.8,7.7,0,8.5,16.1-4.8,16.6,7.4,1,8l10.5,6,.3,2.3c-2.2,8.7-20.2-5.1-23.3-5.2s-12.2,1.6-15.8,2.2-5.6.8-7.8,2.2c4.8,7.1,9.4,15.3,12.9,23.1s9.8,23.4,8,26.2-5,.8-5.8,2.6c4,2.6,10.9,20.6,13.6,21.4s13.7-9.4,17-9.8,3.6,2.9,3.2,5.1c-.9,4.6-19.3,15-24.2,13.8s-13.8-25.5-15.7-29.1c-3.2,1.9-22.2,4.1-22.9,6.6.2,5.7,5.7,25.2,3.4,29.4s-6.2,2.9-8.5,3.5-14.7,3.4-16.1,3.1c-2.6-.6-3.7-4.1-2.1-6.2s15.3-4.4,19.1-4.4l-2.5-23-10.1,2c-1.9-.1-3.5-2.1-4.2-3.7-2.1-4.8-5.1-32-6.3-33.2-8,.4-16.6,2.3-24.4,1.1-3.8,2.1-8.3,18.3-13.6,12.4s3.1-10.1,2-11.5c-14.6,5-21.6-7-3-7,1.4-1.8-5.5-4.4-3.9-9.3s13.6,8.4,16.6,9.2,11.7-1.6,14.8-1.9,6.4.2,9.5,0l-1.1-16c-35.8-4-49.6-52.2-17.9-72.5s36.8-7.4,51.4,5.4c18,15.8,15.3,34.8,6.5,55l.4.2Z"/>
  <path class="st20" d="M280.8,65.3c11.2-.9,21.2,1.8,24.9,13.5s1.1,18.4-2,23.5c-9.5,15.9-47.5,3.7-45.7-16.6,1.1-12.4,11.1-19.4,22.8-20.3h0Z"/>
  <path class="st1" d="M237.8,88.2c2.2,0,11.6.8,12.8,1.7,3,2.3,1.6,4.7-2,5.1s-14.2,1-15.6.5c-8.7-2.7-1.1-7.1,4.9-7.4h0Z"/>
  <path class="st9" d="M309,110c-.7-8.6,15.7-2.3,19,.5s4.6,7.7.7,7.3-14.6-8.1-19.7-7.9h0Z"/>
  <path class="st1" d="M237.5,59.3c.7,0,12.5,4.7,13.4,5.3,3.1,2,6.4,8.2,1.1,7s-15.3-5.5-16-6.1c-2.2-1.8-.5-6.1,1.5-6.2Z"/>
  <path class="st3" d="M294,134c-.3.3-3.1,0-4-.5-2.6-1.5-4-19.2-2-20.5,5.9-3.8,6.9,20.2,6,21Z"/>
  <path class="st10" d="M314.1,77.1c3.7,0,15.3-10,16-2.6s-18,13.8-16,2.6Z"/>
  <path class="st15" d="M307,47c2.7,2-4.4,16.6-6,17.5-7.5,4.4-2.3-8.8-.2-12.2s4.6-6.5,6.2-5.3Z"/>
  <path class="st8" d="M273.5,43c1.1-.3,2.3,0,3,1s2.5,15.4-1.1,16c-5.3.9-5.3-15.9-1.9-16.9h0Z"/>
  <path class="st13" d="M263.7,109.2c10-3-1.8,13.3-7.1,11.8s4.6-11,7.1-11.8Z"/>
  <path class="st19" d="M222.8,123.3c18.2-2.7,40.8,10.5,41.3,30.2s-17.3,38-42.1,33.1c-32-6.4-36.6-57.8.8-63.3Z"/>
  <path class="st16" d="M231,195c.4-.4,10.4-.8,12.3-1.2,3-.7,14.7-6,15.7-5.3,9.4,14,16.2,29.3,22,45.1l-41,11.1c-1.8-6-11.3-47.3-8.9-49.6h-.1Z"/>
  <path class="st6" d="M288,103l9.2-15.3,2.8-2.7c3.2,4.2-9.7,20.4-12,18Z"/>
  <path class="st7" d="M286,78c.7,4-2.6,5.6-3.4,7.1-1.8,3.2-3.2,7.6-6.6,9.9,1.8-4.4,4.2-10.8,6.8-14.7s1.1-2.7,3.2-2.3Z"/>
  <path class="st2" d="M277.8,76.8c0,.2-1.4.3-1.8.9-2.2,3.4-4.1,7.5-7,10.3.2-5.8,5.2-9.8,7-15,1.5-.2,2.1,3.1,1.8,3.8Z"/>
  <path class="st0" d="M213.1,163.1c8.1-.4,11.3,6.8,20.3,5.9,12.2-1.3,10.7-13.5,14.6-15.5,7.7-3.8,5.3,7.2,3.2,11.2-5.1,10-15,12.7-25.6,11.2-5.4-.8-15.3-6.3-12.5-12.8h0Z"/>
  <path class="st18" d="M237.7,132.1c4.3-1.1,9.2,5.9,4.3,8.4-7.8,3.8-10.7-6.7-4.3-8.4Z"/>
  <path class="st12" d="M211.2,141.2c2.4-1.5,10-.5,7.4,4.9s-12.3-1.7-7.4-4.9Z"/>
</svg>
```


### public/dino.svg
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Calque_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 807.7 755.5">
  <!-- Generator: Adobe Illustrator 29.4.0, SVG Export Plug-In . SVG Version: 2.1.0 Build 152)  -->
  <defs>
    <style>
      .st0 {
        fill: #68b2b5;
      }

      .st1 {
        fill: #1e3f6b;
      }

      .st2 {
        fill: #f9ac6a;
      }

      .st3 {
        fill: #328394;
      }

      .st4 {
        fill: #a1cdcc;
      }

      .st5 {
        fill: #1f3e6a;
      }

      .st6 {
        fill: #297b8d;
      }

      .st7 {
        fill: #23798f;
      }

      .st8 {
        fill: #297c8f;
      }

      .st9 {
        fill: #3d8f9d;
      }

      .st10 {
        fill: #6b75b4;
      }

      .st11 {
        fill: #328393;
      }

      .st12 {
        fill: #2c7e90;
      }

      .st13 {
        fill: #5fa5aa;
      }

      .st14 {
        fill: #24788e;
      }

      .st15 {
        fill: #267a8e;
      }

      .st16 {
        fill: #1e3e6a;
      }

      .st17 {
        fill: #3d8e9c;
      }
    </style>
  </defs>
  <path class="st17" d="M494.5,613c11.4,7.6,21.8,16,35,21,11.5,31.3,45.7,81,13.5,110-3.5,3.1-10.1,7.4-14.5,9-8.2-.2-15.8-3.3-22.7-9.4-17-17.1-7.3-2.9,2.5,3.9,7.3,3.3,9.2,5.8,5.7,7.5l-14.5-.9c-28.7-7.4-43.8-39.8-51-66-40.9,7.8-83.6-8-106.4-43.1-6.7-10.3-12.5-22.4-16.6-33.9,54.8,27.8,110.8,36.4,169,11,.2-1.3.3-1.3-.6-2.1s-4-2.2-5.9-3.9c-4.4-4-7-7.6-10.5-12-1.9-3.2-.8-4.3,2.7-3.2l14.3,12.2Z"/>
  <path class="st10" d="M391.5,248c14.4-.9,51,.8,53.9,19.6s-6.6,37.5-9.9,54.4c8.5-3.9,16.2-9.7,24.6-13.9,11.1-5.5,32.9-15,44.3-7.6s19.3,40.6,22.1,54.4c1.5.4,1.7-.4,2.5-1,10.7-7.3,20.3-21.5,33.2-29.8,21.7-14.1,28.9-8.6,44.8,8.8s19.1,24.8,22,25.1,2.3-.3,3.3-1.7c2.9-3.7,6.6-15.9,9.6-21.4,4.4-8.2,14.2-23.4,22.8-27.2,13.6-5.9,30,7.3,41.7,13.2-55.4,44.6-115.3,51-184,36.5-61-12.8-123.4-39.8-131-109.5Z"/>
  <path class="st10" d="M293.5,27c15.4-8.1,32.7-14.2,50.4-11.9,26.3,3.4,20.6,40.9,15.6,58.9,12.8-.5,24.4-3.1,37.2-.7,41.8,7.8,22.6,45.3,4.3,66.8-1.3,1.5-9.7,8.6-8.5,10,12.9,2.5,28.3,9.5,36.4,20.1,20.7,27.2-16.2,51.2-37.4,61.9-2-49.2,3.9-84.8-19.3-131.2-15.1-30.2-47.5-61.1-78.7-73.8Z"/>
  <path class="st11" d="M201.5,317c11.6-1.3,24.7-4.4,36-7.5,12.7-3.4,25-8.4,36.7-14.3l3.3,1.3c-16,26.9-48.1,45-77.9,52.6-.8.9.4,19,0,22.5s0,1.1-1,1.4c-.3-18.7-.4-37.6,3-56Z"/>
  <path class="st13" d="M354.5,499v1c-31.1,24.1-68.7,47.8-110,41-3.4-4.9-6.7-9.6-9.8-14.7-1.8-3-3.3-7.8-5.2-10.3,8-4.2,7.8,3.4,13,7.5,19.2,15.5,63.8-5.8,82.3-16.7s14.6-9.3,21.2-14.8l8.5,7Z"/>
  <path class="st15" d="M528.5,753c-9.8,3.6-19,3.6-29,1,3.7-1.7,8.1.2,12.5,0s2.7.7,2.5-1c-4.2-1.6-8-4.2-11.5-7s-14.3-13.1-6-13c.8,0,8.2,7.7,10,9,6.3,4.8,14,8.7,21.5,11Z"/>
  <path class="st4" d="M259.5,418l-1.5,3.2c-16.4,7.8-31.5,17.5-45,29.1l-3.4.7c-6-13.8-7.4-29.2-9-44,19.5-4.9,41.8,1.5,59,11Z"/>
  <path class="st0" d="M293.5,27l3.8-.5c36.9,17.4,67.7,49.1,82.9,87.2,13.8,34.8,13.8,77,13.2,114.1l-1.8,4.3c.2,4.8-.6,10.8,0,16l2.5,3.7c3.7,28.1,18.4,51.3,40.7,68.2.5.3.5,1.2.5,2.1.9-.2,1.7-.3,2.1,0,50.8,36.3,134.8,46.4,194.9,35.7.6-.8,1.3-1.4,2.1-1.6,24.4-6.8,46.6-17.7,66.7-33.3l5.5-1.8c10.1-8.1,21.1-18.1,30-27.5,8.7-9.2,21.4-30,34.5-30.6,23-1,17.3,32.7,15.2,47.3-7.1,47.7-31.1,99-58.9,138.1-25.1,35.2-57.8,67.3-94.8,89.7l-3.1-2.7c-8-21.3-22.9-45.3-44-53.9,26.2,15.1,41,41.8,47.9,70.2,1.3-.5,2.8-1,4.2-1.6,26.7,1.9,53.4-7.9,70.8,17.7,15.5,22.8,35.9,63.3,26.2,90.3-2.5,1.1-5.5.6-9-1.4-28-19.6-7.4,2.6,5.6,6.2l.5,2.2c-4.2,7.5-10.3,14-18,18-3.9,0-9.6-3.4-13.2-5.7l-13.6-10.9c.1,4.1,2.5,7.4,7.3,10.1l10.2,6.8.3,2.7c-38.6,10-55.7-19.9-74-47l-.6-1.8c9.5-6.5,3.8-8.4-3.4-3.2-1.1,3.4-38,8.9-43.5,9-16.3.5-38.4-3.3-53.5-9-.7.3-1.3.5-2,.6s-1.3.2-1.8,0c-4-1.8-7.7-3.8-11.4-6-6.7-3.9-16.1-9.3-19.8-15.7-23.3-17.4-35.9-51.4-30.5-79.6-2.8-13.6-5,20.4-3.6,23.2l-1.9,1.3c-1.1.2-2.3.3-3.4.2s-2.2,0-3.2-.4c-31.5-10.2-70.1-31.2-94.7-53.4-1.3-1.2-2-2.9-2.6-4.5-.9-.3-.9-.6,0-1l2.4-4.8c17-15.7,31.6-34.9,41.1-55.5-24,29.1-51.8,55.2-86.7,72.8-13.9,7-53.1,23.6-67.4,9.5-2.6-2.5-6-6-2.3-9,13-6.6,24.1-21,1.8-3.5-18.3,10.6-35.1-4.5-20.6-21,3.8-2.8,21.3-18.2,5.5-8.6l-11.7,9.8c-2.2,1.2-4.9,2.3-7.2,1.4-8.7-4.9-11.1-7.4-9.9-18.4s4-7.2,0-6.6c-.9-.3-.9-.6,0-1l4-1.1c9.3-12.9,21.1-23.3,35.8-30.8,32.3-17,66.9-35.4,89.2-64.7-17.5,20.7-39.6,37-64.2,50.1l-4.8.5-3.3.5c-16.1-8.3-34.5-13.5-52.6-10.1l-3.1-1.4c-4.3-9.7-5.1-23.8-2-34,.5-8.1.6-16.3.6-24.5l1.5-1.7c26.2-7.2,50.8-20.5,68.4-41.5,1.3-1.5,6-8.5,5.5-8.3-13.3,6.1-24,10.6-38.2,14.9s-29,7.8-32.9,6.2-1.3-.7-1.9-1.1c-51.6,5.8-132-8.8-167-50.5-49.6-59.3-6.3-158.1,72.9-153.6C126.7,54.8,187.5,13,249,16.9c11.9.7,33.4,5.6,44.5,10Z"/>
  <path class="st2" d="M308.1,184.3c40.2,30.8-23.3,80.4-49.5,39.8-17.6-29.6,22.5-59.1,49.5-39.8Z"/>
  <path class="st12" d="M354.5,499c-2.4.8-5.2-.6-8.3-4.2-17.9,13.2-37.6,24.6-58.9,31.3-18.1,5.7-41.4,10.3-52.6-8.9-2.3,0-4-.3-5.2-1.1-2.4-3.1-5.7-2.5-9-4.5s-7.7-8.8-8-13.1,3.4-4.8-3-8.4c1.8-2.1,4.7-2,7-3.5s20.2-20.1,20.1-10c0,6.2-19.2,11.4-16.8,24.8,2.2,11.9,16.3,9.9,24.1,4.6s15.3-13.8,14.5-5.5-13.1,11.4-16.8,14.1c7.6,14.1,25.2,10.2,38,7,34.3-8.6,64.5-31.6,90.5-54.5,4.3-2.8,25.9-31.5,27.9-31s2.4,1.9,2.1,3c-.7,2.9-6.8,13-8.8,16.3-9.8,16.4-22.4,31.1-36.8,43.7Z"/>
  <path class="st14" d="M632.5,538c1.2,3.4,2.1,6.9,3.2,10.3s1.7,1.6,1.8,1.7c.5,1.9-3.6,5.2-5.8,2.8s-6.2-20.2-8.1-24.5c-5.6-12.6-16.5-28.1-27.2-36.8s-12.5-7.9-12.9-9.1-.2-2.1.9-2.9c3-2.1,13.4,6.8,16,9,15.9,13.7,25.1,30,32,49.5Z"/>
  <path class="st3" d="M713.5,683c-3.5,1.8-5.4,2.1-9,3-5.1-4-20.1-11.4-20.1-18.5s.4-3.3,1.6-3.5c1.9-.4,11.9,9.3,14.8,11.2,4.2,2.8,9.3,4.2,12.7,7.8Z"/>
  <path class="st11" d="M734.5,658c-.9,2.6-1.7,4.6-3,7-4.6-1.1-23.2-11.3-21.9-16.3s11.2,3.3,14.6,5.1,7.1,2.4,10.3,4.2Z"/>
  <path class="st6" d="M626.5,634c.3-.8-.7-2.2.6-3.1s7.7-2.8,9-1c3.4,5-3.6,6.1-5.6,9.1-1.2-1.8-2-3.9-4-5Z"/>
  <path class="st7" d="M259.5,418c18.4-10.7,35-20,51-34.5,3.1-2.8,17.4-18.9,18.6-19.4,6.1-2-.4,6.8-2.1,8.9-12.9,16-37.5,33.2-55.2,43.8-18.3,11-41,19.6-56.3,34.7s-9.3,12.4-11.9,13-2.9-.3-4.1-.5-3.1.4-1.5-1c5.6,1.6,5-3.7,7.7-7.3s2.6-3.3,3.8-4.7c12.5-14,33.8-23.6,50-33Z"/>
  <path class="st8" d="M494.5,613c-3.1-2.1-7-3.8-10.3-6.2s-7-7.9-6.7-2.8c-11.2-14.2-17.5-27.3-19-46-.4-4.9-1.4-28.9,3.6-29.9,7.3-1.4,2.3,10.7,2.3,14.3s.6,10.4,1.1,14c2.9,22.1,13.6,40.8,29,56.5Z"/>
  <path class="st5" d="M110.7,279.2c2.4-2.3,30.1.2,36.2-.3,26-1.9,59.1-17.1,69.7-42.3,2.8-6.8,1.7-18.6,11.2-17.7,16.4,1.6-2.2,31.2-7.4,37.5-21.9,25.8-58.6,35.8-91.5,33.6s-26-3.1-18.2-10.8Z"/>
  <path class="st16" d="M236.2,120.2c15.7-2.7,28.3,6.1,34.4,20.1s9.2,27.6-2.7,27.6c-8.3,0-6.7-9.7-8-15-5.1-20.8-25.3-27-35.1-5s-2.2,16.1-10.9,15c-11.7-1.5-1.1-22.5,2.6-28.3s11.8-13.1,19.5-14.5Z"/>
  <path class="st16" d="M100.2,177.2c15.1-1.5,6.9,24.4-6,20.6s-3.1-19.7,6-20.6Z"/>
  <path class="st1" d="M49.7,172.2c.8-.7,4.1-1.8,5.2-1.8,10.9-.2,11.3,19.6-.2,21.3s-9.4-15.5-5-19.6Z"/>
  <path class="st4" d="M458.5,558l2.3,3c1.5,14.5,7.4,27.8,16.4,39.3l2.3,2.2h0c2,1.5,3.8,3.3,5.2,5.4l5,5.1c2.1,1.2,9.9,7.6,6.1,10.3-6.4,4.6-21.5,8.5-29.7,10.6-46.8,11.9-94.2,2.4-136.9-18.8l-3.7-4.1c-34.7-17.6-58.8-38-81-70l3.8-1.5c38.3,4.6,73-16.7,102.2-39l3.9-.5c8.3,6.1,16.2,12.9,24.7,18.8,24.2,17,51.3,29.8,79.3,39.2Z"/>
  <path class="st9" d="M198.5,373c.2,11.7.8,22.6,2,34l2.3,3.1c1.3,12.6,2.8,25.2,7.3,37.1l-.6,3.8.7,2.3c-1.6,4-8,12-10.7,10.7v1c-39.4,4.7-86.8,1.2-122-18.5-12.2-6.8-44-28.5-17-38-7.4-7.1-22.5-22.5-16.4-33.4s16.8-7.8,24.4-5.1c-10.2-21.7,3.3-26.8,22.3-19.8,31.9,11.8,47.6,24.4,85.2,24.8,4.7,0,18.6-.8,22.5-2Z"/>
</svg>
```


### public/favicon.svg
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Calque_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 377 418">
  <!-- Generator: Adobe Illustrator 29.5.1, SVG Export Plug-In . SVG Version: 2.1.0 Build 141)  -->
  <defs>
    <style>
      .st0 {
        fill: #242842;
      }

      .st1 {
        fill: #fcc799;
      }

      .st2 {
        fill: #060c2c;
      }

      .st3 {
        fill: #fcc496;
      }

      .st4 {
        fill: #fdb97f;
      }

      .st5 {
        fill: #272d47;
      }

      .st6 {
        fill: #5a5180;
      }

      .st7 {
        fill: #fdcd6d;
      }

      .st8 {
        fill: #5a517f;
      }

      .st9 {
        fill: #f38c50;
      }

      .st10 {
        fill: #f38c51;
      }

      .st11 {
        fill: #242b44;
      }

      .st12 {
        fill: #272d46;
      }

      .st13 {
        fill: #f48b50;
      }

      .st14 {
        fill: #6ea6d2;
      }

      .st15 {
        fill: #212741;
      }

      .st16 {
        fill: #fac797;
      }

      .st17 {
        fill: #fac597;
      }

      .st18 {
        fill: #fdd27c;
      }

      .st19 {
        fill: #fc9fb9;
      }

      .st20 {
        fill: #010314;
      }

      .st21 {
        fill: #00010b;
      }

      .st22 {
        fill: #feda99;
      }

      .st23 {
        fill: #252b45;
      }

      .st24 {
        fill: #fdc395;
      }

      .st25 {
        fill: #2f2768;
      }

      .st26 {
        fill: #fed790;
      }

      .st27 {
        fill: #825b49;
      }

      .st28 {
        fill: #fde5c2;
      }

      .st29 {
        fill: #fcd077;
      }

      .st30 {
        fill: #fdd380;
      }

      .st31 {
        fill: #fdd586;
      }

      .st32 {
        fill: #fdd476;
      }

      .st33 {
        fill: #805a49;
      }

      .st34 {
        fill: #fdcd70;
      }

      .st35 {
        fill: #fecd6e;
      }

      .st36 {
        fill: #fae5af;
      }

      .st37 {
        fill: #89848b;
      }

      .st38 {
        fill: #202641;
      }

      .st39 {
        fill: #f3865d;
      }

      .st40 {
        fill: #252a44;
      }
    </style>
  </defs>
  <path class="st8" d="M136.9,393.9c-1.9-5.3-2-11.3-.1-17.8,5.3-21.4,9.9-42.7,13.6-63.9l-1,.4-5.6,27c-.5,2.3-1.2,3.6-3.4,4.5-4.3,1.9-31.5-.7-35.9-1.4-13.5-2.2-45.7-7.8-53.7-20.1-6.4-9.9-9.2-49.8-2.5-57.1,1.7-1.9,16.8,7.2,13,12.2-2.1,11-3.2,22-3.3,33.2,2.6-23.8,7.1-47.7,13.3-71.8,1.7-7.2,6-3.9,9.8-.7,19.6,17.5,43.5,34.4,70.4,38.2l1.8,1.9c-.6-2.8,13.5-2.3,14.2-1.9s1.1,1.1,1.3,1.9l.9,1.7c.9-3.9,10.1-6.5,14-6,12,1.3,15.4,16.2,17.1,26.1-7.8,30.6-15.7,61.8-15.7,94.2,0,1.3.6,3.8.9.3,3-33.1,7.1-64.5,16.4-96.5,12.5-2.2,21.5-10.4,29.3-19.8,8.6-2.5,16.4-6.5,24.2-10.7,3.5,5,7.8,8.7,12.6,11.3,4.5.5,9.2,1.4,4.5,5.5.4,7.3-9.3,12.3-15.2,15.3-13.9,7-28.7,14.1-44.2,15.6-6.9,2.7,3.8,1.5,6.9.7,17.8-4.2,34-12.2,48.8-22.4.9-.4,2.5-.8,3.3-.4,13.2,7.3,31.6,32.5,39.1,46,5.3,9.4,19.7,41.4,17.4,50.5-.2.8-.5,1.6-.9,2.3-.1,0-1,1.3-2.5,1.6-25.9,6-53.5,9-80,10.6-4.6-.6-12-.7-15,.9h-5.6c-5.7-.4-11.4-.7-16.9-.9-23.6,1-47.8-.7-69.8-8.1l-1.5-2.2Z"/>
  <path class="st5" d="M165,272.8c3.1-.1,6,0,9-.9s2.9-.3,1.4-1.9-5.6-2.6-7.5-4.2c-8.1-6.8-14.7-18.4-17.3-28.6-4.8-18.7.5-34.5,6.9-52.1-21-8.5-47-26.7-44-52.5,2.5-21.7,28.9-25.9,46.4-26.8,6.7-.3,20.5,1.4,25.9-.4,2.8-.9,20.4-15.2,25-18.2,18.5-12.1,58.9-36.8,79.3-41.7,26.3-6.4,48.9,28.1,62.5,46.9,8.4,11.7,21.7,24.8-4,21.8s-21.5-9.3-24.5-9.3-8.4,5.7-10.8,6.2c2.4,17.6,3.6,35.4,4.9,53.1,13.6,15.4,47.5,45.6,32.1,68.2-5.1,7.5-18.5,12.2-27.3,13.1s-19.2-.9-20.1-.4c-2.3,1.4,1.8,4.9,2.4,7,2.2,8.4-1,16.9-9.7,19.5s-9.8-.4-11.3.5-2.3,4.7-3.9,6-5.7,2.3-5.7,2.8c0,1.9,2.8,3.2,2.8,5.6s-2.4,4.1-1.8,5.1,8.1,5.9,9.8,7.6c17.8,17.3,31.2,38.2,39.9,61.5,1.7,4.6,9.1,26.7,8.3,29.8s-4.7,1.5-5.5,1.6c-6-38-26.6-73-56.3-97.2-1.5-.8-11.1,6.7-13.6,8.1-10.9,6.1-32.9,15.6-45.1,16-2.4,0-3.6-.4-5.1-2.4,3.5-4.4,9.7-3.2,15-4.7,9.2-2.6,21.2-7.2,29.7-11.6,2.9-1.5,15.2-8.7,16.7-10.5s.9-5,1.9-6.6,2.6-.4,2.3-1.9c-8.7.8-14.2-5.4-18.3-12.2-3.2,2.2-7.6,5.1-11.1,6.7-3.3,1.5-9.3,2.6-11.9,4.1s-3.7,4.8-5.7,6.5c-6.6,5.9-14.1,12.5-23.4,12.7-2.9,17.3-8.2,34.1-11,51.4-2.5,15.6-3.2,31.4-5,47.1-3.9,1.2-4.4-1.5-4.4-5.1,0-20.8,5-47.8,9.4-68.3,1.7-7.6,7.4-19.9,6.3-27.4s-6.4-16.9-7.1-17.5-8.8-3.6-9.3-3.7c-2.7-.2-7.3,3.2-10.6,2.9-.8,10.9-.4,20.9,8.3,28.6s11.2,6.1,4.2,7.1c-12.5,1.8-23.4-26.3-15.5-35.7h-15.5c-17.9,0-45.4-16.1-59.5-26.8-2.6-2-18.2-16.6-19.8-15.4-4.6,16.6-8.5,33.3-11.2,50.3-.6,3.8-1.6,28.4-5.3,28.5s-1.4-3.2-1.4-4.2c-.9-12.2,2.9-25.2,3.7-37.4l-10.7-7.2c-2.7,14-3.8,30-1,44.1s10,17.8,23.5,22.5,33.6,8.7,48.8,9.3c3.6.2,17.3.7,19.6-.1s1.1-.6,1.4-1.5c3-8.2,3.6-20.6,6.4-29.2,5.9-5.4,4.4,3.8,3.8,7.5-4.2,24.7-14.1,49.4-14.7,74.9-2.6,6.1-8.8.2-7.7-5.6,1.6-13.1,4.4-26,8.4-38.7h-1.5c-3.7-.5-2.8.4-6.6,0-2.4.3-9.6.7-14.3-.6-16.5-1.5-55.1-7.6-66.5-19.5-13.3-14-9.6-47.8-6.6-65.8-1.7-1.9-3.9-3.5-6.2-4.7-12.8,2.6-14.1-5.7-15-15.9-4.1-5.8-7-11.9-8.8-18.1v-4.7c.5-2.3,4.7-6.2,5.1-7.5s-.7-3.6-.2-5.9c.7-3.7,4.7-6,5.3-7.9s0-5.8.6-8.8c2.2-9.5,11.7-10.5,19.3-6.5,7.7-25.9,14.8-52,22.5-77.9-2.5-5.4,5.7-28.5,13.2-24.6,4.3,2.3-1.2,22.8-2.6,27.3l-2.1,1c-5.4,28.6-10.6,57.3-16.8,85.8,4.9,2.7,8.5,2.7,12,7.7,5.3,7.7,4.7,22.2,7.6,26.2,1.3,1.8,15.5,13.1,18.4,15.4,20.4,16.2,34.6,23.5,60.5,28.2,3.5.7,7,.7,10.3,0Z"/>
  <path class="st39" d="M142.5,12.9c2.4,4.9,4.3,10.3,9.9,12.2,1.6,1.9-1.6,2.5-2.7,3.9-3.1,3.5-4.6,8.1-8.1,11.2-.9-2.3-1.7-5.9-3-7.8s-5.5-3.9-5.6-5.8,9.9-9.3,8.5-13.6h.9Z"/>
  <path class="st25" d="M245.8,404.2c-1.7.1-3.5-.2-5.2,0l-2.3,1h-7.5c-.5-2.8,1.4-1.8,3.2-1.9,3.5-.1,8.6-.7,11.8.9Z"/>
  <path class="st37" d="M225.1,405.1h-16.9v-.9c5.4.1,11.9-.9,16.9.9Z"/>
  <path class="st26" d="M72.1,65.4c2.3.5,4.6.3,6.9-.7l1.6,1.6c2.5,0,10.6,10.2,11.9,12.9,1.9,3.9,1.3,8.7,5,9.6-.2,4.3-1.4,6.8-3.8,7.5-3.2,6.6-12.9,14.6-20.6,13.1,1.3-6.8,4.7-17.5,4.7-24s-4.6-.3-7.4,1.1c-2,6.4-3.9,12.7-5.8,19.1-6-1.7-7.4-8.4-11.3-12.2-2.3-1.7-1.9-6.5.9-7.5,1.3-6,4.5-11.7,9.5-15.4,2-1.5,7.8-3.9,8.4-5.2Z"/>
  <path class="st4" d="M103.1,198.7l-7.4-12.5-2.9-1.1c4.8-2.1,6.3-7.3,9.9-10.8,2.7,1.8,3,5.2,4.8,7.4s3.8,2.1,4.1,3.4-10.3,9.5-8.4,13.5Z"/>
  <path class="st35" d="M97.5,88.9c2.8.7,6.9.6,10.3,1.4s13.1,3.1,14.4,4.2.8,2.6.6,2.9c-1.9,2-25,.1-29.1-.9,1.4-2.8.9-8.1,3.8-7.5Z"/>
  <path class="st7" d="M72.1,65.4c1.3-3.4,1.3-11.1,2.1-15.2s3-15.6,5.4-12.9l.9,29.1c-1.4,0-8.8,3.4-8.4-.9Z"/>
  <path class="st22" d="M360.6,155.8l-5,10c-.6-5.5-3.3-12.1-9.4-13.1.9-1.7,3.6-1.4,5.3-3.1s2.1-6,4.5-8.1c2.9,4.2,4,8.3,8.9,10.8l-4.3,3.6Z"/>
  <path class="st34" d="M54.3,86.1c-.5,2.1-.2,5.2-.9,7.5l-26.3.9c.1-1-.2-2.3,0-3.2.5-2.2,23.9-4,27.3-5.3Z"/>
  <path class="st14" d="M198.8,54.1c0,.1-1.8.2-2.8,1.4-1.7,2-2.6,5.1-3.7,6.5-2,2.5-2.5-2.2-3.6-3.8s-4.1-4.3-3.9-5.3,6.2-7.5,7-9c.9,2,7.7,9.3,7,10.3Z"/>
  <path class="st29" d="M112.2,58.1c9.2-1-7,12.6-9.1,11.6-4.8-2.2,4.6-11.1,9.1-11.6Z"/>
  <path class="st30" d="M89,119.9l5.4,12.9c.9,4.5-1.8,7.5-3.7,1.8s-1.9-10-1.7-14.7Z"/>
  <path class="st31" d="M54.3,70.1c-5.3-1.1-10.7-5.6-11.3-11.2,5.9-.1,8.8,6.8,11.3,11.2Z"/>
  <path class="st28" d="M231.4,34.6c4.4-1.2,6.5,3.6,3.1,6.9-5,4.9-8.3-5.5-3.1-6.9Z"/>
  <path class="st18" d="M39.3,125.5c-2.4-2.5,6.1-11,8.4-12.2.4,2.2-5.8,14.9-8.4,12.2Z"/>
  <path class="st32" d="M323.8,302.7c-2.7-4.5,4.2-7.2,6-4.6,3.5,5.1-4.3,7.4-6,4.6Z"/>
  <path class="st19" d="M357.3,268.2c1.8,1.4-.5,7.8-2.7,6.4s-2.3-3.6-1.8-5,3.6-2.1,4.5-1.4Z"/>
  <path class="st20" d="M165,272.8c-2.8,2.4-7.4.5-10.3,0,3.4,0,6.9.1,10.3,0Z"/>
  <path class="st11" d="M254.2,345.1c3.1-.5,4.4,1.9,5.8,4,6.1,9.2,11.1,35.1,11.2,46.2s0,3.2-1.5,4.2c-4.6,1.5-3.9-10.7-4.3-13.5-1-6.3-2.2-13.5-3.9-19.6-2-7.4-6.2-14-7.2-21.4Z"/>
  <path class="st11" d="M333.8,390.4c1.7,3.8-3.8,9-13.3,11.1-34.1,8.9-131.2,7.1-171.4-1-6-1-11.6-1.9-15-4.5-4.3-6.4,39.7,2,50,2.5,23,1.9,49.8,3.1,72.2,2.4,27.3-.7,56-4,77.5-10.5Z"/>
  <path class="st24" d="M232.6,181.8c.3.6-.3,1.2-1.9,1.9.6,3,3.6,4.9,9,5.6,3.5,3.5,5.5,3.8,6.1,1-2.4-4.1-1.7-5.6,1.9-4.7,3.7.7,7.5,1.1,11.3.9-2.5,10,.3,26,7.8,33.4,11.9,11.9,15.2-10.1,29.4-2.7s.1,33.4-14.3,34.9c-4.6.5-12.8-2.1-14.6-1.5s-7.5,7.9-9.9,9.9c-39.1,33.5-108,10.8-102.6-45.4,1.5-15.1,9.8-30.5,12.1-45.6,12.2,1.9,22.9-5.8,31-14.1,5,12.8,22.3,22.2,34.7,26.3Z"/>
  <path class="st6" d="M305.8,240c1.2-3.7,2.6-7.8,2.8-11.8.1-2.9-1-6.3-.8-8.2.2-1.8,3-5.6,3.6-7.7l7,10.9c4.9,2.4,4.6-1.2,3.1-5-20-48.2-114.2-90.8-163.8-75.1s-10.6,3.8-10.5,6.4c0,6,10-1.7,11.3-.5-2,5.6-3.7,8.6-.8,14.4s4.6,4.6,4.6,4.9c0,1.3-3.2,10.7-5.2,10.7-5.5,0-23.6-13.8-27.8-18.3-15.9-17.2-15.3-39.9,10.1-46.2,62.6-15.5,148.9,23.1,190.3,70.1,10.1,11.4,27.6,32.5,14,46.8-2.9,3-13.9,8.5-17.7,8.5h-20.2Z"/>
  <path class="st6" d="M313.9,55.5c6.6,4.7,13,12.7,18.2,18.9,9.1,10.9,16.6,23.1,25.4,34.2-3.2,0-6.3.2-9.4-.4-5.8-1.1-20.4-9.1-23.9-8.9s-7.9,6.2-11.7,5.6c-2-2.3,1.5-21.8-6.6-20.6l6.6,75.1c-34.9-26.9-75.4-45.8-119.2-52.6l38.9-26.3c16.5-8.2,32.1-19.1,49.3-25.7,11.9-4.6,21.1-7.3,32.4.8Z"/>
  <path class="st13" d="M303.9,215.6c-6-5.4-15.1-6.8-22.4-3.2s-4.9,4.6-8,6c-6.7-5.6-12.6-22.6-7.9-30.4s5.8-1.7,4.1-4.4-13.9-2.4-17.6-3c-14.1-2.6-34.9-9.2-44.8-20s-9.8-13.6-1.9-13.2,31.8,9.3,41,13.5c13.4,6.2,52.7,29.2,58.3,42.1s.6,7.7-.8,12.5Z"/>
  <path class="st24" d="M61.8,267.2c-1,1.2-20-12.7-20.3-14.5s1.7-11.9,2-12.7c1-2.8,2.1,1.5,2.7,2,1.2.8,1.9,1.1,3.4.9-.3-6.7-5.3-12.1-1-19.1.8-1.3,4.4-2,4.4-4.9,0-5.3-8.7-1.3-10.5-7-2.9-9.3,14-15.1,21.6-4.6s4.7,13.6,5.1,18.3c1.2,13.6-6.9,28.1-7.4,41.6Z"/>
  <path class="st10" d="M297,250.3c4.1-.9,6.3,13.7-2.4,16.4-6.5,2-11.4-2.8-13.6-2.3s-.9,7.6-5.8,10.2-11.7-4.4-15.3-8.8c3-1,8-8.3,10-8.8s10,1.4,14.6.6c4.9-.9,11-6.9,12.5-7.2Z"/>
  <path class="st9" d="M197,146.1c-5.5,9.5-17,19.1-28.6,17.8s-5.8-14.2-.7-16.7c7.6-3.8,21.1-1.5,29.4-1.1Z"/>
  <path class="st33" d="M51.3,195.6c-.3.2-7,2.4-7.3,2.1l.3-4,25.1-87.1c-3.8,21.9-8.2,43.7-12.9,65.5-.4,2,0,4.1-.5,6.1s-4,16.8-4.7,17.4Z"/>
  <path class="st27" d="M29.6,241.5c1.6-2.4,4-4.2,4.9-5.9s.8-4.2,1.5-5.1,4.7-1.1,6.1-2.8c-2.2,4.2-3.5,20.8-5.6,23-4.5,4.6-10.6,0-9.4-6.6s2-1.8,2.6-2.7Z"/>
  <path class="st3" d="M41.2,222.1c-8.3,5.9-18.4-4.9-18.3-13s2-5.7,4.7-3.9,7.7,6.6,8,7c1.7,2.4,1.8,7.5,5.6,9.9Z"/>
  <path class="st17" d="M205.4,282.2c5-.7,10-.6,15,0,.8,0,2.9-2,3.7-.5-6.2,5.1-12.3,10.4-20.2,12.5-1.4-.2-5.6-12.4-5.1-12.9,2.3.2,4.2.9,6.6.9Z"/>
  <path class="st1" d="M37.4,205.2c-10.2-1.7-14.1-20.6-.7-17.6,6.6,1.5,1.2,12.9.7,17.6Z"/>
  <path class="st16" d="M30.7,227.9c1.8,3.1-1.9,6.5-4,8.2-3.3-3-11.1-12.8-7.5-16.9s1.2-.4,2.2.6c1.5,1.6,2.5,3.3,4.4,5s4.8,2.8,4.9,3Z"/>
  <path class="st36" d="M247.6,185.5l-2.8.9c2.5,2,.9,3.5.9,3.7h-2.2c-2.8-3.3-7.3-4.7-11.6-4.7l-1.2-1.8c0,0-.9-.5-.9-.9l2.8-1c4,1.3,10.8,2.9,15,3.8Z"/>
  <path class="st2" d="M220.4,282.2c-4.7.3-10.3.2-15,0,3.8-1.6,11-1.6,15,0Z"/>
  <path class="st21" d="M137.6,349.5c-2.2.1-7.2.3-12.3.2,3.2-2.1,9.4-2.2,12.3-.2Z"/>
  <path class="st12" d="M212.6,249c-11,11-30.4,9.1-31.5-8,6.2-.8,10.3,2.4,17.3,1.8s15.6-6.5,18.6-5.5c4.3,1.4-2.6,9.9-4.4,11.8Z"/>
  <path class="st38" d="M197,214.6c-1.3,2-17.4-1.6-14.8,9.7.7,2.9,6.8,6.4,3.6,8.7s-6.4-2-7.5-3.8c-7-10.6,4.9-21.2,15.5-19.2s4.4,3,3.3,4.7Z"/>
  <path class="st23" d="M181.7,187.6c9.2-2.5,4.4,18.4-3,17.8s-3-16.1,3-17.8Z"/>
  <path class="st40" d="M234.3,201.7c7.2,7.5-12.4,28.1-10.6,8.6.3-3.6,6.8-12.6,10.6-8.6Z"/>
  <path class="st15" d="M194,175.3c3.3,5.4-6.8,4.3-9.5,4.8s-11.4,4.1-12,1.1c-1.3-6.5,19.6-8.9,21.5-6Z"/>
  <path class="st0" d="M245.8,190.2c.2,1.3,1.5,2.9.9,4.7-3.5.7-5.2-2.8-7.8-3.9s-8.8-2.4-9.6-3.5.9-2.5,1.4-3.8c5.5-.4,12,1.7,15,6.6Z"/>
</svg>
```


### public/magic-paper.svg
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Calque_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 545 580">
  <!-- Generator: Adobe Illustrator 29.5.1, SVG Export Plug-In . SVG Version: 2.1.0 Build 141)  -->
  <defs>
    <style>
      .st0 {
        fill: #452116;
      }

      .st1 {
        fill: #5db38b;
      }

      .st2 {
        fill: #fdf5e0;
      }

      .st3 {
        fill: #834220;
      }

      .st4 {
        fill: #f7f5e0;
      }

      .st5 {
        fill: #5ab288;
      }

      .st6 {
        fill: #36160f;
      }

      .st7 {
        fill: #874421;
      }

      .st8 {
        fill: #ed8132;
      }

      .st9 {
        fill: #3a1710;
      }

      .st10 {
        fill: #814222;
      }

      .st11 {
        fill: #4883a9;
      }

      .st12 {
        fill: #fdf5df;
      }

      .st13 {
        fill: #5bb289;
      }

      .st14 {
        fill: #ce563f;
      }

      .st15 {
        fill: #a25427;
      }

      .st16 {
        fill: #34140e;
      }

      .st17 {
        fill: #33140f;
      }

      .st18 {
        fill: #ee8231;
      }

      .st19 {
        fill: #21608b;
      }

      .st20 {
        fill: #35140f;
      }

      .st21 {
        fill: #5cb389;
      }

      .st22 {
        fill: #884622;
      }

      .st23 {
        fill: #58b186;
      }

      .st24 {
        fill: #57b187;
      }

      .st25 {
        fill: #fae3ac;
      }

      .st26 {
        fill: #fce7b9;
      }

      .st27 {
        fill: #c3783f;
      }

      .st28 {
        fill: #fefefe;
      }

      .st29 {
        fill: #f1f4e4;
      }

      .st30 {
        fill: #834321;
      }

      .st31 {
        fill: #854421;
      }

      .st32 {
        fill: #5cb388;
      }

      .st33 {
        fill: #205f8a;
      }

      .st34 {
        fill: #c37840;
      }

      .st35 {
        fill: #844321;
      }

      .st36 {
        fill: #9a927a;
      }

      .st37 {
        fill: #8e4b25;
      }

      .st38 {
        fill: #ca5039;
      }

      .st39 {
        fill: #9a5228;
      }

      .st40 {
        fill: #9f5226;
      }
    </style>
  </defs>
  <path class="st26" d="M338,580h-3c-8.7-4-17.9-7-26.7-10.8-26.1-11.2-57.1-23.2-82-36-2.1-1.1-3.4-1.8-5.3-3.2l-3.3-2c-8.3-1.8-19.1-11.6-3.7-10.1l6-.9,6.3,1.3c37.4,16.7,74.8,32.9,112.1,48.7,58.8-18.6,124.1-43.4,180.8-67.9-41.1-14.1-83.3-27.6-126.5-40.3l-4.8-2.8-1-2.5c-3.2-.6-4.7-3.5-1-3.5l1.7-1.6c4.6,1.4,9.8,2.7,14.1-.3l2.2.8c40.4,13.8,83.4,23.6,123.5,38,25,9,19.1,13-1.6,21.5-52.5,21.5-108.4,42.8-161.7,62.3-8.7,3.2-17.9,5.2-26.3,9.2Z"/>
  <path class="st27" d="M84,159c-2.5-4.6.4-9.4,3.2-13.3,11-15.2,35-16.4,44.4,1,25-8.2,32.7-35.6,25.8-59.1-.1-2,1-2.9,2.8-3.5,14.6,10.4,45.1,22.8,52.9-1.3l1.3-.2c17.6,10.9,42.8,25.9,60.8,7.6h2.2c9.4,6.7,18.2,8.1,29.5,8.4.8,4.2,1.5,8.5,2.1,12.9,0,0,1.6,1.8,4.9,5.3-4.9,10.1,4.6,47.1,4,61.5-1.3,34.1-29.1,59-61,65.5l-.6,2.1c-3.2.8-24.9,3.5-25.8,2.2s-.4-.9-.6-1.4c-2.2,1.2-5,1.3-8.5.1-20.3-.6-41.5-4.4-59.3-15.1l-3.2-4c-.4.4-.7.7-1.2.8-1.1.3-9.9-7.3-10.8-8.8l-10.5-10c-5.3-11.2-8.7-4.5-17.8-5.1-22.8-1.4-37.4-24.4-34.6-45.9Z"/>
  <path class="st0" d="M314,117c-8.7.1-8-10.7-8-17-5.7,0-10.9.4-16.4-1.1s-11.6-6.6-13.2-6.8-5.5,5.2-8.3,6.4c-13,5.5-30.7.2-42.3-6.7l-11.7-7.8c-4,21.4-31.2,15.1-45.4,7.9-1.7-.9-9-6.4-9.6-5.8,7.8,25.7-.6,55.1-28.4,63-11.1-22.7-43.6-13.5-46.6,9.9-11.1-14-12.5-35-5.8-51.3s6.1-9,6.6-11.5c.7-3.7-1.3-14.3-.9-19.8,2.1-26.4,27.2-58.3,56.3-54.2,2.1.3,6.5,2.4,7.3,2.4,1.2,0,15.2-11.5,19.1-13.5,29.8-15,77.2-12.1,106.4,3.4,3.9,2.1,17.4,13.1,18.7,13.4s3.8-.9,5.8-.9c42,1,39.9,54.5,23.4,81.4-1.8,2.9-5.6,6.1-6.8,8.7Z"/>
  <path class="st18" d="M147,220c4.7,0,8.4,5.6,12,8,3.6,2.9,4.6,5.3,3,7,5.6,9,12.2,17,19.7,24.1,13.7,10.1,41,8.4,47.3-9.1-2.3-1.9-2-2.8,1-3,1.3.5,23.8-2.4,27-3,25.4,15.2,45.4,40.5,57.1,67.4-1.2.7-2.1,1.9-3.1,2.6v2.5c-5.6,4.6-43.1,28-46.8,25.6s-.8-.7-1.2-1.1c-.5,2.9-5.3,2.7-6,0l-1.2-3.8c4.1-15.4,6.4-31.1,7-47-1.4,17.9-4,34.8-7.8,50.7,1.8-.1,2.4.5,1.9,2.2-3.3,11.8-4.9,23.6-4.9,35.6l-2,2.2-1.5,2.1c-7.3,1.5-14.4,3.9-21.3,7.2l-2.3-1.3c-1-1.6-.7-3.9,1-6.8-1-3.2-.6-5.2,1-6.2-4.1-6.7-9-13.6-15.8-17.7l-.2-2.3-2.5-2.2c-3.4-10.8-7.2-21.8-12.8-31.7-1.3.3-9.3,2.7-9.3,3.2.4,5.6,5.5,17.1,8.2,22.8.4,2.9-.6,5-3.6,3.8,0,.5.2,1.1,0,1.6-.4,3.4-26.5,12.2-31.5,8.4-7.2-3.2-13.9-5.9-21.9-6.7l-.8-2.4c-2.9,0-8.4-.5-8-4-3.1-1.5-5-9-2-11,0-1-.3-1.7-1.2-1.9-20-4.8-40.5-8.1-60.8-11.1-.3-.8-2.3,0-1.9-4.3,3.4-41,37.1-79.1,72.9-96.2s9.5-4.5,11-4.5Z"/>
  <path class="st11" d="M76,396c4.8-.6,9.3.7,13.5,4.1,21.4,6.2,46.3,5.4,68.1,1.9,9.1.4,18,2.3,26.7,5.7l.7,2.3c4.2-.3,8.7.9,13.4,3.3,2.7-.6,4.6,0,5.6,1.7,18,10,29,35.4,22.9,55.9s-2.4,7.6-4.9,9.1c4.7,6.7-8.3,12.4-13.8,13.9-44.4,12.1-89.4,7.8-133.1-1.5-4.4-.9-16.1-3.5-10-8.4-.9-.5-1.8-1.1-2.2-2.1-2.9-7.8,9.1-38,13.9-46.4l2.2-.5,2.7-1.1c6,1.2,11.9,2.7,17.6,4.5-3.6,10.4-6.9,20.9-10,31.6,3.8-10.7,8.1-21.1,12.8-31.3,18.1,2,36.1,4,54.1,5.9-26.1-3-51.9-7.2-77.2-12.6-4.2-3.1-8.4-4.2-13.8-4.7l-1.2-2.3c-2-10.1-4.9-20.7-2-31,2.7-1.4,13-1.4,14,2Z"/>
  <path class="st34" d="M127,338l2,11-1.7,1.6c-5.7-2.1-11.6-3.2-17.6-3.2l27.3,5.7c4,1.5,8.1,1.3,11.3,2.2s11.9,5.7,16.2,5.8,22.1-5.3,26.5-9c2-1.1,2.9,0,3,2,.2,1.6.8,2.6,1.8,2.9l16.2,5.2c7,2.4,11.8,7.3,15,13.9,1.7,7.6,1.4,6.6-2,13,0,4.6-2.9,12-8,11-2.4,1.4-2.4,1.7,0,1,3.2,1.1,2.3,4.6-1,4-3.1,3.4-7.3,5.4-12.6,6.1-3.5,2.8-8.3,2.4-14.3-1.2h-4.2c-6.4-1.9-18.2-5.6-24.5-5.9-4.6-.2-11.1,1.9-15.9,2.1-13.5.6-40.8,1-53.1-3s-8.5-5.8-15.4-7.1c-12-14.5-15.5-31.3-14-50,.7-5.3,2.6-12,3-17l1.1-2.9c15,.9,30,3.5,44.8,7.9,6.1.3,11.5,1.7,16.1,4Z"/>
  <path class="st34" d="M407,431c-2.4-.7-2.4.6,0,4-.6,4.5-.9,4.4-2,8-1.9-.8-2.2.5-1,4-.1.6,0,1.4,0,2-5.7,4.7-11.7,2.9-18,1l-2.1,1.4-13.7-5.2-1.2-2.2c-3.5-1.7-3.5-1.3,0,1,3.8,5.3-7.3,12.5-12.4,13-9.5.9-33.4-13.2-34.6-24.5-4.1-4.8-7.1-9.9-9-15.5-9.1-7.2-17.2-18-21-29l-4.2-2.5c-5.5-7.3-25.1-35.9-25.1-42.8s.1-1.7.3-2.6c8.6-1.4,40.5-20.9,48-27,19.2,28.4,33.5,59.8,47.4,91.1,2.6,2.8,21.2,5.4,26.8,7.2,5.9,1.8,22.5,8.4,22.9,15.3s-1.1,3.2-1.1,3.4Z"/>
  <path class="st25" d="M369,445c-.8-.2-.8-.6,0-1,5.8.7,11.7,4.4,17,6l-1,1c3.9.6,5.3,1.1,3,5-1.1,2.7-4.7,1.1-6.6,0-58.9,13.8-117.9,29.8-173.3,54.4-.5.4,9.5,5,11,4.5l.9,2.3c-2.7,4-7.7,3-11.5,2-2,5.5,7.1,6.3,10.1,8s1.8,2.6,2.4,3.1c-8.5-.3-19.7-12-26.6-12.9-4.3-.6-7.1.9-10.9.9-45.2.7-99.6,1.1-143.4-9.7-8-2-32.3-9.1-37.1-14.9s-2.5-17,5.9-14.4l1.7,1.5c-4.3,12.1,11.7,10.9,19.3,10.2s20.4-3.1,28.9-8.1c2.7-1.2,5.6-2.1,6.1,1.4.1,1-.2,2,.5,3,1.9,2.9,34.5,8.1,40.2,8.9,29.8,4,73.5,6.5,101.9-3.8s10.3-4.1,12-6,1.6-4,2.4-6.1c1.5-2.1,2.6-2.9,3.6-.5l8.4.5,1.6-2.1c20.1-2.8,65.4-10.3,75.3-29.6,2.3-9,2.4-18.5.1-28.5l1.9-1.8c3.4,4.7,7.3,9.2,10.4,14.1s2.2,7,5.5,10.5,21.1,13.7,26.6,13.5c5.1-.2,12.8-5.8,13.5-11.1Z"/>
  <path class="st36" d="M79,432c3,0,2.8,2.3,0,3-1.3,5.1-6.7,14-8.7,19.8-3.1,9-6.2,19.7-5.3,29.2-3.7-1.8-8,2.5-11.7,3.8-9.4,3.3-32.2,8-41,3.4s-4.8-6.8-3.3-12.2c3.7-13.1,25.1-32,36.1-40.4s13.3-8.2,18.9-13.6c5.1,1.4,14.5.7,15,7Z"/>
  <path class="st8" d="M62,346c1.6,6.6,1.1,13.5,2.3,20.2s6.7,21.4,13.6,28.1,1.9.7,3.1.7l-5,1c-4.7-.8-8.8.2-14-2s-4.9-2.3-4.9-4.4c1.9-14.5,3.1-29.1,4.9-43.6Z"/>
  <path class="st22" d="M65,325c22.4.2,44.4,5,66,10.5l-4,2.5c-18.5-.6-38.1-8.5-55.6-10.9-2.5-.3-5.2-.9-6.4,1.9,0-.9.2-3.4,0-4Z"/>
  <path class="st30" d="M405,443c-.4,1.3-.8,2.7-1,4-8.5-9-21-11.9-31.3-18.2s-1.3-5.8,2.3-4.4c9.5,7,22.7,8.9,30,18.6Z"/>
  <path class="st35" d="M407,431c0,1.3.2,2.8,0,4l-29-15.5c-1.5-7.5,12,.8,14.7,2.3,5,2.8,9.3,6.5,14.3,9.2Z"/>
  <path class="st2" d="M388,456c39.6,11.6,81.6,23.7,120.5,37,3.7,1.3,9.3,2.5,12.2,4.7s2.6.7,1.2,2.3-17.1,7.7-19.7,8.8c-41,16.9-85.8,33.5-127.7,48.3-9.2,3.2-25.7,10.1-34.3,11.7s-3,.5-4.5,0c-39-16.3-77-35-115.7-51.8s-3-.3-4.5-.9c-2.7-1.1-11.3-3.9-9.4-6.9,55.7-26.2,115.9-40.1,175.3-55.1,2.1,1.2,4.5,1.4,6.6,2Z"/>
  <path class="st39" d="M230,247c-.6.9-.8,1.9-1,3-1.3,3.8-2.9,5-6,7-16.8,10.4-51.5-6-61-22-1-2.4-2.5-4.5-3-7,13.6,9,32.2,14.4,48.4,16.2s14.8,0,22.6,2.8Z"/>
  <path class="st9" d="M211,194c1.9-1.9,9.6,7.4,11.7,8.8,8.4,5.7,18.9,6.8,28.9,6.2s8.8-3.9,9.5.4c-11.6,8.5-29.3,7.1-40.5-1.5s-12.2-11.2-9.5-14Z"/>
  <path class="st16" d="M250,190c-1.3-6,6.4-5.4,9.7-9.3s2-9.4-3.4-11.4-7.3.7-6.1-3.6c1.7-6.5,15.4.9,17.7,5.1,4.2,7.8-8.8,22.2-17.8,19.3Z"/>
  <path class="st6" d="M215,117c-1.7,2.6-8.4-.7-10.6-.9-12.3-1.4-18.5,11.9-21.9,12s-1.6-5.3-.3-7.4c4.4-6.9,15.2-11.6,23.2-10.6s12,3.3,9.6,6.9Z"/>
  <path class="st17" d="M272.2,110.2c1.9-3.3,14.5-3.7,18.1-2.9s22.1,14,12.2,14.8c-3.4.3-3.4-2.9-5.4-4.6-3-2.5-7.9-4.9-11.8-5.3s-9.4,3.4-11.6,2.7-2.2-3.4-1.4-4.8Z"/>
  <path class="st20" d="M201.7,153.2c5-.8,18.9,2.3,14.3,8.3s-5.9-3.1-11.5-2.5-10.2,10.3-14.2,7.1,6.9-12.1,11.3-12.8Z"/>
  <path class="st16" d="M271,162c-1.7-8.3,11.9-11.8,18.3-10.8,3.6.6,13.5,5.3,10.3,9.8-2.8,3.9-7-2.8-9.5-3.6-9.3-2.9-11.2,4.8-19.1,4.5Z"/>
  <path class="st11" d="M250,381l1.1-2c13.6,1.5,28.8,3.7,40.9,10,6.8,9.8,14.1,19.3,21,29,.5,15.8,6.9,28.3-7.5,40s-53.2,21-71.5,22l-9.8-.5c9.5-22.2,5.2-44.9-13.7-60.9-2.4-4,5.8-8.2,8.5-5.6l2.1-.6,7.9,8.4c.3-2,1.3-2.9,3-2.8.5-4.5,2.4-6.3,6.6-7.6,25.3-8.6,6.2-5.3-5.6,0l-2-1.4-2.3-.6c-2.4-5.1-5.5-14.1-3.7-19.4,7.4-2.7,17.1-7.8,25-8Z"/>
  <path class="st28" d="M263,341c7.4,17.2,18.4,32.7,29,48-8.5-1-16.4-4.2-24.8-5.7s-13-2.4-17.2-2.3c.2-4.5-.3-9,0-13.5s5.8-25.5,5-26.5c.6-1.9,1.4-1.9,2,0,1.9-.2,5.6,0,6,0Z"/>
  <path class="st34" d="M229,250c-1.8,8.8-1.7,10.4-10.7,13.8-28.2,10.7-45.9-4.2-56.3-28.8l11.1,9.4c16,10.6,39.9,22,55.9,5.6Z"/>
  <path class="st38" d="M211,356c-1.7,1.3-4,1.5-6.9.5-4.8.6-8.1-.2-10.1-2.5-1.8-.2-2.1-.2-3-2,3.9-3.3.3-4.3-.5-7-2.1-6.8-3.9-13.7-6.4-20.4.3-1.1,11.2-4.8,12.3-4.5,2.8.8,14.2,30.9,14.7,35.9Z"/>
  <path class="st15" d="M255,341c0-.1-1.9.3-2-.6-.2-2.2,4.1-18,4.8-22.2,1.9-12.6,3.4-25.5,3.3-38.2h3c2.7,20.5-2.7,41.1-7,61-.7,0-1.3,0-2,0Z"/>
  <path class="st10" d="M211,356c6.9,2.7,14.4,12.8,16,20-4.5-5.2-7.8-8.4-14.1-11.4s-18.6-4.9-20.4-7.6.5-1.9,1.5-3c5.9.6,11-.3,17,2Z"/>
  <path class="st40" d="M149,288c.4,12.7-1.4,25.7-4.5,38s-1.3,11.6-7.5,12c3.3-12.7,6.6-25.4,8-38.5s-2.2-12.3,4-11.5Z"/>
  <path class="st7" d="M129,349c3,1,5.1,2.9,8,4-2.4,1.7-7.5.3-10.3-.2-6.9-1.1-13.6-3.4-20.7-3.8-1.1-7.7,18.4-1.5,23,0Z"/>
  <path class="st33" d="M79,432c1.4-2.4.8-1.6,2.8-1.4,6.3.7,12.8,3.1,19,4.1,18.1,3,36.4,4.5,54.5,7.5s2.8,5.4-1.8,4.8l-50.4-7-17.1,43.9c-.4-16.3,5.8-30.3,12-45-6.4-.8-13.1-1.4-19-4,.2-.6,0-2.2,0-3Z"/>
  <path class="st33" d="M219,413l-8,3.5c16.3,13.5,25.1,34.7,17.5,55.5s-3.1,4.3-3.5,7l9,1c-4,.2-8-.2-12,0,8.2-20.6,5.3-40.2-10.5-57s-6.9-4-7.5-8c-.8-3.6,7.9-7.5,11-7,3.2-.3,5,1.9,4,5Z"/>
  <path class="st37" d="M215,408c-.4.5-10.4,6.9-11,7-6.8,1.4-12.9-3-19-5,2.5-5.2,12.5,2.2,14.4,1.8s1.9-2.1,3.4-2.6c4.3-1.5,9.2-1.8,13.2-4.3,2.6,1.4,2,3.5-1,3Z"/>
  <path class="st14" d="M231,409c4.4,1.5,2.7,5.6,1,9-.6,1-.8,5.5-3.4,5s-8.2-8.4-9.6-10-2.8-3.3-4-5c.7-.8.7-2.1,1-3,.6-1.5,1.3-1.7,1-4-.9-.3-.9-.6,0-1,3.5-2.9,5.9-7,8-11-.8,1.1,5.3,17.2,6,20Z"/>
  <path class="st3" d="M196.1,378.9c-.6-1.7-.3-5,2.2-4.7l21.6,9.4c3,1.5,2.9,6-1,5-6.7-1.7-15.5-8-22.8-9.7Z"/>
  <path class="st37" d="M217,400c.1.2,0,.6,0,1-1.2.9-.2,3.1-2.5,3.1s-20.3-7.5-20.5-8.6c-.6-3.1,1.9-3.9,4.4-3.5s18.1,7.1,18.6,8Z"/>
  <path class="st31" d="M369,444c0,.3,0,.7,0,1-4.4,2.2-19.2-10.6-11.4-11.9s11,8.2,11.4,10.9Z"/>
  <path class="st1" d="M332,494c-4.3-14.4,4.8-4.5,12-4,0-1.8-2.8-1.3-4-2.5-3.3-3.1.6-4.8,4-4.1s4.3,5.1,9.2,2.4.8-10.8,10.2-11.8,14.8,4.7,23.2,8.8c5.7,2.8,15.4,2.2,17.1,11,3,15.6-31,25.5-42.8,26.3-1.7,1.5,13,12.4,5.5,13.1s-7.9-10.8-11.2-11.9-7.5.2-10.7-.3c-5.7-.8-15-3.7-18-9s-1.4-6.6-1.7-6.8c-.6-.5-12.5-1.7-15.1-2.4-5.7-1.5-11-4.7-16.8-4.7-.4-2.8.3-1.5,1.5-2s4.7-2,5-2h32.5Z"/>
  <path class="st23" d="M332,525c-6.4,1.5-16.9,0-16,9l38-8c-.5,4.5-7.9,3.3-10.9,5.6s-2.3,6-8.1,4.4l2.5-4c-3.1,1.7-25.2,7.2-26.5,6l2-9c-1.7-.8-7.3,1.6-8,1-1.2-1.1,1.3-2.6,2.4-3.1,1.8-.8,21.8-5.1,22.9-4.8s1.9,1.6,1.6,2.9Z"/>
  <path class="st24" d="M408,507c.1-1.2-.6-2.1.6-3.1s18,.6,20.9,1.1,3.1,4.1-.9,4c-6.3,0-14-2.7-20.6-2.1Z"/>
  <path class="st13" d="M411.9,516.1c.2.4.2,2.8,0,2.9-.7.7-17.5-3.2-18.4-3.9s-.4-2-.6-3.1c1-1.1,18.4,3.3,18.9,4.1Z"/>
  <path class="st19" d="M232,418c.1-3-.3-6.1-1-9l18.9-6.5c7.3,1.3,3.2,4.6-1.2,6.7-6.4,3.1-12.5,2-16.7,8.8Z"/>
  <path class="st12" d="M366.8,486.3c8.3-.9,21.4-.9,28.6,3.9,13.4,9-8.1,19.7-16.1,22.6-11.7,4.3-32.4,7-43.7,1.1s-6.4-4.4-5.6-9.3c1.5-9.3,28.5-17.4,36.8-18.3Z"/>
  <path class="st4" d="M330,497c-1.3,7.7-10.7,4.1-16,2.5s-4.8-.9-5-2.5h21Z"/>
  <path class="st29" d="M377,482c-3.1.3-7.1-1.5-9-4,3.3,0,7.4.7,9,4Z"/>
  <path class="st5" d="M379,504c.2.1,1.2,3.8,1,4-3.5,1.3-8.1.4-11.3,1.2s-3,2.5-4.4,2.6c-3.8.4-3.7-5.6-2.3-7.9,1.8-.2,2.6,1.7,4.3,1.7s12.2-2.1,12.7-1.7Z"/>
  <path class="st21" d="M378,491c.5,5.3-5.1,5.6-9,4,.3-4.8,5.4-4.1,9-4Z"/>
  <path class="st32" d="M347.7,499.2c1.9-.6,6.9-.5,6.3,2.3-4.2,5.8-12.7-.3-6.3-2.3Z"/>
</svg>
```


### public/manisfest.json
```json
{
  "name": "Minimoji",
  "short_name": "Minimoji",
  "description": "Transformez les dessins d’enfants en mini-films animés en 24h. Magique, ludique, 100% personnalisé.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#8B5CF6",
  "orientation": "portrait",
  "icons": [
    {
      "src": "public/favicon.ico",
      "sizes": "48x48",
      "type": "image/x-icon"
    },
    {
      "src": "/public/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/public/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```


### public/mobile-phone.svg
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Calque_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 717 1075">
  <!-- Generator: Adobe Illustrator 29.5.1, SVG Export Plug-In . SVG Version: 2.1.0 Build 141)  -->
  <defs>
    <style>
      .st0 {
        fill: #f57f40;
      }

      .st1 {
        fill: #2d3547;
      }

      .st2 {
        fill: #484b64;
      }

      .st3 {
        fill: #faf8eb;
      }

      .st4 {
        fill: #191e2e;
      }

      .st5 {
        fill: #2b3446;
      }

      .st6 {
        fill: #ba4325;
      }

      .st7 {
        fill: #faf7eb;
      }

      .st8 {
        fill: #191f31;
      }

      .st9 {
        fill: #1a1f2f;
      }

      .st10 {
        fill: #2d3546;
      }

      .st11 {
        fill: #383e51;
      }

      .st12 {
        fill: #faf8ec;
      }

      .st13 {
        fill: #fcb376;
      }

      .st14 {
        fill: #f57e40;
      }

      .st15 {
        fill: #3a4053;
      }

      .st16 {
        fill: #192132;
      }

      .st17 {
        fill: #fcf9e9;
      }

      .st18 {
        fill: #fefaea;
      }

      .st19 {
        fill: #feefc4;
      }

      .st20 {
        fill: #2c3546;
      }

      .st21 {
        fill: #2c3547;
      }
    </style>
  </defs>
  <path class="st4" d="M220.8,86.3c23.5-2.5,46.6,2.5,69.7,4.7,74.3,7.3,148.9,14.1,223,23s81.2,7,104.4,20.6c38.9,22.7,42.7,64.9,39,105.8-6.4,69.7-23.9,141-31,211-26.4,148.9-41.4,300.1-68.1,448.9-6.8,37.7-15,74.6-56.9,87.1-25.9,7.7-77-2.4-105.1-6.4-44.7-6.4-89.5-13.7-134-21-44.7-7.3-95-14-138.6-24.4-64.5-15.3-76.9-47.5-69.9-110.9,16.7-150.7,49.9-302.3,68-453,9.7-56.8,16.6-114.1,26-171,7.9-47.6,12.9-107.9,73.6-114.4Z"/>
  <path class="st2" d="M220.8,98.3c19.7-2.2,47.5,1.8,67.7,3.7,31.4,3,62.7,7.7,94,11,58.7,6.2,128.9,8.5,185.7,21.3,47,10.6,50,48.6,43.7,90.1-32,210.9-61.5,422.2-95.1,632.9-8.4,52.6-10.7,117.9-81.2,114.8-42.8-1.9-96.6-12.5-139.7-19.3-65.3-10.3-131.4-20.8-195.4-36.6-27.4-11.7-38.2-34.8-38.1-63.7,30.1-230.1,68.5-459.1,102.1-688.7,5.2-31.3,22-61.6,56.5-65.5Z"/>
  <path class="st15" d="M472,979l12.9-7.6c34.9-24.8,36.7-76.6,42.9-116.1,32.2-203.5,64.3-407.8,92-612,3.8-28.2,10.8-60.3-3.4-86.4l-10.5-16c10.8,5.4,20.6,13.1,27.2,23.3,18.6,28.7,13.6,61,9.7,93.1-16,130-39,259.8-58.7,389.3-10.1,66.5-18.9,133.3-29.3,199.7-4.8,30.8-10.6,90.9-31.3,113.7-6.5,7.1-27.6,19-37,19h-14.5Z"/>
  <path class="st9" d="M223.8,154.3c18.6-.6,41,3.8,59.7,5.7,77,7.7,154.7,16,231.1,26.9,22,3.1,49.2,1.9,63.8,21.2,11.6,15.3,8.6,30.6,6.5,48.3-7.4,62.4-18.7,125.9-27.7,188.3-16.6,114.9-32,230.2-51.4,344.6-2.8,16.5-5.2,36.1-9,52-10.1,41.7-42,36-76.1,31.6-54.5-7-110.6-16.4-165-25-38.5-6.1-79.9-11.4-117.9-19.1-10.8-2.2-21.8-4.7-30.9-11.1-27.5-19.3-15-50.2-11-77.3,20.3-139.2,40-278.6,61.3-417.7,6.1-39.9,10.8-87.3,20.2-125.8,5.9-24.4,19.7-41.6,46.5-42.5Z"/>
  <path class="st16" d="M243.7,869.2c6.4-1.1,14.2.2,20.6.9,12.1,1.4,39.6,4.9,50,9,24.9,9.7,17.5,46.9-9.9,47-10.9,0-34.1-4.3-45.7-6.4s-27-4.5-32.3-19.7c-4.3-12.5,4-28.5,17.2-30.7Z"/>
  <path class="st8" d="M450.6,144.4c4.3,4.3,2.9,13-3.4,14.4-39.3-1.6-78.3-8.8-117.6-12-5.3-2.3-8.1-6.5-5.6-12.2s7.9-4.8,13.4-4.6c32.9,1,68.6,10,101.9,11,3.7,1,8.2.4,11.2,3.3Z"/>
  <path class="st19" d="M222.8,165.3c18.5-1.7,50.1,3.6,69.7,5.7,43.7,4.6,87.3,10.8,131,16,39.7,4.7,82.6,6.6,121.7,14.3,28.6,5.6,33.7,22.4,30.6,49.1-5.9,50.6-15.5,101.7-22.7,152.3-7.9,55.2-15,110.6-23.3,165.7-12.6,84.2-24.1,172.5-40.1,255.9-4.2,21.9-6.9,39.8-33.2,41.8-7.7.6-18-1.2-25.9-2.2-87.1-10.2-177.8-26.5-264.4-41.6-26.1-4.5-65.4-3.2-66.9-38.9,21.7-145.9,42.1-292.2,64.4-437.9,6.9-44.9,12.7-92.3,21.5-136.6,4.7-23.6,10.1-41.1,37.5-43.5Z"/>
  <path class="st11" d="M249.8,878.3c7.5-1,26.2,2.5,34.6,3.9s24.2,2.9,30.2,8.8c9.7,9.5,2.6,25.1-11,25.1s-30.4-3.5-40.9-5.2-28.4-5.1-26.6-20.4,6.8-11.3,13.8-12.2Z"/>
  <path class="st18" d="M468.1,615.1c-3.2,5,9.9,18.6,3.9,25.4s-11.2-2.4-14.4-4.7c-5.5-4-10.7-9.7-15.1-14.9s-3.9-8.6-8.5-9.5l-233.3-31.7c-28.2-4.2-41.8-19.1-39.7-48.1,11.6-63.6,15.6-130.6,28.2-193.8,4.7-23.7,15.6-39.3,42.2-38.9,35.5.6,74,10.7,109.8,12.2,41.4,6.8,83.4,10,125,16,28.7,4.1,64.9,5.1,64.7,43.3l-30.3,211.8c-3.7,12.1-10.4,24.2-22.4,29.6s-9.9,2.8-10.2,3.3Z"/>
  <path class="st13" d="M299.7,427.2c7.6-1.2,11.3.9,17.9,1.7,23.3,2.7,51.1,4.8,73.6,10.4s22.5,15.6,21.8,32.2-5.1,44.4-8.2,62.8c-3.9,23.4-8,40.8-36.4,39.6-19.2-.8-46.6-5.6-65.9-9.1-28.6-5.2-39.6-9.2-36.6-41.3,6-23.3,4.9-51.8,11.5-74.5,3.1-10.6,10.9-19.9,22.3-21.7Z"/>
  <path class="st5" d="M251.9,343.1c1.4,1.2,6,30.6,7.1,34.9,6.1-4.6,12.9-26.8,17.4-30.1s7.2-.2,10.5.1l-6,42.9c-2.9-.2-7.5,1.3-8-2.5s4.6-19.9,4-26.5l-15.2,25.8c-.7.4-5.3.5-6.2.3-1.5-.4-6.2-27.3-7.6-31.1l-4,30c-.4.4-7.6-.8-7.9-1.1-1.4-1.6,5.6-37.7,6-42.8.4-.3,9.4-.3,9.8,0Z"/>
  <path class="st1" d="M438,383c1.9,0,1.3-4.5,2-5s6.4,1,6.7,2.4c-2.6,8.5-1.5,28.2-5.9,34.9-5.7,8.9-29.6,7.3-27.9-6.4,2,1.4,5.2.4,7,1.5s1.3,3.1,3.9,4c8.4,2.9,11.7-3.3,12.1-10.6-16,13.1-27.1-4.9-19.4-20.9s18.1-9.7,21.4,0Z"/>
  <path class="st21" d="M477.9,400.9l-21.9-2.9c-.1,3.7,1,8.3,4.9,9.5,7.6,2.4,8.6-4.7,16.1-1.5-4.8,13.8-27.8,9.2-28.5-5.5-1.2-27.1,35.4-26,29.4.4Z"/>
  <path class="st20" d="M318,381l-22-3c-.6,4.1.5,9.2,4.9,10.6,5.7,1.8,9.5-4.7,16-2.6-4.4,12.8-25.4,11.3-27.8-1.7-5.5-30.3,32.6-32.1,28.8-3.3Z"/>
  <path class="st1" d="M406.9,405.9c-.9.6-4.8.3-5.9-.3v-4.5c-17.6,14.5-31.6-15.2-5.5-15,2.2,0,6.3,2.7,7.4-.6,1.9-5.8-4.6-7.2-9-5.9s-1.8,2.4-2.6,2.6c-2.4.5-4.9-1-7.3-1,1.7-11.4,21.7-10.6,25.2-1.7s-.9,25.6-2.4,26.6Z"/>
  <path class="st1" d="M349,376c-8.2,1.5-6.2-1.5-9-4.5s-12.3.9-8,5,18.1,3.1,15.9,13.7-27.1,10.2-27.8-3.3c7.4-1.7,6.6,1.9,10,4.5s7.5,2.1,9.9-1.1c1.6-5.7-13.8-6-16.2-11.6-7.2-16.7,23.9-19.1,25.2-2.8Z"/>
  <path class="st10" d="M380,380c-8.4,1.2-5.6-.7-8.5-4-4.2-4.7-12.6-.2-8.5,4.5s18.2,1.5,14.7,14.7-28.2,8.7-26.7-5.3c1.9.7,5.4.6,7,1.5s5.2,8.2,10.4,4.4c8-5.8-11.5-8.4-13.9-14-6.7-15.7,24.5-18.2,25.5-2Z"/>
  <path class="st6" d="M343,470c1.5,2,1.7-.7,2.1-1.4,1.6-3.3,2.3-6,4.9-9.1,16.6-19.2,41.1,2.9,22,19.5,16.7,1,19.6,4.5,18,20.5-.5,4.9-1.5,17.1-8,15.5-1.1,8.9-1.6,20.7-4.3,29.2-3.6,11.1-12.2,10.3-22.2,9.8s-34.4-4.2-47.7-7.3c-15.3-3.5-19.1-3.9-17.8-21.2s4.2-18.2,3.6-22.1-2.2-2.3-2.8-3.7c-1.2-2.6,1.4-19.6,2.5-23,3-8.9,13.2-7.2,20.7-5.8-13.8-21.4,17.1-34,27-10.5s1.7,9.1,2,9.5Z"/>
  <path class="st17" d="M428.7,383.2c11.3-1.8,10.7,19.2.7,19.8-10.2.7-9.6-18.4-.7-19.8Z"/>
  <path class="st12" d="M472,395c-4.3-1.1-20.8.3-12.3-6s12.1-.9,12.3,6Z"/>
  <path class="st3" d="M311,375l-15-1.5c3.7-8.7,15.1-9.4,15,1.5Z"/>
  <path class="st7" d="M402,392c.8,11.1-17.1,8.1-12.1,1.4s7.9-.9,12.1-1.4Z"/>
  <path class="st0" d="M374,514c-1.4,7.9-1.2,18.9-3.2,26.3s-3.2,5.2-6.3,5.7l-22.5-3,5-32,27,3Z"/>
  <path class="st14" d="M328,508l-4,33c-4.7-1.4-22.8-3.2-25.1-6.4-3.3-4.6,3.2-23.1,2.1-29.6l27,3Z"/>
  <path class="st0" d="M379.9,505.9l-30.9-3.9,2-17c4.9,1,27.4,1.6,30.1,3.4s-.5,14.5-1.2,17.4Z"/>
  <path class="st0" d="M332,482l-2,16.9-30.9-3.9c1.9-3.5.2-15.8,4.7-16.8s22.2,4.7,28.3,3.9Z"/>
  <path class="st13" d="M351,475c1.5-5.5,8.5-16.6,15-14.6s5.6,9.4-.1,13c-5.4,3.4-9,2.3-14.9,1.6Z"/>
  <path class="st13" d="M336,473c-4.3-.3-9.4-.9-12.9-3.6-12.6-9.3,4.2-22.6,11.1-4.1s1.2,5.2,1.8,7.7Z"/>
</svg>
```


### public/potion1.svg
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Calque_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 770.7 794.3">
  <!-- Generator: Adobe Illustrator 29.6.0, SVG Export Plug-In . SVG Version: 2.1.1 Build 207)  -->
  <defs>
    <style>
      .st0 {
        fill: #eae4da;
      }

      .st1 {
        fill: #1d2c4a;
      }

      .st2 {
        fill: #fdf5dc;
      }

      .st3 {
        fill: #facc15;
      }

      .st4 {
        fill: #4b82db;
      }

      .st5 {
        fill: #63bff9;
      }

      .st6 {
        fill: #61bef9;
      }

      .st7 {
        fill: #e0aa50;
      }

      .st8 {
        fill: #3f9bdf;
      }

      .st9 {
        fill: #409bdf;
      }

      .st10 {
        fill: #845022;
      }

      .st11 {
        fill: #212c4e;
      }

      .st12 {
        fill: #fffbf0;
      }

      .st13 {
        fill: #1c2a42;
      }

      .st14 {
        fill: #b87a2e;
      }

      .st15 {
        fill: #f7ebd0;
      }

      .st16 {
        fill: #3572cc;
      }

      .st17 {
        fill: #4a82db;
      }

      .st18 {
        fill: #1f2d4e;
      }

      .st19 {
        fill: #3f9adf;
      }

      .st20 {
        fill: #02010f;
      }

      .st21 {
        fill: #202e4e;
      }

      .st22 {
        fill: #63c0fa;
      }
    </style>
  </defs>
  <path class="st11" d="M237.4,670.1c-31.8-24.9-58.2-56.9-70.5-96-26.1-83,9.5-160.9,70.5-216.5,12.6-11.5,45.2-32.4,52-45s3.8-36.6,4.8-53.9c-9-4.8-17.3-9.2-22.7-18.3-11.9-20-5.1-45.3,16.1-55.5s14.7-4.6,21.5-7.3c-5.2-27.1-23.6-62.8,14.4-72.8,31-8.1,95.1-8.4,125.8.8,35.2,10.5,16.8,47.4,12,72.5,18.9,3.2,38.2,11.2,42.8,31.8,4.9,22.4-6.9,40.6-27.7,48.2-.8,14-.7,29.7-.5,44.3s-.1-1.1.5-1.3c1.8,3.9,2.6,7.9,4.8,11.7,7.4,13,41.9,35.4,55.2,47.8,57.3,53.2,89,123.3,70.5,202.5-10.3,44-38.5,79.7-73.5,107l-.2,2.2c-71.6,50.1-167.7,59-250,24.9s-38.2-16.7-44.1-24.4-1.2-1.8-1.7-2.8h0Z"/>
  <path class="st0" d="M237.4,670.1c76.7,53.2,183.9,60.6,267,17.5,7.9-4.1,22.3-15.3,29-17.5s4.8-1.2,7.5-1c13.3.8,50.2,8.9,60.9,16.2,15.7,10.7-5.3,19.3-15.1,22.6-43.7,14.5-112.1,15.8-158.8,17.2-70.7,2.1-156.6,3.3-225.6-12.3s-62.3-17.5-23.3-32.7,13.7-4.1,20.3-5.7,29.6-6.9,38.2-4.3h-.1Z"/>
  <path class="st3" d="M174.9,161.2c2.4,2.2,3,7.1,4.2,10.4,1.4,4.9,3.2,9.6,6.3,13.9,2.7,4.1,6.7,7.8,11.1,10.4,4.1,2.6,9.7,4.4,13.8,6.6,6.7,3.5.4,6.6-3.8,8.5-7.7,3.3-15.8,7.7-20.7,14.7-3.4,4.9-5.6,10.8-7.4,16.4-3.1,8.7-4.8,10-7.9.3-4-14.8-14.2-26.3-28.7-31.6-2.6-1-5.6-1.9-8-2.8-1.2-.5-3.5-1.2-3.5-2.4,0-.8,1.5-1.5,3.8-2.3,3.3-1.1,8-2.6,11.6-4,11.1-3.8,19.4-13,23.2-23.7.5-1.6.9-2.7,1.3-4.2.9-2.4,2.2-10.9,4.7-10.3h0Z"/>
  <path class="st3" d="M585,166.3c1,.8,1.5,3.3,1.8,4.9,1.1,5,2,9.7,4,14.3,1.6,4.4,4.8,8.5,8.7,11.4,4.4,3.6,9.4,6.6,14.3,8.1,2.7,1.1,16.6,3.2,7.9,6.5-3.4,1.2-7.7,2.2-11.2,3.4-4.7,1.4-8.1,4.1-11.6,7.7-3.6,3.6-7.1,7.6-9.1,12.2-1.3,3-2.4,6.3-3.3,10.3-.6,2-.8,4.7-2.4,6.1-.2,0-.2.1-.5.1-2.3-.8-2.3-7.5-3.1-9.8-2.7-9.3-8.6-19.3-17.3-24-3.2-1.8-6.5-3.1-10.2-4.3-2.3-.7-4.8-1.4-6.7-2.2-1.6-.6-2.7-1.3-2.8-2-.1-1,1.2-1.5,3.2-2.2,1.5-.5,3.3-.9,4.9-1.2,5.1-1,9.3-2.4,13.8-5.6,4-2.8,8.2-5.9,10.8-10.1,3.4-6.1,4.8-13.1,6.7-20,.4-1.1.9-4.1,1.9-3.7h0Z"/>
  <path class="st3" d="M150.7,328.1c1.3,1,1.7,2.9,2.3,4.5.9,3.1,1.9,6.3,3.5,9.2,2.9,4.7,7.8,7.3,13,9.5,1.6.8,8.2,2.5,3.7,4.2-8.9,2.6-16.2,7.1-19.9,16-2.8,8.5-2.6,9.3-5.9.2-.8-1.8-2.2-3.6-3.1-5.3-.9-1.5-1.7-2.8-2.8-4-3.6-3.6-10.7-4.8-14.7-7.5-1.7-1.4.5-2.5,1.8-3.1,13-5,16.5-6.1,20.3-20.2.3-.9.6-1.9.8-2.6.3-.8.6-1.1.9-.9h0Z"/>
  <path class="st3" d="M540.9,263.2c1.1.9,1.5,2.7,2.1,4.1.7,2.1,1.7,4.3,3,6.3,1.6,2.6,4.2,4.9,7,6.3,2.2,1.3,9.5,3.1,4.9,6.1-7.7,3.6-13.4,7-15.6,15.7-.4,1.2-.9,3.1-1.7,3.5-.3,0-.6-.3-.9-1-.6-1.1-1-2.7-1.4-4.1-.8-3.2-2.3-5.8-5.2-8.3-2.9-2.5-7-3.9-10.3-5.6-.9-.5-2.7-1.3-1.6-2.4,2.7-1.6,6.5-2.3,9.2-4.1,3.4-2.2,6.3-6.1,7.7-10,.6-1.7,1.3-4.2,1.9-5.7.3-.7.5-1.1.9-.9h0Z"/>
  <path class="st20" d="M476.4,258.1c-.4,14.3.6,28.7,0,43s.3,3.1-1,1.5v-45c.3-1.4,1,.5,1,.5Z"/>
  <path class="st15" d="M315.4,264.1c7.5.9,32.1,9.1,32.1-4.5s-3-7.1-6-8.1c-15.5-4.9-47.6-2.8-56.5-21.5-10-21.3,10.3-34.4,29.4-34.9,1.6,15.5,16.6,20.1,29.8,22.7,25.9,5.2,70,5.3,95-3.4s14.1-9.2,18.9-19.2c23.3-.5,42.8,23.4,21.9,41.9-14,12.5-64.5,15.8-84,17-6.3.4-13.9-.8-19.9,0-11.1,1.6-9.7,16.9,2.9,16.9s8.2,0,10.4,0c25.4-.1,46.3-3,71.1-8.1v42.5c0,21.6,54.3,56.6,70.5,72.5,116.1,113.6,69,277.8-87.7,314.3-63.7,14.9-133.6,4.7-188.3-31.3-88.3-58.1-104.6-166.3-42.5-251,15.8-19.8,37.6-42.5,60-59,2-1.8,3-2.5,5-4l15.3-12.2c20-14.9,20.5-38.6,19-61.5-1-6.2.3-9.3,3.8-9.4l-.2.3Z"/>
  <path class="st14" d="M318.4,126.1c25.5,13.7,60.7,14.4,89.8,12.6,14.8-.9,33-2.5,45.2-10.6,1.2,3.3.4,8.4-.2,12.3-1.3,7.9-4,18-6,26s-7.6,29.1-8.7,30.3c-2.9,3.1-27.1,6.9-32.5,7.5-18.9,2-42,1.5-60.5-2.5-8.3-1.8-12.5-2-15.4-10.6-4.3-12.2-10.8-38.1-12.3-50.7s-1-11.6.8-14.3h-.2Z"/>
  <path class="st7" d="M453.4,128.1c.9,3.2-2.2,4-4.5,5-26.2,11.4-99.5,10.9-125.2-1.8-2-1-5.2-2.6-5.3-5.2.8-1.1,3-2.6,4.3-3.2,21-10.3,97.8-8.5,120.9-1.5,4.5,1.4,8,2,9.8,6.7Z"/>
  <path class="st2" d="M315.4,264.1c-1.2,1.2-2.8.2-3.1,2.4-1.3,9.8.9,22.7,0,33.1-1.9,24.8-16.9,34.4-35,47.5,6.7-7.2,15.7-11.9,22-19.5,9.1-10.9,11.3-22,12-36s-.4-18.4,0-27.5c1.3.1,2.7-.2,4,0h.1Z"/>
  <path class="st2" d="M272.4,351.1c-20.1,17.8-41.6,35-57.2,57.3s-2.3,3.8-2.8,1.7c13.9-19,29.5-34.8,47.5-50,3.7-3.1,8.2-6.8,12.5-9Z"/>
  <path class="st18" d="M328.4,401.1c18.1-16.7,50.1-7,53,18,38.9,0,77.8,2.3,116.5,6,2,.4,3,2.7,3.6,5.1s2.5,1.8,3.3.4l1.2-2.3c.7-1.3,2.1-2,3.5-1.7,12,2.1,28.7,2.4,38,9.9,19,15.3,28.4,68.8,27,92.1-10.5,180.3-313.9,203.6-370.3,37.2-12.8-37.8-9.7-100.6,19.3-130.8,15.6-9,34.5-13.5,52.3-12.1l41.6-3.4c2-6.9,4.7-14.6,11.1-18.5h-.1Z"/>
  <path class="st12" d="M223.4,435.1c4.4-4.6,8-3.7,10.5-6,4.6-4.4,11.5-17.2,17.5-23.5,22.7-23.9,73.3-57.9,83.3-87.7,4.4-13,1.6-30.9,22-23.5s9.8,6.8,9.8,15.3c0,36.7-41.2,67.2-66.1,89-7.5,6.5-15.9,15.7-23.4,21.6s-2.3.9-3.5,1c-.2,1.7,3.5,1.1,4.5,1,13.1-.9,26.2-3,39.4-3.1.6-6.7,3.5-11.8,8-16.5s2.6-3.5,3-1.5c-5.8,5.4-8.3,11.7-10.7,19-31.5,3.7-64.7,2.2-94.3,15h0Z"/>
  <path class="st1" d="M406.1,336.4c34.9-3.8,45.3,47.1,12.2,57.2-41.8,12.8-55-52.6-12.2-57.2Z"/>
  <path class="st10" d="M343.1,153.3c13.3-2.7,15.8,25.7,4.7,26.8s-14.3-24.8-4.7-26.8Z"/>
  <path class="st17" d="M536.4,466.1c.8,1.9-.7,3.7-4.7,5.5,7,22.5,5.3,46.7-.7,69.3-1.2,4.6-11.1,33.4-16.3,35.8-8.1,3.6-21.8-8.4-21.2-17.2-1.8,9.1-8.2,15.7-17.2,17.8,11,.2,20.3,16,17.9,25.7-2.1,8.3-42.9,27.8-49.2,30.1-56.9,20.9-130.7,14.1-182.9-15.6l-.5,1.5c-2,0-2.8-1.4-4-2.5-40.1-36.4-55.6-89.4-37.3-141.3,1.6-4.5,4.1-8.6,5.3-13.2,5.4,2.9,9.3,5.3,15.2,7.3,52.8,17.3,141.2,14,197.3,11.7,26.3-1.1,75.2-3.5,98.5-15h-.2Z"/>
  <path class="st16" d="M532.6,467.9c5.9-3.6,7.5-3.5,12.7,11.1,53.4,150.3-169.6,223.5-282.9,142.1-8.6-6.4-13.8-11.8-1.6-7.9,9.5,3.1,20.3,8,30.2,11,53.6,16.4,116.8,19.4,166.1-10.1,7.7-5.2,15.1-13.2,14.2-22.4-.1-6.8-4.9-12.4-4.8-19.1.5-6.9,7.3-13,13.6-13.9,6.8-.9,13,3.6,19.9,2.3,13.1-2.9,18.3-22.8,21.5-34.9,1.3-5.6,2.3-11.2,2.9-16.9,1.6-12,.3-33.9,8.1-41.4h0Z"/>
  <path class="st4" d="M536.4,445.2c2.1,1.7-8,6-9,6.5-27.6,11.8-69.5,12.4-99.5,13.5-43.5,1.6-90.7,2.7-133.9-2s-62.5-9.1-62.5-16.5c7.8-3.4,17.9-4.5,26.5-5.5,16-1.8,34.9-3.3,51-4s7.2,0,10.8,0c10.5,29,51.1,28.1,61.3-1,52-.6,103.8,2.5,155.3,9.1h0Z"/>
  <path class="st8" d="M361.1,438.8c-6.2,5.3-17.8,4.7-23.2-1.7-12.3-14.3,3.3-34.7,19.8-26.8s12,21.1,3.5,28.4h0Z"/>
  <path class="st19" d="M399.7,356.5c12.5-12.6,31.8,7.6,18.6,19.1s-30.9-6.6-18.6-19.1Z"/>
  <path class="st21" d="M342.9,533.6c33.6,29.6-6.1,85.5-46.9,60.4-45.8-28.2,4.1-98,46.9-60.4Z"/>
  <path class="st18" d="M397.8,502.6c32.3-34.5,85.9,17.5,51.1,51.6-32.6,32-84.9-15.5-51.1-51.6Z"/>
  <path class="st13" d="M411,613.8c-7.4,7.9-21.6,8.7-30.2,2.3-19.8-14.9-3.2-47.2,21.5-38.5s19.1,24.9,8.7,36.1h0Z"/>
  <path class="st22" d="M259.1,489.4c22.7-4.7,28,28.1,7.5,31.5-22.4,3.8-27.1-27.5-7.5-31.5h0Z"/>
  <path class="st6" d="M344.1,413.4c12.7-3.8,9.2,13.9-.2,13.9s-4.9-12.3.2-13.9Z"/>
  <path class="st22" d="M401.6,366.9c-3.2-3.3-.2-11,4.4-11.5s7,2.3,6.4,7.3-8.7,6.5-10.8,4.2Z"/>
  <path class="st9" d="M301.8,578.7c-20.9-16.9,3.8-52,27.5-36,25.5,17.2-1.9,56.8-27.5,36Z"/>
  <path class="st9" d="M418.1,508.4c23.3-4.8,34.7,24,17.2,36.2-15.5,10.9-34.8-2.4-31.9-20.9s8.5-14.1,14.7-15.3h0Z"/>
  <path class="st22" d="M392.1,591.3c14.5-3.2,10.7,18.8-.5,14.1s-5.8-12.7.5-14.1Z"/>
  <path class="st22" d="M309.1,544.3c9.7-2,14.4,14,5.6,16.6s-16.6-14.3-5.6-16.6Z"/>
  <path class="st5" d="M421.2,516.3c1.8,1.2,2.3,9.8,1.2,12.4-4.8,12-20.8.4-12.1-10.1,2.5-2.9,7.7-4.4,10.8-2.3h.1Z"/>
</svg>
```


### public/potion2.svg
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Calque_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 770.7 794.3">
  <!-- Generator: Adobe Illustrator 29.6.0, SVG Export Plug-In . SVG Version: 2.1.1 Build 207)  -->
  <defs>
    <style>
      .st0 {
        fill: #1d2c4a;
      }

      .st1 {
        fill: #facc15;
      }

      .st2 {
        fill: #e0aa50;
      }

      .st3 {
        fill: #bfaeff;
      }

      .st4 {
        fill: #845022;
      }

      .st5 {
        fill: #212c4e;
      }

      .st6 {
        fill: #1c2a42;
      }

      .st7 {
        fill: #dad7e2;
      }

      .st8 {
        fill: #b87a2e;
      }

      .st9 {
        fill: #cef7ff;
      }

      .st10 {
        fill: #4a82db;
      }

      .st11 {
        fill: #7f5dc9;
      }

      .st12 {
        fill: #f3feff;
      }

      .st13 {
        fill: #1f2d4e;
      }

      .st14 {
        fill: #b194ff;
      }

      .st15 {
        fill: #02010f;
      }

      .st16 {
        fill: #202e4e;
      }

      .st17 {
        fill: #a985e8;
      }
    </style>
  </defs>
  <path class="st5" d="M237.4,670.1c-31.8-24.9-58.2-56.9-70.5-96-26.1-83,9.5-160.9,70.5-216.5,12.6-11.5,45.2-32.4,52-45s3.8-36.6,4.8-53.9c-9-4.8-17.3-9.2-22.7-18.3-11.9-20-5.1-45.3,16.1-55.5s14.7-4.6,21.5-7.3c-5.2-27.1-23.6-62.8,14.4-72.8,31-8.1,95.1-8.4,125.8.8,35.2,10.5,16.8,47.4,12,72.5,18.9,3.2,38.2,11.2,42.8,31.8,4.9,22.4-6.9,40.6-27.7,48.2-.8,14-.7,29.7-.5,44.3s-.1-1.1.5-1.3c1.8,3.9,2.6,7.9,4.8,11.7,7.4,13,41.9,35.4,55.2,47.8,57.3,53.2,89,123.3,70.5,202.5-10.3,44-38.5,79.7-73.5,107l-.2,2.2c-71.6,50.1-167.7,59-250,24.9s-38.2-16.7-44.1-24.4-1.2-1.8-1.7-2.8h0Z"/>
  <path class="st7" d="M237.4,670.1c76.7,53.2,183.9,60.6,267,17.5,7.9-4.1,22.3-15.3,29-17.5s4.8-1.2,7.5-1c13.3.8,50.2,8.9,60.9,16.2,15.7,10.7-5.3,19.3-15.1,22.6-43.7,14.5-112.1,15.8-158.8,17.2-70.7,2.1-156.6,3.3-225.6-12.3s-62.3-17.5-23.3-32.7,13.7-4.1,20.3-5.7,29.6-6.9,38.2-4.3h-.1Z"/>
  <path class="st1" d="M158.1,114.9c1.1.7,1.4,1.9,2.1,3.9.8,2.5,1.5,5.6,2.4,8.5,1.3,5,2.8,9.7,5.5,14.5,4,7.9,11.2,14,19.2,17.8,4.2,2.1,9.4,3.7,13.5,5.6,4.9,2.2,5,4.7.2,7.2-6.4,3.1-13.6,5.4-19.4,9.5-4.7,3.1-9,6.9-11.8,11.3-3.6,5.7-5.6,12.5-7.7,18.9-2.8,9.4-5.5,14.1-8.7,1.4-4.2-19.9-18.9-34.8-38.4-40.6-2.4-.8-4.8-1.4-7.1-2-1.3-.4-3.7-1.1-3.6-2.3,0-.9,2.1-1.8,4.9-2.8,3.2-1.1,7.2-2.2,10.7-3.2,9.3-2.6,18.3-8.2,24.1-15.8,3-4.1,5.2-9.3,7.1-13.9,1.6-4.3,2.4-8.5,3.5-12.7.5-1.7,1.2-6,3.4-5.3h0Z"/>
  <path class="st1" d="M272.8,14.5c.5.3.7.9,1,1.9.4,1.2.7,2.7,1.1,4.1.6,2.4,1.3,4.7,2.6,6.9,1.9,3.8,5.4,6.7,9.2,8.5,2,1,4.5,1.8,6.5,2.7,2.3,1.1,2.4,2.2,0,3.4-3.1,1.5-6.5,2.6-9.3,4.5-2.2,1.5-4.3,3.3-5.7,5.4-1.7,2.8-2.7,6-3.7,9.1-1.4,4.5-2.6,6.8-4.2.7-2-9.5-9.1-16.7-18.4-19.5-1.2-.4-2.3-.7-3.4-1-.6-.2-1.8-.5-1.7-1.1,0-.4,1-.9,2.3-1.3,1.5-.5,3.5-1.1,5.2-1.5,4.5-1.2,8.8-3.9,11.6-7.6,1.4-2,2.5-4.5,3.4-6.7.8-2.1,1.2-4.1,1.7-6.1.3-.8.6-2.9,1.6-2.5h0Z"/>
  <path class="st1" d="M500.2,52c.7.4.9,1.2,1.3,2.3.5,1.5.9,3.4,1.4,5.1.8,3,1.7,5.9,3.3,8.7,2.4,4.8,6.8,8.4,11.6,10.7,2.5,1.3,5.7,2.3,8.1,3.4,2.9,1.3,3,2.8.1,4.3-3.8,1.9-8.2,3.2-11.7,5.7-2.8,1.8-5.4,4.2-7.1,6.8-2.2,3.5-3.4,7.6-4.6,11.4-1.7,5.7-3.3,8.5-5.3.9-2.6-12-11.4-21-23.2-24.5-1.5-.5-2.9-.8-4.3-1.2-.8-.2-2.2-.7-2.2-1.4,0-.5,1.3-1.1,3-1.7,1.9-.7,4.4-1.3,6.5-1.9,5.6-1.6,11-4.9,14.5-9.5,1.8-2.5,3.2-5.6,4.3-8.4.9-2.6,1.5-5.1,2.1-7.7.3-1,.7-3.6,2.1-3.2h0Z"/>
  <path class="st1" d="M597,164.1c2.1,1.6,2.6,6.2,3.6,9.2,1.3,4.7,2.5,9.6,4.8,13.9,4,7.8,11.3,14.6,19.2,18.9,4.9,2.8,10.9,4.7,15.9,6.7,4.3,1.7,6.9,3.8.9,6.4-5.2,2.3-11.7,3.9-16.8,6.9-9.4,5.2-17.1,14.3-21.7,23.7-2.6,5.1-3.1,11.6-6.4,16.2-.4.4-.7.8-1.2.8-.4,0-.4-.2-.7-.3-.8-.8-1.1-1.7-1.7-3.1-2.4-6.1-4-13.5-7.6-19.3-6-10.7-14.8-17.6-25.8-21.5-4-1.8-9.4-2.7-12.2-6-2-3.6,13.6-6.5,16.4-8.3,13.2-5.2,23.7-16.2,27.3-29.8,1.3-3.1,3.1-14.1,5.9-14.4h0Z"/>
  <path class="st1" d="M117.6,317.7c1.7,1.3,2.2,3.9,2.9,5.9,1.1,3.6,2.2,7.2,4.2,10.5,3.2,5.2,8.4,8.4,14.2,10.9,2.1,1.2,11.6,3.5,5.9,5.8-10.1,3.1-18.5,8-23.2,17.8-1.7,2.9-2,7.8-4.1,9.7-.4,0-.7-.3-.9-.6-.7-1.1-1.1-2.2-1.6-3.6-1.4-4.8-4.5-9.1-7.2-13.2-3.9-5.2-12.2-6.9-17.3-9.7-7.8-3.7,5.3-6.4,8.2-8,4.6-1.9,8.4-4.1,11.1-7.7,3.1-4.1,4.3-9.9,6.1-15.1.4-1,.8-2.9,1.7-2.7h0Z"/>
  <path class="st1" d="M234.1,247.6c1.1.8,1.4,2.5,1.9,3.8.7,2.3,1.4,4.6,2.7,6.7,2,3.3,5.4,5.3,9.1,6.9,1.4.8,7.4,2.2,3.8,3.7-6.4,2-11.8,5.1-14.8,11.3-1.1,1.9-1.3,5-2.6,6.2-.3,0-.4-.2-.6-.4-.4-.7-.7-1.4-1-2.3-.9-3.1-2.9-5.8-4.6-8.4-2.5-3.3-7.8-4.4-11.1-6.2-5-2.4,3.4-4.1,5.3-5.1,2.9-1.2,5.4-2.6,7.1-4.9,2-2.6,2.8-6.3,3.9-9.6.2-.6.5-1.9,1.1-1.7h0Z"/>
  <path class="st1" d="M670.7,276.7c1,1,1.5,2.6,2.1,4,1.1,3.4,2.7,7.1,5,10.4,1.9,2.6,4.5,4.5,7.3,5.9,2.5,1.5,12.1,3.6,6.2,7.1-8,3.4-15.1,7.2-18.1,15.9-.9,2.2-1.2,6-2.8,7.4-.3,0-.5-.3-.9-1-1.3-2.6-1.7-5.9-2.9-8.6-2.2-6-7.9-9.3-13.8-11.8-13.9-5.1-1.1-5.1,4.5-8.6,3.5-1.8,6-5,8.2-8.3,2.2-3.4,3-8,4.2-11.6.3-.8.5-1.2.9-.9h0Z"/>
  <path class="st1" d="M651.1,90.1c1,1,1.5,2.6,2.1,4,1.1,3.4,2.7,7.1,5,10.4,1.9,2.6,4.5,4.5,7.3,5.9,2.5,1.5,12.1,3.6,6.2,7.1-8,3.4-15.1,7.2-18.1,15.9-.9,2.2-1.2,6-2.8,7.4-.3,0-.5-.3-.9-1-1.3-2.6-1.7-5.9-2.9-8.6-2.2-6-7.9-9.3-13.8-11.8-13.9-5.1-1.1-5.1,4.5-8.6,3.5-1.8,6-5,8.2-8.3,2.2-3.4,3-8,4.2-11.6.3-.8.5-1.2.9-.9h0Z"/>
  <path class="st15" d="M476.4,258.1c-.4,14.3.6,28.7,0,43s.3,3.1-1,1.5v-45c.3-1.4,1,.5,1,.5Z"/>
  <path class="st9" d="M315.4,264.1c7.5.9,32.1,9.1,32.1-4.5s-3-7.1-6-8.1c-15.5-4.9-47.6-2.8-56.5-21.5-10-21.3,10.3-34.4,29.4-34.9,1.6,15.5,16.6,20.1,29.8,22.7,25.9,5.2,70,5.3,95-3.4s14.1-9.2,18.9-19.2c23.3-.5,42.8,23.4,21.9,41.9-14,12.5-64.5,15.8-84,17-6.3.4-13.9-.8-19.9,0-11.1,1.6-9.7,16.9,2.9,16.9s10.4,0,12.6,0c25.4-.1,44.1-2.9,68.9-8v42.5c0,21.6,54.3,56.6,70.5,72.5,116.1,113.6,69,277.8-87.7,314.3-63.7,14.9-133.6,4.7-188.3-31.3-88.3-58.1-104.6-166.3-42.5-251,15.8-19.8,37.6-42.5,60-59,2-1.8,3-2.5,5-4l15.3-12.2c20-14.9,19.7-44.1,19-61.5-1-6.2.3-9.3,3.8-9.4l-.2.3Z"/>
  <path class="st8" d="M318.4,126.1c25.5,13.7,60.7,14.4,89.8,12.6,14.8-.9,33-2.5,45.2-10.6,1.2,3.3.4,8.4-.2,12.3-1.3,7.9-4,18-6,26s-7.6,29.1-8.7,30.3c-2.9,3.1-27.1,6.9-32.5,7.5-18.9,2-42,1.5-60.5-2.5-8.3-1.8-12.5-2-15.4-10.6-4.3-12.2-10.8-38.1-12.3-50.7s-1-11.6.8-14.3h-.2Z"/>
  <path class="st2" d="M453.4,128.1c.9,3.2-2.2,4-4.5,5-26.2,11.4-99.5,10.9-125.2-1.8-2-1-5.2-2.6-5.3-5.2.8-1.1,3-2.6,4.3-3.2,21-10.3,97.8-8.5,120.9-1.5,4.5,1.4,8,2,9.8,6.7Z"/>
  <path class="st9" d="M315.4,264.1c-1.2,1.2-2.8.2-3.1,2.4-1.3,9.8.9,22.7,0,33.1-1.9,24.8-16.9,34.4-35,47.5,6.7-7.2,15.7-11.9,22-19.5,9.1-10.9,11.3-22,12-36s-.4-18.4,0-27.5c1.3.1,2.7-.2,4,0h.1Z"/>
  <path class="st9" d="M272.4,351.1c-20.1,17.8-41.6,35-57.2,57.3s-2.3,3.8-2.8,1.7c13.9-19,29.5-34.8,47.5-50,3.7-3.1,8.2-6.8,12.5-9Z"/>
  <path class="st13" d="M328.4,401.1c18.1-16.7,50.1-7,53,18,38.9,0,77.8,2.3,116.5,6,2,.4,3,2.7,3.6,5.1s2.5,1.8,3.3.4l1.2-2.3c.7-1.3,2.1-2,3.5-1.7,12,2.1,28.7,2.4,38,9.9,19,15.3,28.4,68.8,27,92.1-10.5,180.3-313.9,203.6-370.3,37.2-12.8-37.8-9.7-100.6,19.3-130.8,15.6-9,34.5-13.5,52.3-12.1l41.6-3.4c2-6.9,4.7-14.6,11.1-18.5h-.1Z"/>
  <path class="st12" d="M223.4,435.1c4.4-4.6,8-3.7,10.5-6,4.6-4.4,11.5-17.2,17.5-23.5,22.7-23.9,73.3-57.9,83.3-87.7,1.7-5,2.2-10.3,3.5-15.4s2.9-7.5,6.4-9.1c3.3-1.5,7-.7,10.4.4,4.2,1.3,8.2,3,12.1,5,.9.4,1.8,1,2,1.9.2.8-.2,1.7-.6,2.4-2.4,5.2-1.9,10.4-2.9,15.8s-2.4,9.1-4.3,13.5c-4.1,9.3-10.2,17.7-16.9,25.4-13.2,15.2-29,27.7-44.1,40.9-7.5,6.5-15.9,15.7-23.4,21.6s-2.3.9-3.5,1c-.2,1.7,3.5,1.1,4.5,1,13.1-.9,26.2-3,39.4-3.1.6-6.7,3.5-11.8,8-16.5s2.6-3.5,3-1.5c-5.8,5.4-8.3,11.7-10.7,19-31.5,3.7-64.7,2.2-94.3,15h0Z"/>
  <path class="st0" d="M406.1,336.4c34.9-3.8,45.3,47.1,12.2,57.2-41.8,12.8-55-52.6-12.2-57.2Z"/>
  <path class="st4" d="M343.1,153.3c13.3-2.7,15.8,25.7,4.7,26.8s-14.3-24.8-4.7-26.8Z"/>
  <path class="st17" d="M536.4,466.1c.8,1.9-.7,3.7-4.7,5.5,7,22.5,5.3,46.7-.7,69.3-1.2,4.6-11.1,33.4-16.3,35.8-8.1,3.6-21.8-8.4-21.2-17.2-1.8,9.1-8.2,15.7-17.2,17.8,11,.2,20.3,16,17.9,25.7-2.1,8.3-42.9,27.8-49.2,30.1-56.9,20.9-130.7,14.1-182.9-15.6l-.5,1.5c-2,0-2.8-1.4-4-2.5-40.1-36.4-55.6-89.4-37.3-141.3,1.6-4.5,4.1-8.6,5.3-13.2,5.4,2.9,9.3,5.3,15.2,7.3,52.8,17.3,141.2,14,197.3,11.7,26.3-1.1,75.2-3.5,98.5-15h-.2Z"/>
  <path class="st11" d="M532.6,467.9c5.9-3.6,7.5-3.5,12.7,11.1,53.4,150.3-169.6,223.5-282.9,142.1-8.6-6.4-13.8-11.8-1.6-7.9,9.5,3.1,20.3,8,30.2,11,53.6,16.4,116.8,19.4,166.1-10.1,7.7-5.2,15.1-13.2,14.2-22.4-.1-6.8-4.9-12.4-4.8-19.1.5-6.9,7.3-13,13.6-13.9,6.8-.9,13,3.6,19.9,2.3,13.1-2.9,18.3-22.8,21.5-34.9,1.3-5.6,2.3-11.2,2.9-16.9,1.6-12,.3-33.9,8.1-41.4h0Z"/>
  <path class="st17" d="M536.4,445.2c2.1,1.7-8,6-9,6.5-27.6,11.8-69.5,12.4-99.5,13.5-43.5,1.6-90.7,2.7-133.9-2s-62.5-9.1-62.5-16.5c7.8-3.4,17.9-4.5,26.5-5.5,16-1.8,34.9-3.3,51-4s7.2,0,10.8,0c10.5,29,51.1,28.1,61.3-1,52-.6,103.8,2.5,155.3,9.1h0Z"/>
  <path class="st11" d="M361.1,438.8c-6.2,5.3-17.8,4.7-23.2-1.7-12.3-14.3,3.3-34.7,19.8-26.8s12,21.1,3.5,28.4h0Z"/>
  <path class="st11" d="M399.7,356.5c12.5-12.6,31.8,7.6,18.6,19.1s-30.9-6.6-18.6-19.1Z"/>
  <path class="st16" d="M342.9,533.6c33.6,29.6-6.1,85.5-46.9,60.4-45.8-28.2,4.1-98,46.9-60.4Z"/>
  <path class="st13" d="M397.8,502.6c32.3-34.5,85.9,17.5,51.1,51.6-32.6,32-84.9-15.5-51.1-51.6Z"/>
  <path class="st6" d="M411,613.8c-7.4,7.9-21.6,8.7-30.2,2.3-19.8-14.9-3.2-47.2,21.5-38.5s19.1,24.9,8.7,36.1h0Z"/>
  <path class="st3" d="M259.1,489.4c22.7-4.7,28,28.1,7.5,31.5-22.4,3.8-27.1-27.5-7.5-31.5h0Z"/>
  <path class="st14" d="M344.1,413.4c12.7-3.8,9.2,13.9-.2,13.9s-4.9-12.3.2-13.9Z"/>
  <path class="st14" d="M401.6,366.9c-3.2-3.3-.2-11,4.4-11.5s7,2.3,6.4,7.3-8.7,6.5-10.8,4.2Z"/>
  <path class="st11" d="M301.8,578.7c-20.9-16.9,3.8-52,27.5-36,25.5,17.2-1.9,56.8-27.5,36Z"/>
  <path class="st11" d="M418.1,508.4c23.3-4.8,34.7,24,17.2,36.2-15.5,10.9-34.8-2.4-31.9-20.9s8.5-14.1,14.7-15.3h0Z"/>
  <path class="st14" d="M392.1,591.3c14.5-3.2,10.7,18.8-.5,14.1s-5.8-12.7.5-14.1Z"/>
  <path class="st14" d="M309.1,544.3c9.7-2,14.4,14,5.6,16.6s-16.6-14.3-5.6-16.6Z"/>
  <path class="st14" d="M421.2,516.3c1.8,1.2,2.3,9.8,1.2,12.4-4.8,12-20.8.4-12.1-10.1,2.5-2.9,7.7-4.4,10.8-2.3h.1Z"/>
  <rect class="st10" x="-796.5" y="-330.1" width="52.9" height="52.9"/>
  <rect class="st10" x="-715.2" y="-332" width="58.6" height="58.6"/>
</svg>
```


### public/potion3.svg
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Calque_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 770.7 877">
  <!-- Generator: Adobe Illustrator 29.6.0, SVG Export Plug-In . SVG Version: 2.1.1 Build 207)  -->
  <defs>
    <style>
      .st0 {
        fill: #f2b52b;
      }

      .st1 {
        fill: #1d2c4a;
      }

      .st2 {
        fill: #d88b25;
      }

      .st3 {
        fill: #facc15;
      }

      .st4 {
        fill: #fcd565;
      }

      .st5 {
        fill: #e0aa50;
      }

      .st6 {
        fill: #845022;
      }

      .st7 {
        fill: #212c4e;
      }

      .st8 {
        fill: #1c2a42;
      }

      .st9 {
        fill: #dad7e2;
      }

      .st10 {
        fill: #b87a2e;
      }

      .st11 {
        fill: #cef7ff;
      }

      .st12 {
        fill: #4a82db;
      }

      .st13 {
        fill: #d5dce9;
      }

      .st14 {
        fill: #1f2d4e;
      }

      .st15 {
        fill: #f5f5f5;
      }

      .st16 {
        fill: #02010f;
      }

      .st17 {
        fill: #202e4e;
      }
    </style>
  </defs>
  <path class="st7" d="M237.4,752.8c-31.8-24.9-58.2-56.9-70.5-96-26.1-83,9.5-160.9,70.5-216.5,12.6-11.5,45.2-32.4,52-45s3.8-36.6,4.8-53.9c-9-4.8-17.3-9.2-22.7-18.3-11.9-20-5.1-45.3,16.1-55.5s14.7-4.6,21.5-7.3c-5.2-27.1-23.6-62.8,14.4-72.8,31-8.1,95.1-8.4,125.8.8,35.2,10.5,16.8,47.4,12,72.5,18.9,3.2,38.2,11.2,42.8,31.8,4.9,22.4-6.9,40.6-27.7,48.2-.8,14-.7,29.7-.5,44.3s-.1-1.1.5-1.3c1.8,3.9,2.6,7.9,4.8,11.7,7.4,13,41.9,35.4,55.2,47.8,57.3,53.2,89,123.3,70.5,202.5-10.3,44-38.5,79.7-73.5,107l-.2,2.2c-71.6,50.1-167.7,59-250,24.9s-38.2-16.7-44.1-24.4-1.2-1.8-1.7-2.8h0Z"/>
  <path class="st9" d="M237.4,752.8c76.7,53.2,183.9,60.6,267,17.5,7.9-4.1,22.3-15.3,29-17.5s4.8-1.2,7.5-1c13.3.8,50.2,8.9,60.9,16.2,15.7,10.7-5.3,19.3-15.1,22.6-43.7,14.5-112.1,15.8-158.8,17.2-70.7,2.1-156.6,3.3-225.6-12.3s-62.3-17.5-23.3-32.7,13.7-4.1,20.3-5.7,29.6-6.9,38.2-4.3h-.1Z"/>
  <path class="st3" d="M173.6,248.8c1.1.7,1.4,1.9,2.1,3.9.8,2.5,1.5,5.6,2.4,8.5,1.3,5,2.8,9.7,5.5,14.5,4,7.9,11.2,14,19.2,17.8,4.2,2.1,9.4,3.7,13.5,5.6,4.9,2.2,5,4.7.2,7.2-6.4,3.1-13.6,5.4-19.4,9.5-4.7,3.1-9,6.9-11.8,11.3-3.6,5.7-5.6,12.5-7.7,18.9-2.8,9.4-5.5,14.1-8.7,1.4-4.2-19.9-18.9-34.8-38.4-40.6-2.4-.8-4.8-1.4-7.1-2-1.3-.4-3.7-1.1-3.6-2.3,0-.9,2.1-1.8,4.9-2.8,3.2-1.1,7.2-2.2,10.7-3.2,9.3-2.6,18.3-8.2,24.1-15.8,3-4.1,5.2-9.3,7.1-13.9,1.6-4.3,2.4-8.5,3.5-12.7.5-1.7,1.2-6,3.4-5.3h0Z"/>
  <path class="st3" d="M226.1,110.2c.6.4.8,1,1.1,2.1.4,1.4.8,3.1,1.3,4.6.7,2.7,1.5,5.3,3,7.9,2.2,4.3,6.1,7.6,10.5,9.7,2.3,1.1,5.1,2,7.4,3.1,2.7,1.2,2.7,2.6.1,3.9-3.5,1.7-7.4,2.9-10.6,5.2-2.6,1.7-4.9,3.8-6.4,6.2-2,3.1-3.1,6.8-4.2,10.3-1.5,5.1-3,7.7-4.8.8-2.3-10.9-10.3-19-21-22.2-1.3-.4-2.6-.8-3.9-1.1-.7-.2-2-.6-2-1.3,0-.5,1.1-1,2.7-1.5,1.7-.6,3.9-1.2,5.8-1.7,5.1-1.4,10-4.5,13.2-8.6,1.6-2.2,2.8-5.1,3.9-7.6.9-2.3,1.3-4.6,1.9-6.9.3-.9.7-3.3,1.9-2.9h0Z"/>
  <path class="st3" d="M609,29.2c.7.4.9,1.2,1.3,2.3.5,1.5.9,3.4,1.4,5.1.8,3,1.7,5.9,3.3,8.7,2.4,4.8,6.8,8.4,11.6,10.7,2.5,1.3,5.7,2.3,8.1,3.4,2.9,1.3,3,2.8,0,4.3-3.8,1.9-8.2,3.2-11.7,5.7-2.8,1.8-5.4,4.2-7.1,6.8-2.2,3.5-3.4,7.6-4.6,11.4-1.7,5.7-3.3,8.5-5.3.9-2.6-12-11.4-21-23.2-24.5-1.5-.5-2.9-.8-4.3-1.2-.8-.2-2.2-.7-2.2-1.4s1.3-1.1,3-1.7c1.9-.7,4.4-1.3,6.5-1.9,5.6-1.6,11-4.9,14.5-9.5,1.8-2.5,3.2-5.6,4.3-8.4.9-2.6,1.5-5.1,2.1-7.7.3-1,.7-3.6,2.1-3.2h0v.2Z"/>
  <path class="st3" d="M534.2,96.3c.5.3.7.9,1,1.7.4,1.1.7,2.6,1.1,3.8.6,2.3,1.3,4.4,2.5,6.5,1.8,3.6,5.1,6.3,8.7,8,1.9,1,4.3,1.7,6.1,2.6,2.2,1,2.3,2.1,0,3.2-2.9,1.4-6.2,2.4-8.8,4.3-2.1,1.4-4.1,3.2-5.3,5.1-1.7,2.6-2.6,5.7-3.5,8.6-1.3,4.3-2.5,6.4-4,.7-2-9-8.6-15.8-17.4-18.4-1.1-.4-2.2-.6-3.2-.9-.6-.2-1.7-.5-1.7-1.1s1-.8,2.3-1.3c1.4-.5,3.3-1,4.9-1.4,4.2-1.2,8.3-3.7,10.9-7.1,1.4-1.9,2.4-4.2,3.2-6.3.7-2,1.1-3.8,1.6-5.8.2-.8.5-2.7,1.6-2.4h0v.2Z"/>
  <path class="st3" d="M410.4,56.4c.8.5,1,1.4,1.5,2.6.6,1.7,1,3.9,1.6,5.8.9,3.4,1.9,6.7,3.8,9.9,2.7,5.5,7.8,9.6,13.3,12.2,2.9,1.5,6.5,2.6,9.3,3.9,3.3,1.5,3.4,3.2.1,4.9-4.3,2.2-9.4,3.7-13.4,6.5-3.2,2.1-6.2,4.8-8.1,7.8-2.5,4-3.9,8.7-5.3,13-1.9,6.5-3.8,9.7-6.1,1-3-13.7-13-24-26.5-28-1.7-.6-3.3-.9-4.9-1.4-.9-.2-2.5-.8-2.5-1.6s1.5-1.3,3.4-1.9c2.2-.8,5-1.5,7.4-2.2,6.4-1.8,12.6-5.6,16.6-10.9,2.1-2.9,3.7-6.4,4.9-9.6,1-3,1.7-5.8,2.4-8.8.3-1.1.8-4.1,2.4-3.7h0v.2Z"/>
  <path class="st3" d="M634.7,274.8c2.1,1.6,2.6,6.2,3.6,9.2,1.3,4.7,2.5,9.6,4.8,13.9,4,7.8,11.3,14.6,19.2,18.9,4.9,2.8,10.9,4.7,15.9,6.7,4.3,1.7,6.9,3.8.9,6.4-5.2,2.3-11.7,3.9-16.8,6.9-9.4,5.2-17.1,14.3-21.7,23.7-2.6,5.1-3.1,11.6-6.4,16.2-.4.4-.7.8-1.2.8s-.4-.2-.7-.3c-.8-.8-1.1-1.7-1.7-3.1-2.4-6.1-4-13.5-7.6-19.3-6-10.7-14.8-17.6-25.8-21.5-4-1.8-9.4-2.7-12.2-6-2-3.6,13.6-6.5,16.4-8.3,13.2-5.2,23.7-16.2,27.3-29.8,1.3-3.1,3.1-14.1,5.9-14.4h0Z"/>
  <path class="st3" d="M169.8,400.4c1.7,1.3,2.2,3.9,2.9,5.9,1.1,3.6,2.2,7.2,4.2,10.5,3.2,5.2,8.4,8.4,14.2,10.9,2.1,1.2,11.6,3.5,5.9,5.8-10.1,3.1-18.5,8-23.2,17.8-1.7,2.9-2,7.8-4.1,9.7-.4,0-.7-.3-.9-.6-.7-1.1-1.1-2.2-1.6-3.6-1.4-4.8-4.5-9.1-7.2-13.2-3.9-5.2-12.2-6.9-17.3-9.7-7.8-3.7,5.3-6.4,8.2-8,4.6-1.9,8.4-4.1,11.1-7.7,3.1-4.1,4.3-9.9,6.1-15.1.4-1,.8-2.9,1.7-2.7h0Z"/>
  <path class="st3" d="M101.2,183.9c1.7,1.3,2.2,3.9,2.9,5.9,1.1,3.6,2.2,7.2,4.2,10.5,3.2,5.2,8.4,8.4,14.2,10.9,2.1,1.2,11.6,3.5,5.9,5.8-10.1,3.1-18.5,8-23.2,17.8-1.7,2.9-2,7.8-4.1,9.7-.4,0-.7-.3-.9-.6-.7-1.1-1.1-2.2-1.6-3.6-1.4-4.8-4.5-9.1-7.2-13.2-3.9-5.2-12.2-6.9-17.3-9.7-7.8-3.7,5.3-6.4,8.2-8,4.6-1.9,8.4-4.1,11.1-7.7,3.1-4.1,4.3-9.9,6.1-15.1.4-1,.8-2.9,1.7-2.7h0Z"/>
  <path class="st3" d="M656.8,161.8c1.5,1.2,2,3.5,2.6,5.3,1,3.2,2,6.4,3.8,9.4,2.9,4.7,7.5,7.5,12.7,9.8,1.9,1.1,10.4,3.1,5.3,5.2-9,2.8-16.6,7.2-20.8,15.9-1.5,2.6-1.8,7-3.7,8.7-.4,0-.6-.3-.8-.5-.6-1-1-2-1.4-3.2-1.3-4.3-4-8.1-6.4-11.8-3.5-4.7-10.9-6.2-15.5-8.7-7-3.3,4.7-5.7,7.3-7.2,4.1-1.7,7.5-3.7,9.9-6.9,2.8-3.7,3.8-8.9,5.5-13.5.4-.9.7-2.6,1.5-2.4h0Z"/>
  <path class="st3" d="M111.5,364c1.1.8,1.4,2.5,1.9,3.8.7,2.3,1.4,4.6,2.7,6.7,2,3.3,5.4,5.3,9.1,6.9,1.4.8,7.4,2.2,3.8,3.7-6.4,2-11.8,5.1-14.8,11.3-1.1,1.9-1.3,5-2.6,6.2-.3,0-.4-.2-.6-.4-.4-.7-.7-1.4-1-2.3-.9-3.1-2.9-5.8-4.6-8.4-2.5-3.3-7.8-4.4-11.1-6.2-5-2.4,3.4-4.1,5.3-5.1,2.9-1.2,5.4-2.6,7.1-4.9,2-2.6,2.8-6.3,3.9-9.6.2-.6.5-1.9,1.1-1.7h-.2Z"/>
  <path class="st3" d="M575,371c1,1,1.5,2.6,2.1,4,1.1,3.4,2.7,7.1,5,10.4,1.9,2.6,4.5,4.5,7.3,5.9,2.5,1.5,12.1,3.6,6.2,7.1-8,3.4-15.1,7.2-18.1,15.9-.9,2.2-1.2,6-2.8,7.4-.3,0-.5-.3-.9-1-1.3-2.6-1.7-5.9-2.9-8.6-2.2-6-7.9-9.3-13.8-11.8-13.9-5.1-1.1-5.1,4.5-8.6,3.5-1.8,6-5,8.2-8.3,2.2-3.4,3-8,4.2-11.6.3-.8.5-1.2.9-.9h0Z"/>
  <path class="st3" d="M327.5,30.4c1,1,1.5,2.6,2.1,4,1.1,3.4,2.7,7.1,5,10.4,1.9,2.6,4.5,4.5,7.3,5.9,2.5,1.5,12.1,3.6,6.2,7.1-8,3.4-15,7.2-18,15.8-.9,2.2-1.2,6-2.8,7.4-.3,0-.5-.3-.9-1-1.3-2.6-1.7-5.9-2.9-8.6-2.2-6-7.9-9.3-13.7-11.8-13.8-5.1-1.1-5.1,4.5-8.6,3.5-1.8,6-5,8.2-8.3,2.2-3.4,3-8,4.2-11.6.3-.8.5-1.2.9-.9h0Z"/>
  <path class="st3" d="M556.8,249.6c1,1,1.5,2.6,2.1,4,1.1,3.4,2.7,7.1,5,10.4,1.9,2.6,4.5,4.5,7.3,5.9,2.5,1.5,12.1,3.6,6.2,7.1-8,3.4-15.1,7.2-18.1,15.9-.9,2.2-1.2,6-2.8,7.4-.3,0-.5-.3-.9-1-1.3-2.6-1.7-5.9-2.9-8.6-2.2-6-7.9-9.3-13.8-11.8-13.9-5.1-1.1-5.1,4.5-8.6,3.5-1.8,6-5,8.2-8.3,2.2-3.4,3-8,4.2-11.6.3-.8.5-1.2.9-.9h0Z"/>
  <path class="st16" d="M476.4,340.8c-.4,14.3.6,28.7,0,43s.3,3.1-1,1.5v-45c.3-1.4,1,.5,1,.5Z"/>
  <path class="st13" d="M315.4,346.8c7.5.9,32.1,9.1,32.1-4.5s-3-7.1-6-8.1c-15.5-4.9-47.6-2.8-56.5-21.5-10-21.3,10.3-34.4,29.4-34.9,1.6,15.5,16.6,20.1,29.8,22.7,25.9,5.2,70,5.3,95-3.4s14.1-9.2,18.9-19.2c23.3-.5,42.8,23.4,21.9,41.9-14,12.5-64.5,15.8-84,17-6.3.4-13.9-.8-19.9,0-11.1,1.6-9.7,16.9,2.9,16.9h12.6c25.4-.1,44.1-2.9,68.9-8v42.5c0,21.6,54.3,56.6,70.5,72.5,116.1,113.6,69,277.8-87.7,314.3-63.7,14.9-133.6,4.7-188.3-31.3-88.3-58.1-104.6-166.3-42.5-251,15.8-19.8,37.6-42.5,60-59,2-1.8,3-2.5,5-4l15.3-12.2c20-14.9,19.7-44.1,19-61.5-1-6.2.3-9.3,3.8-9.4l-.2.3h0Z"/>
  <path class="st10" d="M318.4,208.8c25.5,13.7,60.7,14.4,89.8,12.6,14.8-.9,33-2.5,45.2-10.6,1.2,3.3.4,8.4-.2,12.3-1.3,7.9-4,18-6,26s-7.6,29.1-8.7,30.3c-2.9,3.1-27.1,6.9-32.5,7.5-18.9,2-42,1.5-60.5-2.5-8.3-1.8-12.5-2-15.4-10.6-4.3-12.2-10.8-38.1-12.3-50.7s-1-11.6.8-14.3c0,0-.2,0-.2,0Z"/>
  <path class="st5" d="M453.4,210.8c.9,3.2-2.2,4-4.5,5-26.2,11.4-99.5,10.9-125.2-1.8-2-1-5.2-2.6-5.3-5.2.8-1.1,3-2.6,4.3-3.2,21-10.3,97.8-8.5,120.9-1.5,4.5,1.4,8,2,9.8,6.7Z"/>
  <path class="st11" d="M315.4,346.8c-1.2,1.2-2.8.2-3.1,2.4-1.3,9.8.9,22.7,0,33.1-1.9,24.8-16.9,34.4-35,47.5,6.7-7.2,15.7-11.9,22-19.5,9.1-10.9,11.3-22,12-36s-.4-18.4,0-27.5c1.3.1,2.7-.2,4,0h.1Z"/>
  <path class="st11" d="M272.4,433.8c-20.1,17.8-41.6,35-57.2,57.3s-2.3,3.8-2.8,1.7c13.9-19,29.5-34.8,47.5-50,3.7-3.1,8.2-6.8,12.5-9Z"/>
  <path class="st14" d="M328.4,483.8c18.1-16.7,50.1-7,53,18,38.9,0,77.8,2.3,116.5,6,2,.4,3,2.7,3.6,5.1s2.5,1.8,3.3.4l1.2-2.3c.7-1.3,2.1-2,3.5-1.7,12,2.1,28.7,2.4,38,9.9,19,15.3,28.4,68.8,27,92.1-10.5,180.3-313.9,203.6-370.3,37.2-12.8-37.8-9.7-100.6,19.3-130.8,15.6-9,34.5-13.5,52.3-12.1l41.6-3.4c2-6.9,4.7-14.6,11.1-18.5h-.1Z"/>
  <path class="st15" d="M223.4,517.8c4.4-4.6,8-3.7,10.5-6,4.6-4.4,11.5-17.2,17.5-23.5,22.7-23.9,73.3-57.9,83.3-87.7,1.7-5,2.2-10.3,3.5-15.4s2.9-7.5,6.4-9.1c3.3-1.5,7-.7,10.4.4,4.2,1.3,8.2,3,12.1,5,.9.4,1.8,1,2,1.9.2.8-.2,1.7-.6,2.4-2.4,5.2-1.9,10.4-2.9,15.8s-2.4,9.1-4.3,13.5c-4.1,9.3-10.2,17.7-16.9,25.4-13.2,15.2-29,27.7-44.1,40.9-7.5,6.5-15.9,15.7-23.4,21.6s-2.3.9-3.5,1c-.2,1.7,3.5,1.1,4.5,1,13.1-.9,26.2-3,39.4-3.1.6-6.7,3.5-11.8,8-16.5s2.6-3.5,3-1.5c-5.8,5.4-8.3,11.7-10.7,19-31.5,3.7-64.7,2.2-94.3,15h0Z"/>
  <path class="st1" d="M406.1,419.1c34.9-3.8,45.3,47.1,12.2,57.2-41.8,12.8-55-52.6-12.2-57.2Z"/>
  <path class="st6" d="M343.1,236c13.3-2.7,15.8,25.7,4.7,26.8s-14.3-24.8-4.7-26.8Z"/>
  <path class="st0" d="M536.4,548.8c.8,1.9-.7,3.7-4.7,5.5,7,22.5,5.3,46.7-.7,69.3-1.2,4.6-11.1,33.4-16.3,35.8-8.1,3.6-21.8-8.4-21.2-17.2-1.8,9.1-8.2,15.7-17.2,17.8,11,.2,20.3,16,17.9,25.7-2.1,8.3-42.9,27.8-49.2,30.1-56.9,20.9-130.7,14.1-182.9-15.6l-.5,1.5c-2,0-2.8-1.4-4-2.5-40.1-36.4-55.6-89.4-37.3-141.3,1.6-4.5,4.1-8.6,5.3-13.2,5.4,2.9,9.3,5.3,15.2,7.3,52.8,17.3,141.2,14,197.3,11.7,26.3-1.1,75.2-3.5,98.5-15h-.2,0Z"/>
  <path class="st2" d="M532.6,550.6c5.9-3.6,7.5-3.5,12.7,11.1,53.4,150.3-169.6,223.5-282.9,142.1-8.6-6.4-13.8-11.8-1.6-7.9,9.5,3.1,20.3,8,30.2,11,53.6,16.4,116.8,19.4,166.1-10.1,7.7-5.2,15.1-13.2,14.2-22.4-.1-6.8-4.9-12.4-4.8-19.1.5-6.9,7.3-13,13.6-13.9,6.8-.9,13,3.6,19.9,2.3,13.1-2.9,18.3-22.8,21.5-34.9,1.3-5.6,2.3-11.2,2.9-16.9,1.6-12,.3-33.9,8.1-41.4h0Z"/>
  <path class="st0" d="M536.4,527.9c2.1,1.7-8,6-9,6.5-27.6,11.8-69.5,12.4-99.5,13.5-43.5,1.6-90.7,2.7-133.9-2s-62.5-9.1-62.5-16.5c7.8-3.4,17.9-4.5,26.5-5.5,16-1.8,34.9-3.3,51-4s7.2,0,10.8,0c10.5,29,51.1,28.1,61.3-1,52-.6,103.8,2.5,155.3,9.1h0Z"/>
  <path class="st4" d="M361.1,521.5c-6.2,5.3-17.8,4.7-23.2-1.7-12.3-14.3,3.3-34.7,19.8-26.8s12,21.1,3.5,28.4h0Z"/>
  <path class="st4" d="M399.7,439.2c12.5-12.6,31.8,7.6,18.6,19.1s-30.9-6.6-18.6-19.1Z"/>
  <path class="st17" d="M342.9,616.3c33.6,29.6-6.1,85.5-46.9,60.4-45.8-28.2,4.1-98,46.9-60.4Z"/>
  <path class="st14" d="M397.8,585.3c32.3-34.5,85.9,17.5,51.1,51.6-32.6,32-84.9-15.5-51.1-51.6Z"/>
  <path class="st8" d="M411,696.5c-7.4,7.9-21.6,8.7-30.2,2.3-19.8-14.9-3.2-47.2,21.5-38.5s19.1,24.9,8.7,36.1h0Z"/>
  <path class="st4" d="M259.1,572.1c22.7-4.7,28,28.1,7.5,31.5-22.4,3.8-27.1-27.5-7.5-31.5h0Z"/>
  <path class="st2" d="M344.1,496.1c12.7-3.8,9.2,13.9-.2,13.9s-4.9-12.3.2-13.9Z"/>
  <path class="st2" d="M401.6,449.6c-3.2-3.3-.2-11,4.4-11.5s7,2.3,6.4,7.3-8.7,6.5-10.8,4.2Z"/>
  <path class="st1" d="M483.7,544.9c24.3-2.6,31.5,32.8,8.5,39.8-29.1,8.9-38.3-36.6-8.5-39.8Z"/>
  <path class="st4" d="M479.2,558.8c8.7-8.8,22.1,5.3,12.9,13.3s-21.5-4.6-12.9-13.3Z"/>
  <path class="st2" d="M480.5,566.1c-2.2-2.3-.1-7.7,3.1-8s4.9,1.6,4.5,5.1-6.1,4.5-7.5,2.9Z"/>
  <path class="st4" d="M301.8,661.4c-20.9-16.9,3.8-52,27.5-36,25.5,17.2-1.9,56.8-27.5,36Z"/>
  <path class="st4" d="M418.1,591.1c23.3-4.8,34.7,24,17.2,36.2-15.5,10.9-34.8-2.4-31.9-20.9s8.5-14.1,14.7-15.3h0Z"/>
  <path class="st2" d="M392.1,674c14.5-3.2,10.7,18.8-.5,14.1s-5.8-12.7.5-14.1Z"/>
  <path class="st2" d="M309.1,627c9.7-2,14.4,14,5.6,16.6s-16.6-14.3-5.6-16.6Z"/>
  <path class="st2" d="M421.2,599c1.8,1.2,2.3,9.8,1.2,12.4-4.8,12-20.8.4-12.1-10.1,2.5-2.9,7.7-4.4,10.8-2.3h.1Z"/>
  <rect class="st12" x="-796.5" y="-247.4" width="52.9" height="52.9"/>
  <rect class="st12" x="-715.2" y="-249.3" width="58.6" height="58.6"/>
  <g>
    <path class="st7" d="M260.8,348.5c-1.2,7.5-12.6,12-18.9,15.3-5,2.1-11.9,7.6-16.5,2.3-7.4-8.5,2.7-15.3,9.9-18.9,5.7-2.7,13-8.5,19.1-7.5,3.8.7,6.7,4.8,6.4,8.6h0Z"/>
    <path class="st7" d="M537.1,359.6c-4.6,2.2-10.1.5-14.6-1.3-3.5-1.1-8.4-2.4-11.7-4.5-2.2-1.4-3.3-3.9-3.6-6.5-.7-7.5,7.1-10,13.2-7.8,3.8,1.2,8.2,3,12,4.8,3.4,1.7,6.1,3.4,7.5,6,1.7,3.2.6,7.7-2.7,9.3h-.1Z"/>
    <path class="st7" d="M545.6,202.1c-11.4,10-22,18-32.6,29.4s-8.9,15.4-16.6,11.5-3.4-8.2-.9-12.4c7.2-12,29.7-33,41.6-40.4,5-3.1,12.4-3.7,13.8,3.4.8,4.3-2.6,6.1-5.4,8.5Z"/>
    <path class="st7" d="M232.2,202.1c8.3,3.5,34,22.9,37.9,30.2,4.1,7.7-2.5,15.8-10.1,13s-13.9-13.7-17.9-16.8c-3.3-2.6-7.1-5.2-10.6-7.4-6.9-4.2-23.4-8.4-18.2-19.2,3-6.2,14.3-1.8,18.9.1Z"/>
    <path class="st7" d="M466.4,110c2.8,3,2.4,11.5,2.1,15.6-.3,4.8-1.7,19.6-3,23.3-3,8.8-14.8,7.7-16.1,1.1-1.9-10.2,2.1-24.5,1.1-35.2.9-7.1,11.5-9.7,15.8-4.9Z"/>
    <path class="st7" d="M306.8,123.7c-2.3,2.6-2,9.7-1.8,13.2.3,4,1.4,16.6,2.5,19.7,2.6,7.4,12.5,6.5,13.6,1,1.6-8.6-1.8-20.7-.9-29.7-.8-6-9.7-8.2-13.4-4.2Z"/>
  </g>
</svg>
```


### public/step-2.svg
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Calque_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 377 418">
  <!-- Generator: Adobe Illustrator 29.5.1, SVG Export Plug-In . SVG Version: 2.1.0 Build 141)  -->
  <defs>
    <style>
      .st0 {
        fill: #242842;
      }

      .st1 {
        fill: #fcc799;
      }

      .st2 {
        fill: #060c2c;
      }

      .st3 {
        fill: #fcc496;
      }

      .st4 {
        fill: #fdb97f;
      }

      .st5 {
        fill: #272d47;
      }

      .st6 {
        fill: #5a5180;
      }

      .st7 {
        fill: #fdcd6d;
      }

      .st8 {
        fill: #5a517f;
      }

      .st9 {
        fill: #f38c50;
      }

      .st10 {
        fill: #f38c51;
      }

      .st11 {
        fill: #242b44;
      }

      .st12 {
        fill: #272d46;
      }

      .st13 {
        fill: #f48b50;
      }

      .st14 {
        fill: #6ea6d2;
      }

      .st15 {
        fill: #212741;
      }

      .st16 {
        fill: #fac797;
      }

      .st17 {
        fill: #fac597;
      }

      .st18 {
        fill: #fdd27c;
      }

      .st19 {
        fill: #fc9fb9;
      }

      .st20 {
        fill: #010314;
      }

      .st21 {
        fill: #00010b;
      }

      .st22 {
        fill: #feda99;
      }

      .st23 {
        fill: #252b45;
      }

      .st24 {
        fill: #fdc395;
      }

      .st25 {
        fill: #2f2768;
      }

      .st26 {
        fill: #fed790;
      }

      .st27 {
        fill: #825b49;
      }

      .st28 {
        fill: #fde5c2;
      }

      .st29 {
        fill: #fcd077;
      }

      .st30 {
        fill: #fdd380;
      }

      .st31 {
        fill: #fdd586;
      }

      .st32 {
        fill: #fdd476;
      }

      .st33 {
        fill: #805a49;
      }

      .st34 {
        fill: #fdcd70;
      }

      .st35 {
        fill: #fecd6e;
      }

      .st36 {
        fill: #fae5af;
      }

      .st37 {
        fill: #89848b;
      }

      .st38 {
        fill: #202641;
      }

      .st39 {
        fill: #f3865d;
      }

      .st40 {
        fill: #252a44;
      }
    </style>
  </defs>
  <path class="st8" d="M136.9,393.9c-1.9-5.3-2-11.3-.1-17.8,5.3-21.4,9.9-42.7,13.6-63.9l-1,.4-5.6,27c-.5,2.3-1.2,3.6-3.4,4.5-4.3,1.9-31.5-.7-35.9-1.4-13.5-2.2-45.7-7.8-53.7-20.1-6.4-9.9-9.2-49.8-2.5-57.1,1.7-1.9,16.8,7.2,13,12.2-2.1,11-3.2,22-3.3,33.2,2.6-23.8,7.1-47.7,13.3-71.8,1.7-7.2,6-3.9,9.8-.7,19.6,17.5,43.5,34.4,70.4,38.2l1.8,1.9c-.6-2.8,13.5-2.3,14.2-1.9s1.1,1.1,1.3,1.9l.9,1.7c.9-3.9,10.1-6.5,14-6,12,1.3,15.4,16.2,17.1,26.1-7.8,30.6-15.7,61.8-15.7,94.2,0,1.3.6,3.8.9.3,3-33.1,7.1-64.5,16.4-96.5,12.5-2.2,21.5-10.4,29.3-19.8,8.6-2.5,16.4-6.5,24.2-10.7,3.5,5,7.8,8.7,12.6,11.3,4.5.5,9.2,1.4,4.5,5.5.4,7.3-9.3,12.3-15.2,15.3-13.9,7-28.7,14.1-44.2,15.6-6.9,2.7,3.8,1.5,6.9.7,17.8-4.2,34-12.2,48.8-22.4.9-.4,2.5-.8,3.3-.4,13.2,7.3,31.6,32.5,39.1,46,5.3,9.4,19.7,41.4,17.4,50.5-.2.8-.5,1.6-.9,2.3-.1,0-1,1.3-2.5,1.6-25.9,6-53.5,9-80,10.6-4.6-.6-12-.7-15,.9h-5.6c-5.7-.4-11.4-.7-16.9-.9-23.6,1-47.8-.7-69.8-8.1l-1.5-2.2Z"/>
  <path class="st5" d="M165,272.8c3.1-.1,6,0,9-.9s2.9-.3,1.4-1.9-5.6-2.6-7.5-4.2c-8.1-6.8-14.7-18.4-17.3-28.6-4.8-18.7.5-34.5,6.9-52.1-21-8.5-47-26.7-44-52.5,2.5-21.7,28.9-25.9,46.4-26.8,6.7-.3,20.5,1.4,25.9-.4,2.8-.9,20.4-15.2,25-18.2,18.5-12.1,58.9-36.8,79.3-41.7,26.3-6.4,48.9,28.1,62.5,46.9,8.4,11.7,21.7,24.8-4,21.8s-21.5-9.3-24.5-9.3-8.4,5.7-10.8,6.2c2.4,17.6,3.6,35.4,4.9,53.1,13.6,15.4,47.5,45.6,32.1,68.2-5.1,7.5-18.5,12.2-27.3,13.1s-19.2-.9-20.1-.4c-2.3,1.4,1.8,4.9,2.4,7,2.2,8.4-1,16.9-9.7,19.5s-9.8-.4-11.3.5-2.3,4.7-3.9,6-5.7,2.3-5.7,2.8c0,1.9,2.8,3.2,2.8,5.6s-2.4,4.1-1.8,5.1,8.1,5.9,9.8,7.6c17.8,17.3,31.2,38.2,39.9,61.5,1.7,4.6,9.1,26.7,8.3,29.8s-4.7,1.5-5.5,1.6c-6-38-26.6-73-56.3-97.2-1.5-.8-11.1,6.7-13.6,8.1-10.9,6.1-32.9,15.6-45.1,16-2.4,0-3.6-.4-5.1-2.4,3.5-4.4,9.7-3.2,15-4.7,9.2-2.6,21.2-7.2,29.7-11.6,2.9-1.5,15.2-8.7,16.7-10.5s.9-5,1.9-6.6,2.6-.4,2.3-1.9c-8.7.8-14.2-5.4-18.3-12.2-3.2,2.2-7.6,5.1-11.1,6.7-3.3,1.5-9.3,2.6-11.9,4.1s-3.7,4.8-5.7,6.5c-6.6,5.9-14.1,12.5-23.4,12.7-2.9,17.3-8.2,34.1-11,51.4-2.5,15.6-3.2,31.4-5,47.1-3.9,1.2-4.4-1.5-4.4-5.1,0-20.8,5-47.8,9.4-68.3,1.7-7.6,7.4-19.9,6.3-27.4s-6.4-16.9-7.1-17.5-8.8-3.6-9.3-3.7c-2.7-.2-7.3,3.2-10.6,2.9-.8,10.9-.4,20.9,8.3,28.6s11.2,6.1,4.2,7.1c-12.5,1.8-23.4-26.3-15.5-35.7h-15.5c-17.9,0-45.4-16.1-59.5-26.8-2.6-2-18.2-16.6-19.8-15.4-4.6,16.6-8.5,33.3-11.2,50.3-.6,3.8-1.6,28.4-5.3,28.5s-1.4-3.2-1.4-4.2c-.9-12.2,2.9-25.2,3.7-37.4l-10.7-7.2c-2.7,14-3.8,30-1,44.1s10,17.8,23.5,22.5,33.6,8.7,48.8,9.3c3.6.2,17.3.7,19.6-.1s1.1-.6,1.4-1.5c3-8.2,3.6-20.6,6.4-29.2,5.9-5.4,4.4,3.8,3.8,7.5-4.2,24.7-14.1,49.4-14.7,74.9-2.6,6.1-8.8.2-7.7-5.6,1.6-13.1,4.4-26,8.4-38.7h-1.5c-3.7-.5-2.8.4-6.6,0-2.4.3-9.6.7-14.3-.6-16.5-1.5-55.1-7.6-66.5-19.5-13.3-14-9.6-47.8-6.6-65.8-1.7-1.9-3.9-3.5-6.2-4.7-12.8,2.6-14.1-5.7-15-15.9-4.1-5.8-7-11.9-8.8-18.1v-4.7c.5-2.3,4.7-6.2,5.1-7.5s-.7-3.6-.2-5.9c.7-3.7,4.7-6,5.3-7.9s0-5.8.6-8.8c2.2-9.5,11.7-10.5,19.3-6.5,7.7-25.9,14.8-52,22.5-77.9-2.5-5.4,5.7-28.5,13.2-24.6,4.3,2.3-1.2,22.8-2.6,27.3l-2.1,1c-5.4,28.6-10.6,57.3-16.8,85.8,4.9,2.7,8.5,2.7,12,7.7,5.3,7.7,4.7,22.2,7.6,26.2,1.3,1.8,15.5,13.1,18.4,15.4,20.4,16.2,34.6,23.5,60.5,28.2,3.5.7,7,.7,10.3,0Z"/>
  <path class="st39" d="M142.5,12.9c2.4,4.9,4.3,10.3,9.9,12.2,1.6,1.9-1.6,2.5-2.7,3.9-3.1,3.5-4.6,8.1-8.1,11.2-.9-2.3-1.7-5.9-3-7.8s-5.5-3.9-5.6-5.8,9.9-9.3,8.5-13.6h.9Z"/>
  <path class="st25" d="M245.8,404.2c-1.7.1-3.5-.2-5.2,0l-2.3,1h-7.5c-.5-2.8,1.4-1.8,3.2-1.9,3.5-.1,8.6-.7,11.8.9Z"/>
  <path class="st37" d="M225.1,405.1h-16.9v-.9c5.4.1,11.9-.9,16.9.9Z"/>
  <path class="st26" d="M72.1,65.4c2.3.5,4.6.3,6.9-.7l1.6,1.6c2.5,0,10.6,10.2,11.9,12.9,1.9,3.9,1.3,8.7,5,9.6-.2,4.3-1.4,6.8-3.8,7.5-3.2,6.6-12.9,14.6-20.6,13.1,1.3-6.8,4.7-17.5,4.7-24s-4.6-.3-7.4,1.1c-2,6.4-3.9,12.7-5.8,19.1-6-1.7-7.4-8.4-11.3-12.2-2.3-1.7-1.9-6.5.9-7.5,1.3-6,4.5-11.7,9.5-15.4,2-1.5,7.8-3.9,8.4-5.2Z"/>
  <path class="st4" d="M103.1,198.7l-7.4-12.5-2.9-1.1c4.8-2.1,6.3-7.3,9.9-10.8,2.7,1.8,3,5.2,4.8,7.4s3.8,2.1,4.1,3.4-10.3,9.5-8.4,13.5Z"/>
  <path class="st35" d="M97.5,88.9c2.8.7,6.9.6,10.3,1.4s13.1,3.1,14.4,4.2.8,2.6.6,2.9c-1.9,2-25,.1-29.1-.9,1.4-2.8.9-8.1,3.8-7.5Z"/>
  <path class="st7" d="M72.1,65.4c1.3-3.4,1.3-11.1,2.1-15.2s3-15.6,5.4-12.9l.9,29.1c-1.4,0-8.8,3.4-8.4-.9Z"/>
  <path class="st22" d="M360.6,155.8l-5,10c-.6-5.5-3.3-12.1-9.4-13.1.9-1.7,3.6-1.4,5.3-3.1s2.1-6,4.5-8.1c2.9,4.2,4,8.3,8.9,10.8l-4.3,3.6Z"/>
  <path class="st34" d="M54.3,86.1c-.5,2.1-.2,5.2-.9,7.5l-26.3.9c.1-1-.2-2.3,0-3.2.5-2.2,23.9-4,27.3-5.3Z"/>
  <path class="st14" d="M198.8,54.1c0,.1-1.8.2-2.8,1.4-1.7,2-2.6,5.1-3.7,6.5-2,2.5-2.5-2.2-3.6-3.8s-4.1-4.3-3.9-5.3,6.2-7.5,7-9c.9,2,7.7,9.3,7,10.3Z"/>
  <path class="st29" d="M112.2,58.1c9.2-1-7,12.6-9.1,11.6-4.8-2.2,4.6-11.1,9.1-11.6Z"/>
  <path class="st30" d="M89,119.9l5.4,12.9c.9,4.5-1.8,7.5-3.7,1.8s-1.9-10-1.7-14.7Z"/>
  <path class="st31" d="M54.3,70.1c-5.3-1.1-10.7-5.6-11.3-11.2,5.9-.1,8.8,6.8,11.3,11.2Z"/>
  <path class="st28" d="M231.4,34.6c4.4-1.2,6.5,3.6,3.1,6.9-5,4.9-8.3-5.5-3.1-6.9Z"/>
  <path class="st18" d="M39.3,125.5c-2.4-2.5,6.1-11,8.4-12.2.4,2.2-5.8,14.9-8.4,12.2Z"/>
  <path class="st32" d="M323.8,302.7c-2.7-4.5,4.2-7.2,6-4.6,3.5,5.1-4.3,7.4-6,4.6Z"/>
  <path class="st19" d="M357.3,268.2c1.8,1.4-.5,7.8-2.7,6.4s-2.3-3.6-1.8-5,3.6-2.1,4.5-1.4Z"/>
  <path class="st20" d="M165,272.8c-2.8,2.4-7.4.5-10.3,0,3.4,0,6.9.1,10.3,0Z"/>
  <path class="st11" d="M254.2,345.1c3.1-.5,4.4,1.9,5.8,4,6.1,9.2,11.1,35.1,11.2,46.2s0,3.2-1.5,4.2c-4.6,1.5-3.9-10.7-4.3-13.5-1-6.3-2.2-13.5-3.9-19.6-2-7.4-6.2-14-7.2-21.4Z"/>
  <path class="st11" d="M333.8,390.4c1.7,3.8-3.8,9-13.3,11.1-34.1,8.9-131.2,7.1-171.4-1-6-1-11.6-1.9-15-4.5-4.3-6.4,39.7,2,50,2.5,23,1.9,49.8,3.1,72.2,2.4,27.3-.7,56-4,77.5-10.5Z"/>
  <path class="st24" d="M232.6,181.8c.3.6-.3,1.2-1.9,1.9.6,3,3.6,4.9,9,5.6,3.5,3.5,5.5,3.8,6.1,1-2.4-4.1-1.7-5.6,1.9-4.7,3.7.7,7.5,1.1,11.3.9-2.5,10,.3,26,7.8,33.4,11.9,11.9,15.2-10.1,29.4-2.7s.1,33.4-14.3,34.9c-4.6.5-12.8-2.1-14.6-1.5s-7.5,7.9-9.9,9.9c-39.1,33.5-108,10.8-102.6-45.4,1.5-15.1,9.8-30.5,12.1-45.6,12.2,1.9,22.9-5.8,31-14.1,5,12.8,22.3,22.2,34.7,26.3Z"/>
  <path class="st6" d="M305.8,240c1.2-3.7,2.6-7.8,2.8-11.8.1-2.9-1-6.3-.8-8.2.2-1.8,3-5.6,3.6-7.7l7,10.9c4.9,2.4,4.6-1.2,3.1-5-20-48.2-114.2-90.8-163.8-75.1s-10.6,3.8-10.5,6.4c0,6,10-1.7,11.3-.5-2,5.6-3.7,8.6-.8,14.4s4.6,4.6,4.6,4.9c0,1.3-3.2,10.7-5.2,10.7-5.5,0-23.6-13.8-27.8-18.3-15.9-17.2-15.3-39.9,10.1-46.2,62.6-15.5,148.9,23.1,190.3,70.1,10.1,11.4,27.6,32.5,14,46.8-2.9,3-13.9,8.5-17.7,8.5h-20.2Z"/>
  <path class="st6" d="M313.9,55.5c6.6,4.7,13,12.7,18.2,18.9,9.1,10.9,16.6,23.1,25.4,34.2-3.2,0-6.3.2-9.4-.4-5.8-1.1-20.4-9.1-23.9-8.9s-7.9,6.2-11.7,5.6c-2-2.3,1.5-21.8-6.6-20.6l6.6,75.1c-34.9-26.9-75.4-45.8-119.2-52.6l38.9-26.3c16.5-8.2,32.1-19.1,49.3-25.7,11.9-4.6,21.1-7.3,32.4.8Z"/>
  <path class="st13" d="M303.9,215.6c-6-5.4-15.1-6.8-22.4-3.2s-4.9,4.6-8,6c-6.7-5.6-12.6-22.6-7.9-30.4s5.8-1.7,4.1-4.4-13.9-2.4-17.6-3c-14.1-2.6-34.9-9.2-44.8-20s-9.8-13.6-1.9-13.2,31.8,9.3,41,13.5c13.4,6.2,52.7,29.2,58.3,42.1s.6,7.7-.8,12.5Z"/>
  <path class="st24" d="M61.8,267.2c-1,1.2-20-12.7-20.3-14.5s1.7-11.9,2-12.7c1-2.8,2.1,1.5,2.7,2,1.2.8,1.9,1.1,3.4.9-.3-6.7-5.3-12.1-1-19.1.8-1.3,4.4-2,4.4-4.9,0-5.3-8.7-1.3-10.5-7-2.9-9.3,14-15.1,21.6-4.6s4.7,13.6,5.1,18.3c1.2,13.6-6.9,28.1-7.4,41.6Z"/>
  <path class="st10" d="M297,250.3c4.1-.9,6.3,13.7-2.4,16.4-6.5,2-11.4-2.8-13.6-2.3s-.9,7.6-5.8,10.2-11.7-4.4-15.3-8.8c3-1,8-8.3,10-8.8s10,1.4,14.6.6c4.9-.9,11-6.9,12.5-7.2Z"/>
  <path class="st9" d="M197,146.1c-5.5,9.5-17,19.1-28.6,17.8s-5.8-14.2-.7-16.7c7.6-3.8,21.1-1.5,29.4-1.1Z"/>
  <path class="st33" d="M51.3,195.6c-.3.2-7,2.4-7.3,2.1l.3-4,25.1-87.1c-3.8,21.9-8.2,43.7-12.9,65.5-.4,2,0,4.1-.5,6.1s-4,16.8-4.7,17.4Z"/>
  <path class="st27" d="M29.6,241.5c1.6-2.4,4-4.2,4.9-5.9s.8-4.2,1.5-5.1,4.7-1.1,6.1-2.8c-2.2,4.2-3.5,20.8-5.6,23-4.5,4.6-10.6,0-9.4-6.6s2-1.8,2.6-2.7Z"/>
  <path class="st3" d="M41.2,222.1c-8.3,5.9-18.4-4.9-18.3-13s2-5.7,4.7-3.9,7.7,6.6,8,7c1.7,2.4,1.8,7.5,5.6,9.9Z"/>
  <path class="st17" d="M205.4,282.2c5-.7,10-.6,15,0,.8,0,2.9-2,3.7-.5-6.2,5.1-12.3,10.4-20.2,12.5-1.4-.2-5.6-12.4-5.1-12.9,2.3.2,4.2.9,6.6.9Z"/>
  <path class="st1" d="M37.4,205.2c-10.2-1.7-14.1-20.6-.7-17.6,6.6,1.5,1.2,12.9.7,17.6Z"/>
  <path class="st16" d="M30.7,227.9c1.8,3.1-1.9,6.5-4,8.2-3.3-3-11.1-12.8-7.5-16.9s1.2-.4,2.2.6c1.5,1.6,2.5,3.3,4.4,5s4.8,2.8,4.9,3Z"/>
  <path class="st36" d="M247.6,185.5l-2.8.9c2.5,2,.9,3.5.9,3.7h-2.2c-2.8-3.3-7.3-4.7-11.6-4.7l-1.2-1.8c0,0-.9-.5-.9-.9l2.8-1c4,1.3,10.8,2.9,15,3.8Z"/>
  <path class="st2" d="M220.4,282.2c-4.7.3-10.3.2-15,0,3.8-1.6,11-1.6,15,0Z"/>
  <path class="st21" d="M137.6,349.5c-2.2.1-7.2.3-12.3.2,3.2-2.1,9.4-2.2,12.3-.2Z"/>
  <path class="st12" d="M212.6,249c-11,11-30.4,9.1-31.5-8,6.2-.8,10.3,2.4,17.3,1.8s15.6-6.5,18.6-5.5c4.3,1.4-2.6,9.9-4.4,11.8Z"/>
  <path class="st38" d="M197,214.6c-1.3,2-17.4-1.6-14.8,9.7.7,2.9,6.8,6.4,3.6,8.7s-6.4-2-7.5-3.8c-7-10.6,4.9-21.2,15.5-19.2s4.4,3,3.3,4.7Z"/>
  <path class="st23" d="M181.7,187.6c9.2-2.5,4.4,18.4-3,17.8s-3-16.1,3-17.8Z"/>
  <path class="st40" d="M234.3,201.7c7.2,7.5-12.4,28.1-10.6,8.6.3-3.6,6.8-12.6,10.6-8.6Z"/>
  <path class="st15" d="M194,175.3c3.3,5.4-6.8,4.3-9.5,4.8s-11.4,4.1-12,1.1c-1.3-6.5,19.6-8.9,21.5-6Z"/>
  <path class="st0" d="M245.8,190.2c.2,1.3,1.5,2.9.9,4.7-3.5.7-5.2-2.8-7.8-3.9s-8.8-2.4-9.6-3.5.9-2.5,1.4-3.8c5.5-.4,12,1.7,15,6.6Z"/>
</svg>
```


### public/testimonial-1.svg
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Calque_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512">
  <!-- Generator: Adobe Illustrator 29.5.1, SVG Export Plug-In . SVG Version: 2.1.0 Build 141)  -->
  <defs>
    <style>
      .st0 {
        fill: #5c2e25;
      }

      .st1 {
        fill: #3d2c29;
      }

      .st2 {
        fill: #e36b38;
      }

      .st3 {
        fill: #5d2e25;
      }

      .st4 {
        fill: #e36f3d;
      }

      .st5 {
        fill: #f59c6b;
      }

      .st6 {
        fill: #5f3026;
      }

      .st7 {
        fill: #f59c6a;
      }

      .st8 {
        fill: #612f25;
      }

      .st9 {
        fill: #944634;
      }

      .st10 {
        fill: #e36c38;
      }

      .st11 {
        fill: #d54450;
      }

      .st12 {
        fill: #934534;
      }

      .st13 {
        fill: #f1c187;
      }

      .st14 {
        fill: #6c3426;
      }

      .st15 {
        fill: #6c3326;
      }

      .st16 {
        fill: #3d2c2a;
      }

      .st17 {
        fill: #f1c288;
      }

      .st18 {
        fill: #d64450;
      }

      .st19 {
        fill: #6a3226;
      }

      .st20 {
        fill: #5d2f25;
      }

      .st21 {
        fill: #f56974;
      }
    </style>
  </defs>
  <path class="st21" d="M367,356c-1.6,1.6-2.7.2-1,2.5,2.8,3.7,7.8,7.3,11,11,16.8,19.7,25.5,44.2,30.7,69.3,5,24.1,6.3,48.7,6.3,73.2h-81l-2-.6-1.9-73.7c0,23.5,0,47,.2,70.6l-1.3,3.7h-168c-2.2-1.3-2.9-8.6-2.8-11.5,1.1-26.2,2.3-46.6,7.3-72.6s4.2-16,7.2-23.5c-13.4,32.2-14.9,68.2-14.7,102.8-.3,1.7-.9,3.3-2,4.7h-38c-1.3-1.7-.9-3.3-.8-5.2,3.9-46.7,13.5-106.5,49.8-139.8,0-.7.1-1.4.4-2.1,1.8-5.5,29-19.2,35.9-22.2l3.8.3,2.4.9c11.8,53.9,89.8,30.8,106.5-9.1l3.1-1.8,3.8-.5c14.4,5.2,27.8,11.2,39.6,20.4,2.5.6,4.3,1.7,5.5,3.1Z"/>
  <path class="st11" d="M155,512c-.3-34,.6-71.5,13-103.5,1-2.6,3.7-10.4,6.5-10.5s-3.8,14.5-4.2,15.8c-8.3,28-11.4,57.6-11.1,86.7s1.6,7.7.8,11.5h-5Z"/>
  <path class="st18" d="M333,512h-5c-.2-21.8-1.6-43.7-1-65.5.2-8.4.1-21.1,1-29,.2-1.7.2-3.4,2.5-3.4l2.5,98Z"/>
  <path class="st9" d="M386,189c0,3.6-2.6,3.3-7.7-1.1-9.7-5.7-21.1-4.6-29.4,3.1h-2.9c-2.6,2.2-8.7,1.4-10-1.9-1.3-.5-2.3-1.2-2.9-2.1v-14.2c-20.5-13.9-36.4-36.9-45.4-60.1-2.3-5.8-5.4-13.9-4.7-19.6l-.8-2.3c1.8-2.2,3-4.6,3.5-7.1-12.9,19.5-31.3,34.6-51.5,46.1-13,7.5-29.2,16.2-44.2,16.3l-2.6,1.4c-26.7-5.5-49.8,11.4-53.5,38.1l-1.4,1.2c-1.7-1.3-5.3-.6-6.5,1.3l-2.5-13.7c-13.7-104.7,95-157.6,183.2-117.5,10.9,5,22.5,17.3,29.6,20.4,13.8,6.2,19.8,2.8,32.2,16.8,24,26.9,20.6,62.6,17.5,95Z"/>
  <path class="st12" d="M299,303c.2-1.2.8-2.2,1.8-3,18.7-13.1,31.3-25.3,39.4-47.4,20.2,3.2,36.9-6.8,45.7-24.9,1.8-1.1,2.6-.8,3.1,1.3,6.1,15.5,25.7,16.2,37.5,26,27.7,23.1,8.8,77.5-28.5,75-1.1-2.7-1.5-2.1-1,2-3.3,11.7-17.7,23.8-30,24s-3.2.2-4.9-.5c-3.5-1.5-10.6-7.5-15-10-9.4-5.2-19.3-8.2-29-12.5-1.9,2.3-5.4,1.1-5-2-4.9,2.1-10.9-5.3-13.1-9.6-2.3-4.5-4.7-14.9-.9-18.4Z"/>
  <path class="st12" d="M142,239c.9.3.9.7,0,1-2,4.4,1.4,12.7,3.4,17.4,14.6,34.7,42.2,49.1,78,55.8-.2,7.3-.6,14.3-1.4,20.9,1.9,3.4-7,8.2-10,6-1,3.3-2.8,4.2-6,3-14,7.1-28.2,13.1-40,24-6.7,1.7-12.5-9-15.7-9.9s-10.5,1.2-14.7.8c-23.5-2.7-37.8-22.2-34.6-45.4,3.9-28.3,34.9-40.8,37-73.5,0-2.9,3.3-2.8,4,0Z"/>
  <path class="st8" d="M346,191c11.3-11.5,26.5-11.5,38.5-1l1.5-1c-.5,4.8,6.2,16.3,4.9,28.4s-3.2,8.3-1.9,11.6h-2c-7.2,17.3-27,29.4-46,25-6.7,20.9-22.5,39.1-42,49-1.9-1.2-1.9-2.7,0-4l.2-2.4c18.5-11.5,30.7-28.2,37.9-48.9l2.6-1c20.9,9.1,40.1-8.7,44.6-28.7,7.5-33.8-28.7-38.8-41.8-12.4-5,5-10.2-5.2-6.4-8.5.5-1.6,2.2-2.5,5.1-2.5,1-2.7,2.6-3.8,4.9-3.5Z"/>
  <path class="st17" d="M137,210c1.8,3.6,3.7,24.9,2.4,26.7s-.8.9-1.4,1.3c-8.1-.2-17.1-8.2-20.2-15.3s-3.5-11.2-3.6-12.4,2.6-11.6,3.3-13.1c2.3-4.4,5.5-5.9,8.4-9.1,1.2-2,7.2-3.4,8.2-1.6-.8,7.3,1.1,14.3,3.8,21.1l-1,2.5Z"/>
  <path class="st0" d="M398,330c0,.6-.8,1.3-1,2-4.5-4.4-2.2-12.5-3.1-18.4-1.7-11.3-8.3-20.1-16.4-27.6s-8.2-4-5.5-7,8.7,4.4,10,5.5c12.2,10.4,18.1,29.8,16,45.5Z"/>
  <path class="st4" d="M141,215c2.9,6.6,3.3,17.3,1,24h-4c0-.3,0-.7,0-1,.3-9.3-1.9-18.6-1-28,2.5-1.4,5.9,2.8,4,5Z"/>
  <path class="st11" d="M318,333c-11.4,25.1-35.8,42.1-63.5,44s-29.8-1.4-40-14c-5.4-6.7-5.7-12.3-8.5-20,2-1,4-2,6-3l2.2,2.2c8.9,48.9,81.9,24.3,95.8-9.7l3-1.5c1.6.8,3.4,1.3,5,2Z"/>
  <path class="st16" d="M190,146c5.2-.9,7.9,0,8,3,5.5-.8,10.3,5.1,13.6,9.3,4.7,6,8,12.8,9.4,20.2,4.5-.9,9.2-.9,13.6.7,10.8-52,86.9-47.2,90.3,6,5-.3,8.7,1,11.2,3.9,3.3.6,6.8,1,10,2-4.3,4.4-1.1,6.2-10,6,0,.9-.4,1.5-1.2,1.9l-10.1-1.8c-3.9,11.2-10.1,25-22.7,27.9l-1,2.3-11.3,3.8c-1.5,0-3-.4-4.6-1.1l-2.2,2.2c-24.6,1.9-48.5-15.2-49.1-40.8-8.8-5.8-13.9-1.9-15.2,11.7l-2.6,1.9c2,3.6-2.8,11.3-7,11,.2,5.1-7,8.7-11.4,10.8s-12,5.5-15.6,2.2c-4.9,4-18,3-22-2-7,1.7-17.3-4.9-19-12-1-1.1-3.4-4-4-5-1.9-3.6-4.5-12.5-4.9-16.6-.6-6.1,3.6-9-6.1-5.4.1-.2-.4-1.4.1-1.8.9-.7,5.1,0,6.4-2.2s1.8-8.9,3-12c8.2-21.4,32.9-32,54.5-26Z"/>
  <path class="st17" d="M283,93c3.6,7.7,5.2,16.1,8.5,24,8.1,19.1,23.9,40,40.1,52.9s2.9.8,3.2,1.3c1.5,2.4-1.5,14.3,1.2,17.8-4.3-.8-8.6-1.9-13-2-1.9-53.5-78.5-58-87-5-5.2-2.8-11.4-2.6-17-1-.6-12-10.5-26.4-21-32l4.5-3.6c29.6-10.9,57.7-27.6,77.6-51.7l2.9-.6Z"/>
  <path class="st6" d="M283,93c-8.3,12.3-25.9,25.9-38.5,34s-30.2,16.6-46.5,22c-1.4-.7-6.4-2.5-8-3,21.4-5.6,43-16.5,60.9-29.6,13.6-10,25.7-22,34.6-36.4,5.1,3.1,0,9.3-2.5,13Z"/>
  <path class="st20" d="M320,99l3.5,1c5.8,19.2,17.1,33.5,34,44s9.8,3.6,6.5,5.5-14.8-5.3-18-8c-12.3-10-23.1-26.9-26-42.5Z"/>
  <path class="st13" d="M313,331c-7.3,15.6-21.4,28.9-37.5,35-26,10-61.1,8.4-63.5-26,2.9-1.5,8.1-3.5,10-6-.5-.4-.8-.7-.8-1,.5-4.7,1.6-13.4,2.5-17.9s.6-.7,1.3-1c1.3-.8,2.7-1.5,4.2-1.5,27.1.4,39.5.3,65.5-9.4,1.4-.5,2.9-.7,4.4-.2,0,13.3,1.5,21.7,14,28Z"/>
  <path class="st3" d="M359,342c-.6-.6,1.3-13,1-16.5-.7-6.5-5.2-11.3-5.8-15.2s1.8-4.4,4-1c4.8,7.4,6.7,16.4,5.8,25.2s-1.9,10.8-5,7.5Z"/>
  <path class="st13" d="M299,299c-.3,1.3-1,2.5-2.2,3.1-14.4,6.9-29.1,10-45.1,10.9-5.1.3-23.2.9-26.3-1.5s-1-1-1.5-1.5c-8.1,2.7-20-1.7-28.3-4.9-20.5-7.8-36.9-20.6-46.9-40.3s-8.2-17-6.8-24.8c0-.3,0-.7,0-1-1.2-7.7-.9-16.2-1-24,5,5.7,11.7,9.8,19,12l-.3,2.4c-25,23.5,26.4,44.6,22.9,6.8-1.5-2.9-1.7-5.4-.6-7.3,10-.9,20.2-5.5,27-13,2.2.5,3.6,2.7,4.1,6.8,4.1,7.8,12.7,7.9,12,7.6-7.1-2.9-15.4-6.8-11.7-16.7s5.7-7.1,10.1-8.4c-3.4,1-5.8.9-7.5-.3,1.7-4.1,3.2-14.4,4.5-16,2.2-2.6,6.5-2.3,9.5-1.6,8,2,5.1,4.1,6.2,9.8,4.7,22.8,26.3,35.1,48.7,32.8h3.3c-5.3,10.5-4.2,23.4,8.7,27.4,22.8,7.1,31.4-30.3,6.6-30.6l-1.6-1.8c11.4-7.3,17.3-16.6,21-29.6,1.7-1.2,9.8,1.5,13,1.6,3.2,15.8,5.2,5.1,10.5-1,12.6-14.4,37.1-12.2,40.3,7.8,3.6,23-15.9,50.5-40.2,47.2s-6.7-3.3-8.1-2c-3.9,10.4-8.3,20.9-15.5,29.6s-16.6,16.5-24,20.5Z"/>
  <path class="st15" d="M142,240c7.6,42,41.8,64.9,82,70,3.1,1,4,2.1,1,4,.3,5.2.2,15.8-3,20-2.4-.8-1.9-2.2-1.8-4.2s3-14.4,1.7-15.8c-22.6-3.2-45.9-11.7-61.5-29-9.2-10.3-18.2-26.9-20.4-40.6s-1.2-5.1,1.9-4.4Z"/>
  <path class="st20" d="M154,309c.7.7-5.6,15.8-6,19.5s-.3,9.3.2,12.8,4.3,10,4.8,13.2-1.9,1.9-3.4,1.5-5.1-12.5-5.4-14.8c-1-8.1.2-20.3,3.9-27.6s3.8-6.7,5.9-4.6Z"/>
  <path class="st2" d="M299,299c0,1.3,0,2.7,0,4-22.8,11.5-48.8,14.2-74,11,0-1.4-.2-2.8-1-4,23.7,3,53.7.8,75-11Z"/>
  <path class="st17" d="M275.5,152.6c47.4-4.8,54.8,64.6,8.9,69.3-52.2,5.3-53.3-64.9-8.9-69.3Z"/>
  <path class="st17" d="M178.8,152.2c14.2-1.1,28,12.1,31.5,25,14.2,52.2-67.2,59.6-70.3,14.3-.8-12.1,6-28.4,17.7-33.3s17.9-5.7,21.1-6Z"/>
  <path class="st5" d="M302,225c14.8-2.8,24,14.6,15.4,26.9-12.8,18.4-42.9,3.4-31.9-19.9s3.1-2.2-.6-2.1c5.6-.6,11.7-4,17-5Z"/>
  <path class="st7" d="M182,229c5.2,9,4.2,22.4-5.6,27.9-19.4,10.8-36.8-19.5-16.4-29.9,7.2,2.2,14.5,2.7,22,2Z"/>
  <path class="st19" d="M209,216c3-3.3,5.3-6.9,7-11l6.5-2.1c10.6,2.2.9,4.2-2.2,5.8-7.7,4.1-7.1,13.9.3,18.1s7.5.8,6.4,4.6-10.2-1.3-12-3c-4.4-4-4.4-7.2-6-12.5Z"/>
  <path class="st14" d="M263,242c3.8,2.6-6.8,12.7-9.1,14.4-13.5,10.2-35.1,10.4-47.9-.9-2.2-1.9-7.8-7.1-4.6-9.6s5.6,3.4,9.1,6.1c11.9,9,32.8,8.1,43.5-2.5s5.3-10,8.9-7.5Z"/>
  <path class="st10" d="M352.9,219.9c-1.9,1-4.4-.6-3.7-3.2s6.3-8,7.9-9.1c2.7-1.9,14.5-6.5,15.9-2.1s-4.9,2.2-7.2,2.7-5.6,2.6-6.7,3.4c-2.4,1.8-5.7,8.1-6.2,8.3Z"/>
  <path class="st1" d="M274.7,177.2c12.9-2.9,14.6,20.1,6.2,25.2-13.6,8.2-18.2-22.5-6.2-25.2Z"/>
  <path class="st16" d="M184.5,175.4c9.7-.3,12.5,22.4,2.2,26.8s-15.9-26.4-2.2-26.8Z"/>
</svg>
```


### public/testimonial-2.svg
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Calque_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512">
  <!-- Generator: Adobe Illustrator 29.5.1, SVG Export Plug-In . SVG Version: 2.1.0 Build 141)  -->
  <defs>
    <style>
      .st0 {
        fill: #d6a55a;
      }

      .st1 {
        fill: #9a6334;
      }

      .st2 {
        fill: #fbae6c;
      }

      .st3 {
        fill: #2a2622;
      }

      .st4 {
        fill: #2a2621;
      }

      .st5 {
        fill: #733918;
      }

      .st6 {
        fill: #d7a65d;
      }

      .st7 {
        fill: #fde5b2;
      }

      .st8 {
        fill: #723716;
      }

      .st9 {
        fill: #d7883d;
      }

      .st10 {
        fill: #dbac6f;
      }

      .st11 {
        fill: #d07b2e;
      }

      .st12 {
        fill: #c08e47;
      }

      .st13 {
        fill: #f7b76f;
      }

      .st14 {
        fill: #d17c2f;
      }

      .st15 {
        fill: #d28033;
      }

      .st16 {
        fill: #fbc179;
      }

      .st17 {
        fill: #d7893e;
      }

      .st18 {
        fill: #d17e31;
      }

      .st19 {
        fill: #bc8c45;
      }

      .st20 {
        fill: #bc8d47;
      }

      .st21 {
        fill: #f5b063;
      }
    </style>
  </defs>
  <path class="st7" d="M400,423l2.2,1.6c5.4,23.8,10,55.9,6.3,80.4-.4,2.5-1.3,4.8-2.5,7h-67c-1.1-2.8-1.8-5.7-2.1-8.7l.2-65.7-1,73.3-2,1.2h-185c-1.9-4.1-3.3-4.1-4,0h-24c-.6-.7-1.1-1.4-1.5-2.1-3.4-6.4-1-41.1,0-50.5,4.5-40.9,18.2-77.6,49.4-105.4s17.7-15.1,20-14.8,2.1.7,2.5,2c-1.7,14-1.9,29,5,41.7s4,2.1,6.7.2l18.9-14c9.5-8.6,21.5-2.6,18.6,9.3,7-12.8,13.2-16.5,25.8-8.1,7.5,7.3,15.5,13.2,23.9,17.8,5.7-.4,16.2-17.4,18.8-21.9,7.4-12.9,11-25.1,14.3-39.4,25.7,9.1,47.7,31.2,61.5,54.5,7.3,12.4,14.9,27.6,15,41.8Z"/>
  <path class="st12" d="M307,306c3.8.8,7.5,3.7,10,6.5s4.7,8.7,6.2,10.3,11.2,5.7,14,7.5c34.2,21.7,54.6,49.7,65.7,88.8-.5,2.9-1.5,4.2-3,4-10.4-41.3-37.1-76.9-76-95-1.3,19-11,38.1-22.6,52.9s-6.5,8.8-11,9.1c-7.1.4-21.3-18-30.6-21.3s-8.9-1.4-13.8,4.8c-12.9,16.3-10.7,48-14,68s-4.3,2.8-4.1-3c.5-14.7,3.5-37.6,7.4-51.7s4.9-11.9,4.6-13.1-4.7-6.4-5.3-6.8c-2.9-2-8.6,2-11.5,3.7-5.8,3.4-17.6,14.2-22.1,15.9-5,1.8-6.5-3-8.1-6.8-5.1-11.7-4.9-24.6-3.5-36.9s1.9-2-.8-1.8c-16.7,11.7-32,25.7-42.9,43.1-23.5,37.3-27.7,84.8-24.6,127.9h-4c-4.7-58.3,6.6-122,52.5-162,6.3-5.5,18.5-11.8,23.1-16.4s6.9-11,13.3-13.7c2.9,0,4.4,3,2,5l-.8,2.6c-18.1,9.9-13.4,36.6-7.6,52.8,8.6-7.1,17.5-13.8,27.7-18.4-3.2-3.1-4.3-5.7-3.2-7.9l-1.8-2.4c-2.3-2-7.4-6.8-2.2-6.6,2.3-1.6,6.4,2.8,8.1,4.7,5.2,5.7,10.2,11.8,14.9,18,13.3-9.9,27-19.4,41.1-28.5,2.3-3,4.9-4.7,7.8-5.2,7.4-4,2.7,3.9-1.1,6.5-3.2,2.3-6.1,4.8-8.9,7.5l1.1,1.8c-6.3,4.9-13.2,9.2-20.9,13,9.1,6.1,17.9,12.9,26.3,20.2.7.4,1.4.7,2.2.8,1.5.2,11.8-15.3,13.3-17.9,9.1-15.6,23-40.6,2.8-53.5l-.9-2.4c-5.2.7-1.9-9.3,1-4Z"/>
  <path class="st19" d="M339,512h-5l1.5-107c1.6-.3,2.2,1.1,2.5,2.5,1.1,6-.3,16.3,0,23s1,4.6,1.1,6.9c.7,24.8-.6,49.7,0,74.5Z"/>
  <path class="st20" d="M149,512h-4c-1.1-8.7-1.2-17.9,0-26.5.5-25,.8-54.4,7.3-78.7,1.3-4.9,5-10.7,4.7-2.3s-3.9,18.4-4.9,26.2c-2.4,18.9-3.8,38.9-4.2,57.8s-.2,15.8,1,23.5Z"/>
  <path class="st0" d="M403,419c8.4,29.6,9,57.1,8,87.5,0,1.9,0,3.8-1,5.5h-4c1.9-23.8,1.2-47.8-2.1-71.4-.8-5.7-3.5-11.7-3.9-17.6s1.6-3,0-5l3,1Z"/>
  <path class="st14" d="M372,136c-1.5,2.5-5.4.8-5-2-16-37-44.3-62.8-84.1-72.2-74.4-17.6-148.1,30.4-148.3,109.6,1.1,19.5,0,38.9-2.7,58.2-9.6,72.7,73.1,88.4,128.4,82.7l2.6,1.7c1.4.1,3.9.6,3,2.2-4.4,6.9-43,4.9-52,3.2-2.3.4,3.1,20.5,6.4,22.8l-.3,2.8c-2.6,3.2,1.8,4.4,3.1,6.5s.7,2.1.9,2.5c-5,.9-9.7-6.7-12-10.9s-6.6-13.8-4-18.1c-.4-1.6-1.7-3.5-2-5s2.4-2.7-.7-3.8-12.5-2.1-17.5-3.5c-38.5-10.7-58.4-29.8-62.7-70.3s1.2-3.2.5-4.4-3.7-1.8-5.1-3c-19.8-16.8-20.7-49.5,7.4-57.1-.2-85.8,68.2-137.9,151.4-122.6,42.5,7.8,82.3,37.6,92.7,80.7Z"/>
  <path class="st18" d="M381,182c1-2.8,3.8-1.9,4,1,5.2,1.9,10,7.2,12.5,12,15.2,28.5-14.8,71.8-47.5,58-5.1,23.1-23.1,41.5-43,53s-1.4-.2-2,0c-.7,1.4.9,3.1,1,4,5.4,8-2.3,20.6-8.2,27.2-3.6,4.1-10.7,11.5-15.8,10.8,1.1-3.9,4-3.6,6-5.4s11.4-9.8,4-8.6l-.4-2.6c6.1-6.8,10.8-14.7,8-24.1l1.4-2.3-.3-1.3c18.7-12.2,37.8-28.2,43.8-51.2-2.2-5.2-1.5-7.9,2.1-8.2,25,15,49-7.3,48.6-33.9-.4-26.7-30.5-30.3-42.6-9.4-2,2.9-7.1,4.7-5.6,0,0-1.6,0-3.3,0-5,3.6-8.1,12.4-13.9,21.4-15.8s10.8-2.1,12.6,1.8Z"/>
  <path class="st1" d="M367,134c1,.2,4,1.5,5,2,17.1,8.4,19,30.7,13,47-.6-.2-3.2-.9-4-1l-1.5-2c12.8-65.4-64.9-42.8-36.8,10.1,2.8,1.9,4.2,3.9,4.3,5.9,2.8,2.3,5.1,3.9,0,5-6.8,3.2-13.2-8.5-15.3-14.4-7.3-20.3-2.7-48.4,21.1-54.5,4-1,12.6-2.5,14.2,1.9Z"/>
  <path class="st6" d="M243.3,416.7c-5.7-4.6,0-15.7,7.7-12.2s0,18.5-7.7,12.2Z"/>
  <path class="st21" d="M301,305c4,12.8-1.4,20-9,29-11.9,14-24.9,18-39.3,28.2s-6.3,5.3-9.2,7.8l-1.5-.4c-4.5-6.1-9.5-11.8-14.5-17.5s-5.8-4.9-7.5-7c-6.5-7.9-8.2-18.1-9-28,17.9,2.2,36.5,3.9,54-1.5l-2-1.5.9-2.1c11.9-2,23.9-4.4,35.3-8.3l1.8,1.4Z"/>
  <path class="st7" d="M306,310c23.7,11.3,10.4,39.3.4,55.9-2,3.3-11.9,18.5-14.5,19.6-4.7,2.1-16.9-11.9-21-14.9s-11.6-6.5-11.9-7.1c-.8-1.5.8-1.4,1.3-1.7,5.8-4.2,13.7-7.2,19.7-11.3s1.6-2.1,2-2.4c13.2-9.5,25.1-20.1,24-38Z"/>
  <path class="st7" d="M208,325c3,12.3,5.4,20.7,16,29,1,1.4,6.4,8.4,6,9-11.1,4.4-21.3,12.4-30.5,20-2.9,0-6.2-17.5-6.5-20.5-1.5-14.5-.4-31.4,15-37.5Z"/>
  <path class="st16" d="M367,134c-14.4-3.7-29.7,5.1-34.3,19.2s-2.3,42.7,14.3,47.8.6,1.1,1.5,1.1c4-2.6,5.7-7.8,10-11,14.8-11.1,35.9-4.7,38.4,14.6,3,23.3-13.8,48.9-39.3,45.3s-7.9-4.2-12.6-4.9c0,3.5,2.1,4.2,1.4,7.8-2.5,11.8-15.6,29.4-24.9,37.2s-16.7,12.4-20.5,14c-7.7,3.3-29.4,7.9-38,9-43.7,5.6-121-4-131.7-56.8s1.7-40.8,1.8-62.7-1.6-26.9,1.2-42.7c20.8-118.8,189.8-127.6,232.3-21.8.4,1.1,2.4,3.5.5,4Z"/>
  <path class="st13" d="M126,233c-6.6-2.3-11.9-10.2-13.9-16.6-5-15.3.1-29.4,15.9-34.4,2.8,17-2.4,34-2,51Z"/>
  <path class="st10" d="M381,182c-10-1.8-19.9,1.2-27.5,8s-2.9,5.8-6.5,6c-1.8-1.5-3.5-1.5-5.4-4.1-13.2-17.4-7.2-55.6,20-54,22.3,1.3,24.4,27.1,19.5,44.1Z"/>
  <path class="st2" d="M146.3,231.7c-13.3-13.3,5.8-33.2,22.4-26.9s11.1,35-11.3,32.2c-2.7-.3-9.2-3.4-11.1-5.4Z"/>
  <path class="st4" d="M274.7,167.2c20.1-4.6,21.7,29.1,4.7,30.7-17,1.6-19-27.4-4.7-30.7Z"/>
  <path class="st3" d="M181.8,164.2c15-2.8,21.2,22.7,7.3,29.4-18.6,9-25.7-25.9-7.3-29.4Z"/>
  <path class="st8" d="M269.1,249c-.4-.3-2.6-8-4.6-8.9-14.1,19.2-41.6,27.4-62.8,14.8s-18.3-13.8-11.2-15.8,8.6,7,11.1,8.8c16.3,11.8,38.4,8.1,52.8-4.9s6.1-6,6.4-7.7-4.4-3.6-3.9-6.3c7.2-3.1,18.6,14.7,15.5,19s-2.7,1.4-3.5.9Z"/>
  <path class="st11" d="M214.7,187.2c3.8-.6,7.9-.3,11.5,1s5.3,4.8-.4,4.5-6.6-1.3-11.1-.5c-12.2,2.1-20.4,17.6-10.8,27.3s14.6,5.6,21.3,4.2,9.3-6.3,11.2-5.8c5.1,1.3-3.8,7.4-5.8,8.2-17.6,7.5-41.7-2.8-34.2-24.2s11.4-13.7,18.2-14.8Z"/>
  <path class="st5" d="M161.4,136.4c5.3-5.9,18-9.8,25.7-7.9s7.2,5.1,2.2,6.4-5-1-7.7-.9-7.2,1.6-9.5,2.6-9.5,7.3-10.5,7.3c-3.8-.3-2-5.3-.1-7.4Z"/>
  <path class="st5" d="M270.7,129.2c7.9-2.3,23.1,3,27.3,10.2,1.6,2.7,1.2,6.4-2.4,5.4s-7.6-8-14.6-9.4-10.4.2-12.1-.9-.5-4.7,1.7-5.3Z"/>
  <path class="st15" d="M172,237c7.9-2.1,11.6-10.4,16-16.4s4,.6,1.9,4.8-15.9,20.7-17.8,11.7Z"/>
  <path class="st9" d="M142,193c-.3-5,15.2-9.5,16-5.5s-1.2,2.1-2.5,2.4c-4.5,1-8.9,2.2-13.4,3Z"/>
  <path class="st17" d="M309.6,194.1c3.2-.9,15,4.3,14.4,7.4s-1.5,1.1-2.7.7c-1.6-.6-12.5-5.6-12.9-6.2-.6-.9.5-1.8,1.1-1.9Z"/>
</svg>
```


### public/wave.svg
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Calque_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1440 320">
  <!-- Generator: Adobe Illustrator 29.4.0, SVG Export Plug-In . SVG Version: 2.1.0 Build 152)  -->
  <defs>
    <style>
      .st0 {
        fill: #d9f3ff;
      }
    </style>
  </defs>
  <path class="st0" d="M1440,96v-32h-68.6v96h-68.5v96h-137.2v-128h-68.6v128h-68.5V96h-68.6V32h-68.6V0h-68.5v32h-68.6v64h-68.6V32h-68.6v160h-68.5v-64h-68.6v32h-137.1v32h-68.6v-32h-68.6V32H68.6v256H0v32h1440V96Z"/>
</svg>
```


### package.json
```json
{
  "name": "react-vite-tailwind-template",
  "private": true,
  "packageManager": "npm@10.8.2",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 5173",
    "dev:all": "concurrently -k \"npx vercel@latest dev -y --port 3000\" \"npm run dev -- --port 5173\""
  },
  "dependencies": {
    "@vercel/mcp-adapter": "^0.11.1",
    "cloudinary": "^2.7.0",
    "dotenv": "^17.0.0",
    "firebase": "^12.2.1",
    "firebase-admin": "^13.5.0",
    "formidable": "^3.5.4",
    "framer-motion": "^12.23.12",
    "konva": "^8.4.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-helmet": "^6.1.0",
    "react-helmet-async": "^2.0.5",
    "react-hot-toast": "^2.6.0",
    "react-intersection-observer": "^9.16.0",
    "react-konva": "^18.2.12",
    "react-router-dom": "^7.8.2",
    "resend": "^4.6.0",
    "zod": "^4.1.5"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.7.0",
    "autoprefixer": "^10.4.21",
    "concurrently": "^9.2.1",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "vite": "^7.1.5"
  }
}

```


### vite.config.js
```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
    // optional:
    // port: 5173,
    // strictPort: true,
    // open: true,
  },
  plugins: [react()],
})
```

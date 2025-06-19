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

const Form = lazy(() => import("./pages/Form"));
const Concept = lazy(() => import("./pages/Concept"));
const GaleriePage = lazy(() => import("./pages/GaleriePage"));
const Tarifs = lazy(() => import("./pages/Tarifs"));
const MentionsLegales = lazy(() => import("./pages/mentions-legales"));
const CGUCGV = lazy(() => import("./pages/cgu-cgv"));

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
      <BlockyDivider />
      <StepsDefault />
      <BlockyDividerBottom />
      <Pitch />
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
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
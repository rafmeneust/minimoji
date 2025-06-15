import { useState, useEffect } from "react";
import ScrollTop from "./components/ScrollTop";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Galerie from "./components/Galerie";
import Form from "./pages/Form";
import { StepsDefault } from "./components/Steps";
import Pitch from "./components/Pitch";
import DinoPopup from "./components/DinoPopup";
import Testimonials from "./components/Testimonials";
import BlockyDivider from "./components/BlockyDivider";
import BlockyDividerBottom from "./components/BlockyDividerBottom";

import Concept from "./pages/Concept"; //
import GaleriePage from "./pages/GaleriePage"; //
import Tarifs from "./pages/Tarifs"; //

function HomePage() {
  return (
    <>
      <Hero />
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
  const [showDino, setShowDino] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDino(true);
    }, 45000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <DinoPopup isVisible={showDino} onClose={() => setShowDino(false)} />
      <div className="scroll-smooth bg-white dark:bg-gray-900 transition-colors duration-500 text-gray-900 dark:text-gray-100">
        <ScrollTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/concept" element={<Concept />} />
          <Route path="/galerie" element={<GaleriePage />} />
          <Route path="/creer" element={<Form />} />
          <Route path="/tarifs" element={<Tarifs />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
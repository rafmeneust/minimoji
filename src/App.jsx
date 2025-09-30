import SEO from "./components/helmet";
import { useEffect, lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import { Routes, Route, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import DinoPopup from "./components/DinoPopup";
import NotFound from "./pages/NotFound";
import SignInUpload from "./components/SignInUpload";
import ParcoursCards, { PARCOURS } from "./components/ParcoursCards";

const loadFormPage = () => import("./pages/Form");
const Form = lazy(loadFormPage);
const Concept = lazy(() => import("./pages/Concept"));
const GaleriePage = lazy(() => import("./pages/GaleriePage"));
const Tarifs = lazy(() => import("./pages/Tarifs"));
const MentionsLegales = lazy(() => import("./pages/mentions-legales"));
const CGUCGV = lazy(() => import("./pages/cgu-cgv"));
const Confirmation = lazy(() => import("./pages/Confirmation"));
const Ecole = lazy(() => import("./pages/Ecole"));
const Atelier = lazy(() => import("./pages/Atelier"));
const StepsLazy = lazy(() => import("./components/Steps").then((mod) => ({ default: mod.StepsDefault })));
const BlockyDivider = lazy(() => import("./components/BlockyDivider"));
const BlockyDividerBottom = lazy(() => import("./components/BlockyDividerBottom"));
const Pitch = lazy(() => import("./components/Pitch"));
const Values = lazy(() => import("./components/Values"));
const Galerie = lazy(() => import("./components/Galerie"));
const Testimonials = lazy(() => import("./components/Testimonials"));

import RequireAuth from "./components/auth/require-auth.jsx";
import Dashboard from "./app/Dashboard.jsx";
import Login from "./app/Login.jsx";

function HomePage() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const preload = () => {
      loadFormPage();
    };
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(preload, { timeout: 2000 });
    } else {
      window.setTimeout(preload, 1500);
    }
  }, []);

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
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dwl7ufet9/image/upload/f_auto,q_auto,w_1200,c_fill,dpr_auto/hero-min_p6b85v.png"
          imagesrcset="https://res.cloudinary.com/dwl7ufet9/image/upload/f_auto,q_auto,w_640,c_fill,dpr_auto/hero-min_p6b85v.png 640w, https://res.cloudinary.com/dwl7ufet9/image/upload/f_auto,q_auto,w_960,c_fill,dpr_auto/hero-min_p6b85v.png 960w, https://res.cloudinary.com/dwl7ufet9/image/upload/f_auto,q_auto,w_1200,c_fill,dpr_auto/hero-min_p6b85v.png 1200w"
          imagesizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
          fetchpriority="high"
        />
      </SEO>
      <Hero />
      <SignInUpload />
      <Suspense fallback={null}>
        <BlockyDivider />
      </Suspense>
      <Suspense fallback={null}>
        <StepsLazy />
      </Suspense>
      <Suspense fallback={null}>
        <BlockyDividerBottom />
      </Suspense>
      <Suspense fallback={null}>
        <Pitch />
      </Suspense>
      <Suspense fallback={null}>
        <Values />
      </Suspense>
      <Suspense fallback={null}>
        <Galerie />
      </Suspense>
      <ParcoursCards items={PARCOURS} />
      <Suspense fallback={null}>
        <Testimonials />
      </Suspense>
    </>
  );
}

function RouteChangeTracker() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    const id = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (typeof window === "undefined" || typeof window.gtag !== "function" || !id) return;
    window.gtag("event", "page_view", {
      send_to: id,
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, search]);
  return null;
}

function App() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (!id) return;

    const loadAnalytics = () => {
      if (window.gtag) return;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      script.async = true;
      script.onload = () => {
        window.gtag("js", new Date());
        window.gtag("config", id, { send_page_view: false });
      };
      document.head.appendChild(script);
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadAnalytics, { timeout: 2000 });
    } else {
      window.setTimeout(loadAnalytics, 1500);
    }
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
      <DinoPopup />
      <div className="scroll-smooth bg-white dark:bg-gray-900 transition-colors duration-500 text-gray-900 dark:text-gray-100">
        <ScrollToTop key={location.pathname} /> 
        <RouteChangeTracker />
        <Navbar />
        <Suspense fallback={<div>Chargement...</div>}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/concept" element={<Concept />} />
            <Route path="/galerie" element={<GaleriePage />} />
            <Route path="/creer" element={<Form />} />
            <Route path="/tarifs" element={<Tarifs />} />
            <Route path="/ecole" element={<Ecole />} />
            <Route path="/atelier" element={<Atelier />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/cgu-cgv" element={<CGUCGV />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route
              path="/app"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;

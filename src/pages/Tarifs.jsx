import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Pitch from "../components/Pitch";
import { Helmet } from "react-helmet";
import { useState, useEffect, useRef } from "react";
import { PRICES, OPTS, OPTIONS_BY_PLAN } from "../config/pricing";

export default function Tarifs() {
  const [selected, setSelected] = useState(null);
  const buttonRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();


  // Etat des options (communes, filtrées par plan courant)
  const [options, setOptions] = useState({ music: false, sfx: false, voice: false, intro: false, express: false });

  const allowed = selected ? OPTIONS_BY_PLAN[selected] : [];
  const basePrice = selected ? PRICES[selected] : 0;
  const optionsTotal = allowed.reduce((sum, k) => (options[k] ? sum + OPTS[k] : sum), 0);
  const totalEstimated = selected ? basePrice + optionsTotal : 0;

  const toggleOption = (key) => {
    if (!allowed.includes(key)) return; // ignore if not in current plan
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    if (selected && buttonRef.current) {
      buttonRef.current.classList.add("animate-bounce");
      const timeout = setTimeout(() => {
        buttonRef.current.classList.remove("animate-bounce");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [selected]);

  // Initialisation depuis l'URL: /tarifs?plan=mini&opts=voice,intro
  useEffect(() => {
    const plan = (searchParams.get("plan") || "").toLowerCase();
    if (["mini", "classique", "grand"].includes(plan)) {
      setSelected(plan);
      const optsParam = searchParams.get("opts") || "";
      const parts = optsParam.split(",").map(s => s.trim()).filter(Boolean);
      const next = { music: false, sfx: false, voice: false, intro: false, express: false };
      parts.forEach(k => {
        if (OPTIONS_BY_PLAN[plan]?.includes(k)) next[k] = true;
      });
      if (parts.length) setOptions(next);
    }
  }, []); // mount only

  useEffect(() => {
    const params = new URLSearchParams();
    if (selected) {
      params.set("plan", selected);
      const allowedForPlan = OPTIONS_BY_PLAN[selected] || [];
      const activeOpts = allowedForPlan.filter(k => options[k]);
      if (activeOpts.length) params.set("opts", activeOpts.join(","));
    }
    setSearchParams(params, { replace: true });
  }, [selected, options, setSearchParams]);

  return (
    <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Helmet>
        <title>Tarifs Minimoji – Vidéos animées à partir des dessins d’enfants</title>
        <meta
          name="description"
          content="Découvrez les prix Minimoji : Formule Mini, Classique et Grand Héros. Transformez les dessins de vos enfants en vidéos féeriques, dès 3,50 €, livrées en 24h."
        />
        <link rel="canonical" href="https://minimoji.fr/tarifs" />

        {/* Open Graph */}
        <meta property="og:title" content="Tarifs Minimoji – Vidéos animées à partir des dessins d’enfants" />
        <meta property="og:description" content="Formules Mini, Classique, Grand Héros – dès 3,50 €. Livraison rapide de vidéos féeriques basées sur les dessins de vos enfants." />
        <meta property="og:url" content="https://minimoji.fr/tarifs" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://minimoji.fr/images/preview-form.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tarifs Minimoji – Vidéos animées à partir des dessins d’enfants" />
        <meta name="twitter:description" content="Formules magiques dès 3,50 €. Mini-films personnalisés créés à partir des dessins d’enfants, livrés rapidement." />
        <meta name="twitter:image" content="https://minimoji.fr/images/preview-form.jpg" />
      </Helmet>
      {/* Hero section */}
      <section className="section bg-white dark:bg-gray-900 font-sans pb-6 md:pb-8"><div className="container-pg max-w-4xl text-center">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold mb-2 md:mb-3 font-display"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nos formules magiques 
        </motion.h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-sans">
          Choisissez la formule qui correspond à votre univers.  
          Chaque dessin peut devenir un souvenir animé, à offrir ou à garder précieusement.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">TVA non applicable — pas de frais de livraison.</p>
      </div>
      </section>


      {/* Tarifs cards */}
      <section className="section bg-white dark:bg-gray-900 font-sans" role="radiogroup" aria-label="Choisir une formule"><div className="container-pg"><div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Carte 1 */}
        <div
          onClick={() => { setSelected("mini"); setOptions({ music:false, sfx:false, voice:false, intro:false, express:false }); }}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected("mini"); setOptions({ music:false, sfx:false, voice:false, intro:false, express:false }); } }}
          tabIndex={0}
          role="radio"
          aria-checked={selected === "mini"}
          aria-label="Choisir la formule Mini"
          className={`cursor-pointer card bg-white dark:bg-white/10 p-6 rounded-2xl text-center transition-all duration-300 shadow-[0_10px_30px_-8px_rgba(99,102,241,0.25)] hover:scale-[1.02] hover:ring-4 hover:ring-indigo-400/60 hover:shadow-[0_22px_80px_-10px_rgba(99,102,241,0.55)] focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400/70 ${
            selected === "mini" ? "border-4 border-indigo-400 ring-4 ring-indigo-400/60 bg-indigo-50/40 dark:bg-white/10 shadow-[0_22px_80px_-10px_rgba(99,102,241,0.45)]" : ""
          }`}
        >
          <img src="/potion1.svg" alt="Potion bleue - Formule Mini" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2 font-display">Formule Mini</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">6 à 10 s · 1 scène animée.</p>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2 list-disc list-inside">
            <li>Vidéo HD (MP4) + lien privé téléchargeable</li>
          </ul>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleOption("voice"); }}
              disabled={selected !== "mini"}
              aria-disabled={selected !== "mini"}
              aria-pressed={selected === "mini" && options.voice}
              className={`chip text-xs ${selected === "mini" && options.voice ? "ring-2 ring-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white" : "bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white border-0"} ${selected !== "mini" ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              Voix-off +3,90€
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleOption("intro"); }}
              disabled={selected !== "mini"}
              aria-disabled={selected !== "mini"}
              aria-pressed={selected === "mini" && options.intro}
              className={`chip text-xs ${selected === "mini" && options.intro ? "ring-2 ring-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white" : "bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white border-0"} ${selected !== "mini" ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              Intro/Fin +1,50€
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleOption("express"); }}
              disabled={selected !== "mini"}
              aria-disabled={selected !== "mini"}
              aria-pressed={selected === "mini" && options.express}
              className={`chip text-xs ${selected === "mini" && options.express ? "ring-2 ring-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white" : "bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white border-0"} ${selected !== "mini" ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              Express 6h +4,00€
            </button>
          </div>
          <p className="mt-4 inline-block bg-white text-gray-700 dark:text-gray-800 text-sm px-5 py-1 rounded-full shadow">≤ Livré en 1 heure </p>
        </div>

        {/* Carte 2 */}
        <div
          onClick={() => { setSelected("classique"); setOptions({ music:false, sfx:false, voice:false, intro:false, express:false }); }}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected("classique"); setOptions({ music:false, sfx:false, voice:false, intro:false, express:false }); } }}
          tabIndex={0}
          role="radio"
          aria-checked={selected === "classique"}
          aria-label="Choisir la formule Classique"
          className={`cursor-pointer card relative p-6 rounded-2xl text-center transition-all duration-300 bg-white dark:bg-white/10 shadow-[0_10px_30px_-8px_rgba(99,102,241,0.25)] hover:scale-[1.02] hover:ring-4 hover:ring-indigo-400/60 hover:shadow-[0_22px_80px_-10px_rgba(99,102,241,0.55)] focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400/70 ${
            selected === "classique" ? "border-4 border-indigo-400 ring-4 ring-indigo-400/60 bg-indigo-50/40 dark:bg-white/10 shadow-[0_22px_80px_-10px_rgba(99,102,241,0.45)]" : "border-0"
          }`}
        >
          <div className="absolute -top-3 right-4 translate-y-[-30%]">
            <span className="bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              Recommandée
            </span>
          </div>
          <img src="/potion2.svg" alt="Potion violette - Formule Classique" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-indigo-700 dark:text-white mb-2 font-display">Formule Classique</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">16 à 25 s · 2 à 3 scènes, transitions légères.</p>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2 list-disc list-inside">
            <li>Vidéo HD (MP4) + lien privé téléchargeable</li>
          </ul>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleOption("music"); }}
              disabled={selected !== "classique"}
              aria-disabled={selected !== "classique"}
              aria-pressed={selected === "classique" && options.music}
              className={`chip text-xs ${selected === "classique" && options.music ? "ring-2 ring-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white" : "bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white border-0"} ${selected !== "classique" ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              Musique +1,50€
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleOption("sfx"); }}
              disabled={selected !== "classique"}
              aria-disabled={selected !== "classique"}
              aria-pressed={selected === "classique" && options.sfx}
              className={`chip text-xs ${selected === "classique" && options.sfx ? "ring-2 ring-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white" : "bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white border-0"} ${selected !== "classique" ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              SFX +1,50€
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleOption("voice"); }}
              disabled={selected !== "classique"}
              aria-disabled={selected !== "classique"}
              aria-pressed={selected === "classique" && options.voice}
              className={`chip text-xs ${selected === "classique" && options.voice ? "ring-2 ring-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white" : "bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white border-0"} ${selected !== "classique" ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              Voix-off +3,90€
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleOption("intro"); }}
              disabled={selected !== "classique"}
              aria-disabled={selected !== "classique"}
              aria-pressed={selected === "classique" && options.intro}
              className={`chip text-xs ${selected === "classique" && options.intro ? "ring-2 ring-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white" : "bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white border-0"} ${selected !== "classique" ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              Intro/Fin +1,50€
            </button>
          </div>
          <p className="mt-4 inline-block bg-white text-gray-700 dark:text-gray-800 text-sm px-5 py-1 rounded-full shadow">≤ Livré en 6 h </p>
        </div>

        {/* Carte 3 */}
        <div
          onClick={() => { setSelected("grand"); setOptions({ music:false, sfx:false, voice:false, intro:false, express:false }); }}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected("grand"); setOptions({ music:false, sfx:false, voice:false, intro:false, express:false }); } }}
          tabIndex={0}
          role="radio"
          aria-checked={selected === "grand"}
          aria-label="Choisir la formule Grand Héros"
          className={`cursor-pointer card bg-white dark:bg-white/10 p-6 rounded-2xl text-center transition-all duration-300 shadow-[0_10px_30px_-8px_rgba(99,102,241,0.25)] hover:scale-[1.02] hover:ring-4 hover:ring-indigo-400/60 hover:shadow-[0_22px_80px_-10px_rgba(99,102,241,0.55)] focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400/70 ${
            selected === "grand" ? "border-4 border-indigo-400 ring-4 ring-indigo-400/60 bg-indigo-50/40 dark:bg-white/10 shadow-[0_22px_80px_-10px_rgba(99,102,241,0.45)]" : ""
          }`}
        >
          <img src="/potion3.svg" alt="Potion dorée - Formule Grand Héros" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2 font-display">Formule Grand Héros</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">30 s et + · Récit illustré, scènes multiples.</p>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2 list-disc list-inside">
            <li>Vidéo HD (MP4) + lien privé téléchargeable</li>
          </ul>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleOption("music"); }}
              disabled={selected !== "grand"}
              aria-disabled={selected !== "grand"}
              aria-pressed={selected === "grand" && options.music}
              className={`chip text-xs ${selected === "grand" && options.music ? "ring-2 ring-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white" : "bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white border-0"} ${selected !== "grand" ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              Musique +1,50€
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleOption("sfx"); }}
              disabled={selected !== "grand"}
              aria-disabled={selected !== "grand"}
              aria-pressed={selected === "grand" && options.sfx}
              className={`chip text-xs ${selected === "grand" && options.sfx ? "ring-2 ring-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white" : "bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white border-0"} ${selected !== "grand" ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              SFX +1,50€
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleOption("voice"); }}
              disabled={selected !== "grand"}
              aria-disabled={selected !== "grand"}
              aria-pressed={selected === "grand" && options.voice}
              className={`chip text-xs ${selected === "grand" && options.voice ? "ring-2 ring-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white" : "bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white border-0"} ${selected !== "grand" ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              Voix-off +3,90€
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleOption("intro"); }}
              disabled={selected !== "grand"}
              aria-disabled={selected !== "grand"}
              aria-pressed={selected === "grand" && options.intro}
              className={`chip text-xs ${selected === "grand" && options.intro ? "ring-2 ring-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white" : "bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white border-0"} ${selected !== "grand" ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              Intro/Fin +1,50€
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleOption("express"); }}
              disabled={selected !== "grand"}
              aria-disabled={selected !== "grand"}
              aria-pressed={selected === "grand" && options.express}
              className={`chip text-xs ${selected === "grand" && options.express ? "ring-2 ring-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white" : "bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white border-0"} ${selected !== "grand" ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              Express 6h +4,00€
            </button>
          </div>
          <p className="mt-4 inline-block bg-white text-gray-700 dark:text-gray-800 text-sm px-5 py-1 rounded-full shadow">≤ Livré en 12 h </p>
        </div>
      </div>
      {/* Total estimé recap block */}
      <div className="text-center mt-6">
        {selected ? (
          <div className="inline-block text-left card bg-white dark:bg-white/10 px-5 py-4">
            <p className="text-sm md:text-base text-gray-800 dark:text-gray-200">
              Total estimé : <strong>{totalEstimated.toFixed(2)} €</strong>
            </p>
            {allowed.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {allowed.filter(k => options[k]).length > 0 ? (
                  allowed.filter(k => options[k]).map((k) => (
                    <span key={`sum-${k}`} className="chip text-xs bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white border-0">
                      {k === 'music' && 'Musique'}
                      {k === 'sfx' && 'SFX'}
                      {k === 'voice' && 'Voix-off'}
                      {k === 'intro' && 'Intro/Fin'}
                      {k === 'express' && 'Express 6h'}
                      {` +${OPTS[k].toFixed(2)}€`}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-500 dark:text-gray-400">Aucune option sélectionnée</span>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-300">Sélectionnez une formule puis ajoutez des options.</p>
        )}
      </div>
    </div>
  </section>
      <div className="text-center mt-8">
        <Link
          ref={buttonRef}
          to={selected ? `/creer?plan=${selected}` : "/creer"}
          aria-label="Aller vers le formulaire pour créer un dessin animé"
          className="btn-accent text-lg"
        >
          Créer mon Minimoji
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
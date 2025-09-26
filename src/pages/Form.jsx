import { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRightIcon, CloudArrowUpIcon, UserIcon, PencilSquareIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { auth, provider } from "../lib/firebaseClient";

import { signInWithPopup, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
// Safe analytics stub so we don't crash if GA isn't ready
if (typeof window !== 'undefined' && !window.track) {
  window.track = (eventName, params = {}) => {
    try { window.gtag && window.gtag('event', eventName, params); } catch (_) {}
  };
}

const GSI_POLL_MS = 400;

export default function Form() {
  const [preview, setPreview] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const uploadRef = useRef(null);
  const fileInputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");
  const oneTapInitRef = useRef(false);
  const signIn = async () => {
    setAuthError("");
    try {
      const cred = await signInWithPopup(auth, provider);
      setUser(cred.user);
    } catch (e) {
      setAuthError(e?.message || "Erreur connexion Google");
    }
  };

  // --- Google One Tap (GSI) -> Firebase signInWithCredential ---
  useEffect(() => {
    if (oneTapInitRef.current) return;
    if (typeof window === 'undefined') return;
    if (user) return; // déjà connecté

    const clientId = import.meta.env?.VITE_GOOGLE_ONE_TAP_CLIENT_ID || import.meta.env?.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.warn('[one-tap] Client ID manquant (VITE_GOOGLE_ONE_TAP_CLIENT_ID ou VITE_GOOGLE_CLIENT_ID), skip init');
      return;
    }

    let tries = 0;
    const maxTries = 15; // ~6s max

    const init = () => {
      try {
        if (!window.google?.accounts?.id) return false;
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async ({ credential }) => {
            if (!credential) return;
            try {
              const cred = GoogleAuthProvider.credential(credential);
              await signInWithCredential(auth, cred);
              setUser(auth.currentUser);
              window.track && window.track('auth_one_tap_success');
            } catch (e) {
              console.error('[one-tap] signInWithCredential error', e);
              setAuthError(e?.message || 'Erreur One Tap');
              window.track && window.track('auth_one_tap_error', { message: e?.message });
            }
          },
          ux_mode: 'popup',
          auto_select: true,
          context: 'signin',
        });
        window.google.accounts.id.prompt((n) => {
          // Optionnel: métriques d’affichage/refus
          if (n?.isNotDisplayed()) window.track && window.track('auth_one_tap_not_displayed', { reason: n.getNotDisplayedReason?.() });
          if (n?.isSkippedMoment()) window.track && window.track('auth_one_tap_skipped', { reason: n.getSkippedReason?.() });
          if (n?.isDismissedMoment()) window.track && window.track('auth_one_tap_dismissed', { reason: n.getDismissedReason?.() });
        });
        oneTapInitRef.current = true;
        window.track && window.track('auth_one_tap_initialized');
        return true;
      } catch (e) {
        console.warn('[one-tap] init error', e);
        return false;
      }
    };

    // Essaie immédiatement puis poll jusqu’à dispo
    if (!init()) {
      const id = setInterval(() => {
        tries += 1;
        if (init() || tries >= maxTries) clearInterval(id);
      }, GSI_POLL_MS);
      return () => clearInterval(id);
    }
  }, [user]);

  const handleGoToUpload = () => {
    const el = uploadRef.current;
    if (el) {
      try {
        el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
      } catch (_) {
        // fallback for older browsers
        window.location.hash = "#upload";
      }
      // Focus the file input a moment after scroll
      setTimeout(() => {
        if (fileInputRef.current) {
          fileInputRef.current.focus();
        }
      }, 400);
    }
  };

  // ------- Plan depuis l'URL (mini | classique | grand) -------
  const [plan, setPlan] = useState("mini");
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selected = (params.get("plan") || "mini").toLowerCase();
    if (["mini", "classique", "grand"].includes(selected)) {
      setPlan(selected);
    }
  }, [location.search]);

  // ------- Tarifs de base & options -------
  const BASE = { mini: 3.5, classique: 6.9, grand: 9.9 };
  const LABEL = {
    mini: "Formule Mini",
    classique: "Formule Classique",
    grand: "Formule Grand Héros",
  };
  const OPTS = [
    { key: "music", label: "Musique d’ambiance", price: 1.5 },
    { key: "sfx", label: "Effets sonores (SFX)", price: 1.5 },
    { key: "voice", label: "Voix-off personnalisée", price: 3.9 },
    { key: "intro", label: "Écran intro/fin stylisé", price: 1.5 },
    { key: "express", label: "Livraison express 6 h", price: 4.0 },
  ];
  // Options autorisées par formule
const ALLOWED_OPTS = {
  mini: new Set(["voice", "intro", "express"]),
  classique: new Set(["music", "sfx", "voice", "intro", "express"]),
  grand: new Set(["music", "sfx", "voice", "intro", "express"]),
};
const isAllowed = (p, key) => (ALLOWED_OPTS[p] || ALLOWED_OPTS.classique).has(key);
  const [options, setOptions] = useState({
    music: false,
    sfx: false,
    voice: false,
    intro: false,
    express: false,
  });
  const toggleOption = (k) => setOptions((o) => ({ ...o, [k]: !o[k] }));

  // Pré-sélection des options depuis l'URL: /creer?plan=...&opts=voice,intro
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const raw = (params.get('opts') || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (!raw.length) return;
    setOptions((prev) => {
      const next = { ...prev };
      raw.forEach((k) => { if (k in next && isAllowed(plan, k)) next[k] = true; });
      return next;
    });
  }, [location.search, plan]);

  // Fallback: lecture via location.state (depuis /tarifs)
  useEffect(() => {
    const st = location.state || {};
    let p = plan;
    if (st.plan && ["mini", "classique", "grand"].includes(String(st.plan))) {
      p = String(st.plan);
      setPlan(p);
    }
    if (Array.isArray(st.opts) && st.opts.length) {
      const planForOpts = p;
      setOptions((prev) => {
        const next = { ...prev };
        st.opts.forEach((k) => { if (k in next && isAllowed(planForOpts, k)) next[k] = true; });
        return next;
      });
    }
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // À chaque changement de formule, on désactive les options non disponibles
  useEffect(() => {
    setOptions((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => { if (!isAllowed(plan, k)) next[k] = false; });
      return next;
    });
  }, [plan]);

  const total = useMemo(() => {
    let t = BASE[plan] || 0;
    for (const [k, v] of Object.entries(options)) {
      if (v) t += OPTS.find((o) => o.key === k).price;
    }
    return Number(t.toFixed(2));
  }, [plan, options]);

  // ------- Submit -------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData.entries());

    // Image obligatoire : on bloque et on scrolle si absente
    if (!imageDataUrl) {
      toast.error("Ajoutez d’abord le dessin à envoyer.");
      handleGoToUpload();
      return;
    }

    // Ajout d'infos de pricing dans le payload
    body.plan = plan;
    body.options = options;
    body.total_estime = total;

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...body,
          email: body.email || "meneust.r@gmail.com", // fallback
          imageDataUrl,
        }),
      });

      if (response.ok) {
        toast.success("✉️ Votre dessin a bien été envoyé !");
        setTimeout(() => navigate("/confirmation"), 1200);
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
        <meta
          name="description"
          content="Soumettez un dessin d’enfant et choisissez vos options pour un mini‑film animé personnalisé. Formulaire simple, envoi sécurisé, récap prix en direct."
        />
        <meta property="og:title" content="Créer mon dessin animé – Minimoji" />
        <meta
          property="og:description"
          content="Soumettez un dessin d’enfant et choisissez vos options. Prix en direct et livraison rapide."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://minimoji.fr/creer" />
        <meta property="og:image" content="https://minimoji.fr/images/preview-form.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Créer mon dessin animé – Minimoji" />
        <meta
          name="twitter:description"
          content="Soumettez un dessin, ajoutez des options, visualisez le total. Livraison rapide."
        />
        <meta name="twitter:image" content="https://minimoji.fr/images/preview-form.jpg" />
        <link rel="canonical" href="https://minimoji.fr/creer" />
      </Helmet>

      <Toaster position="bottom-center" />

      {/* Section principale */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container-pg">
          <div className="card p-6 md:p-8 lg:p-10 max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <h1 className="font-display font-extrabold mb-2">Créer mon dessin animé</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Transformez un dessin d’enfant en mini‑film animé en quelques clics ✨
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Formule + options + récap en premier */}
              <section className="section pt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-[1.2fr_.9fr] gap-6 md:gap-8 lg:gap-12">
                  {/* Colonne formule + options */}
                  <div className="card p-5 md:p-6 lg:p-8">
                    <h3 className="font-display text-xl md:text-2xl font-semibold mb-6">Formule & options</h3>

                    {/* Sélecteur de formule */}
                    <div className="mb-6 md:mb-7">
                      <div className="flex flex-wrap items-center gap-3 md:gap-4">
                        {["mini", "classique", "grand"].map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setPlan(p)}
                            aria-pressed={plan === p}
                            className={
                              `px-4 py-2.5 md:px-5 md:py-3 rounded-full text-sm md:text-base font-semibold transition border min-h-[44px] leading-none ` +
                              (plan === p
                                ? `bg-indigo-50 text-indigo-700 border-indigo-200 shadow-soft dark:bg-white/10 dark:text-white dark:border-white/20`
                                : `bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-white/10`)
                            }
                          >
                            {LABEL[p]}
                          </button>
                        ))}
                      </div>
                      <p className="help mt-3">Ajustez la formule selon votre besoin.</p>
                    </div>

                    {/* Options */}
                    <h4 className="font-display text-lg font-semibold mb-4 md:mb-5">Options (facultatives)</h4>
                    <ul className="space-y-3">
                      {OPTS.map((o) => {
                        const disabled = !isAllowed(plan, o.key);
                        return (
                          <li
                            key={o.key}
                            className={`flex items-center justify-between gap-4 py-2.5 ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                          >
                            <label
                              htmlFor={`opt-${o.key}`}
                              className={`flex items-center gap-3 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              <input
                                id={`opt-${o.key}`}
                                type="checkbox"
                                className="h-5 w-5 rounded border-gray-300 text-brand focus:ring-brand"
                                checked={options[o.key]}
                                onChange={() => { if (!disabled) toggleOption(o.key); }}
                                disabled={disabled}
                                aria-disabled={disabled}
                              />
                              <span className="text-gray-800 dark:text-gray-200">{o.label}</span>
                            </label>
                            <span className="text-sm text-gray-600 dark:text-gray-300">+ {o.price.toFixed(2)} €</span>
                          </li>
                        );
                      })}
                    </ul>
                    <p className="help mt-4">Vous pourrez modifier ces options avant de valider.</p>
                  </div>

                  {/* Colonne récap + CTA optimisée */}
                  <aside className="card p-5 md:p-6 lg:p-8 h-fit md:sticky md:top-24">
                    <h4 className="font-display text-lg md:text-xl font-semibold mb-4">Récapitulatif</h4>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-700 dark:text-gray-300">{LABEL[plan] || "Formule"}</span>
                      <span className="font-semibold">{(BASE[plan] || 0).toFixed(2)} €</span>
                    </div>
                    <ul className="mt-2 divide-y divide-gray-200/60 dark:divide-white/10">
                      {Object.entries(options).some(([, v]) => v) ? (
                        OPTS.filter((o) => options[o.key]).map((o) => (
                          <li key={`recap-${o.key}`} className="flex items-center justify-between py-2">
                            <span className="text-gray-600 dark:text-gray-300">{o.label}</span>
                            <span className="text-sm">+ {o.price.toFixed(2)} €</span>
                          </li>
                        ))
                      ) : (
                        <li className="py-2 text-sm text-gray-500 dark:text-gray-400">Aucune option sélectionnée</li>
                      )}
                    </ul>
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                      <span className="font-display font-semibold">Total estimé</span>
                      <span className="font-display font-bold text-lg">{total.toFixed(2)} €</span>
                    </div>

                    {/* CTA de conversion optimisée */}
                    <div className="mt-4">
                      <div className="relative inline-flex">
                        <button
                          type="button"
                          onClick={handleGoToUpload}
                          aria-controls="upload"
                          className="
                            relative z-10 inline-flex items-center justify-center
                            px-5 py-3 rounded-full font-semibold
                            text-white bg-accent hover:bg-orange-500
                            text-base whitespace-nowrap
                            shadow-[0_8px_28px_-8px_rgba(251,146,60,.5)]
                            ring-2 ring-orange-400/70 hover:ring-orange-500
                            focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-400/80
                            transition
                          "
                          aria-label="Aller à l'import de l'image et aux coordonnées"
                        >
                          Envoyer le dessin
                          <ArrowRightIcon className="ml-2 h-5 w-5" aria-hidden />
                        </button>
                        {!prefersReducedMotion && (
                          <motion.span
                            aria-hidden="true"
                            className="absolute inset-0 rounded-full ring-2 ring-orange-400/60 pointer-events-none"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: [0, 1, 0], scale: [1, 1.06, 1.12] }}
                            transition={{ duration: 0.9, ease: "easeOut", repeat: Infinity, repeatDelay: 5 }}
                          />
                        )}
                      </div>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Sans inscription — paiement sécurisé</p>
                    </div>
                  </aside>
                </div>
              </section>

              {/* BLOC 1 — Dessin de l'enfant */}
              <section id="upload" ref={uploadRef} className="card p-5 md:p-6 lg:p-8 scroll-mt-28">
                <header className="mb-4 md:mb-5 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                    <CloudArrowUpIcon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-semibold">Dessin de l’enfant</h3>
                </header>

                {/* Dropzone / importer une image */}
                <div
                  className="relative mb-5 rounded-2xl border-2 border-dashed border-gray-300 p-6 text-center hover:border-indigo-300 hover:bg-indigo-50/30 dark:border-white/15 dark:hover:bg-white/5 transition"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer?.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setPreview(reader.result);
                        setImageDataUrl(reader.result);
                      };
                      reader.readAsDataURL(file);
                      const input = fileInputRef.current;
                      if (input) {
                        const dt = new DataTransfer();
                        dt.items.add(file);
                        input.files = dt.files;
                      }
                      window.track && window.track("file_selected", { via: "drop" });
                    }
                  }}
                >
                  <input
                    id="file-upload"
                    name="image"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setPreview(reader.result);
                          setImageDataUrl(reader.result);
                        };
                        reader.readAsDataURL(file);
                        window.track && window.track("file_selected", { via: "picker" });
                      }
                    }}
                  />
                  <label htmlFor="file-upload" className="block cursor-pointer">
                    <div className="flex flex-col items-center">
                      <CloudArrowUpIcon className="h-8 w-8 text-indigo-500" aria-hidden />
                      <p className="mt-2 font-medium text-gray-800 dark:text-gray-100">Glissez-déposez ou cliquez pour importer</p>
                      <p className="mt-1 text-xs text-gray-500">JPG/PNG, ≤ 5 Mo</p>
                    </div>
                  </label>
                </div>

                {preview && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Aperçu :</p>
                    <img src={preview} alt="Aperçu du dessin" className="w-full max-w-xs rounded-xl shadow-soft" />
                  </div>
                )}

                {/* Champs enfant */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label inline-flex items-center gap-2"><UserIcon className="h-5 w-5" aria-hidden /> Prénom de l’enfant</label>
                    <input type="text" name="child_name" className="input" placeholder="Ex. Léonie" />
                  </div>
                  <div>
                    <label className="label inline-flex items-center gap-2"><PencilSquareIcon className="h-5 w-5" aria-hidden /> Titre du dessin</label>
                    <input type="text" name="drawing_title" className="input" placeholder="Ex. Le dragon gentil" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="label">Histoire ou explication</label>
                  <textarea name="story" className="textarea" rows={4} placeholder="Quelques mots pour inspirer le magicien…" />
                </div>
              </section>

              {/* BLOC 2 — Connexion & envoi */}
              <section className="card p-5 md:p-6 lg:p-8">
                <header className="mb-4 md:mb-5 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                    <EnvelopeIcon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-semibold">Coordonnées & envoi</h3>
                </header>

                {/* Connexion Google */}
                <div className="mb-4">
                  {!user ? (
                    <button
                      type="button"
                      onClick={signIn}
                      className="px-4 py-2 rounded-full font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      Se connecter avec Google
                    </button>
                  ) : (
                    <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 text-sm">
                      Connecté : <strong>{user.displayName || user.email}</strong>
                    </p>
                  )}
                  {authError && <p className="mt-2 text-sm text-red-600">{authError}</p>}
                </div>

                <div>
                  <label className="label inline-flex items-center gap-2"><EnvelopeIcon className="h-5 w-5" aria-hidden /> Adresse email du parent</label>
                  <input type="email" name="email" autoComplete="email" required className="input" placeholder="prenom@exemple.com" />
                </div>

                <div className="mt-4">
                  <div className="relative inline-flex">
                    <button type="submit" className="relative z-10 inline-flex items-center justify-center px-5 py-3 rounded-full font-semibold text-white bg-accent hover:bg-orange-500 text-base shadow-[0_8px_28px_-8px_rgba(251,146,60,.5)] ring-2 ring-orange-400/70 hover:ring-orange-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-400/80 transition">
                      Valider et envoyer
                      <ArrowRightIcon className="ml-2 h-5 w-5" aria-hidden />
                    </button>
                    {!prefersReducedMotion && (
                      <motion.span aria-hidden="true" className="absolute inset-0 rounded-full ring-2 ring-orange-400/60 pointer-events-none" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: [0, 1, 0], scale: [1, 1.06, 1.12] }} transition={{ duration: 0.9, ease: "easeOut", repeat: Infinity, repeatDelay: 5 }} />
                    )}
                  </div>
                </div>
              </section>

            </form>
          </div>
        </div>
      </section>
    </>
  );
}

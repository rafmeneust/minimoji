import { Helmet } from "react-helmet-async";
import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LazyMotion, m, useReducedMotion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { loadMotionFeatures } from "@/lib/motion";

// --- Effet "pop" lettre par lettre pour le H1 ---
const POP_CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.032 } },
};

const POP_LETTER = {
  hidden: { opacity: 0, y: 14, rotate: 0.001 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 520, damping: 30, mass: 0.6 },
  },
};

// --- Helpers d'affichage (plan, total) ---
const PLAN_LABEL = { mini: "Formule Mini", classique: "Formule Classique", grand: "Formule Grand Héros" };
const formatEuro = (n) => {
  const v = Number.isFinite(+n) ? +n : 0;
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 }).format(v);
};

function AnimatedLetters({ text, reduced }) {
  const words = text.split(" ");
  return (
    <m.span
      aria-hidden="true"
      className="inline-block"
      variants={reduced ? undefined : POP_CONTAINER}
      initial={reduced ? undefined : "hidden"}
      animate={reduced ? undefined : "show"}
    >
      {words.map((word, wi) => (
        <span key={`w-${wi}`} className="inline-block whitespace-nowrap mr-2">
          {[...word].map((ch, ci) => (
            <m.span
              key={`w-${wi}-c-${ci}`}
              variants={POP_LETTER}
              className="inline-block will-change-transform"
            >
              {ch}
            </m.span>
          ))}
        </span>
      ))}
    </m.span>
  );
}

export default function Confirmation() {
  const prefersReducedMotion = useReducedMotion();

  const location = useLocation();
  const navigate = useNavigate();
  const cardRef = useRef(null);

  // Récupération d'infos (si dispo) depuis le state de navigation ou le sessionStorage
  const stateEmail = location.state?.email || "";
  const statePlan  = location.state?.plan || "";
  const stateTotal = location.state?.total;

  let storedOrder = null;
  try {
    storedOrder = JSON.parse(sessionStorage.getItem("lastOrder") || "null");
  } catch (_) { /* ignore */ }
  const storedEmail = sessionStorage.getItem("lastEmail") || "";

  const userEmail = stateEmail || storedOrder?.email || storedEmail || "";
  const planKey   = (statePlan || storedOrder?.plan || "").toLowerCase();
  const planLabel = PLAN_LABEL[planKey] || (planKey ? planKey : "");
  const totalVal  = (typeof stateTotal !== 'undefined') ? stateTotal : (storedOrder?.total_estime);

  // Focus accessible sur la carte au chargement
  useEffect(() => { if (cardRef.current) cardRef.current.focus(); }, []);

  // Tracking de confirmation
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'form_submit_success', { page: 'confirmation' });
    }
  }, []);

  // Redirection douce si arrivée orpheline (aucune info contexte)
  useEffect(() => {
    const hasContext = Boolean(stateEmail || statePlan || storedOrder || storedEmail);
    if (!hasContext && !document.referrer) {
      navigate('/creer', { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LazyMotion features={loadMotionFeatures}>
    <>
      <Helmet>
        <title>Confirmation – Minimoji</title>
        <meta name="description" content="Votre dessin a bien été envoyé. Merci de faire confiance à Minimoji !" />
      </Helmet>

      {/* Section normalisée (utilise les styles globaux de index.css) */}
      <section aria-labelledby="confirm-title">
        <div className="container-pg">
          <m.div
            role="status"
            aria-live="polite"
            ref={cardRef}
            tabIndex={-1}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="card p-6 md:p-8 text-center max-w-md mx-auto"
          >
            {/* Illustration animée (respecte prefers-reduced-motion) */}
            <div className="relative w-24 h-24 mx-auto mb-4">
              <m.img
                src="/dino.svg"
                alt=""
                aria-hidden="true"
                className="absolute top-0 left-0 w-full origin-center"
                animate={prefersReducedMotion ? {} : { scaleX: [1, 1, -1, -1, 1], y: [0, -5, 0, 5, 0] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
              />
              <m.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-black/10 dark:bg-white/10"
                animate={prefersReducedMotion ? {} : { scaleX: [0.9, 1.1, 0.9], opacity: [0.6, 0.4, 0.6] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
              />
            </div>

            <div className="inline-flex items-center justify-center gap-2 rounded-sticker bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200 px-3 py-1 text-sm font-semibold mb-2">
              <CheckCircleIcon className="h-4 w-4" aria-hidden />
              Envoi confirmé
              </div>

            {/* h1 hérite de la typo via index.css (font-display, tailles, etc.) */}
            <h1 id="confirm-title" className="text-brand mb-2" aria-label="Merci pour votre envoi !">
              <span className="sr-only">Merci pour votre envoi !</span>
              <AnimatedLetters text="Merci pour votre envoi !" reduced={prefersReducedMotion} />
            </h1>
            <div className="space-y-4 mb-6">
              <p className="text-gray-700 dark:text-gray-300">
                {userEmail ? (<>
                  Un e‑mail de confirmation a été envoyé à <strong>{userEmail}</strong>.
                </>) : (
                  <>Votre dessin a bien été reçu.</>
                )} Le mini‑film est en préparation ✨ — délai estimé&nbsp;: <strong>72&nbsp;h</strong>.
                Besoin d’aide ? <a href="mailto:hello@minimoji.fr" className="underline">hello@minimoji.fr</a>
              </p>

              {(planLabel || (typeof totalVal !== 'undefined')) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  {planLabel && (
                    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3">
                      <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Formule</div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{planLabel}</div>
                    </div>
                  )}
                  {(typeof totalVal !== 'undefined') && (
                    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3">
                      <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Total estimé</div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{formatEuro(totalVal)}</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/" className="btn btn-primary">Retour à l’accueil</Link>
              <Link to="/creer#upload" className="btn btn-ghost">Téléverser un autre dessin</Link>
            </div>
          </m.div>
        </div>
      </section>
    </>
    </LazyMotion>
  );
}

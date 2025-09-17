// src/components/ParcoursCards.jsx
import React from "react";
import PropTypes from "prop-types";
import { StarIcon, AcademicCapIcon, UsersIcon } from "@heroicons/react/24/outline";

export const PARCOURS = [
  {
    id: "famille",
    title: "Famille",
    subtitle: "Souvenirs à offrir. Transformez un dessin en mini-film tendre et partageable.",
    bullets: [
      "Livré en  1h — à partir de 3.49€",
      "Format MP4 / lien privé (partageable).",
      "Retouche mineure offerte (couleurs / cadrage).",
    ],
    cta: { label: "Créer mon clip", href: "/creer" },
    trust: "⭐️⭐️⭐️⭐️⭐️ Noté excellent par les parents",
    icon: "sparkles",
  },
  {
    id: "ecoles",
    title: "Écoles",
    subtitle:
      "Projet pédagogique clé-en-main. Un atelier structuré pour travailler la narration, l’expression orale et l’art plastique.",
    bullets: [
      "Parcours prêt à l’emploi : 7 séances (atelier + illustrations + restitution).",
      "Ressources PDF fournies : lettre aux parents, fiche activité, autorisations.",
      "Tarif indicatif : ~12–15 € / élève (devis selon personnalisation).",
    ],
    cta: { label: "Demander un devis classe", href: "/ecoles" },
    trust: "🕛 Réponse sous 48 h pour les demandes scolaires",
    icon: "academic-cap",
  },
  {
    id: "ateliers",
    title: "Ateliers",
    subtitle: "Animation clé-en-main. Atelier court, impact immédiat : création, animation, restitution.",
    bullets: [
      "Déroulé 2h : invention d'histoire → dessin → collecte.",
      "Options expo : QR codes, impressions, montage collectif pour projection.",
      "Animateur·trice & matériel possible en option (devis sur mesure).",
    ],
    cta: { label: "Réserver un atelier", href: "/contact#atelier" },
    trust: "📅 Disponibilités limitées — réservation recommandée",
    icon: "users",
  },
];

/** Helper icônes (Heroicons) */
function renderIcon(name, props = {}) {
  const iconProps = { className: "w-7 h-7 text-gray-900", ...props };
  switch (name) {
    case "sparkles":
      return <StarIcon {...iconProps} />; // fallback safe
    case "academic-cap":
      return <AcademicCapIcon {...iconProps} />;
    case "users":
      return <UsersIcon {...iconProps} />;
    default:
      return <StarIcon {...iconProps} />;
  }
}

export default function ParcoursCards({ items = PARCOURS }) {
  return (
    <section className="section bg-white dark:bg-gray-900 font-sans" id="parcours" aria-labelledby="parcours-heading">
      <div className="container-pg">
        <h2 id="parcours-heading" className="text-center mb-8 font-display">Choisissez votre parcours</h2>
        <div className="max-w-5xl mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {items.map((item) => (
            <article
              key={item.id}
              role="group"
              tabIndex={0}
              aria-label={item.title}
              className="group card relative bg-white dark:bg-white/10 p-6 md:p-8 h-full flex flex-col justify-between transition-all duration-300 shadow-[0_10px_30px_-8px_rgba(99,102,241,0.25)] hover:scale-[1.02] hover:ring-4 hover:ring-indigo-400/60 hover:shadow-[0_22px_80px_-10px_rgba(99,102,241,0.55)] focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400/70"
            >
              {/* Titre + icône */}
              <div className="flex items-start gap-4">
                <div className="flex-none flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 dark:bg-white/10">
                  {renderIcon(item.icon, { className: "w-7 h-7 text-gray-900 group-hover:text-brand dark:text-white dark:group-hover:text-brand transition-colors" })}
                </div>
                <div className="flex-1">
                  <h4 className="font-display text-gray-900 dark:text-white group-hover:text-brand transition-colors text-xl md:text-2xl mb-1">
                    {item.title}
                  </h4>
                  <p className="font-sans text-sm text-gray-700 dark:text-gray-300">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Liste */}
              <ul className="mt-5 space-y-3">
                {item.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      className="mt-1 inline-block w-2 h-2 rounded-full bg-brand flex-shrink-0"
                      aria-hidden="true"
                    />
                    <p className="font-sans text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{b}</p>
                  </li>
                ))}
              </ul>

              {/* CTA + trust */}
              <div className="mt-6">
                <a
                  href={item.cta.href}
                  aria-label={`${item.cta.label} — ${item.title}`}
                  data-analytics={`parcours_cta_${item.id}`}
                  className="btn-accent w-full md:w-auto font-sans"
                >
                  {item.cta.label}
                </a>
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">{item.trust}</p>
              </div>
            </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

ParcoursCards.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      bullets: PropTypes.arrayOf(PropTypes.string),
      cta: PropTypes.shape({ label: PropTypes.string, href: PropTypes.string }),
      trust: PropTypes.string,
      icon: PropTypes.string,
    })
  ),
};
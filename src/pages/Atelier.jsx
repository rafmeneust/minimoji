import React from "react";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  UsersIcon,
  FilmIcon,
  ClockIcon,
  BanknotesIcon,
  QrCodeIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

export default function AtelierPage() {
  const h1Title = "Atelier Minimoji — narration, dessin & mini‑film (2 h)";
  const h1Words = h1Title.split(" ");
  return (
    <main className="font-sans" aria-labelledby="atelier-title">
      {/* Hero / Intro */}
      <section id="intro">
        <div className="container-pg">
          <div className="grid gap-8 md:grid-cols-[1.1fr_.9fr] items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-sticker bg-indigo-100 text-indigo-700 px-3 py-1 text-sm font-semibold">
                <SparklesIcon className="size-4" aria-hidden />
                Atelier créatif
              </div>
              <motion.h1
                id="atelier-title"
                className="mt-3"
                aria-label={h1Title}
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.035, delayChildren: 0.1 } } }}
              >
                {h1Words.map((word, wi) => (
                  <span key={wi} className="inline-block whitespace-nowrap mr-2">
                    {Array.from(word).map((ch, i) => (
                      <motion.span
                        key={`${wi}-${i}`}
                        aria-hidden="true"
                        className="inline-block"
                        variants={{
                          hidden: { opacity: 0, y: 12, scale: 0.9, rotate: -2 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            rotate: 0,
                            transition: { type: "spring", stiffness: 320, damping: 18, mass: 0.6 },
                          },
                        }}
                      >
                        {ch}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.h1>
              <p className="mt-3 text-gray-700 dark:text-gray-300 max-w-prose">
                Un atelier clé‑en‑main pour structures jeunesse et culturelles : les enfants imaginent une histoire,
                l’illustrent, puis reçoivent un mini‑film qui donne vie à leur création. Simple à organiser, fort en
                valorisation.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#pour-qui" className="chip">Pour qui ?</a>
                <a href="#deroule" className="chip">Déroulé (2 h)</a>
                <a href="#livrables" className="chip">Livrables & délais</a>
                <a href="#tarifs" className="chip">Tarifs & options</a>
                <a href="#restitution" className="chip">Restitution</a>
                <a href="#faq" className="chip">FAQ</a>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:hello@minimoji.fr?subject=Minimoji%20-%20Devis%20Atelier"
                  className="btn btn-primary"
                >
                  Demander un devis
                </a>
                <a
                  href="mailto:hello@minimoji.fr?subject=Minimoji%20-%20Dossier%20Atelier"
                  className="btn btn-outline"
                >
                  Recevoir le dossier
                </a>
              </div>
            </div>
            {/* Stats */}
            <div className="p-0 overflow-hidden">
              <img
                src="/magicien_dino_paperboard.png"
                alt="Illustration Minimoji : magicien dinosaure devant un paperboard"
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pour qui ? */}
      <section id="pour-qui" aria-labelledby="pour-qui-title">
        <div className="container-pg">
          <SectionTitle hid="pour-qui-title" icon={<UsersIcon className="size-5" aria-hidden />} title="Pour qui ?" subtitle="Médiathèques, centres culturels, périscolaire, événements & écoles (format court)" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <InfoCard title="Médiathèques & centres culturels" desc="Une animation originale qui attire les familles et rayonne localement." />
            <InfoCard title="Périscolaire & vacances" desc="Un format intense et cadré qui stimule imaginaire et coopération." />
            <InfoCard title="Écoles — format événement" desc="Idéal pour une semaine thématique, fête d’école ou journée porte ouverte." />
          </div>
        </div>
      </section>

      {/* Déroulé 2 h */}
      <section id="deroule" aria-labelledby="deroule-title">
        <div className="container-pg">
          <SectionTitle hid="deroule-title" icon={<ClockIcon className="size-5" aria-hidden />} title="Déroulé (2 h)" subtitle="Narration guidée → illustration → mise en commun" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { step: 1, h: "Inventer une histoire", p: "Cartes créatives pour lancer l’imaginaire, personnages & enjeux.", tag: "Narration" },
              { step: 2, h: "Dessiner sa scène", p: "Personnage, décor ou action clé, avec légende si besoin.", tag: "Illustration" },
              { step: 3, h: "Mise en commun & transfert", p: "Numérisation/prise de vue et finalisation côté Minimoji après l’atelier.", tag: "Organisation" },
            ].map((s, i) => (
              <StepCard key={i} step={s.step} title={s.h} desc={s.p} tag={s.tag} />
            ))}
          </div>
        </div>
      </section>

      {/* Livrables & délais */}
      <section id="livrables" aria-labelledby="livrables-title">
        <div className="container-pg">
          <SectionTitle hid="livrables-title" icon={<FilmIcon className="size-5" aria-hidden />} title="Livrables & délais" subtitle="Clips individuels + option film collectif — envoi sous 72 h" />
          <MotionCard>
            <ul className="grid gap-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
              <li>1 clip MP4 par participant (lisible sur mobile/ordi/TV).</li>
              <li>Option : film collectif pour projection/partage.</li>
              <li>Envoi des livrables sous 72 h (express possible selon agenda).</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="badge-stk bg-indigo-100 text-indigo-700">Prêt à partager</span>
              <span className="badge-stk bg-emerald-100 text-emerald-700">Clips individuels</span>
              <span className="badge-stk bg-orange-100 text-orange-700">Collectif en option</span>
            </div>
          </MotionCard>
        </div>
      </section>

      {/* Tarifs & options */}
      <section id="tarifs" aria-labelledby="tarifs-title">
        <div className="container-pg">
          <SectionTitle hid="tarifs-title" icon={<BanknotesIcon className="size-5" aria-hidden />} title="Tarifs & options" subtitle="Repères indicatifs — adaptables selon effectif & logistique" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 16, bounce: 0.12 }}
            className="card relative p-6 sm:p-7 transition-all duration-300 shadow-[0_10px_30px_-8px_rgba(99,102,241,0.25)] hover:scale-[1.02] hover:ring-4 hover:ring-indigo-400/60 hover:shadow-[0_22px_80px_-10px_rgba(99,102,241,0.55)]"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-display font-semibold text-xl mb-2">Forfait Atelier 2 h</h3>
                <p className="text-gray-700 dark:text-gray-300">Production & livrables inclus — devis ajusté selon effectif et logistique.</p>
                <p className="mt-2 text-gray-900 dark:text-gray-100 font-semibold">Repère : 180 € TTC</p>
              </div>
              <div>
                <h3 className="font-display font-semibold text-xl mb-2">Options</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Film collectif (+ valorisation en projection) — <span className="font-medium">+40 € TTC</span></li>
                  <li>Musique personnalisée, voix‑off, QR cards imprimées</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="mailto:hello@minimoji.fr?subject=Minimoji%20-%20Devis%20Atelier" className="btn btn-primary">Demander un devis</a>
              <a href="mailto:hello@minimoji.fr?subject=Minimoji%20-%20Dossier%20Atelier" className="btn btn-outline">Recevoir le dossier</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Restitution & valorisation */}
      <section id="restitution" aria-labelledby="restitution-title">
        <div className="container-pg">
          <SectionTitle hid="restitution-title" icon={<QrCodeIcon className="size-5" aria-hidden />} title="Restitution & valorisation" subtitle="Projection conviviale + QR codes pour les familles" />
          <div className="grid gap-6 md:grid-cols-2">
            <MotionCard>
              <h3 className="font-display font-semibold text-2xl mb-2">Projection & moment de fierté</h3>
              <p className="text-gray-700 dark:text-gray-300">Visionnage en fin de cycle ou lors d’un événement. Présentation de la démarche par les enfants.</p>
            </MotionCard>
            <MotionCard>
              <h3 className="font-display font-semibold text-2xl mb-2">QR codes & partage</h3>
              <p className="text-gray-700 dark:text-gray-300">QR codes menant au film, possibilité de cartes imprimées par participant.</p>
            </MotionCard>
          </div>
        </div>
      </section>

      {/* Pédagogie (ancrage SEO) */}
      <section id="pedagogie" aria-labelledby="pedagogie-title">
        <div className="container-pg">
          <SectionTitle hid="pedagogie-title" icon={<BookOpenIcon className="size-5" aria-hidden />} title="Pédagogie & compétences" subtitle="Français · Arts plastiques · EMI · Coopération" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <InfoCard title="Français" desc="Structurer un récit court, enrichir le lexique, s’exprimer à l’oral." />
            <InfoCard title="Arts plastiques" desc="Illustration expressive, cadrage, image séquentielle." />
            <InfoCard title="EMI" desc="Comprendre la narration multimédia (image + son) et son intention." />
            <InfoCard title="Coopération" desc="Projet commun, écoute active, rôles et restitution." />
            <InfoCard title="Valorisation" desc="Projection, QR codes, exposition éphémère des dessins." />
            <InfoCard title="Accessibilité" desc="Cartes créatives et supports guidés pour tous les niveaux." />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title">
        <div className="container-pg">
          <SectionTitle hid="faq-title" icon={<ChatBubbleLeftRightIcon className="size-5" aria-hidden />} title="FAQ" subtitle="Les questions fréquentes des structures" />
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { q: "Âges & effectif ?", a: "Conseillé primaire (adaptable). Groupe modulable selon salle & disponibilité des encadrants." },
              { q: "Quel matériel ?", a: "Feuilles A4/A3, feutres/crayons ; smartphone ou tablette pour numériser/photographier." },
              { q: "Délais de livraison ?", a: "Clips envoyés sous 72 h ; express possible selon agenda." },
              { q: "Droit à l’image & diffusion ?", a: "Autorisation parentale recommandée pour toute mise en ligne publique ; QR codes possibles pour partage privé." },
            ].map((f, i) => (
              <MotionCard key={i}>
                <h3 className="font-display font-semibold text-xl mb-1">{f.q}</h3>
                <p className="text-gray-700 dark:text-gray-300">{f.a}</p>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section aria-labelledby="cta-title">
        <div className="container-pg">
          <div className="card p-6 sm:p-8 text-center">
            <h2 id="cta-title" className="mb-2">Organiser un atelier ?</h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">Envoyez‑nous vos dates possibles, le lieu et l’effectif estimé. Nous revenons vers vous avec une proposition adaptée.</p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="mailto:hello@minimoji.fr?subject=Minimoji%20-%20Devis%20Atelier" className="btn btn-primary">Demander un devis</a>
              <a href="mailto:hello@minimoji.fr?subject=Minimoji%20-%20Dossier%20Atelier" className="btn btn-outline">Recevoir le dossier</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* --------------------------------- Helpers --------------------------------- */
function SectionTitle({ icon, title, subtitle, hid }) {
  return (
    <header className="mb-8">
      <div className="inline-flex items-center gap-2 rounded-sticker bg-indigo-100 text-indigo-700 px-3 py-1 text-sm font-semibold">
        {icon}
        {title}
      </div>
      <h2 id={hid} className="mt-3">{title}</h2>
      {subtitle && <p className="mt-2 text-gray-600 dark:text-gray-300">{subtitle}</p>}
    </header>
  );
}

function InfoCard({ title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 150, damping: 16, bounce: 0.12 }}
      className="card relative p-6 sm:p-7 transition-all duration-300 shadow-[0_10px_30px_-8px_rgba(99,102,241,0.25)] hover:scale-[1.02] hover:ring-4 hover:ring-indigo-400/60 hover:shadow-[0_22px_80px_-10px_rgba(99,102,241,0.55)]"
    >
      <h3 className="font-display font-semibold text-xl mb-1">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300">{desc}</p>
    </motion.div>
  );
}

function StepCard({ step, title, desc, tag }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 150, damping: 16, bounce: 0.12 }}
      className="card relative p-6 sm:p-7 transition-all duration-300 shadow-[0_10px_30px_-8px_rgba(99,102,241,0.25)] hover:scale-[1.02] hover:ring-4 hover:ring-indigo-400/60 hover:shadow-[0_22px_80px_-10px_rgba(99,102,241,0.55)]"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-indigo-600 text-white font-bold">{step}</span>
        <span className="badge-stk bg-emerald-100 text-emerald-700">{tag}</span>
      </div>
      <h3 className="font-display font-semibold text-xl">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 mt-1">{desc}</p>
    </motion.div>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div className="card p-4 sm:p-5 flex items-center gap-3">
      <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-indigo-100 text-indigo-700">
        {icon}
      </div>
      <div>
        <div className="font-display text-2xl font-semibold leading-none">{value}</div>
        <div className="text-xs text-gray-600 dark:text-gray-400">{title}</div>
      </div>
    </div>
  );
}

function MotionCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 150, damping: 16, bounce: 0.12 }}
      className="card relative p-6 sm:p-7 transition-all duration-300 shadow-[0_10px_30px_-8px_rgba(99,102,241,0.25)] hover:scale-[1.02] hover:ring-4 hover:ring-indigo-400/60 hover:shadow-[0_22px_80px_-10px_rgba(99,102,241,0.55)]"
    >
      {children}
    </motion.div>
  );
}

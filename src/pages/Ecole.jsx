import { motion } from "framer-motion";
import { SparklesIcon, BookOpenIcon, UsersIcon, ClockIcon, BanknotesIcon, QrCodeIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export default function Ecole() {
  const h1Title = "Parcours École — récit, illustration & restitution";
  const h1Words = h1Title.split(" ");
  return (
    <main className="font-sans" aria-labelledby="ecole-title">
      {/* Hero / Intro */}
      <section id="intro">
        <div className="container-pg">
          <div className="grid gap-8 md:grid-cols-[1.1fr_.9fr] items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-sticker bg-indigo-100 text-indigo-700 px-3 py-1 text-sm font-semibold">
                <SparklesIcon className="size-4" aria-hidden />
                Dispositif pédagogique
              </div>
              <motion.h1
                id="ecole-title"
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
                Un projet clé-en-main pour le cycle 2/3 : les élèves imaginent un court récit, l’illustrent, puis
                découvrent leur création transformée en un petit film animé collectif. Restitution possible en
                projection et via QR codes pour les familles.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#objectifs" className="chip">Objectifs & compétences</a>
                <a href="#deroule" className="chip">Déroulé (7 séances)</a>
                <a href="#organisation" className="chip">Organisation</a>
                <a href="#budget" className="chip">Budget & financement</a>
                <a href="#restitution" className="chip">Restitution</a>
                <a href="#faq" className="chip">FAQ</a>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="mailto:hello@minimoji.fr?subject=Minimoji%20-%20Dossier%20p%C3%A9dagogique" className="btn btn-primary">Demander le dossier</a>
                <a href="mailto:hello@minimoji.fr?subject=Minimoji%20-%20Devis%20%C3%89cole" className="btn btn-outline">Obtenir un devis</a>
              </div>
            </div>
            <div className="p-0 overflow-hidden">
              <img
                src="/magicien_dino_classboard.png"
                alt="Illustration Minimoji : magicien dinosaure devant un paperboard"
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Objectifs & compétences */}
      <section id="objectifs" aria-labelledby="objectifs-title">
        <div className="container-pg">
          <SectionTitle icon={<BookOpenIcon className="size-5" aria-hidden />} title="Objectifs & compétences" subtitle="Aligné Français, Arts plastiques, EMI, oral & coopération (cycle 2/3)" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Français", d: "Vocabulaire, structure du récit, expression orale." },
              { t: "Arts plastiques", d: "Illustration de personnages, décors, actions." },
              { t: "EMI", d: "Storyboard, image séquentielle, regard critique." },
              { t: "Coopération", d: "Rôles, entraide, écoute active de la classe." },
              { t: "Numérique", d: "Découverte d’un pipeline créatif accessible." },
              { t: "Valorisation", d: "Projection & QR codes à partager aux familles." },
            ].map((c, i) => (
              <InfoCard key={i} title={c.t} desc={c.d} />
            ))}
          </div>
        </div>
      </section>

      {/* Déroulé 7 séances */}
      <section id="deroule" aria-labelledby="deroule-title">
        <div className="container-pg">
          <SectionTitle icon={<ClockIcon className="size-5" aria-hidden />} title="Déroulé (7 séances)" subtitle="Cycle court prêt à dérouler en classe" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { step: 1, h: "Découverte & brainstorming", p: "Intentions, lexique, premières idées de récit.", tag: "Narration" },
              { step: 2, h: "Structure narrative", p: "Début / péripéties / fin, personnages & enjeux.", tag: "Narration" },
              { step: 3, h: "Storyboard collectif", p: "Mise en séquence, cadrage, transitions.", tag: "Narration" },
              { step: 4, h: "Illustrations — personnages", p: "Traits, postures, expressions.", tag: "Illustration" },
              { step: 5, h: "Illustrations — actions clés", p: "Décors, scènes, cohérence visuelle.", tag: "Illustration" },
              { step: 6, h: "Finalisation & envoi", p: "Numérisation et transfert des visuels.", tag: "Organisation" },
              { step: 7, h: "Restitution", p: "Projection en classe + QR codes pour les familles.", tag: "Restitution" },
            ].map((s, i) => (
              <StepCard key={i} step={s.step} title={s.h} desc={s.p} tag={s.tag} />
            ))}
          </div>
        </div>
      </section>

      {/* Organisation & matériel */}
      <section id="organisation" aria-labelledby="orga-title">
        <div className="container-pg">
          <SectionTitle icon={<UsersIcon className="size-5" aria-hidden />} title="Organisation & matériel" subtitle="Simple à intégrer — production prise en charge hors classe" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <InfoCard title="Temps en classe" desc="7 séances de 45–60 min selon niveau. Possibles adaptations." />
            <InfoCard title="Matériel" desc="Feuilles A4/A3, feutres/crayons, smartphone/tablette pour prises de vue." />
            <InfoCard title="Rôles" desc="Enseignant pilote. Équipe Minimoji assure montage & livrables." />
          </div>
        </div>
      </section>

      {/* Budget & financement */}
      <section id="budget" aria-labelledby="budget-title">
        <div className="container-pg">
          <SectionTitle icon={<BanknotesIcon className="size-5" aria-hidden />} title="Budget & financement" subtitle="Repère indicatif : ~12–15 € TTC / élève selon options & effectif" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 16, bounce: 0.12 }}
            className="card relative p-6 sm:p-7 transition-all duration-300 shadow-[0_10px_30px_-8px_rgba(99,102,241,0.25)] hover:scale-[1.02] hover:ring-4 hover:ring-indigo-400/60 hover:shadow-[0_22px_80px_-10px_rgba(99,102,241,0.55)]"
          >
            <ul className="grid gap-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
              <li>Forfait classe (production & montage) + livrable MP4 collectif.</li>
              <li>Options : musique personnalisée, voix-off, QR cards imprimées.</li>
              <li>Financement possible via coop, APEL/OGEC, mécénat local.</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="badge-stk bg-indigo-100 text-indigo-700">Devis rapide</span>
              <span className="badge-stk bg-emerald-100 text-emerald-700">Adapté effectif</span>
              <span className="badge-stk bg-orange-100 text-orange-700">Options modulaires</span>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="mailto:hello@minimoji.fr?subject=Minimoji%20-%20Devis%20%C3%89cole" className="btn btn-primary">Demander un devis</a>
              <a href="mailto:hello@minimoji.fr?subject=Minimoji%20-%20Dossier%20p%C3%A9dagogique" className="btn btn-outline">Recevoir le dossier</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Restitution */}
      <section id="restitution" aria-labelledby="restitution-title">
        <div className="container-pg">
          <SectionTitle icon={<QrCodeIcon className="size-5" aria-hidden />} title="Restitution" subtitle="Projection en classe + QR codes à partager" />

          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 150, damping: 16, bounce: 0.12 }}
              className="card relative p-6 sm:p-7 transition-all duration-300 shadow-[0_10px_30px_-8px_rgba(99,102,241,0.25)] hover:scale-[1.02] hover:ring-4 hover:ring-indigo-400/60 hover:shadow-[0_22px_80px_-10px_rgba(99,102,241,0.55)]"
            >
              <h3 className="font-display font-semibold text-2xl mb-2">Projection & moment de fierté</h3>
              <p className="text-gray-700 dark:text-gray-300">Séance de visionnage en classe ou lors d’une porte ouverte. Les élèves présentent leur démarche et les étapes clés du projet.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 150, damping: 16, bounce: 0.12 }}
              className="card relative p-6 sm:p-7 transition-all duration-300 shadow-[0_10px_30px_-8px_rgba(99,102,241,0.25)] hover:scale-[1.02] hover:ring-4 hover:ring-indigo-400/60 hover:shadow-[0_22px_80px_-10px_rgba(99,102,241,0.55)]"
            >
              <h3 className="font-display font-semibold text-2xl mb-2">QR codes & partage aux familles</h3>
              <p className="text-gray-700 dark:text-gray-300">Un QR code mène au clip collectif. Possibilité de cartes imprimées pour chaque élève.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title">
        <div className="container-pg">
          <SectionTitle icon={<ChatBubbleLeftRightIcon className="size-5" aria-hidden />} title="FAQ" subtitle="Les questions fréquentes des enseignants" />
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { q: "Combien de temps par séance ?", a: "45–60 min selon niveau. Le projet s’étale sur 7 séances." },
              { q: "Quel matériel ?", a: "Feuilles A4/A3, feutres/crayons, et un smartphone/tablette pour numériser." },
              { q: "Que faites‑vous hors classe ?", a: "Nous assurons la production/montage et livrons le clip MP4 final." },
              { q: "Comment financer ?", a: "Via coopérative scolaire, APEL/OGEC, association de parents, ou mécénat local." },
            ].map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 150, damping: 16, bounce: 0.12 }}
                className="card relative p-6 sm:p-7 transition-all duration-300 shadow-[0_10px_30px_-8px_rgba(99,102,241,0.25)] hover:scale-[1.02] hover:ring-4 hover:ring-indigo-400/60 hover:shadow-[0_22px_80px_-10px_rgba(99,102,241,0.55)]"
              >
                <h3 className="font-display font-semibold text-xl mb-1">{f.q}</h3>
                <p className="text-gray-700 dark:text-gray-300">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section aria-labelledby="cta-title">
        <div className="container-pg">
          <div className="card p-6 sm:p-8 text-center">
            <h2 id="cta-title" className="mb-2">Prêt à lancer le projet ?</h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">Envoyez‑nous vos dates possibles et l’effectif de la classe, on construit le déroulé.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="mailto:hello@minimoji.fr?subject=Minimoji%20-%20Dossier%20p%C3%A9dagogique" className="btn btn-primary">Demander le dossier</a>
              <a href="mailto:hello@minimoji.fr?subject=Minimoji%20-%20Devis%20%C3%89cole" className="btn btn-outline">Obtenir un devis</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* --------------------------------- Helpers --------------------------------- */
function SectionTitle({ icon, title, subtitle }) {
  return (
    <header className="mb-8">
      <div className="inline-flex items-center gap-2 rounded-sticker bg-indigo-100 text-indigo-700 px-3 py-1 text-sm font-semibold">
        {icon}
        {title}
      </div>
      <h2 className="mt-3">{title}</h2>
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

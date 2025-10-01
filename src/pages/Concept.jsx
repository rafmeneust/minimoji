import { LazyMotion, m } from "framer-motion";
import { loadMotionFeatures } from "@/lib/motion";
import { Helmet } from "react-helmet-async";
import DrawingCanvas from "../components/DrawingCanvas";
import Toolbar from "../components/Toolbar";
import SaveExportButtons from "../components/SaveExportButtons";
import { useRef, useState } from "react";

export default function Concept() {
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState("pen");
  const [clearCanvas, setClearCanvas] = useState(false);
  const stageRef = useRef(null);
  const h1Title = "Un dessin aujourd'hui, un film magique dès demain ✨";
  const h1Letters = Array.from(h1Title);

  return (
    <>
      <Helmet>
        <title>Concept Minimoji — Donnez vie aux dessins d’enfants</title>
        <meta
          name="description"
          content="Du dessin au mini‑film en 24 h (HD MP4 + lien privé). Formats portrait/paysage/carré. Paiement sécurisé, respect du droit à l’image."
        />
        <link rel="canonical" href="https://minimoji.fr/concept" />

        {/* Open Graph */}
        <meta property="og:title" content="Concept Minimoji — Donnez vie aux dessins d’enfants" />
        <meta property="og:description" content="Du dessin au mini‑film en 24 h (HD MP4 + lien privé). Formats portrait/paysage/carré. Paiement sécurisé, respect du droit à l’image." />
        <meta property="og:url" content="https://minimoji.fr/concept" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://minimoji.fr/images/preview-form.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Concept Minimoji — Donnez vie aux dessins d’enfants" />
        <meta name="twitter:description" content="Du dessin au mini‑film en 24 h (HD MP4 + lien privé). Formats portrait/paysage/carré. Paiement sécurisé, respect du droit à l’image." />
        <meta name="twitter:image" content="https://minimoji.fr/images/preview-form.jpg" />
      </Helmet>
      <LazyMotion features={loadMotionFeatures}>
        <main className="bg-white dark:bg-gray-900 transition-colors duration-500 text-gray-900 dark:text-gray-100 font-sans">
      <section className="section bg-white dark:bg-gray-900 font-sans"><div className="container-pg max-w-3xl relative">
        <img
          src="/scribble_bonhomme.svg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="pointer-events-none select-none absolute hidden sm:block w-16 left-1 top-16 sm:w-20 sm:-left-12 sm:top-10 md:w-24 md:-left-20 md:top-12 lg:w-28 lg:-left-28 lg:top-14"
          draggable="false"
          width="160"
          height="160"
        />

        {/* Accroche principale */}
         <m.h1
          className="text-3xl sm:text-4xl lg:text-4xl font-extrabold mb-10 text-center font-display"
          aria-label={h1Title}
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.035, delayChildren: 0.1 } } }}
        >
          {h1Letters.map((ch, i) => (
            <m.span
              key={i}
              aria-hidden="true"
              className={ch === " " ? "inline-block w-2" : "inline-block"}
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
            </m.span>
          ))}
        </m.h1>
        <p className="text-lg sm:text-xl leading-relaxed text-center text-indigo-700 dark:text-indigo-300 mb-12">
          Confiez‑le à notre magicien… et réveillez‑vous avec la magie
        </p>

        {/* Étapes du rituel */}
        <div className="space-y-16">

          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <h2 className="text-xl sm:text-2xl font-bold font-display">1. Remettez le parchemin</h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
              Envoyez une photo ou un scan du dessin de votre enfant — même bancal, même griffonné. L’essentiel, c’est l’élan créatif. Vous pouvez y ajouter une note vocale ou un petit texte si vous souhaitez enrichir l’histoire. Pas obligatoire, mais notre magicien aime les détails !
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <h2 className="text-xl sm:text-2xl font-bold font-display">2. Le magicien s’en empare</h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
              Il analyse les lignes, les couleurs, l’énergie du dessin. Puis, d’un coup de baguette, il en fait une animation. Fidèle, mais prolongée. Une mini‑histoire naît, pleine de douceur ou de folie, selon l’inspiration de l’œuvre.
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <h2 className="text-xl sm:text-2xl font-bold font-display">3. Réception du film (sous 24 h) </h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
              Vous recevez un lien sécurisé contenant la vidéo en HD, sans watermark. Elle est prête à être projetée, partagée ou transformée en souvenir : certains l’intègrent dans un album, d’autres la collent au dos du dessin via QR code.
            </p>
          </m.div>
        </div>
        {/* Preuve sociale + Formats & livraisons */}
        <div className="mt-10">
          <div className="bg-white/60 dark:bg-white/10 rounded-xl p-6 shadow-sm backdrop-blur-sm">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Preuves & avis</h3>
                <ul className="list-disc list-inside space-y-1 text-base text-gray-700 dark:text-gray-300">
                  <li><span aria-hidden="true">⭐️⭐️⭐️⭐️⭐️</span> Noté 4,9/5 par les parents</li>
                  <li>Livré ≤ 24 h</li>
                  <li>Paiement sécurisé (Stripe)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Formats & livraisons</h3>
                <ul className="list-disc list-inside space-y-1 text-base text-gray-700 dark:text-gray-300">
                  <li>Portrait / Paysage / Carré</li>
                  <li>Vidéo HD (MP4) + lien privé téléchargeable</li>
                  <li>Durée ~6 s, optimisée pour le partage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
          {/* CTA final */}
         <div className="mt-16 text-center">
          <m.a
            href="/creer"
            className="inline-block px-6 py-3 bg-[#FB923C] hover:bg-orange-600 text-white rounded-full font-semibold text-base transition"
            whileHover={{ scale: 1.05 }}
          >
            Je confie le dessin au magicien
          </m.a>
          <img
            src="/step-2.svg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="mx-auto mt-6 w-40 h-40 object-contain"
            draggable="false"
            width="160"
            height="160"
          />
        </div>
      </div>
      </section>
      <section className="section bg-[#FEF9E9] dark:bg-gray-900 transition-colors duration-500 w-full">
  <div className="container-pg max-w-3xl font-sans" id="galerie">
    
    <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10 font-display">Préparez la magie ✨</h2>

    {/* Formats */}
    <div className="mt-12">
      <div className="bg-white/60 dark:bg-white/10 rounded-xl p-6 shadow-sm backdrop-blur-sm transition-transform duration-300 ease-in-out hover:scale-105">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Formats au choix</h3>
        <p className="text-base text-gray-700 dark:text-gray-300">
          Portrait, paysage ou carré — le magicien adapte l’histoire et la vidéo à votre demande.
        </p>
      </div>
    </div>

    {/* Confiance & légalité */}
    <div className="mt-6">
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
    <div className="mt-6">
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
      <section className="section"><div className="container-pg max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10 font-display">Dessin (2D)</h2>
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
      </div>
      </section>
        </main>
      </LazyMotion>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { LazyMotion, m } from "framer-motion";
import {
  SparklesIcon, ShieldCheckIcon, BoltIcon, AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { loadMotionFeatures } from "@/lib/motion";

export default function Values() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const items = [
    {
      icon: <AcademicCapIcon className="h-6 w-6" aria-hidden />,
      title: "Créatif & pédagogique",
      desc: "Un cadre bienveillant qui stimule l’imagination. Les enfants racontent, illustrent, et voient leur histoire prendre vie.",
    },
    {
      icon: <ShieldCheckIcon className="h-6 w-6" aria-hidden />,
      title: "Respect & confidentialité",
      desc: "Partages privés, données protégées, droits clairs. Vous gardez la main sur la diffusion du mini-film.",
    },
    {
      icon: <BoltIcon className="h-6 w-6" aria-hidden />,
      title: "Simple & rapide",
      desc: "Parcours fluide, livraison express, support humain réactif. On s’occupe du montage et du son.",
    },
  ];

  // Lazy autoplay avec IntersectionObserver (lecture quand ~15% visible)
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // iOS/Safari: requis pour autoplay inline
    el.muted = true;

    const tryPlay = () => {
      const p = el.play?.();
      if (p && typeof p.then === "function") p.catch(() => {});
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tryPlay();
          } else {
            el.pause?.();
          }
        });
      },
      { threshold: 0.01, rootMargin: '600px 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // FULL-BLEED: section qui occupe 100% de la largeur, avec fond vidéo
    <LazyMotion features={loadMotionFeatures}>
      <section aria-labelledby="values-title" className="relative isolate overflow-hidden min-h-[420px] md:min-h-[500px]">
      {/* Vidéo Cloudinary en plein fond (HTML5 video pour autoplay fiable) */}
      <div className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          className="block w-full h-full object-cover pointer-events-none"
          playsInline
          muted
          loop
          autoPlay
          onLoadedMetadata={() => { try { videoRef.current?.play?.(); } catch (_) {} }}
          onCanPlay={() => setVideoLoaded(true)}
          poster="https://res.cloudinary.com/dwl7ufet9/video/upload/f_auto,q_auto:eco,so_0/doodle-bg_fsyfwo.jpg"
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="https://res.cloudinary.com/dwl7ufet9/video/upload/f_auto,vc_vp9,q_auto/doodle-bg_fsyfwo.webm" type="video/webm" />
          <source src="https://res.cloudinary.com/dwl7ufet9/video/upload/f_auto,vc_h264,q_auto/doodle-bg_fsyfwo.mp4" type="video/mp4" />
        </video>
        {/* Overlay pour lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/90 dark:from-gray-900/80 dark:via-gray-900/80 dark:to-gray-900/85 pointer-events-none" />
        {/* Preload overlay: masque blanc jusqu'au premier frame (supprime la bande grise) */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${videoLoaded ? 'opacity-0' : 'opacity-100'} bg-white dark:bg-gray-900`}
        />
      </div>

      {/* Contenu centré dans la grille, mais la section reste full-bleed */}
      <div className="container-pg py-16 md:py-24">
        <div className="inline-flex items-center gap-2 rounded-sticker bg-indigo-100 text-indigo-700 px-3 py-1 text-sm font-semibold">
          <SparklesIcon className="h-4 w-4" aria-hidden />
          Nos engagements
        </div>
        <h2 id="values-title" className="mt-3 font-display font-bold text-3xl md:text-4xl">
          Minimoji, pensé pour rassurer & émerveiller
        </h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300 max-w-2xl">
          Nous faisons simple, sûr et qualitatif — pour que chaque dessin devienne un souvenir animé à partager en toute confiance.
        </p>

        {/* Cartes de réassurance */}
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <m.li
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 160, damping: 18, delay: i * 0.05 }}
              className="card relative bg-white/90 dark:bg-white/10 p-6 sm:p-7 transition-all duration-300 shadow-[0_10px_30px_-8px_rgba(99,102,241,0.25)] hover:scale-[1.02] hover:ring-4 hover:ring-indigo-400/60 hover:shadow-[0_22px_80px_-10px_rgba(99,102,241,0.55)]"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                  {it.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg">{it.title}</h3>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{it.desc}</p>
                </div>
              </div>
            </m.li>
          ))}
        </ul>
      </div>
      </section>
    </LazyMotion>
  );
}

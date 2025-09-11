import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sound = new Audio("/pop.wav");

export default function DinoPopup() {
  const [show, setShow] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 90000);

    return () => clearTimeout(timer);
  }, []);

  const playPop = () => {
    sound.currentTime = 0;
    sound.play().catch(() => {/* ignore si bloqué */});
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("DINO15");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Fond flouté */}
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Popup */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-6 rounded-2xl shadow-2xl dark:shadow-black/30 text-center max-w-sm relative overflow-hidden transition-colors duration-500">

              {/* Bouton ✕ de fermeture */}
              <button
                onClick={() => setShow(false)}
                className="absolute top-2 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white transition text-2xl font-bold"
                aria-label="Fermer"
              >
                &times;
              </button>

              {/* Dino animé */}
              <motion.div
                animate={{ x: ["-70px", "70px", "-70px"] }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                className="relative w-24 h-24 mx-auto"
              >
                <motion.img
                  src="/dino.svg"
                  alt="Dino"
                  className="absolute top-0 left-0 w-full origin-center"
                  animate={{
                    scaleX: [1, 1, -1, -1, 1],
                    y: [0, -5, 0, 5, 0]
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-black/10 dark:bg-white/10"
                  animate={{
                    scaleX: [.9, 1.1, .9],
                    opacity: [0.6, 0.4, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </motion.div>

              {/* Texte principal */}
              <h3 className="text-lg font-extrabold leading-tight tracking-wide mt-4">
                Coucou, moi c’est Dino !
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Tu viens de débloquer un trésor magique !
              </p>
              <p className="text-sm font-extrabold leading-tight tracking-wide">
                15% de réduction !
              </p>

              {/* Code promo animé */}
              {showPromo && (
                <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4"
              >
                <div className="inline-flex items-center gap-2 justify-center px-6 py-3 rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-white font-mono text-xl">
                  <span className="select-all">Code : DINO15</span>
                  <button
                    onClick={handleCopy}
                    className="text-sm bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600 transition"
                  >
                    {copied ? "✅" : "Copier"}
                  </button>
                </div>
              </motion.div>
              )}

              {/* Bouton "J'en profite" */}
              {!showPromo && (
                <div className="mt-6 flex justify-center">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition"
                    onClick={() => { setShowPromo(true); playPop(); }}
                  >
                    J'en profite
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
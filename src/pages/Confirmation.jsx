import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Confirmation() {
  return (
    <>
      <Helmet>
        <title>Confirmation – Minimoji</title>
        <meta name="description" content="Votre dessin a bien été envoyé. Merci de faire confiance à Minimoji !" />
      </Helmet>

      <section className="min-h-screen bg-purple-100 dark:bg-gray-900 flex flex-col justify-center items-center text-center px-4 py-16">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md max-w-md">
          {/* Dino animé */}
          <motion.div
            animate={{ x: ["-70px", "70px", "-70px"] }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="relative w-24 h-24 mx-auto mb-4"
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
          <h1 className="text-3xl font-extrabold text-primary-500 dark:text-white mb-4">Merci pour votre envoi !</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">Votre dessin a bien été reçu. Un mini-film sera généré et envoyé dans un délai de 24h.</p>
          <Link
            to="/"
            className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-2 rounded-full transition"
          >
            Retour à l’accueil
          </Link>
        </div>
      </section>
    </>
  );
}
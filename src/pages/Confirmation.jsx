import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Confirmation() {
  return (
    <>
      <Helmet>
        <title>Confirmation – Minimoji</title>
        <meta name="description" content="Votre dessin a bien été envoyé. Merci de faire confiance à Minimoji !" />
      </Helmet>

      <section className="min-h-screen bg-purple-100 dark:bg-gray-900 flex flex-col justify-center items-center text-center px-4 py-16">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md max-w-md">
          <h1 className="text-3xl font-extrabold text-purple-600 dark:text-white mb-4">Merci pour votre envoi !</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">Votre dessin a bien été reçu. Un mini-film sera généré et envoyé dans un délai de 24h.</p>
          <Link
            to="/"
            className="inline-block bg-orange-400 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full transition"
          >
            Retour à l’accueil
          </Link>
        </div>
      </section>
    </>
  );
}
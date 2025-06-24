import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';

export default function Form() {
  const [preview, setPreview] = useState(null);
  const location = useLocation();
  const [plan, setPlan] = useState("mini");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedPlan = params.get("plan");
    if (["mini", "classique", "grand"].includes(selectedPlan)) {
      setPlan(selectedPlan);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      console.log(Object.fromEntries(formData.entries()));
      const response = await fetch("/api/send-email", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("✨ Merci ! Votre dessin a bien été envoyé. Le magicien s’en occupe !");
        navigate("/confirmation");
      } else {
        const errorText = await response.text();
        console.error("Erreur:", errorText);
        toast.error("Une erreur est survenue, veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      toast.error("Erreur réseau. Merci de vérifier votre connexion.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Créer mon dessin animé – Minimoji</title>
        <meta name="description" content="Soumettez facilement un dessin d’enfant pour le transformer en mini-film animé personnalisé. Formulaire simple et rapide, envoi sécurisé et réponse sous 24h." />
        <meta property="og:title" content="Créer mon dessin animé – Minimoji" />
        <meta property="og:description" content="Soumettez facilement un dessin d’enfant pour le transformer en mini-film animé personnalisé. Formulaire simple et rapide, envoi sécurisé et réponse sous 24h." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://minimoji.fr/creer" />
        <meta property="og:image" content="https://minimoji.fr/images/preview-form.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Créer mon dessin animé – Minimoji" />
        <meta name="twitter:description" content="Soumettez facilement un dessin d’enfant pour le transformer en mini-film animé personnalisé. Formulaire simple et rapide, envoi sécurisé et réponse sous 24h." />
        <meta name="twitter:image" content="https://minimoji.fr/images/preview-form.jpg" />
        <link rel="canonical" href="https://minimoji.fr/creer" />
      </Helmet>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#f97316',
            color: '#fff',
            fontWeight: '600',
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '12px',
            padding: '14px 20px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#f97316',
          },
        }}
      />
      <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-2">
            Créer mon dessin animé
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Transformez un dessin d’enfant en mini-film animé en quelques clics ✨
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Formule choisie</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-center">
              <div className="flex flex-col items-center">
                <img src="/potion1.svg" alt="Formule Mini" className="w-6 h-6 mb-1" />
                <p className="text-sm text-gray-700 dark:text-gray-300">Mini</p>
              </div>
              <div className="flex flex-col items-center">
                <img src="/potion2.svg" alt="Formule Classique" className="w-6 h-6 mb-1" />
                <p className="text-sm text-gray-700 dark:text-gray-300">Classique</p>
              </div>
              <div className="flex flex-col items-center">
                <img src="/potion3.svg" alt="Formule Grand Héros" className="w-6 h-6 mb-1" />
                <p className="text-sm text-gray-700 dark:text-gray-300">Grand Héros</p>
              </div>
            </div>
          <select
            name="plan"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="select select-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            required
          >
            <option value="mini">Formule Mini – 8,99€</option>
            <option value="classique">Formule Classique – 13,99€</option>
            <option value="grand">Formule Grand Héros – 19,99€</option>
          </select>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Prénom de l’enfant</label>
            <input type="text" name="child_name" className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400" />

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Titre du dessin</label>
            <input type="text" name="drawing_title" className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400" />

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Histoire ou explication</label>
            <textarea name="story" className="textarea textarea-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Style graphique</label>
              <select name="style" className="select select-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400">
                <option>Cartoon</option>
                <option>Aquarelle magique</option>
                <option>Crayon de couleur</option>
                <option>Pixel pastel</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Ambiance sonore</label>
              <select name="ambiance" className="select select-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400">
                <option>Poétique</option>
                <option>Aventureuse</option>
                <option>Magique</option>
                <option>Énergique</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Voix off</label>
              <select name="voiceover" className="select select-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400">
                <option value="true">Avec voix-off</option>
                <option value="false">Sans voix-off</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Dessin de votre enfant</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              className="file-input file-input-bordered w-full"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
            {preview && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Aperçu de l’image :</p>
                <img src={preview} alt="Aperçu du dessin" className="w-full max-w-xs mx-auto rounded shadow" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Adresse email du parent</label>
            <input type="email" name="email" required className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400" />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-5 py-2 bg-orange-400 hover:bg-orange-600 text-white text-sm font-semibold font-poppins rounded-full shadow-md"
            >
              Envoyer le dessin ✨
            </button>
          </div>
        </form>
      </div>
    </section>
    </>
  );
}

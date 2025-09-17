import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";

export default function Form() {
  const [preview, setPreview] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // ------- Plan depuis l'URL (mini | classique | grand | decouverte) -------
  const [plan, setPlan] = useState("mini");
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selected = (params.get("plan") || "mini").toLowerCase();
    if (["mini", "classique", "grand", "decouverte"].includes(selected)) {
      setPlan(selected);
    }
  }, [location.search]);

  // ------- Tarifs de base & options -------
  const BASE = { mini: 3.5, classique: 6.9, grand: 9.9, decouverte: 3.49 };
  const LABEL = {
    mini: "Formule Mini",
    classique: "Formule Classique",
    grand: "Formule Grand Héros",
    decouverte: "Offre découverte",
  };
  const OPTS = [
    { key: "music", label: "Musique d’ambiance", price: 1.5 },
    { key: "sfx", label: "Effets sonores (SFX)", price: 1.5 },
    { key: "voice", label: "Voix-off personnalisée", price: 3.9 },
    { key: "intro", label: "Écran intro/fin stylisé", price: 1.5 },
    { key: "express", label: "Livraison express 6 h", price: 4.0 },
  ];
  const [options, setOptions] = useState({
    music: false,
    sfx: false,
    voice: false,
    intro: false,
    express: false,
  });
  const toggleOption = (k) => setOptions((o) => ({ ...o, [k]: !o[k] }));

  const total = useMemo(() => {
    let t = BASE[plan] || 0;
    for (const [k, v] of Object.entries(options)) {
      if (v) t += OPTS.find((o) => o.key === k).price;
    }
    return Number(t.toFixed(2));
  }, [plan, options]);

  // ------- Submit -------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData.entries());

    // Ajout d'infos de pricing dans le payload
    body.plan = plan;
    body.options = options;
    body.total_estime = total;

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...body,
          email: body.email || "meneust.r@gmail.com", // fallback
        }),
      });

      if (response.ok) {
        toast.success("✉️ Votre dessin a bien été envoyé !");
        setTimeout(() => navigate("/confirmation"), 1200);
      } else {
        const errorText = await response.text();
        console.error("Erreur:", errorText);
        toast.error("Une erreur est survenue, veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      toast.error("Une erreur est survenue, veuillez réessayer.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Créer mon dessin animé – Minimoji</title>
        <meta
          name="description"
          content="Soumettez un dessin d’enfant et choisissez vos options pour un mini‑film animé personnalisé. Formulaire simple, envoi sécurisé, récap prix en direct."
        />
        <meta property="og:title" content="Créer mon dessin animé – Minimoji" />
        <meta
          property="og:description"
          content="Soumettez un dessin d’enfant et choisissez vos options. Prix en direct et livraison rapide."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://minimoji.fr/creer" />
        <meta property="og:image" content="https://minimoji.fr/images/preview-form.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Créer mon dessin animé – Minimoji" />
        <meta
          name="twitter:description"
          content="Soumettez un dessin, ajoutez des options, visualisez le total. Livraison rapide."
        />
        <meta name="twitter:image" content="https://minimoji.fr/images/preview-form.jpg" />
        <link rel="canonical" href="https://minimoji.fr/creer" />
      </Helmet>

      <Toaster position="bottom-center" />

      {/* Section principale */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container-pg">
          <div className="card p-6 md:p-8 max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h1 className="font-display font-extrabold mb-2">Créer mon dessin animé</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Transformez un dessin d’enfant en mini‑film animé en quelques clics ✨
              </p>
            </div>

            {/* Récap plan + total en direct */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="text-gray-800 dark:text-gray-200">
                <span className="font-semibold">{LABEL[plan]}</span>{" "}
                <span className="text-gray-500">— base {(BASE[plan] || 0).toFixed(2)} €</span>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Total estimé</span>
                <span className="font-display font-bold text-lg">{total.toFixed(2)} €</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="plan" value={plan} />

              <div className="space-y-4">
                <label className="label">Prénom de l’enfant</label>
                <input
                  type="text"
                  name="child_name"
                  className="input"
                  placeholder="Ex. Léonie"
                />

                <label className="label">Titre du dessin</label>
                <input
                  type="text"
                  name="drawing_title"
                  className="input"
                  placeholder="Ex. Le dragon gentil"
                />

                <label className="label">Histoire ou explication</label>
                <textarea
                  name="story"
                  className="textarea"
                  rows={4}
                  placeholder="Quelques mots pour inspirer le magicien…"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Style graphique</label>
                  <select name="style" className="select">
                    <option>Cartoon</option>
                    <option>Aquarelle magique</option>
                    <option>Crayon de couleur</option>
                    <option>Pixel pastel</option>
                  </select>
                </div>
                <div>
                  <label className="label">Ambiance sonore</label>
                  <select name="ambiance" className="select">
                    <option>Poétique</option>
                    <option>Aventureuse</option>
                    <option>Magique</option>
                    <option>Énergique</option>
                  </select>
                </div>
                <div>
                  <label className="label">Voix off</label>
                  <select name="voiceover" className="select">
                    <option value="true">Avec voix‑off</option>
                    <option value="false">Sans voix‑off</option>
                  </select>
                </div>
              </div>

              {/* Upload dessin */}
              <div className="space-y-2">
                <label className="label">Dessin de votre enfant</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  required
                  className="input"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                />
                {preview && (
                  <div className="mt-3 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Aperçu de l’image :</p>
                    <img
                      src={preview}
                      alt="Aperçu du dessin"
                      className="w-full max-w-xs mx-auto rounded-xl shadow-soft"
                    />
                  </div>
                )}
              </div>

              {/* Coordonnées */}
              <div>
                <label className="label">Adresse email du parent</label>
                <input type="email" name="email" required className="input" placeholder="prenom@exemple.com" />
              </div>

              {/* Options + récap latéral */}
              <section className="section pt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Colonne options */}
                  <div className="card p-5 md:p-6">
                    <h3 className="font-display text-xl md:text-2xl font-semibold mb-4">
                      Options (facultatives)
                    </h3>
                    <ul className="space-y-3">
                      {OPTS.map((o) => (
                        <li key={o.key} className="flex items-center justify-between gap-4">
                          <label htmlFor={`opt-${o.key}`} className="flex items-center gap-3 cursor-pointer">
                            <input
                              id={`opt-${o.key}`}
                              type="checkbox"
                              className="h-5 w-5 rounded border-gray-300 text-brand focus:ring-brand"
                              checked={options[o.key]}
                              onChange={() => toggleOption(o.key)}
                            />
                            <span className="text-gray-800 dark:text-gray-200">{o.label}</span>
                          </label>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            + {o.price.toFixed(2)} €
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="help mt-4">
                      Vous pourrez modifier ces options avant de valider.
                    </p>
                  </div>

                  {/* Colonne récap */}
                  <aside className="card p-5 md:p-6 h-fit md:sticky md:top-24">
                    <h4 className="font-display text-lg md:text-xl font-semibold mb-3">
                      Récapitulatif
                    </h4>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-700 dark:text-gray-300">
                        {LABEL[plan] || "Formule"}
                      </span>
                      <span className="font-semibold">
                        {(BASE[plan] || 0).toFixed(2)} €
                      </span>
                    </div>
                    <ul className="mt-2 divide-y divide-gray-200/60 dark:divide-white/10">
                      {Object.entries(options).some(([, v]) => v) ? (
                        OPTS.filter((o) => options[o.key]).map((o) => (
                          <li
                            key={`recap-${o.key}`}
                            className="flex items-center justify-between py-2"
                          >
                            <span className="text-gray-600 dark:text-gray-300">
                              {o.label}
                            </span>
                            <span className="text-sm">+ {o.price.toFixed(2)} €</span>
                          </li>
                        ))
                      ) : (
                        <li className="py-2 text-sm text-gray-500 dark:text-gray-400">
                          Aucune option sélectionnée
                        </li>
                      )}
                    </ul>
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                      <span className="font-display font-semibold">Total estimé</span>
                      <span className="font-display font-bold text-lg">{total.toFixed(2)} €</span>
                    </div>
                  </aside>
                </div>
              </section>

              {/* Submit */}
              <div className="text-center pt-2">
                <button type="submit" className="btn-accent text-base">
                  Envoyer le dessin ✨
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

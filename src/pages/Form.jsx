import { useState } from "react";

export default function Form() {
  const [preview, setPreview] = useState(null);

  return (
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
          action="https://hook.eu2.make.com/hirmo9bu7zpl8rzs4sncmpxtdkq7gqv7"
          method="POST"
          encType="multipart/form-data"
          className="space-y-6"
        >
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
  );
}

// src/app/Dashboard.jsx
import { useState } from "react";
import { auth } from "@/lib/firebaseClient";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { uploadClip } from "@/lib/cloudinary";
import { saveClip } from "@/lib/dbClips";
import ClipList from "@/components/media/ClipList";

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file || !user?.uid) return;
    try {
      setUploading(true);
      const up = await uploadClip(file);
      await saveClip(user.uid, up);
      e.target.value = "";
    } catch (err) {
      alert(err?.message || "Upload impossible");
    } finally {
      setUploading(false);
    }
  }

  const openStripePortal = async () => {
    try {
      const currentUser = user ?? auth.currentUser;
      if (!currentUser) {
        window.location.href = "/login";
        return;
      }

      const idToken = await currentUser.getIdToken();

      const res = await fetch("/api/stripe-portal", {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (!res.ok) {
        const txt = await res.text();
        alert(`Erreur Stripe Portal: ${res.status} ${txt}`);
        return;
      }

      const { url } = await res.json();
      window.location.href = url; // redirection Customer Portal
    } catch (e) {
      console.error(e);
      alert(e?.message || "Erreur inconnue");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (e) {
      console.error(e);
      alert(e?.message || "Déconnexion impossible");
    }
  };

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold">Espace Minimoji</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Bonjour {user?.displayName || user?.email} 👋
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border p-4">Dernier clip (à venir)</div>
        <div className="rounded-lg border p-4">Factures &amp; commandes (à venir)</div>
        <div className="rounded-lg border p-4">Profil (à venir)</div>
        <div className="rounded-lg border p-4">Aide (à venir)</div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm"
          onClick={openStripePortal}
        >
          Gérer ma facturation (Stripe)
        </button>
        <button
          className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm"
          onClick={handleSignOut}
        >
          Se déconnecter
        </button>
      </div>

      <section className="mt-10 space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Ajouter un clip</h2>
          <p className="text-sm text-muted-foreground">
            Importez un fichier vidéo pour l’enregistrer dans vos clips.
          </p>
        </div>
        <input
          type="file"
          accept="video/*"
          onChange={handleUpload}
          disabled={uploading}
          className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-700 disabled:opacity-60"
        />
        {uploading && (
          <p className="text-sm text-muted-foreground">Upload en cours…</p>
        )}

        <ClipList uid={user?.uid} />
      </section>
    </main>
  );
}

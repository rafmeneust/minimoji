// src/app/Dashboard.jsx
import { useState } from "react";
import { auth } from "@/lib/firebaseClient";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { uploadClip } from "@/lib/cloudinary";
import { saveClip } from "@/lib/dbClips";
import ClipList from "@/components/media/ClipList";

const MAX_VIDEO_MB = 200; // garde-fou côté UI

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    setErrorMsg("");
    setOkMsg("");
    if (!file || !user?.uid) return;
    try {
      // validations légères côté client
      if (!file.type?.startsWith("video/")) {
        setErrorMsg("Seules les vidéos sont acceptées.");
        e.target.value = "";
        return;
      }
      if (file.size > MAX_VIDEO_MB * 1024 * 1024) {
        setErrorMsg(`Fichier trop lourd (> ${MAX_VIDEO_MB} Mo).`);
        e.target.value = "";
        return;
      }

      setUploading(true);
      const up = await uploadClip(file);
      await saveClip(user.uid, up);
      e.target.value = "";
      setOkMsg("✅ Upload terminé. Le clip apparaît ci‑dessous.");
    } catch (err) {
      setErrorMsg(err?.message || "Upload impossible");
    } finally {
      setUploading(false);
    }
  }

  const openStripePortal = async () => {
    setErrorMsg("");
    setOkMsg("");
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
        setErrorMsg(`Erreur Stripe Portal: ${res.status} ${txt}`);
        return;
      }

      const { url } = await res.json();
      window.location.href = url; // redirection Customer Portal
    } catch (e) {
      console.error(e);
      setErrorMsg(e?.message || "Erreur inconnue");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (e) {
      console.error(e);
      setErrorMsg(e?.message || "Déconnexion impossible");
    }
  };

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold">Espace Minimoji</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Bonjour {user?.displayName || user?.email} 👋
      </p>

      {/* Bandeaux d'état */}
      {errorMsg ? (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorMsg}
        </div>
      ) : null}
      {okMsg ? (
        <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
          {okMsg}
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Facturation</h2>
            <button
              className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm"
              onClick={openStripePortal}
            >
              Gérer ma facturation (Stripe)
            </button>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Accédez à vos factures et moyens de paiement.
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Session</h2>
            <button
              className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm"
              onClick={handleSignOut}
            >
              Se déconnecter
            </button>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Déconnexion de votre compte Minimoji.
          </p>
        </div>
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
          aria-label="Uploader une vidéo"
        />
        {uploading && (
          <p className="text-sm text-muted-foreground">Upload en cours…</p>
        )}

        <ClipList uid={user?.uid} />
      </section>
    </main>
  );
}

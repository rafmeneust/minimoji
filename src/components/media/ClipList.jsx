import { useEffect, useState, useCallback } from "react";
import { auth } from "@/lib/firebaseClient";
import { listenClips, deleteClipDoc } from "@/lib/dbClips";

export default function ClipList({ uid }) {
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    setErr("");
    if (!uid) {
      setClips([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = listenClips(uid, {
      next: (snap) => {
        setClips(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      error: (e) => {
        setErr(e?.message || "Erreur Firestore");
        setLoading(false);
      },
    });

    return () => unsubscribe?.();
  }, [uid]);

  const fetchSignedUrl = useCallback(async (publicId) => {
    const idToken = await auth.currentUser?.getIdToken?.();
    const res = await fetch(`/api/clip-url?publicId=${encodeURIComponent(publicId)}`, {
      headers: idToken ? { Authorization: `Bearer ${idToken}` } : undefined,
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.url) {
      throw new Error(data?.error || "URL sécurisée indisponible");
    }
    return data.url;
  }, []);

  const handleOpen = async (publicId) => {
    try {
      setBusyId(publicId);
      const url = await fetchSignedUrl(publicId);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (e) {
      alert(e?.message || "Impossible d’ouvrir le clip");
    } finally {
      setBusyId(null);
    }
  };

  const handleCopy = async (publicId) => {
    try {
      setBusyId(publicId);
      const url = await fetchSignedUrl(publicId);
      await navigator.clipboard.writeText(url);
      alert("Lien sécurisé copié !");
    } catch (e) {
      alert(e?.message || "Copie du lien impossible");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (clip) => {
    if (!uid || !clip?.id || !clip?.publicId) return;
    if (!confirm("Supprimer ce clip définitivement ?")) return;
    try {
      setBusyId(clip.id);
      const idToken = await auth.currentUser?.getIdToken?.();
      const res = await fetch("/api/clip-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        },
        body: JSON.stringify({ publicId: clip.publicId, docId: clip.id }),
      });
      if (!res.ok) {
        const payload = await res.text();
        throw new Error(payload || `Suppression impossible (${res.status})`);
      }
      // Sécurité : si la fonction server ne supprime que Cloudinary, on retire aussi le doc ici
      await deleteClipDoc(uid, clip.id).catch(() => {});
    } catch (e) {
      alert(e?.message || "Erreur lors de la suppression");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <p className="text-sm text-muted-foreground">Chargement des clips…</p>;
  if (err) return <p className="text-sm text-red-600">{err}</p>;
  if (!uid) return <p className="text-sm text-muted-foreground">Connectez-vous pour voir vos clips.</p>;
  if (!clips.length) return <p className="text-sm text-muted-foreground">Aucun clip pour le moment.</p>;

  return (
    <ul className="divide-y rounded-md border">
      {clips.map((clip) => (
        <li key={clip.id} className="flex items-center justify-between gap-3 p-3">
          <div className="min-w-0">
            <p className="truncate font-medium">{clip.title || clip.publicId}</p>
            <p className="text-xs text-muted-foreground">
              {clip.createdAt?.toDate ? clip.createdAt.toDate().toLocaleString() : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpen(clip.publicId)}
              disabled={busyId === clip.publicId}
              className="rounded-md border px-2.5 py-1 text-sm"
            >
              Voir
            </button>
            <button
              onClick={() => handleCopy(clip.publicId)}
              disabled={busyId === clip.publicId}
              className="rounded-md border px-2.5 py-1 text-sm"
            >
              Copier le lien
            </button>
            <button
              onClick={() => handleDelete(clip)}
              disabled={busyId === clip.id}
              className="rounded-md border px-2.5 py-1 text-sm text-red-600"
            >
              Supprimer
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

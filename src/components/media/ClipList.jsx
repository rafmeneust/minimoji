import { useEffect, useState } from "react";
import { listenClips } from "@/lib/dbClips";
import SecureVideoPlayer from "@/components/media/SecureVideoPlayer";

export default function ClipList({ uid }) {
  const [clips, setClips] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!uid) return;
    const unsub = listenClips(uid, {
      next: (snap) => {
        setClips(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      },
      error: (e) => setErr(e?.message || "Erreur Firestore"),
    });
    return () => unsub?.();
  }, [uid]);

  if (err) return <p className="text-sm text-red-600">{err}</p>;
  if (!clips.length) return <p className="text-sm text-muted-foreground">Aucun clip pour le moment.</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {clips.map(c => (
        <div key={c.id} className="rounded-lg border p-3">
          <div className="text-sm mb-2 break-all">{c.publicId}</div>
          <SecureVideoPlayer publicId={c.publicId} />
        </div>
      ))}
    </div>
  );
}
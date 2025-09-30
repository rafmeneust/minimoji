import { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseClient";

export default function SecureVideoPlayer({ publicId, ...props }) {
  const [url, setUrl] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const t = await auth.currentUser.getIdToken();
        const res = await fetch(`/api/clip-url?publicId=${encodeURIComponent(publicId)}`, {
          headers: { Authorization: `Bearer ${t}` },
        });
        if (!res.ok) throw new Error(await res.text());
        const { url } = await res.json();
        if (!cancel) setUrl(url);
      } catch (e) {
        if (!cancel) setErr(e.message);
      }
    })();
    return () => { cancel = true; };
  }, [publicId]);

  if (err) return <p className="text-sm text-red-600">{err}</p>;
  if (!url) return <p className="text-sm text-muted-foreground">Chargement…</p>;
  return <video controls src={url} className="w-full rounded-lg" {...props} />;
}
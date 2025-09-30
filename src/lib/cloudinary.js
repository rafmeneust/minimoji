// src/lib/cloudinary.js
import { auth } from "@/lib/firebaseClient";

export async function getCloudinarySignature() {
  const t = await auth.currentUser.getIdToken();
  const res = await fetch("/api/cloudinary-sign", {
    method: "POST",
    headers: { Authorization: `Bearer ${t}` },
    body: JSON.stringify({}), // optionnellement: { params: { public_id: "clip-001" } }
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function uploadClip(file) {
  const sig = await getCloudinarySignature();
  const fd = new FormData();
  fd.append("file", file);
  fd.append("api_key", sig.apiKey);
  fd.append("timestamp", sig.timestamp);
  fd.append("signature", sig.signature);
  fd.append("folder", sig.folder);
  fd.append("type", sig.type);                 // "private"
  fd.append("context", sig.context);           // owner=<uid>
  if (sig.publicId) fd.append("public_id", sig.publicId);

  const r = await fetch(sig.uploadUrl, { method: "POST", body: fd });
  const json = await r.json();
  if (json.error) throw new Error(json.error.message);
  return json; // { public_id, secure_url, duration, ... }
}
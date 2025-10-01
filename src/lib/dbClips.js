// src/lib/dbClips.js
import { db } from "@/lib/firebaseClient";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

/** transforme un public_id Cloudinary en id de doc Firestore */
export function clipDocId(publicId) {
  // ex: "minimoji/uploads/users/<uid>/clips/abc123" -> "minimoji__uploads__users__<uid>__clips__abc123"
  return publicId.replace(/\//g, "__");
}

/** enregistre (ou met à jour) un clip sous /users/<uid>/clips/<docId> */
export async function saveClip(uid, cloudinaryResp) {
  const {
    public_id,
    secure_url,
    playback_url,
    duration,
    width,
    height,
    bytes,
    original_filename,
  } = cloudinaryResp;

  const id = clipDocId(public_id);
  const ref = doc(collection(db, "users", uid, "clips"), id);

  await setDoc(
    ref,
    {
      publicId: public_id,
      secureUrl: secure_url || null,
      playbackUrl: playback_url || null,
      duration: duration || null,
      width: width || null,
      height: height || null,
      bytes: bytes || null,
      title: original_filename || null,
      status: "ready",
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );

  return { id, ref };
}

export async function deleteClipDoc(uid, docId) {
  const ref = doc(collection(db, "users", uid, "clips"), docId);
  await deleteDoc(ref);
}

/** écoute les clips d’un user, triés du plus récent au plus ancien */
export function listenClips(uid, { next, error }) {
  const col = collection(db, "users", uid, "clips");
  const q = query(col, orderBy("createdAt", "desc"));
  return onSnapshot(q, next, error);
}

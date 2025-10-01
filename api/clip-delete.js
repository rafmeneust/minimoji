import admin from "./_firebaseAdmin.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const firestore = admin.firestore();

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) return res.status(401).send("Missing token");

    const { uid } = await admin.auth().verifyIdToken(token);
    const { publicId, docId } = req.body || {};
    if (!publicId || !docId) return res.status(400).send("publicId & docId required");

    const ref = firestore.doc(`users/${uid}/clips/${docId}`);
    const snap = await ref.get();
    if (!snap.exists || snap.data()?.publicId !== publicId) {
      return res.status(403).send("Forbidden");
    }

    await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
      type: "private",
      invalidate: true,
    });

    await ref.delete();

    res.status(200).json({ ok: true });
  } catch (e) {
    console.error("[clip-delete] error", e);
    res.status(500).send(e?.message || "Internal error");
  }
}

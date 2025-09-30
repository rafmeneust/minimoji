import admin from "./_firebaseAdmin.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).send("Method Not Allowed");
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) return res.status(401).send("Missing bearer token");
    const { uid } = await admin.auth().verifyIdToken(token);

    const { publicId } = req.query || {};
    if (!publicId) return res.status(400).send("Missing publicId");

    // contrôle d’appartenance via le chemin
    if (!publicId.startsWith(`users/${uid}/`)) return res.status(403).send("Forbidden");

    const url = cloudinary.url(publicId, {
      resource_type: "video",
      type: "private",
      sign_url: true,
      transformation: [{ fetch_format: "mp4", quality: "auto" }],
    });

    res.status(200).json({ url });
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message || "Internal Server Error");
  }
}
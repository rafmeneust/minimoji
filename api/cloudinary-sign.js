// /api/cloudinary-sign.js
import admin from "./_firebaseAdmin.js";
import { v2 as cloudinary } from "cloudinary";

function safeJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return {};
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    // --- 1) Auth Firebase (Bearer <idToken>) ---
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) return res.status(401).send("Missing bearer token");
    const { uid } = await admin.auth().verifyIdToken(token);

    // --- 2) Env sanity ---
    if (
      !process.env.CLOUDINARY_API_SECRET ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_CLOUD_NAME
    ) {
      return res.status(500).json({ error: "Cloudinary env missing" });
    }

    // --- 3) Inputs (optional, restricted) ---
    // Only allow a safe public_id hint; never allow folder override.
    const body = typeof req.body === "string" ? safeJsonParse(req.body) : req.body || {};
    const incoming = body && typeof body === "object" ? body.params || {} : {};
    let publicId = incoming.public_id && String(incoming.public_id).trim();
    if (publicId) {
      // Keep it conservative: alnum, dash, underscore only.
      publicId = publicId.replace(/[^a-zA-Z0-9-_]/g, "");
    }

    // --- 4) Compute server-enforced folder ---
    const baseFolder = process.env.CLOUDINARY_UPLOAD_FOLDER || "minimoji/uploads";
    const folder = `${baseFolder}/users/${uid}/clips`;

    // --- 5) Build params to sign ---
    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign = {
      timestamp,
      folder,
      type: "private",
      context: `owner=${uid}`,
      ...(publicId ? { public_id: publicId } : {}),
    };

    // --- 6) Sign with Cloudinary helper ---
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    // --- 7) Respond with everything the client needs ---
    return res.status(200).json({
      signature,
      timestamp,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      uploadUrl: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`,
      folder,
      type: "private",
      context: `owner=${uid}`,
      publicId: publicId || undefined,
    });
  } catch (e) {
    console.error("cloudinary-sign error", e);
    return res.status(500).send(e.message || "Internal Server Error");
  }
}
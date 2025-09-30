import admin from "./_firebaseAdmin.js";

export default async function getUidFromRequest(req) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    const err = new Error("Missing bearer token");
    err.status = 401;
    throw err;
  }
  const decoded = await admin.auth().verifyIdToken(token);
  return decoded.uid;
}
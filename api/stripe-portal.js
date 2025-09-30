// /api/stripe-portal.js (Vercel Serverless Function - Node.js)
import Stripe from "stripe";
import admin from "./_firebaseAdmin.js"; // ton fichier déjà présent

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
  try {
    // 1) Vérifier le token Firebase
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) return res.status(401).send("Missing bearer token");
    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;
    const email = decoded.email;

    // 2) Récupérer/Créer le customer Stripe lié au uid
    const db = admin.firestore();
    const userRef = db.collection("users").doc(uid);
    const snap = await userRef.get();
    let customerId = snap.exists && snap.get("stripeCustomerId");

    if (!customerId) {
      const customer = await stripe.customers.create({
        email,
        metadata: { firebaseUID: uid },
      });
      customerId = customer.id;
      await userRef.set({ stripeCustomerId: customerId }, { merge: true });
    }

    // 3) Créer la session du Customer Portal
    const returnUrl =
      process.env.STRIPE_PORTAL_RETURN_URL || "http://localhost:5173/app/commandes";

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("stripe-portal error", err);
    return res.status(500).send(err.message || "Internal Server Error");
  }
}
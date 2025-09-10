import admin from './_firebaseAdmin.js';

export default async function handler(req, res) {
  try {
    const app = admin.app(); // force init
    // on renvoie juste un bout d’info pour vérifier
    res.json({ ok: true, projectId: app.options.credential.projectId || process.env.FIREBASE_PROJECT_ID });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message, stack: e.stack });
  }
}
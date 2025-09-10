// api/create-job.js
import admin from './_firebaseAdmin.js'; // ajuste le chemin/nom si besoin

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    // 1) Auth Firebase (Bearer token)
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Missing bearer token' });

    let decoded;
    try {
      decoded = await admin.auth().verifyIdToken(token);
    } catch (e) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // 2) Payload minimal
    const { uploadId, prompt = '' } = (req.body || {});
    if (!uploadId) return res.status(400).json({ error: 'uploadId is required' });

    // 3) Écriture Firestore
    const db = admin.firestore();
    const doc = {
      userId: decoded.uid,
      uploadId,
      prompt,
      status: 'queued',            // statut fictif pour la démo
      source: 'mock-no-n8n',       // pour te souvenir que c’est la version temporaire
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const ref = await db.collection('jobs').add(doc);

    // 4) Réponse
    return res.status(201).json({ jobId: ref.id });
  } catch (e) {
    console.error('[create-job] error', e);
    return res.status(500).json({ error: 'create-job failed' });
  }
}
// api/clip-list.js
import admin from './_firebaseAdmin.js'; // ou './_firebaseAdmin' selon ton chemin actuel
import crypto from 'crypto';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

// Helper REST Cloudinary Admin
async function cloudinarySearch({ expression, next_cursor, max_results = 30 }) {
  const url = new URL(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/search`);
  const body = new URLSearchParams();
  body.set('expression', expression);
  if (next_cursor) body.set('next_cursor', next_cursor);
  body.set('max_results', String(max_results));

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
  const data = await resp.json().catch(() => null);
  if (!resp.ok) {
    const msg = data?.error?.message || `Cloudinary search ${resp.status}`;
    throw new Error(msg);
  }
  return data;
}

// URL signée pour type "private" (ou authentifiée) côté serveur
function signDeliveryUrl(publicId, { resource_type = 'image', format, attachment } = {}) {
  // Génère une URL signée simple (download) – convient aux assets privés
  const ts = Math.floor(Date.now() / 1000);
  const base = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/${resource_type}/private/${publicId}.${format || 'jpg'}`;
  // Pour les vidéos privés, préfère: .../${resource_type}/private/${publicId}.mp4
  const toSign = `public_id=${publicId}&resource_type=${resource_type}&timestamp=${ts}${attachment ? `&attachment=${attachment}` : ''}${CLOUDINARY_API_SECRET}`;
  const signature = crypto.createHash('sha1').update(toSign).digest('hex');

  const params = new URLSearchParams({ timestamp: String(ts), signature });
  if (attachment) params.set('attachment', attachment);
  return `${base}?${params.toString()}&api_key=${CLOUDINARY_API_KEY}`;
}

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      return res.status(500).json({ error: 'Cloudinary env vars missing' });
    }

    // Auth Firebase
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Missing bearer token' });

    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;

    // Filtrage : images (upload) ou vidéos (clips)
    const kind = (req.query.kind || 'image').toLowerCase(); // 'image' | 'video'
    const resource_type = kind === 'video' ? 'video' : 'image';

    // Dossier user (ta fonction de signature le force déjà côté upload)
    // Adapte si nécessaire pour coller exactement à ton cloudinary-sign :
    const baseFolder = process.env.CLOUDINARY_UPLOAD_FOLDER_BASE || 'minimoji/uploads/users';
    const folder = `${baseFolder}/${uid}/${kind === 'video' ? 'clips' : 'images'}`;

    // Recherche Cloudinary par dossier et resource_type
    // Expression Cloudinary Search : folder="..." AND resource_type:...
    const expression = `folder="${folder}" AND resource_type:${resource_type}`;
    const next_cursor = req.query.cursor || undefined;

    const data = await cloudinarySearch({ expression, next_cursor, max_results: 30 });

    // Prépare retour { public_id, format, signedUrl, bytes, created_at }
    const items = (data.resources || []).map((r) => {
      // r.public_id inclut le chemin (ex: minimoji/uploads/users/<uid>/images/xxx)
      const publicId = r.public_id;
      const format = r.format || (resource_type === 'video' ? 'mp4' : 'jpg');
      const signedUrl = signDeliveryUrl(publicId, { resource_type, format });
      return {
        public_id: publicId,
        bytes: r.bytes,
        created_at: r.created_at,
        format,
        url: signedUrl,
      };
    });

    return res.status(200).json({
      folder,
      kind: resource_type,
      items,
      next_cursor: data.next_cursor || null,
      total_count: data.total_count || items.length,
    });
  } catch (e) {
    console.error('[clip-list] error', e);
    return res.status(500).json({ error: e.message || 'Server error' });
  }
}
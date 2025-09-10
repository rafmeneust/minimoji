import crypto from 'crypto';

function safeJsonParse(str) {
  try { return JSON.parse(str); } catch { return {}; }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // Merge allowed params coming from the client (optional)
  const body = typeof req.body === 'string' ? safeJsonParse(req.body) : (req.body || {});
  const incoming = body && typeof body === 'object' ? (body.params || {}) : {};
  const allowedKeys = new Set(['folder', 'public_id']);
  const sanitized = Object.fromEntries(
    Object.entries(incoming).filter(([k, v]) => allowedKeys.has(k) && v != null && v !== '')
  );

  const folder = (process.env.CLOUDINARY_UPLOAD_FOLDER || 'minimoji/uploads');
  const timestamp = Math.floor(Date.now() / 1000);

  if (!process.env.CLOUDINARY_API_SECRET || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_CLOUD_NAME) {
    return res.status(500).json({ error: 'Cloudinary env missing' });
  }

  // Params à signer (trier par clé)
  const params = { folder, timestamp, ...sanitized };
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');

  const signature = crypto
    .createHash('sha1')
    .update(toSign + process.env.CLOUDINARY_API_SECRET)
    .digest('hex');

  return res.json({
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    publicId: params.public_id || undefined,
    folder,
  });
}
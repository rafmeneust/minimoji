import { Resend } from 'resend';
import { v2 as cloudinary } from 'cloudinary';

// --- Server-only environment variables ---
const REQUIRED_ENV = ['RESEND_API_KEY', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length) {
  throw new Error(`[send-email] Missing environment variables: ${missing.join(', ')}`);
}

const resend = new Resend(process.env.RESEND_API_KEY);
const SUPPORT_EMAIL = (process.env.SUPPORT_EMAIL || process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'hello@minimoji.fr').trim();

const PLAN_LABEL = {
  mini: 'Formule Mini',
  classique: 'Formule Classique',
  grand: 'Formule Grand Héros',
};

const PLAN_BASE = { mini: 3.5, classique: 6.9, grand: 9.9 };
const ALLOWED_PLANS = new Set(Object.keys(PLAN_LABEL));

const MAX_JSON_BODY_BYTES = 1024 * 1024; // 1MB JSON payload cap
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB image cap
const MAX_STORY_LENGTH = 5000;
const MAX_LABEL_LENGTH = 120;

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
const isValidUrl = (value) => {
  try {
    const url = new URL(String(value || '').trim());
    return ['http:', 'https:'].includes(url.protocol);
  } catch (err) {
    return false;
  }
};
const toTrimmedString = (value) => String(value ?? '').trim();
const buildPublicId = (title) => {
  const base = toTrimmedString(title) || 'dessin';
  const cleaned = base
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 60) || 'dessin';
  return `${Date.now()}_${cleaned}`;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Next.js API route config: we disable bodyParser to be able to handle multipart/form-data.
export const config = { api: { bodyParser: false } };

// Small helper to read raw body (for JSON when bodyParser is disabled)
async function readRawBody(req) {
  return await new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const ctype = String(req.headers['content-type'] || '').toLowerCase();

    let email, child_name, drawing_title, story, plan;
    // Legacy vs new UI options
    let style, ambiance, voiceover; // legacy
    let music, sfx, voice, intro, express; // new
    let imageUrl = '';

    if (ctype.includes('application/json')) {
      // Read & parse JSON body manually since bodyParser is disabled
      const raw = await readRawBody(req);
      const payloadSize = Buffer.byteLength(raw || '', 'utf8');
      if (payloadSize > MAX_JSON_BODY_BYTES) {
        return res.status(413).json({ error: 'Payload JSON trop volumineux' });
      }

      let body = {};
      try {
        body = raw ? JSON.parse(raw) : {};
      } catch (error) {
        return res.status(400).json({ error: 'JSON invalide' });
      }

      ({ email, child_name, drawing_title, story, plan, style, ambiance, voiceover, music, sfx, voice, intro, express } = body);

      email = toTrimmedString(email);
      child_name = toTrimmedString(child_name);
      drawing_title = toTrimmedString(drawing_title);
      story = toTrimmedString(story);
      plan = toTrimmedString(plan).toLowerCase();

      if (body.imageUrl) {
        if (!isValidUrl(body.imageUrl)) {
          return res.status(400).json({ error: 'URL image invalide' });
        }
        imageUrl = toTrimmedString(body.imageUrl);
      } else if (typeof body.imageDataUrl === 'string' && body.imageDataUrl.trim().startsWith('data:')) {
        const dataUrl = body.imageDataUrl.trim();
        const [meta, base64] = dataUrl.split(',');
        if (!meta?.startsWith('data:image/') || !base64) {
          return res.status(400).json({ error: 'Image invalide' });
        }
        const imageBytes = Buffer.from(base64, 'base64').length;
        if (imageBytes > MAX_IMAGE_SIZE_BYTES) {
          return res.status(413).json({ error: 'Image trop volumineuse' });
        }
        const up = await cloudinary.uploader.upload(dataUrl, {
          folder: process.env.CLOUDINARY_UPLOAD_FOLDER || 'minimoji_uploads',
          resource_type: 'image',
          public_id: buildPublicId(drawing_title),
          use_filename: true,
          unique_filename: false,
        });
        imageUrl = up.secure_url;
      } else if (body.imageDataUrl) {
        return res.status(400).json({ error: 'Image invalide' });
      }
    } else if (ctype.includes('multipart/form-data')) {
      // Parse multipart/form-data with formidable (dynamic import to avoid bundling issues)
      const formidable = (await import('formidable')).default;
      const form = formidable({ keepExtensions: true, maxFileSize: MAX_IMAGE_SIZE_BYTES });

      let fields, files;
      try {
        [fields, files] = await form.parse(req);
      } catch (error) {
        const message = String(error?.message || '').toLowerCase();
        if (message.includes('maxfilesize exceeded')) {
          return res.status(413).json({ error: 'Image trop volumineuse' });
        }
        return res.status(400).json({ error: 'Formulaire invalide' });
      }

      // fields can be arrays depending on formidable version
      const get = (obj, key) => (Array.isArray(obj[key]) ? obj[key][0] : obj[key]);

      email = toTrimmedString(get(fields, 'email'));
      child_name = toTrimmedString(get(fields, 'child_name'));
      drawing_title = toTrimmedString(get(fields, 'drawing_title'));
      story = toTrimmedString(get(fields, 'story'));
      plan = toTrimmedString(get(fields, 'plan')).toLowerCase();

      style = get(fields, 'style');
      ambiance = get(fields, 'ambiance');
      voiceover = get(fields, 'voiceover');

      music = get(fields, 'music');
      sfx = get(fields, 'sfx');
      voice = get(fields, 'voice');
      intro = get(fields, 'intro');
      express = get(fields, 'express');

      const imageFile = files?.image || files?.file || files?.upload;
      const file = Array.isArray(imageFile) ? imageFile[0] : imageFile;
      if (file?.filepath) {
        if (file.mimetype && !String(file.mimetype).startsWith('image/')) {
          return res.status(400).json({ error: 'Format image non supporté' });
        }
        if (file.size && file.size > MAX_IMAGE_SIZE_BYTES) {
          return res.status(413).json({ error: 'Image trop volumineuse' });
        }
        const up = await cloudinary.uploader.upload(file.filepath, {
          folder: process.env.CLOUDINARY_UPLOAD_FOLDER || 'minimoji_uploads',
          resource_type: 'image',
          public_id: buildPublicId(drawing_title),
          use_filename: true,
          unique_filename: false,
        });
        imageUrl = up.secure_url;
      }
    } else {
      return res.status(400).json({ error: 'Content-Type non supporté' });
    }

    // Basic validations → 4xx, not 500
    if (!email) return res.status(400).json({ error: 'Email manquant' });
    if (!isValidEmail(email)) return res.status(400).json({ error: 'Email invalide' });

    if (!plan) return res.status(400).json({ error: 'Plan manquant' });
    if (!ALLOWED_PLANS.has(plan)) return res.status(400).json({ error: 'Plan invalide' });

    if (!imageUrl) return res.status(400).json({ error: 'Image manquante' });
    if (!isValidUrl(imageUrl)) return res.status(400).json({ error: 'URL image invalide' });

    if (child_name && child_name.length > MAX_LABEL_LENGTH) {
      return res.status(400).json({ error: 'Prénom trop long' });
    }
    if (drawing_title && drawing_title.length > MAX_LABEL_LENGTH) {
      return res.status(400).json({ error: 'Titre trop long' });
    }
    if (story && story.length > MAX_STORY_LENGTH) {
      return res.status(400).json({ error: 'Histoire trop longue' });
    }

    // -------- Helpers & formatting for a clearer email --------
    const escapeHtml = (s = '') =>
      String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    const euro = (n) => {
      const v = Number.isFinite(+n) ? +n : 0;
      return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(v);
    };

    const ALL_OPTS = [
      { key: 'music',  label: 'Musique d’ambiance', price: 1.5 },
      { key: 'sfx',    label: 'Effets sonores (SFX)', price: 1.5 },
      { key: 'voice',  label: 'Voix-off personnalisée', price: 3.9 },
      { key: 'intro',  label: 'Écran intro/fin stylisé', price: 1.5 },
      { key: 'express',label: 'Livraison express 6 h', price: 4.0 },
    ];

    // Normalisation des options sélectionnées (valeurs issues d’un formulaire)
    const truthy = (v) => [true, 'true', 1, '1', 'on', 'oui', 'Oui'].includes(v);
    const selected = ALL_OPTS.filter(o => truthy(({ music, sfx, voice, intro, express }[o.key])));

    const labelForPlan = PLAN_LABEL[plan] || plan || 'Formule';
    const basePrice    = PLAN_BASE[plan] ?? 0;
    const total        = basePrice + selected.reduce((sum, option) => sum + option.price, 0);

    const preheader = 'Nous avons bien reçu votre dessin — on commence la magie !';

    // ---- HTML email, lisible et structuré (inline styles pour compatibilité) ----
    const html = `<!doctype html>
    <html lang="fr"><head>
      <meta charset="utf-8">
      <meta name="x-apple-disable-message-reformatting">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Confirmation – Minimoji</title>
      <style>img{border:0;outline:none;text-decoration:none}table{border-collapse:collapse}</style>
    </head>
    <body style="margin:0;padding:0;background:#f6f7fb;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;visibility:hidden;">
        ${escapeHtml(preheader)}
      </div>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f7fb;">
        <tr>
          <td align="center" style="padding:24px;">
            <table role="presentation" width="600" style="width:100%;max-width:600px;background:#ffffff;border-radius:16px;border:1px solid #e6e8f1;">
              <tr>
                <td style="padding:22px 24px 10px 24px;text-align:center;">
                  <img src="https://minimoji.fr/favicon-196.png" width="36" height="36" alt="" style="display:block;margin:0 auto 8px"/>
                  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;color:#111827;">Merci pour votre envoi ✨</div>
                  <div style="margin-top:6px;color:#6b7280;font-size:14px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
                    Nous avons bien reçu le dessin${child_name ? ` de <strong style="color:#111827;">${escapeHtml(child_name)}</strong>` : ''}.
                  </div>
                </td>
              </tr>

              <tr>
                <td style="padding:16px 24px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0 10px;">
                    <tr>
                      <td style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;padding:12px 16px;font:14px system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111827;">
                        <div style="font-weight:700;margin-bottom:2px;">Formule</div>
                        ${escapeHtml(labelForPlan)} — ${euro(basePrice)}
                      </td>
                      <td style="width:12px;"></td>
                      <td style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;padding:12px 16px;font:14px system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111827;">
                        <div style="font-weight:700;margin-bottom:2px;">Total estimé</div>
                        ${euro(total)}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              ${selected.length ? `
              <tr>
                <td style="padding:0 24px 4px 24px;">
                  <div style="font:700 14px system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111827;margin:0 0 6px;">Options</div>
                  <div>
                    ${selected.map(o => `
                      <span style="display:inline-block;margin:0 6px 6px 0;padding:6px 10px;border:1px solid #fde7d3;border-radius:999px;background:#fdf2e9;color:#7c2d12;font:600 13px system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
                        ${escapeHtml(o.label)} • ${euro(o.price)}
                      </span>
                    `).join('')}
                  </div>
                </td>
              </tr>` : ''}

              ${story ? `
              <tr>
                <td style="padding:8px 24px 0 24px;">
                  <p style="margin:0;font:14px system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#374151;">
                    <em>${escapeHtml(story)}</em>
                  </p>
                </td>
              </tr>` : ''}

              ${imageUrl ? `
              <tr>
                <td style="padding:16px 24px 24px 24px;">
                  <img src="${imageUrl}" alt="Dessin envoyé" width="552" style="width:100%;max-width:552px;border-radius:12px;border:1px solid #e5e7eb;display:block"/>
                </td>
              </tr>` : ''}

            </table>

            <div style="max-width:600px;margin:12px auto 0;font:12px system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#6b7280;">
              Envoi depuis <strong>${escapeHtml(email)}</strong>. Besoin d’aide ? Répondez directement à ce message.
            </div>
            <div style="max-width:600px;margin:4px auto 0;font:11px system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#9ca3af;">
              Minimoji • Paris, France
            </div>
          </td>
        </tr>
      </table>
    </body></html>`;

    // Version texte (fallback)
    const text = [
      'Merci pour votre envoi ✨',
      child_name ? `Enfant: ${child_name}` : null,
      `Formule: ${labelForPlan} (${euro(basePrice)})`,
      selected.length ? `Options: ${selected.map(o => `${o.label} (+${euro(o.price)})`).join(' • ')}` : `Options: aucune`,
      `Total estimé: ${euro(total)}`,
      story ? `\nHistoire: ${story}` : null,
      imageUrl ? `\nImage: ${imageUrl}` : null,
      `\nEmail utilisé: ${email}`,
    ].filter(Boolean).join('\n');

    const subject = `Confirmation – Minimoji (${labelForPlan.toLowerCase()}) • ${euro(total)}`;

    const data = await resend.emails.send({
      from: `Minimoji <${SUPPORT_EMAIL}>`,
      to: email,
      bcc: SUPPORT_EMAIL,
      subject,
      reply_to: SUPPORT_EMAIL,
      headers: { 'List-Unsubscribe': `<mailto:${SUPPORT_EMAIL}?subject=unsubscribe>` },
      html,
      text,
    });

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('[send-email] error', err);
    return res.status(500).json({ error: 'Erreur serveur pendant l’envoi.' });
  }
}

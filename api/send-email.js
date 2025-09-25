import { Resend } from 'resend';
import { v2 as cloudinary } from 'cloudinary';

// --- Server-only environment variables ---
const resend = new Resend(process.env.RESEND_API_KEY);
const SENDER = process.env.SUPPORT_EMAIL || 'hello@minimoji.fr';

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
      const body = raw ? JSON.parse(raw) : {};
      ({ email, child_name, drawing_title, story, plan, style, ambiance, voiceover, music, sfx, voice, intro, express } = body);

      if (body.imageUrl) {
        imageUrl = String(body.imageUrl);
      } else if (body.imageDataUrl?.startsWith('data:')) {
        const up = await cloudinary.uploader.upload(body.imageDataUrl, {
          folder: process.env.CLOUDINARY_UPLOAD_FOLDER || 'minimoji_uploads',
          resource_type: 'image',
          public_id: `${Date.now()}_${(body.drawing_title || 'dessin').replace(/\s+/g, '_')}`,
          use_filename: true,
          unique_filename: false,
        });
        imageUrl = up.secure_url;
      }
    } else if (ctype.includes('multipart/form-data')) {
      // Parse multipart/form-data with formidable (dynamic import to avoid bundling issues)
      const formidable = (await import('formidable')).default;
      const form = formidable({ keepExtensions: true });
      const [fields, files] = await form.parse(req);

      // fields can be arrays depending on formidable version
      const get = (obj, key) => (Array.isArray(obj[key]) ? obj[key][0] : obj[key]);

      email = get(fields, 'email');
      child_name = get(fields, 'child_name');
      drawing_title = get(fields, 'drawing_title');
      story = get(fields, 'story');
      plan = get(fields, 'plan');

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
        const up = await cloudinary.uploader.upload(file.filepath, {
          folder: process.env.CLOUDINARY_UPLOAD_FOLDER || 'minimoji_uploads',
          resource_type: 'image',
          public_id: `${Date.now()}_${(drawing_title || 'dessin').replace(/\s+/g, '_')}`,
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
    if (!plan) return res.status(400).json({ error: 'Plan manquant' });
    if (!imageUrl) return res.status(400).json({ error: 'Image manquante' });

    // Build options recap (legacy + new)
    const opts = [];
    if (typeof music !== 'undefined') opts.push(`Musique d’ambiance: ${['true', true, '1', 1].includes(music) ? 'Oui' : 'Non'}`);
    if (typeof sfx !== 'undefined') opts.push(`SFX: ${['true', true, '1', 1].includes(sfx) ? 'Oui' : 'Non'}`);
    if (typeof voice !== 'undefined') opts.push(`Voix-off: ${['true', true, '1', 1].includes(voice) ? 'Oui' : 'Non'}`);
    if (typeof intro !== 'undefined') opts.push(`Intro/Fin: ${['true', true, '1', 1].includes(intro) ? 'Oui' : 'Non'}`);
    if (typeof express !== 'undefined') opts.push(`Express 6h: ${['true', true, '1', 1].includes(express) ? 'Oui' : 'Non'}`);
    if (typeof style !== 'undefined') opts.push(`Style: ${style}`);
    if (typeof ambiance !== 'undefined') opts.push(`Ambiance: ${ambiance}`);
    if (typeof voiceover !== 'undefined') opts.push(`Voix-off (legacy): ${['true', true, '1', 1].includes(voiceover) ? 'Oui' : 'Non'}`);

    const html = `
      <p>Bonjour ${child_name || ''},<br/>
      Merci pour votre envoi !<br/>
      Votre dessin <strong>${drawing_title || 'sans titre'}</strong> va être transformé en animation magique ✨</p>
      <p><strong>Formule :</strong> ${plan}</p>
      ${opts.length ? `<p><strong>Options :</strong> ${opts.join(' • ')}</p>` : ''}
      ${story ? `<p><em>${story}</em></p>` : ''}
      <p><strong>Image reçue :</strong><br/>
        <img src="${imageUrl}" alt="Dessin" style="max-width: 420px; margin-top: 10px; border-radius: 12px" />
      </p>
    `;

    const data = await resend.emails.send({
      from: `Minimoji <${SENDER}>`,
      to: email,
      bcc: 'hello@minimoji.fr',
      subject: `Confirmation – Minimoji (${plan})`,
      reply_to: SENDER,
      headers: { 'List-Unsubscribe': `<mailto:${SENDER}?subject=unsubscribe>` },
      html,
    });

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('[send-email] error', err);
    return res.status(500).json({ error: 'Erreur serveur pendant l’envoi.' });
  }
}
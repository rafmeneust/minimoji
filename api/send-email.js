import { Resend } from 'resend';
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';

const resend = new Resend(process.env.RESEND_API_KEY);
const SENDER = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'hello@minimoji.fr';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Erreur parsing:', err);
      return res.status(500).json({ error: 'Erreur parsing formulaire' });
    }

    const { email, child_name, drawing_title, story, plan, style, ambiance, voiceover } = fields;
    const imageFile = files.image;

    if (!email || !plan || !imageFile) {
      return res.status(400).json({ error: 'Champs obligatoires manquants.' });
    }

    try {
      const uploadResult = await cloudinary.uploader.upload(imageFile.filepath, {
        folder: 'minimoji_uploads',
        resource_type: 'image',
        public_id: `${Date.now()}_${drawing_title || 'dessin'}`.replace(/\s+/g, '_'),
        use_filename: true,
        unique_filename: false,
      });

      const imageUrl = uploadResult.secure_url;

      const data = await resend.emails.send({
        from: `Minimoji <${SENDER}>`,
        to: email,
        bcc: 'hello@minimoji.fr',
        subject: `Confirmation – Minimoji (${plan})`,
        reply_to: SENDER,
        headers: {
          'List-Unsubscribe': `<mailto:${SENDER}?subject=unsubscribe>`
        },
        html: `
          <p>Bonjour ${child_name || ''},<br/>
          Merci pour votre envoi !<br/>
          Votre dessin <strong>${drawing_title || 'sans titre'}</strong> va être transformé en animation magique ✨</p>
          <p><strong>Style choisi :</strong> ${style || 'non précisé'}</p>
          <p><strong>Ambiance sonore :</strong> ${ambiance || 'non précisée'}</p>
          <p><strong>Voix-off :</strong> ${voiceover === 'true' ? 'Oui' : 'Non'}</p>
          <p><em>${story || ''}</em></p>
          <p><strong>Image reçue :</strong><br/><img src="${imageUrl}" alt="Dessin" style="max-width: 400px; margin-top: 10px;" /></p>
        `
      });

      return res.status(200).json({ success: true, data });
    } catch (err) {
      console.error('Erreur serveur :', err);
      return res.status(500).json({ error: 'Erreur lors de l’envoi du mail ou de l’upload.' });
    }
  });
}
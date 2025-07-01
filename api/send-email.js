import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const SENDER = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'hello@minimoji.fr';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { email, child_name, drawing_title, story, plan } = req.body;

    if (!email || !plan) {
      return res.status(400).json({ error: 'Email ou plan manquant.' });
    }

    console.log(`✅ Envoi en cours vers ${email}`);
    const data = await resend.emails.send({
      from: `Minimoji <${SENDER}>`,
      to: email,
      bcc: 'hello@minimoji.fr',
      subject: `Confirmation – Minimoji (${plan})`,
      reply_to: SENDER,
      headers: {
        'List-Unsubscribe': `<mailto:${SENDER}?subject=unsubscribe>`
      },
      html: `<p>Bonjour ${child_name || ''},<br/>
        Merci pour votre envoi !<br/>
        Votre dessin <strong>${drawing_title || 'sans titre'}</strong> va être transformé en animation magique ✨</p>
        <p><em>${story || ''}</em></p>`
    });

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Erreur serveur :', err);
    return res.status(500).json({ error: 'Erreur interne lors de l’envoi du mail.' });
  }
}
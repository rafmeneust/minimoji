import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    console.log('✅ Envoi en cours vers hello@minimoji.fr');
    const data = await resend.emails.send({
      from: 'hello@minimoji.fr',
      to: 'delivered@resend.dev',
      subject: `Confirmation – Minimoji (${plan})`,
      reply_to: 'hello@minimoji.fr',
      headers: {
        'List-Unsubscribe': '<mailto:hello@minimoji.fr?subject=unsubscribe>'
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
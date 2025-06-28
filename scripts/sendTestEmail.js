import { Resend } from 'resend';
import 'dotenv/config';

if (!process.env.RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY est manquant. Assure-toi que le fichier .env est bien présent et chargé.");
  throw new Error("API key manquante");
}

console.log("🚀 Envoi du mail de test via Resend...");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTestEmail() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'hello@minimoji.fr',
      to: 'delivered@resend.dev',
      subject: 'Test Minimoji depuis Resend ✅',
      html: `<p><strong>Bonjour !</strong><br>Ceci est un test de délivrabilité depuis Minimoji avec Resend.</p>`,
      reply_to: 'hello@minimoji.fr',
      headers: {
        'List-Unsubscribe': '<mailto:unsubscribe@minimoji.fr>',
      },
    });

    if (error) {
      console.error('❌ Erreur lors de l’envoi :', error);
    } else {
      console.log(`✅ Email envoyé avec succès (ID : ${data?.id || 'inconnu'})`);
    }
  } catch (e) {
    console.error('💥 Erreur inattendue :', e);
  }
}

sendTestEmail();
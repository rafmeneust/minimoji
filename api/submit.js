import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  try {
    const data = await req.body;
    console.log("Formulaire reçu :", data);

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'meneust.r@gmail.com',
      subject: 'Nouveau formulaire reçu',
      html: `<p>Formulaire reçu :</p><pre>${JSON.stringify(data, null, 2)}</pre>`
    });

    // TODO : ajouter traitement, IA, email, stockage…

    res.status(200).json({ message: "Formulaire reçu avec succès" });
  } catch (error) {
    console.error("Erreur dans le traitement :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
}
import { IncomingForm } from "formidable";
import { promisify } from "util";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const form = new IncomingForm();
  const parseForm = promisify(form.parse);

  let fields;
  try {
    const [parsedFields] = await parseForm(req);
    fields = parsedFields;
  } catch (error) {
    console.error("Erreur de parsing du formulaire:", error);
    return res.status(400).json({ error: "Formulaire invalide" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: fields.email,
        subject: "Nouvelle commande Minimoji",
        html: `<p>Un nouveau formulaire a été soumis !</p>`,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(500).json({ error: data });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
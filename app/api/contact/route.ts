import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialisation de Resend avec la variable d'environnement
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validation basique des données reçues
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires." },
        { status: 400 },
      );
    }

    // Envoi de l'e-mail via Resend
    const data = await resend.emails.send({
      // ⚠️ IMPORTANT : En développement, laisse "onboarding@resend.dev".
      // Dès que le domaine de la mairie est validé, tu pourras mettre "contact@labastidedengras.fr"
      from: "Site Internet Mairie <onboarding@resend.dev>",
      // ⚠️ IMPORTANT : En mode gratuit/test, remplace par TON adresse email de compte Resend.
      // C'est ici que la mairie recevra les messages des habitants.
      to: ["site.labastide@proton.me"],
      subject: `[Formulaire Contact] ${subject}`,
      replyTo: email,
      html: `
        <h2>Nouveau message depuis le site de la Mairie</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Adresse e-mail :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <p><strong>Message :</strong></p>
        <p style="white-space: pre-wrap; background-color: #f5f5f4; padding: 15px; border-radius: 8px; color: #1c1917;">${message}</p>
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du message." },
      { status: 500 },
    );
  }
}

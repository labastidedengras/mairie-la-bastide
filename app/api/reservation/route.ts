import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nom, telephone, email, date, evenement } = await req.json();

    if (!nom || !telephone || !email || !date) {
      return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
    }

    await resend.emails.send({
      from: "Site Internet Mairie <onboarding@resend.dev>",
      to: "site.labastide@proton.me",
      subject: `Demande de réservation - Salle polyvalente - ${date}`,
      html: `
        <h2>Nouvelle demande de réservation de la salle polyvalente</h2>
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Téléphone :</strong> ${telephone}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Date souhaitée :</strong> ${date}</p>
        <p><strong>Nature de l'événement :</strong> ${evenement || "Non précisé"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur Resend reservation:", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

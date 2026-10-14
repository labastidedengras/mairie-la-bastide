import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      nom,
      telephone,
      email,
      dateDebut,
      dateFin,
      evenement,
      reglementAccepte,
    } = await req.json();
    const isValidDate = (value: unknown): value is string => {
      if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
      }
      const parsed = new Date(`${value}T00:00:00.000Z`);
      return (
        !Number.isNaN(parsed.getTime()) &&
        parsed.toISOString().slice(0, 10) === value
      );
    };

    if (
      !nom ||
      !telephone ||
      !email ||
      !isValidDate(dateDebut) ||
      !isValidDate(dateFin) ||
      dateFin < dateDebut
    ) {
      return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
    }
    if (reglementAccepte !== true) {
      return NextResponse.json(
        { error: "Le règlement doit être accepté." },
        { status: 400 },
      );
    }

    const formatDate = (date: string) =>
      new Date(`${date}T00:00:00`).toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    const periode =
      dateDebut === dateFin
        ? formatDate(dateDebut)
        : `Du ${formatDate(dateDebut)} au ${formatDate(dateFin)}`;

    await resend.emails.send({
      from: "Site Internet Mairie <onboarding@resend.dev>",
      to: "site.labastide@proton.me",
      subject: `Pré-demande - Foyer Communal - ${periode}`,
      html: `
        <h2>Nouvelle pré-demande de réservation du Foyer Communal</h2>
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Téléphone :</strong> ${telephone}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Période souhaitée :</strong> ${periode}</p>
        <p><strong>Nature de l'événement :</strong> ${evenement || "Non précisé"}</p>
        <p><strong>Règlement du Foyer Communal :</strong> accepté</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur Resend reservation:", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

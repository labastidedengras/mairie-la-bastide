import {
  EMAIL_RE,
  MAIL_FROM,
  MAIL_TO,
  badRequest,
  cleanMultiLine,
  cleanSingleLine,
  escapeHtml,
  isHoneypotFilled,
  isRateLimited,
  isValidPhone,
  readJsonBody,
  tooManyRequests,
} from "@/lib/security";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX = { nom: 100, telephone: 30, email: 254, evenement: 1000 };
const MAX_DUREE_JOURS = 7; // durée maximale d'une pré-demande
const MAX_ANTICIPATION_JOURS = 730; // pas de demande à plus de 2 ans

const TIME_ZONE = "Europe/Paris";
const DAY_MS = 24 * 60 * 60 * 1000;

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

// Date du jour à Paris au format AAAA-MM-JJ (le format suédois est ISO)
const todayInParis = () =>
  new Intl.DateTimeFormat("sv-SE", { timeZone: TIME_ZONE }).format(new Date());

// Nombre de jours entre deux dates AAAA-MM-JJ
const daysBetween = (from: string, to: string) =>
  Math.round(
    (new Date(`${to}T00:00:00Z`).getTime() -
      new Date(`${from}T00:00:00Z`).getTime()) /
      DAY_MS,
  );

// Midi UTC + fuseau explicite : évite tout décalage d'un jour
const formatDate = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: TIME_ZONE,
  });

export async function POST(req: Request) {
  try {
    // 1. Rate limiting
    if (isRateLimited(req, "reservation")) return tooManyRequests();

    // 2. Lecture du corps (taille limitée, JSON invalide => 400)
    const parsed = await readJsonBody(req);
    if (!parsed.ok) return parsed.response;
    const body = parsed.body;

    // 3. Honeypot : on répond "succès" sans rien envoyer
    if (isHoneypotFilled(body)) {
      return NextResponse.json({ success: true });
    }

    // 4. Types
    const { nom, telephone, email, evenement, dateDebut, dateFin } = body;
    if (
      typeof nom !== "string" ||
      typeof telephone !== "string" ||
      typeof email !== "string" ||
      (evenement !== undefined &&
        evenement !== null &&
        typeof evenement !== "string")
    ) {
      return badRequest("Données invalides.");
    }

    const cleanNom = cleanSingleLine(nom);
    const cleanTelephone = cleanSingleLine(telephone);
    const cleanEmail = cleanSingleLine(email);
    const cleanEvenement = cleanMultiLine(
      typeof evenement === "string" ? evenement : "",
    );

    // 5. Obligatoires, longueurs, formats
    if (!cleanNom || !cleanTelephone || !cleanEmail) {
      return badRequest("Champs manquants.");
    }
    if (
      cleanNom.length > MAX.nom ||
      cleanTelephone.length > MAX.telephone ||
      cleanEmail.length > MAX.email ||
      cleanEvenement.length > MAX.evenement
    ) {
      return badRequest("Un des champs est trop long.");
    }
    if (!EMAIL_RE.test(cleanEmail)) {
      return badRequest("Adresse e-mail invalide.");
    }
    if (!isValidPhone(cleanTelephone)) {
      return badRequest("Numéro de téléphone invalide.");
    }

    // 6. Règlement
    if (body.reglementAccepte !== true) {
      return badRequest("Le règlement doit être accepté.");
    }

    // 7. Dates : format, ordre, pas dans le passé, durée et anticipation limitées
    if (!isValidDate(dateDebut) || !isValidDate(dateFin)) {
      return badRequest("Dates invalides.");
    }
    if (dateFin < dateDebut) {
      return badRequest("La date de fin précède la date de début.");
    }
    const today = todayInParis();
    if (dateDebut < today) {
      return badRequest("La date de début est déjà passée.");
    }
    if (daysBetween(today, dateDebut) > MAX_ANTICIPATION_JOURS) {
      return badRequest("La date de début est trop éloignée.");
    }
    if (daysBetween(dateDebut, dateFin) + 1 > MAX_DUREE_JOURS) {
      return badRequest(
        `La période ne peut pas dépasser ${MAX_DUREE_JOURS} jours.`,
      );
    }

    const periode =
      dateDebut === dateFin
        ? formatDate(dateDebut)
        : `Du ${formatDate(dateDebut)} au ${formatDate(dateFin)}`;

    // 8. Envoi (valeurs échappées dans le HTML)
    const { error } = await resend.emails.send({
      from: MAIL_FROM,
      to: [MAIL_TO],
      replyTo: cleanEmail,
      subject: `Pré-demande - Foyer Communal - ${periode}`,
      html: `
        <h2>Nouvelle pré-demande de réservation du Foyer Communal</h2>
        <p><strong>Nom :</strong> ${escapeHtml(cleanNom)}</p>
        <p><strong>Téléphone :</strong> ${escapeHtml(cleanTelephone)}</p>
        <p><strong>Email :</strong> ${escapeHtml(cleanEmail)}</p>
        <p><strong>Période souhaitée :</strong> ${escapeHtml(periode)}</p>
        <p><strong>Nature de l'événement :</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(cleanEvenement || "Non précisé")}</p>
        <p><strong>Règlement du Foyer Communal :</strong> accepté</p>
      `,
      text: [
        "Nouvelle pré-demande de réservation du Foyer Communal",
        "",
        `Nom : ${cleanNom}`,
        `Téléphone : ${cleanTelephone}`,
        `Email : ${cleanEmail}`,
        `Période souhaitée : ${periode}`,
        `Nature de l'événement : ${cleanEvenement || "Non précisé"}`,
        "Règlement du Foyer Communal : accepté",
      ].join("\n"),
    });

    // Le SDK Resend ne lève pas d'exception : il renvoie { data, error }
    if (error) {
      console.error("Erreur Resend (réservation) :", error);
      return NextResponse.json(
        { error: "Impossible d'envoyer la demande pour le moment." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur réservation :", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

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
  readJsonBody,
  tooManyRequests,
} from "@/lib/security";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX = { name: 100, email: 254, subject: 200, message: 5000 };

export async function POST(request: Request) {
  try {
    // 1. Rate limiting
    if (isRateLimited(request, "contact")) return tooManyRequests();

    // 2. Lecture du corps (taille limitée, JSON invalide => 400)
    const parsed = await readJsonBody(request);
    if (!parsed.ok) return parsed.response;
    const body = parsed.body;

    // 3. Honeypot : on répond "succès" sans rien envoyer
    if (isHoneypotFilled(body)) {
      return NextResponse.json({ success: true });
    }

    // 4. Types
    const { name, email, subject, message } = body;
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string"
    ) {
      return badRequest("Données invalides.");
    }

    const cleanName = cleanSingleLine(name);
    const cleanEmail = cleanSingleLine(email);
    const cleanSubject = cleanSingleLine(subject);
    const cleanMessage = cleanMultiLine(message);

    // 5. Obligatoires, longueurs, format
    if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
      return badRequest("Tous les champs sont obligatoires.");
    }
    if (
      cleanName.length > MAX.name ||
      cleanEmail.length > MAX.email ||
      cleanSubject.length > MAX.subject ||
      cleanMessage.length > MAX.message
    ) {
      return badRequest("Un des champs est trop long.");
    }
    if (!EMAIL_RE.test(cleanEmail)) {
      return badRequest("Adresse e-mail invalide.");
    }

    // 6. Envoi (valeurs échappées dans le HTML)
    const { error } = await resend.emails.send({
      from: MAIL_FROM,
      to: [MAIL_TO],
      subject: `[Formulaire Contact] ${cleanSubject}`,
      replyTo: cleanEmail,
      html: `
        <h2>Nouveau message depuis le site de la Mairie</h2>
        <p><strong>Nom :</strong> ${escapeHtml(cleanName)}</p>
        <p><strong>Adresse e-mail :</strong> ${escapeHtml(cleanEmail)}</p>
        <p><strong>Sujet :</strong> ${escapeHtml(cleanSubject)}</p>
        <p><strong>Message :</strong></p>
        <p style="white-space: pre-wrap; background-color: #f5f5f4; padding: 15px; border-radius: 8px; color: #1c1917;">${escapeHtml(cleanMessage)}</p>
      `,
      text: [
        "Nouveau message depuis le site de la Mairie",
        "",
        `Nom : ${cleanName}`,
        `Adresse e-mail : ${cleanEmail}`,
        `Sujet : ${cleanSubject}`,
        "",
        "Message :",
        cleanMessage,
      ].join("\n"),
    });

    // Le SDK Resend ne lève pas d'exception : il renvoie { data, error }
    if (error) {
      console.error("Erreur Resend (contact) :", error);
      return NextResponse.json(
        { error: "Impossible d'envoyer le message pour le moment." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du message." },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";

// --- Configuration e-mail ----------------------------------------------------
// À définir dans Netlify (Site configuration > Environment variables) :
//   MAIL_FROM = Site Internet Mairie <contact@votre-domaine-verifie.fr>
//   MAIL_TO   = adresse qui reçoit les messages
// Les valeurs par défaut ci-dessous sont celles de l'ancien code.
export const MAIL_FROM = "Site Internet Mairie <contact@labastide-dengras.fr>";
export const MAIL_TO = "commune-de-la-bastide-dengras7@orange.fr";

// --- Formats -----------------------------------------------------------------
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Chiffres, espaces, + . - ( ) uniquement
export const PHONE_RE = /^[+()\d][\d\s().+-]{5,29}$/;

export const isValidPhone = (value: string) =>
  PHONE_RE.test(value) && value.replace(/\D/g, "").length >= 6;

// --- Nettoyage / échappement -------------------------------------------------
export const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Champ sur une seule ligne : supprime retours à la ligne et caractères de contrôle
export const cleanSingleLine = (s: string) =>
  s.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();

// Texte multi-lignes : garde les retours à la ligne, supprime les autres caractères de contrôle
export const cleanMultiLine = (s: string) =>
  s.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();

// --- Réponses d'erreur -------------------------------------------------------
export const badRequest = (error: string) =>
  NextResponse.json({ error }, { status: 400 });

export const tooManyRequests = () =>
  NextResponse.json(
    { error: "Trop de messages envoyés. Veuillez réessayer plus tard." },
    { status: 429, headers: { "Retry-After": "600" } },
  );

// --- IP du visiteur ----------------------------------------------------------
export function getClientIp(request: Request): string {
  // Netlify : en-tête posé par la plateforme avec l'IP réelle du visiteur
  const netlifyIp = request.headers.get("x-nf-client-connection-ip");
  if (netlifyIp) return netlifyIp.trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

// --- Rate limiting minimal, en mémoire ---------------------------------------
// ATTENTION : en serverless (Netlify), chaque instance a sa propre mémoire, donc
// ceci est un simple garde-fou. Pour une vraie protection, utilisez Upstash
// Ratelimit (voir la conversation) : seule cette fonction aurait à changer.
const hits = new Map<string, number[]>();

export function isRateLimited(
  request: Request,
  bucket: string,
  max = 5,
  windowMs = 10 * 60 * 1000,
): boolean {
  const now = Date.now();
  const key = `${bucket}:${getClientIp(request)}`;

  // Évite que la Map grossisse indéfiniment
  if (hits.size > 1000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t > windowMs)) hits.delete(k);
    }
  }

  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

// --- Lecture sécurisée du corps JSON -----------------------------------------
type BodyResult =
  | { ok: true; body: Record<string, unknown> }
  | { ok: false; response: NextResponse };

export async function readJsonBody(
  request: Request,
  maxChars = 20_000,
): Promise<BodyResult> {
  const raw = await request.text();
  if (raw.length > maxChars) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Message trop volumineux." },
        { status: 413 },
      ),
    };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, response: badRequest("Requête invalide.") };
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return { ok: false, response: badRequest("Requête invalide.") };
  }

  return { ok: true, body: parsed as Record<string, unknown> };
}

// --- Honeypot ----------------------------------------------------------------
// Champ invisible "website" : seuls les robots le remplissent.
export const isHoneypotFilled = (body: Record<string, unknown>) =>
  typeof body.website === "string" && body.website.trim() !== "";

import { NextResponse } from "next/server";
import { Resend } from "resend";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const resendFrom =
  process.env.RESEND_FROM_EMAIL ||
  "Site Nicolas Faraci <contact@mail.nicolasfaraci.fr>";
const turnstileSecret =
  process.env.TURNSTILE_SECRET_KEY ||
  (process.env.NODE_ENV === "development"
    ? "1x0000000000000000000000000000000AA"
    : "");

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  projectType?: unknown;
  message?: unknown;
  spamTrap?: unknown;
  turnstileToken?: unknown;
};

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = cleanText(body.name, 80);
    const email = cleanText(body.email, 160).toLowerCase();
    const projectType = cleanText(body.projectType, 80);
    const message = cleanText(body.message, 3000);
    const spamTrap = cleanText(body.spamTrap, 200);
    const turnstileToken = cleanText(body.turnstileToken, 2048);

    // Ce champ est invisible pour un utilisateur, mais souvent rempli par les robots.
    // Une réponse neutre évite de leur confirmer que le piège a fonctionné.
    if (spamTrap) {
      return NextResponse.json({ message: "Message envoyé." });
    }

    if (name.length < 2 || message.length < 20 || !projectType || !emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Veuillez vérifier les informations saisies." },
        { status: 400 },
      );
    }

    if (!turnstileToken || !turnstileSecret) {
      return NextResponse.json(
        { error: "La validation anti-spam est requise." },
        { status: 400 },
      );
    }

    const verification = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
        cache: "no-store",
      },
    );
    const result = (await verification.json()) as { success?: boolean };

    if (!result.success) {
      return NextResponse.json(
        { error: "La validation anti-spam a expiré. Merci de réessayer." },
        { status: 400 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? "L’envoi d’e-mail n’est pas configuré sur cet environnement. Ajoutez RESEND_API_KEY pour l’activer."
              : "Votre demande n’a pas pu être envoyée. Merci de réessayer plus tard.",
        },
        { status: 503 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeProjectType = escapeHtml(projectType);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const { error } = await resend.emails.send({
      from: resendFrom,
      to: ["nicolas.faraci.pro@gmail.com"],
      replyTo: email,
      subject: `[Projet] ${projectType} — ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#181914">
          <div style="background:#c7ff3d;padding:28px;border-radius:12px 12px 0 0">
            <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:.08em">Nouvelle demande</p>
            <h1 style="margin:0;font-size:26px">${safeProjectType}</h1>
          </div>
          <div style="border:1px solid #deded5;border-top:0;padding:28px;border-radius:0 0 12px 12px">
            <p><strong>Nom :</strong> ${safeName}</p>
            <p><strong>Email :</strong> ${safeEmail}</p>
            <hr style="border:0;border-top:1px solid #deded5;margin:24px 0" />
            <p style="line-height:1.7">${safeMessage}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Le message n’a pas pu être envoyé. Merci de réessayer." },
        { status: 502 },
      );
    }

    return NextResponse.json({ message: "Message envoyé." });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Merci de réessayer plus tard." },
      { status: 500 },
    );
  }
}

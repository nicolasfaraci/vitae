"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { FormEvent, useRef, useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

const turnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
  (process.env.NODE_ENV === "development" ? "1x00000000000000000000AA" : "");

export default function ContactForm() {
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!token) {
      setStatus("error");
      setMessage("Veuillez valider la protection anti-spam.");
      return;
    }

    setStatus("loading");
    setMessage("");

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      projectType: formData.get("projectType"),
      message: formData.get("message"),
      spamTrap: formData.get("spamTrap"),
      turnstileToken: token,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "L’envoi a échoué.");
      }

      form.reset();
      setToken("");
      turnstileRef.current?.reset();
      setStatus("success");
      setMessage(data.message || "Merci ! Votre message est parti. Je reviens vers vous sous 48 h.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Une erreur est survenue.");
      setToken("");
      turnstileRef.current?.reset();
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="contact-name">Nom</label>
        <input id="contact-name" name="name" type="text" autoComplete="name" minLength={2} maxLength={80} required />
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" maxLength={160} required />
      </div>
      <div className="form-field">
        <label htmlFor="contact-project-type">Type de projet</label>
        <select id="contact-project-type" name="projectType" defaultValue="" required>
          <option value="" disabled>Choisir une option</option>
          <option value="Produit / MVP">Produit / MVP</option>
          <option value="Fonctionnalité IA">Fonctionnalité IA</option>
          <option value="Outil métier">Outil métier</option>
          <option value="Renfort / audit technique">Renfort / audit technique</option>
          <option value="Site vitrine / landing page">Site vitrine / landing page</option>
          <option value="Autre">Autre</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">Votre besoin</label>
        <textarea id="contact-message" name="message" rows={4} minLength={20} maxLength={3000} required />
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="contact-spam-trap">Ne pas remplir ce champ</label>
        <input id="contact-spam-trap" name="spamTrap" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Turnstile
        ref={turnstileRef}
        siteKey={turnstileSiteKey}
        onSuccess={setToken}
        onExpire={() => setToken("")}
        onError={() => {
          setToken("");
          setStatus("error");
          setMessage("La protection anti-spam n’a pas pu être chargée.");
        }}
        options={{ theme: "light", size: "flexible", language: "fr" }}
      />
      <button className="btn btn-dark submit-button" type="submit" disabled={status === "loading" || !token}>
        {status === "loading" ? "Envoi en cours…" : "Envoyer ↗"}
      </button>

      {message && (
        <p className={`form-message ${status}`} role="status">
          {message}
        </p>
      )}
      <p className="privacy-note">Ces informations servent uniquement à vous répondre.</p>
    </form>
  );
}

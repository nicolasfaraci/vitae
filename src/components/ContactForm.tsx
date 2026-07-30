"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { FormEvent, useRef, useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

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
      setMessage("Merci ! Votre message est parti. Je reviens vers vous sous 48 h.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Une erreur est survenue.");
      setToken("");
      turnstileRef.current?.reset();
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <span>01</span>
        <p>Parlez-moi du projet</p>
      </div>
      <div className="form-grid">
        <label>
          Votre nom
          <input name="name" type="text" autoComplete="name" placeholder="Jean Dupont" minLength={2} maxLength={80} required />
        </label>
        <label>
          Votre email
          <input name="email" type="email" autoComplete="email" placeholder="jean@entreprise.fr" maxLength={160} required />
        </label>
      </div>
      <label>
        Type de projet
        <select name="projectType" defaultValue="" required>
          <option value="" disabled>Choisir une option</option>
          <option value="Produit / MVP">Produit / MVP</option>
          <option value="Site vitrine / landing page">Site vitrine / landing page</option>
          <option value="Outil métier">Outil métier</option>
          <option value="Renfort / audit technique">Renfort / audit technique</option>
          <option value="Autre">Autre</option>
        </select>
      </label>
      <label>
        Quelques mots sur votre besoin
        <textarea
          name="message"
          rows={5}
          placeholder="Le contexte, votre objectif, vos contraintes ou votre échéance…"
          minLength={20}
          maxLength={3000}
          required
        />
      </label>

      <label className="honeypot" aria-hidden="true">
        Ne pas remplir ce champ
        <input name="spamTrap" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="form-bottom">
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
          onSuccess={setToken}
          onExpire={() => setToken("")}
          onError={() => {
            setToken("");
            setStatus("error");
            setMessage("La protection anti-spam n’a pas pu être chargée.");
          }}
          options={{ theme: "light", size: "flexible", language: "fr" }}
        />
        <button className="button button-primary submit-button" type="submit" disabled={status === "loading" || !token}>
          {status === "loading" ? "Envoi en cours…" : "Envoyer ma demande"}
          <span aria-hidden="true">↗</span>
        </button>
      </div>

      {message && (
        <p className={`form-message ${status}`} role="status">
          {message}
        </p>
      )}
      <p className="privacy-note">Vos informations servent uniquement à vous répondre.</p>
    </form>
  );
}

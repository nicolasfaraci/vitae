import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner section-shell">
        <div className="contact-copy">
          <h2 className="contact-title">
            Un projet ?
            <br />
            Racontez-moi.
          </h2>
          <p className="contact-lead">
            Même vague, même à moitié écrit. Je reviens vers vous avec une première analyse et la
            suite que je vous propose.
          </p>
          <div className="contact-info">
            Réponse sous 48 h ouvrées
            <br />
            Démarrage sous 2 à 3 semaines
            <br />
            <a
              className="contact-link"
              href="https://www.linkedin.com/in/nicolas-faraci-495675147"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

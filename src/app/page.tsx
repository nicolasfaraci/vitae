import ContactForm from "@/components/ContactForm";
import SiteHeader from "@/components/SiteHeader";

const services = [
  {
    number: "01",
    title: "Product builder",
    description:
      "Je transforme une idée, un besoin métier ou un prototype en produit web utile, testable et prêt à évoluer.",
    deliverables: ["Cadrage rapide", "MVP & outils métier", "Mise en production"],
  },
  {
    number: "02",
    title: "Site builder",
    description:
      "Je conçois et développe des sites rapides qui racontent clairement votre valeur et transforment l’attention en demandes.",
    deliverables: ["Landing pages", "Sites vitrines", "Performance & SEO"],
  },
  {
    number: "03",
    title: "Renfort technique",
    description:
      "J’interviens ponctuellement pour débloquer un sujet complexe, fiabiliser une base existante ou accélérer une livraison.",
    deliverables: ["Audit & architecture", "Full-stack", "Cloud & DevOps"],
  },
];

const skillGroups = [
  {
    label: "Concevoir",
    skills: ["Product thinking", "UX pragmatique", "Architecture", "SEO"],
  },
  {
    label: "Construire",
    skills: ["TypeScript", "React", "Next.js", "Node.js", "Spring Boot", "Symfony"],
  },
  {
    label: "Livrer",
    skills: ["PostgreSQL", "MongoDB", "Docker", "Kubernetes", "GCP", "CI/CD"],
  },
];

const process = [
  {
    step: "Comprendre",
    text: "Un échange court pour clarifier le problème, la cible et le résultat attendu.",
  },
  {
    step: "Construire",
    text: "Des cycles courts, des choix expliqués et un produit visible très tôt.",
  },
  {
    step: "Livrer",
    text: "Une mise en ligne soignée, une base maintenable et une passation claire.",
  },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero section-shell" id="accueil">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" />
            Disponible pour des projets ponctuels
          </div>
          <h1>
            Vos idées méritent
            <span> de devenir réelles.</span>
          </h1>
          <p className="hero-lead">
            Product builder & développeur full-stack. Je conçois et livre des
            produits web et des sites qui vont droit au but.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">
              Parler de votre projet
              <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-secondary" href="#expertise">
              Découvrir mon expertise
            </a>
          </div>
          <div className="trust-line" aria-label="Principes de collaboration">
            <span>Du cadrage à la production</span>
            <span>Interlocuteur unique</span>
            <span>Code maintenable</span>
          </div>
        </div>

        <div className="hero-workbench" aria-label="Aperçu du processus de création">
          <div className="workbench-topbar">
            <div className="window-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <span>product-builder.ts</span>
            <span className="live-badge">LIVE</span>
          </div>
          <div className="workbench-body">
            <div className="code-line">
              <span className="line-number">01</span>
              <span>
                <b>const</b> project = <em>&quot;votre idée&quot;</em>;
              </span>
            </div>
            <div className="code-line">
              <span className="line-number">02</span>
              <span>
                <b>const</b> outcome = <em>&quot;un produit utile&quot;</em>;
              </span>
            </div>
            <div className="code-line muted">
              <span className="line-number">03</span>
              <span>{"// cadrer · designer · développer"}</span>
            </div>
            <div className="build-card">
              <div className="build-icon" aria-hidden="true">NF</div>
              <div>
                <small>BUILD STATUS</small>
                <strong>Prêt à livrer</strong>
              </div>
              <span className="build-check" aria-hidden="true">✓</span>
            </div>
          </div>
          <div className="workbench-footer">
            <span>Strategy</span>
            <i />
            <span>Design</span>
            <i />
            <span>Code</span>
            <i />
            <span>Ship</span>
          </div>
        </div>
      </section>

      <section className="section-shell section-block" id="services">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Ce que je construis</p>
            <h2>Une expertise orientée résultat.</h2>
          </div>
          <p>
            Pas de couche d’intermédiaires. Vous échangez directement avec la
            personne qui pense, construit et livre votre projet.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <span className="card-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.deliverables.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true">↳</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="dark-section" id="expertise">
        <div className="section-shell expertise-layout">
          <div className="expertise-intro">
            <p className="section-kicker light">La boîte à outils</p>
            <h2>Solide sur toute la chaîne.</h2>
            <p>
              10 années d’expérience à construire des produits pour de petites
              et grandes entreprises.
            </p>
            <div className="experience-note">
              <strong>10+</strong>
              <span>années d’expérience</span>
            </div>
          </div>
          <div className="skills-panel">
            {skillGroups.map((group) => (
              <div className="skill-row" key={group.label}>
                <h3>{group.label}</h3>
                <div className="skill-list">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-block process-section">
        <div className="section-heading compact">
          <div>
            <p className="section-kicker">Comment ça se passe</p>
            <h2>Simple, visible, efficace.</h2>
          </div>
        </div>
        <div className="process-grid">
          {process.map((item, index) => (
            <article key={item.step}>
              <span>0{index + 1}</span>
              <h3>{item.step}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-shell contact-layout">
          <div className="contact-copy">
            <p className="section-kicker">Votre projet</p>
            <h2>On construit quelque chose d’utile&nbsp;?</h2>
            <p>
              Décrivez-moi votre idée, même si elle est encore floue. Je vous
              réponds avec un premier regard et la meilleure prochaine étape.
            </p>
            <div className="availability">
              <span className="status-dot" />
              <div>
                <strong>Créneaux disponibles</strong>
                <small>Réponse sous 48 h ouvrées</small>
              </div>
            </div>
            <a
              className="linkedin-link"
              href="https://www.linkedin.com/in/nicolas-faraci-495675147"
              target="_blank"
              rel="noreferrer"
            >
              Me retrouver sur LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <a className="brand" href="#accueil" aria-label="Retour en haut">
            <strong className="brand-name">
              <span>Nicolas</span>
              <span>Faraci</span>
            </strong>
          </a>
          <p>Product builder · Développeur full-stack</p>
          <p>© {new Date().getFullYear()} — Tous droits réservés</p>
        </div>
      </footer>
    </main>
  );
}

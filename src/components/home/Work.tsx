const projects = [
  {
    meta: ["Grand groupe de distribution", "Développeur fullstack", "IA, 2025 à 2026"],
    title: "Un outil de traduction assisté par IA",
    description:
      "Publier des contenus en de nombreuses langues demandait un processus long et très manuel. J’ai conçu et développé, avec les équipes produit et IA, l’outil interne qui fluidifie traduction, validation et publication.",
    outcome: "Objectif : réduire un délai de localisation d’environ 45 jours.",
    stack: "Java, Spring Boot, Next.js, Kafka, MongoDB, Kubernetes, Datadog",
  },
  {
    meta: ["HelloGoodBail", "Cofondateur et CTO", "2018 à 2020"],
    title: "Une application mobile immobilière, construite de zéro",
    description:
      "Une app qui prévient les chercheurs de logement quand un bien correspondant à leurs critères est à proximité. Architecture, application Android, backend et déploiement cloud, en autonomie complète.",
    outcome: "De l’idée à une application exploitable.",
    stack: "Android Java, Symfony, géolocalisation, notifications, GCP",
  },
];

export default function Work() {
  return (
    <section className="work" id="work">
      <div className="work-inner section-shell">
        <div className="section-head">
          <h2 className="section-title">
            Déjà livré, <span className="accent-text">pour de vrai.</span>
          </h2>
          <div className="section-label">
            (réalisations, clients<span className="wide-only"> grands comptes</span> anonymisés)
          </div>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-row" key={project.title}>
              <div className="project-meta">
                {project.meta.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-outcome">{project.outcome}</div>
                <div className="project-stack">{project.stack}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

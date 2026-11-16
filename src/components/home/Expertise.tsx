const expertiseGroups = [
  {
    title: "Concevoir",
    description: "Cadrage produit, modèle de données, architecture, découpage du MVP.",
    tools: "PostgreSQL, MongoDB, REST, Kafka",
  },
  {
    title: "Construire",
    description:
      "Interfaces web, API solides, applications mobiles, intégration d’IA et d’APIs tierces.",
    tools: "TypeScript, React, Next.js, Node.js, Java, Spring Boot, Symfony",
  },
  {
    title: "Livrer",
    description:
      "Conteneurs, pipelines de déploiement, mise en prod, monitoring et suivi des incidents.",
    tools: "Docker, Kubernetes, GCP, CI/CD, Datadog",
  },
];

export default function Expertise() {
  return (
    <section className="expertise section-shell" id="expertise">
      <div className="section-head">
        <h2 className="section-title">10 ans à tout faire, du MVP au grand compte.</h2>
        <div className="section-label">(expertise)</div>
      </div>
      <div className="expertise-grid">
        {expertiseGroups.map((group) => (
          <article className="expertise-card" key={group.title}>
            <h3 className="expertise-title">{group.title}</h3>
            <p className="expertise-description">{group.description}</p>
            <div className="expertise-tools">{group.tools}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

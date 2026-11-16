const services = [
  {
    title: "Produit et MVP",
    description:
      "Je cadre votre idée, je choisis la stack la plus simple et je livre un premier produit en ligne que de vrais utilisateurs peuvent tester. Web, mobile ou outil métier.",
    timing: ["Cadrage : 2 à 3 jours", "MVP : 4 à 6 semaines"],
  },
  {
    title: "Fonctionnalité IA",
    description:
      "Traduction, classification, extraction, assistant : j’intègre l’IA dans votre produit, avec tests et monitoring, pour que ça tienne en production et pas seulement en démo.",
    timing: ["1 à 3 semaines"],
  },
  {
    title: "Renfort et audit",
    description:
      "Audit d’architecture, reprise d’une application existante, renfort fullstack ou DevOps (CI/CD, Kubernetes, monitoring) sur un périmètre clair.",
    timing: ["Selon périmètre"],
  },
];

export default function Services() {
  return (
    <section className="services section-shell" id="services">
      <div className="section-head">
        <h2 className="section-title">Ce que je construis avec vous.</h2>
        <div className="section-label">(offres)</div>
      </div>
      <div className="service-list">
        {services.map((service) => (
          <article className="service-row" key={service.title}>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
            <div className="service-timing">
              {service.timing.map((line, index) => (
                <div key={line}>
                  {line}
                  {index === service.timing.length - 1 && (
                    <span className="service-arrow" aria-hidden="true">
                      {" "}
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
      <p className="services-note">
        Une landing page ou un site vitrine ? Oui, en complément d’un projet produit.
      </p>
    </section>
  );
}

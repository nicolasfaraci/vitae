// Contenu des projets du portfolio, sans aucune information visuelle.
// Pour ajouter un projet : ajouter une entrée ici, puis (optionnel) son visuel
// dans src/content/projectVisuals.ts. Sans visuel, une couverture typographique est générée.

export type Project = {
  slug: string;
  title: string;
  titleAccent?: string;
  client: string;
  role: string;
  period: string;
  category: string;
  summary: string;
  description: string[];
  outcome: string;
  stack: string[];
  isExample?: boolean;
};

export const projects: Project[] = [
  {
    slug: "traduction-ia",
    title: "Un outil de traduction",
    titleAccent: "assisté par IA.",
    client: "Grand groupe de distribution",
    role: "Développeur fullstack",
    period: "2025 à 2026",
    category: "IA",
    summary:
      "L’outil interne qui fluidifie traduction, validation et publication de contenus en de nombreuses langues.",
    description: [
      "Publier des contenus en de nombreuses langues demandait un processus long et très manuel.",
      "J’ai conçu et développé, avec les équipes produit et IA, l’outil interne qui fluidifie traduction, validation et publication.",
    ],
    outcome: "Objectif : réduire un délai de localisation d’environ 45 jours.",
    stack: ["Java", "Spring Boot", "Next.js", "Kafka", "MongoDB", "Kubernetes", "Datadog"],
  },
  {
    slug: "hellogoodbail",
    title: "Une app immobilière,",
    titleAccent: "construite de zéro.",
    client: "HelloGoodBail",
    role: "Cofondateur et CTO",
    period: "2018 à 2020",
    category: "Mobile",
    summary:
      "Une app qui prévient les chercheurs de logement quand un bien correspondant à leurs critères est à proximité.",
    description: [
      "Une app qui prévient les chercheurs de logement quand un bien correspondant à leurs critères est à proximité.",
      "Architecture, application Android, backend et déploiement cloud, en autonomie complète.",
    ],
    outcome: "De l’idée à une application exploitable.",
    stack: ["Android Java", "Symfony", "Géolocalisation", "Notifications", "GCP"],
  },
];

export function findProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function findNextProject(slug: string) {
  const currentIndex = projects.findIndex((project) => project.slug === slug);
  return projects[(currentIndex + 1) % projects.length];
}

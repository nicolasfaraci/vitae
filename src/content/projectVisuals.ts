// Visuels des projets, indexés par slug et indépendants du contenu.
// Déposer les fichiers dans public/projects/<slug>/ puis déclarer la couverture ici.

export type ProjectTone = "ink" | "accent" | "paper";

export type ProjectVisual = {
  cover?: { src: string; alt: string; width: number; height: number };
  tone: ProjectTone;
  monogram?: string;
};

const defaultVisual: ProjectVisual = { tone: "ink" };

const projectVisuals: Record<string, ProjectVisual> = {
  "traduction-ia": { tone: "ink", monogram: "IA" },
  hellogoodbail: { tone: "accent", monogram: "HGB" },
  "projet-exemple": { tone: "paper", monogram: "EX" },
};

export function getProjectVisual(slug: string): ProjectVisual {
  return projectVisuals[slug] ?? defaultVisual;
}

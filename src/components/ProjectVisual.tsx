import Image from "next/image";
import type { Project } from "@/content/projects";
import { getProjectVisual } from "@/content/projectVisuals";

type ProjectVisualProps = {
  project: Project;
  sizes: string;
  priority?: boolean;
};

export default function ProjectVisual({ project, sizes, priority }: ProjectVisualProps) {
  const visual = getProjectVisual(project.slug);

  return (
    <div className={`project-visual tone-${visual.tone}`}>
      {visual.cover ? (
        <Image
          src={visual.cover.src}
          alt={visual.cover.alt}
          width={visual.cover.width}
          height={visual.cover.height}
          sizes={sizes}
          priority={priority}
        />
      ) : (
        <div className="project-visual-fallback" aria-hidden="true">
          <span className="project-visual-monogram">{visual.monogram ?? project.title.slice(0, 2)}</span>
          <span className="project-visual-category">{project.category}</span>
        </div>
      )}
    </div>
  );
}

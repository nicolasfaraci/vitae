import Image from "next/image";
import { projects, type Project } from "@/content/projects";
import { getProjectVisual } from "@/content/projectVisuals";

type ProjectVisualProps = {
  project: Project;
  sizes: string;
  priority?: boolean;
};

const formatProjectNumber = (value: number) => String(value).padStart(2, "0");

export default function ProjectVisual({ project, sizes, priority }: ProjectVisualProps) {
  const visual = getProjectVisual(project.slug);
  const projectNumber = projects.findIndex((candidate) => candidate.slug === project.slug) + 1;

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
          <div className="project-visual-top">
            <span>
              {formatProjectNumber(projectNumber)} / {formatProjectNumber(projects.length)}
            </span>
            <span className="project-visual-category">{project.category}</span>
          </div>
          <span className="project-visual-client">{project.client}</span>
          <span className="project-visual-monogram">{visual.monogram ?? project.title.slice(0, 2)}</span>
        </div>
      )}
    </div>
  );
}

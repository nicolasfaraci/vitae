"use client";

import Link from "next/link";
import { useRef } from "react";
import ProjectVisual from "@/components/ProjectVisual";
import type { Project } from "@/content/projects";
import { gsap, motionQuery, SplitText, useScrollMotion } from "@/lib/gsap";

type ProjectCaseStudyProps = {
  project: Project;
  projectNumber: number;
  projectCount: number;
  nextProject: Project;
};

export default function ProjectCaseStudy({ project, projectNumber, projectCount, nextProject }: ProjectCaseStudyProps) {
  const caseStudyRef = useRef<HTMLElement>(null);

  useScrollMotion(caseStudyRef, (matchMedia) => {
    matchMedia.add(motionQuery, () => {
      const titleSplit = SplitText.create(".case-title", { type: "chars,words", mask: "words" });
      const introTimeline = gsap.timeline({ defaults: { ease: "expo.out" } });
      introTimeline
        .from(titleSplit.chars, { yPercent: 110, duration: 1.1, stagger: 0.02 })
        .from(".case-hero .project-visual", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.2 }, 0.2)
        .from(".case-facts > *", { y: 30, autoAlpha: 0, duration: 0.8, stagger: 0.06 }, 0.4);

      gsap.from(".case-next-title", {
        yPercent: 60,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: ".case-next", start: "top bottom", end: "center center", scrub: 1 },
      });
    });
  });

  const formatIndex = (value: number) => String(value).padStart(2, "0");

  return (
    <article className="case" ref={caseStudyRef}>
      <nav className="case-nav section-shell" aria-label="Navigation du portfolio">
        <Link href="/#work">← Portfolio</Link>
        <span>
          Étude de cas {formatIndex(projectNumber)} / {formatIndex(projectCount)}
        </span>
        <Link href={`/projets/${nextProject.slug}`}>Projet suivant →</Link>
      </nav>

      <header className="case-header section-shell">
        <p className="case-kicker">
          {project.client} · {project.period}
          {project.isExample && <span className="work-card-badge">Exemple</span>}
        </p>
        <h1 className="case-title">
          {project.title} {project.titleAccent && <em>{project.titleAccent}</em>}
        </h1>
      </header>

      <section className="case-hero section-shell">
        <ProjectVisual project={project} sizes="(min-width: 900px) 55vw, 100vw" priority />
        <div className="case-facts">
          {project.description.map((paragraph) => (
            <p className="case-description" key={paragraph}>
              {paragraph}
            </p>
          ))}
          <dl className="case-meta">
            <div>
              <dt>Rôle</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Catégorie</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt>Résultat</dt>
              <dd>{project.outcome}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{project.stack.join(", ")}</dd>
            </div>
          </dl>
        </div>
      </section>

      <Link className="case-next" href={`/projets/${nextProject.slug}`}>
        <span className="section-label">(projet suivant)</span>
        <span className="case-next-title">
          {nextProject.title} {nextProject.titleAccent && <em>{nextProject.titleAccent}</em>}
        </span>
      </Link>
    </article>
  );
}

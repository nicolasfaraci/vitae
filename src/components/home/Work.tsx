"use client";

import Link from "next/link";
import { useRef } from "react";
import ProjectVisual from "@/components/ProjectVisual";
import { projects } from "@/content/projects";
import { desktopMotionQuery, gsap, motionQuery, useScrollMotion } from "@/lib/gsap";

export default function Work() {
  const workRef = useRef<HTMLElement>(null);

  useScrollMotion(workRef, (matchMedia, workElement) => {
    matchMedia.add(desktopMotionQuery, () => {
      const track = workElement.querySelector<HTMLElement>(".work-track");
      if (!track) return;

      const getTrackDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const horizontalTween = gsap.to(track, {
        x: () => -getTrackDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: workElement,
          start: "top top",
          end: () => `+=${getTrackDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(".work-title", {
        x: () => -getTrackDistance() * 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: workElement,
          start: "top top",
          end: () => `+=${getTrackDistance()}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(".work-progress-bar", { scaleX: 0 }, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: workElement,
          start: "top top",
          end: () => `+=${getTrackDistance()}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".work-card .project-visual", workElement).forEach((visualElement) => {
        gsap.fromTo(
          visualElement,
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: visualElement,
              containerAnimation: horizontalTween,
              start: "left 95%",
              end: "left 45%",
              scrub: true,
            },
          },
        );
      });
    });

    matchMedia.add(`${motionQuery} and (max-width: 899px)`, () => {
      gsap.utils.toArray<HTMLElement>(".work-card", workElement).forEach((cardElement) => {
        gsap.from(cardElement, {
          y: 60,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: cardElement, start: "top 85%" },
        });
      });
    });
  });

  return (
    <section className="work" id="work" ref={workRef}>
      <div className="work-head section-shell">
        <p className="section-label">(portfolio · {String(projects.length).padStart(2, "0")} projets)</p>
      </div>
      <h2 className="work-title">
        Déjà livré, <em>pour de vrai.</em>
      </h2>
      <div className="work-track">
        {projects.map((project, projectIndex) => (
          <article className="work-card" key={project.slug}>
            <Link className="work-card-link" href={`/projets/${project.slug}`}>
              <ProjectVisual project={project} sizes="(min-width: 900px) 560px, 100vw" />
              <div className="work-card-body">
                <p className="work-card-meta">
                  {String(projectIndex + 1).padStart(2, "0")} · {project.category} · {project.period}
                  {project.isExample && <span className="work-card-badge">Exemple</span>}
                </p>
                <h3 className="work-card-title">
                  {project.title} {project.titleAccent && <em>{project.titleAccent}</em>}
                </h3>
                <p className="work-card-summary">{project.summary}</p>
                <span className="work-card-cta">Voir le projet ↗</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
      <div className="work-progress section-shell" aria-hidden="true">
        <span className="work-progress-bar" />
      </div>
    </section>
  );
}

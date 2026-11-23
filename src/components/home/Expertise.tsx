"use client";

import { useRef } from "react";
import { expertiseGroups, stackRows } from "@/content/home";
import { gsap, motionQuery, ScrollTrigger, useScrollMotion } from "@/lib/gsap";

const yearsOfExperience = 10;

export default function Expertise() {
  const expertiseRef = useRef<HTMLElement>(null);

  useScrollMotion(expertiseRef, (matchMedia, expertiseElement) => {
    matchMedia.add(motionQuery, () => {
      const counterElement = expertiseElement.querySelector<HTMLElement>(".expertise-years");
      if (counterElement) {
        const counterState = { value: 0 };
        gsap.to(counterState, {
          value: yearsOfExperience,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: counterElement, start: "top 80%" },
          onUpdate: () => {
            counterElement.textContent = String(Math.round(counterState.value));
          },
        });
      }

      const rowTweens = gsap.utils.toArray<HTMLElement>(".stack-row-track", expertiseElement).map((rowTrack, rowIndex) =>
        gsap.fromTo(
          rowTrack,
          { xPercent: rowIndex % 2 === 0 ? 0 : -50 },
          { xPercent: rowIndex % 2 === 0 ? -50 : 0, duration: 28, ease: "none", repeat: -1 },
        ),
      );

      const skewRows = gsap.quickTo(".stack-row", "skewX", { duration: 0.5, ease: "power3" });
      ScrollTrigger.create({
        trigger: expertiseElement,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const scrollVelocity = self.getVelocity();
          const clampedSkew = gsap.utils.clamp(-14, 14, scrollVelocity / -180);
          skewRows(clampedSkew);
          rowTweens.forEach((rowTween) => rowTween.timeScale(1 + Math.min(Math.abs(scrollVelocity) / 400, 6)));
        },
        onLeave: () => skewRows(0),
        onLeaveBack: () => skewRows(0),
      });
      const easeRowsBackToIdleSpeed = () => {
        rowTweens.forEach((rowTween) => rowTween.timeScale(gsap.utils.interpolate(rowTween.timeScale(), 1, 0.05)));
      };
      gsap.ticker.add(easeRowsBackToIdleSpeed);

      gsap.from(".expertise-card", {
        y: 50,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".expertise-grid", start: "top 80%" },
      });

      return () => gsap.ticker.remove(easeRowsBackToIdleSpeed);
    });
  });

  return (
    <section className="expertise" id="expertise" ref={expertiseRef}>
      <div className="expertise-head section-shell">
        <p className="expertise-years" aria-hidden="true">
          {yearsOfExperience}
        </p>
        <h2 className="expertise-title-main">
          <span className="visually-hidden">{yearsOfExperience} </span>
          <em>ans à tout faire,</em> du MVP au grand compte.
        </h2>
      </div>
      <div className="stack-rows" aria-label="Technologies">
        {stackRows.map((row, rowIndex) => (
          <div className={`stack-row stack-row-${rowIndex}`} key={row.join("-")}>
            <div className="stack-row-track">
              {[0, 1].map((copyIndex) => (
                <span className="stack-row-group" key={copyIndex} aria-hidden={copyIndex === 1 || undefined}>
                  {row.map((item) => (
                    <span key={item}>
                      {item}
                      <span className="stack-separator"> / </span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="expertise-grid section-shell">
        {expertiseGroups.map((group) => (
          <article className="expertise-card" key={group.title}>
            <h3 className="expertise-card-title">{group.title}</h3>
            <p className="expertise-card-description">{group.description}</p>
            <p className="expertise-card-tools">{group.tools}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

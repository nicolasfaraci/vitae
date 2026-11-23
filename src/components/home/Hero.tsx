"use client";

import { useRef } from "react";
import { gsap, motionQuery, ScrollTrigger, SplitText, useScrollMotion } from "@/lib/gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useScrollMotion(heroRef, (matchMedia, heroElement) => {
    matchMedia.add("all", () => {
      const originElement = heroElement.querySelector<HTMLElement>(".hero-origin");
      const filElement = heroElement.querySelector<HTMLElement>(".hero-fil");
      const introElement = heroElement.querySelector<HTMLElement>(".hero-intro");
      const hintElement = heroElement.querySelector<HTMLElement>(".hero-hint");
      if (!originElement || !filElement || !introElement || !hintElement) return;

      const filGapAboveIntro = 40;
      const fitFilAboveIntro = () => {
        const filTop = originElement.offsetTop + filElement.offsetTop;
        filElement.style.height = `${Math.max(0, introElement.offsetTop - filTop - filGapAboveIntro)}px`;
        hintElement.style.left = `${originElement.offsetLeft + originElement.offsetWidth / 2 + 20}px`;
        hintElement.style.top = `${filTop + 28}px`;
      };
      fitFilAboveIntro();
      ScrollTrigger.addEventListener("refreshInit", fitFilAboveIntro);

      return () => ScrollTrigger.removeEventListener("refreshInit", fitFilAboveIntro);
    });

    matchMedia.add(motionQuery, () => {
      const nameSplit = SplitText.create(".hero-name-line", { type: "chars", charsClass: "hero-char" });
      const originChar = heroElement.querySelector(".hero-origin .hero-char");

      gsap.from(nameSplit.chars, {
        yPercent: 105,
        autoAlpha: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.035,
      });
      gsap.from(".hero-intro > *, .hero-hint", { y: 24, autoAlpha: 0, duration: 0.9, delay: 0.6, stagger: 0.08 });

      const scrollTrigger = {
        trigger: heroElement,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      };

      nameSplit.chars.forEach((charElement, charIndex) => {
        if (charElement === originChar) return;
        gsap.to(charElement, {
          y: Math.sin(charIndex * 1.7) * 140,
          rotate: Math.cos(charIndex * 2.3) * 8,
          ease: "none",
          scrollTrigger,
        });
      });

      if (originChar) {
        gsap.fromTo(
          originChar,
          { autoAlpha: 1 },
          { autoAlpha: 0.12, ease: "none", immediateRender: false, scrollTrigger: { ...scrollTrigger, end: "30% top" } },
        );
      }
      gsap.fromTo(".hero-fil", { scaleY: 0.15 }, { scaleY: 1, ease: "none", scrollTrigger: { ...scrollTrigger, end: "bottom 40%" } });
      gsap.fromTo(
        ".hero-hint",
        { opacity: 1 },
        { opacity: 0, ease: "none", immediateRender: false, scrollTrigger: { ...scrollTrigger, end: "15% top" } },
      );
      gsap.fromTo(
        ".hero-intro",
        { autoAlpha: 1, y: 0 },
        { autoAlpha: 0, y: -40, ease: "none", immediateRender: false, scrollTrigger: { ...scrollTrigger, end: "40% top" } },
      );
    });
  });

  return (
    <section className="hero" id="home" data-chapter="Nicolas Faraci" ref={heroRef}>
      <h1 className="hero-name" aria-label="Nicolas Faraci">
        <span className="hero-name-line" aria-hidden="true">Nicolas</span>
        <span className="hero-name-line" aria-hidden="true">
          F
          <span className="hero-origin">
            A
            <span className="hero-fil-dot" />
            <span className="hero-fil" />
          </span>
          raci
        </span>
      </h1>
      <div className="hero-intro">
        <p className="hero-role">
          Développeur fullstack senior. <em>De l’idée à la prod.</em>
        </p>
        <p className="hero-status">
          <span className="status-dot" aria-hidden="true" />
          Disponible
        </p>
      </div>
      <a className="hero-hint" href="#manifeste">
        ↓ Suivez le fil
      </a>
    </section>
  );
}

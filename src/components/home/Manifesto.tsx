"use client";

import { useRef } from "react";
import { manifesto } from "@/content/home";
import { gsap, motionQuery, SplitText, useScrollMotion } from "@/lib/gsap";

export default function Manifesto() {
  const manifestoRef = useRef<HTMLElement>(null);

  useScrollMotion(manifestoRef, (matchMedia, manifestoElement) => {
    matchMedia.add(motionQuery, () => {
      const wordSplit = SplitText.create(".manifesto-text", { type: "words", wordsClass: "manifesto-word" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: manifestoElement,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 0.6,
        },
      });
      timeline
        .from(wordSplit.words, { opacity: 0.1, stagger: 0.1, ease: "none", duration: 1 })
        .fromTo(".manifesto-fil path", { drawSVG: "0%" }, { drawSVG: "100%", ease: "none", duration: wordSplit.words.length * 0.1 }, 0);
    });
  });

  return (
    <section className="manifesto" id="manifeste" ref={manifestoRef}>
      <div className="manifesto-inner section-shell">
        <p className="section-label">(un seul interlocuteur)</p>
        <p className="manifesto-text">{manifesto}</p>
      </div>
      <svg className="manifesto-fil fil" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40 C 260 70, 420 10, 720 50 S 1200 110, 1440 30" vectorEffect="non-scaling-stroke" />
      </svg>
    </section>
  );
}

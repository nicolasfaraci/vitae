"use client";

import { useRef } from "react";
import { manifestoParts } from "@/content/home";
import { gsap, motionQuery, SplitText, useScrollMotion } from "@/lib/gsap";

const wordStagger = 0.1;

export default function Manifesto() {
  const manifestoRef = useRef<HTMLElement>(null);

  useScrollMotion(manifestoRef, (matchMedia, manifestoElement) => {
    matchMedia.add(motionQuery, () => {
      const wordSplit = SplitText.create(".manifesto-text", { type: "words", wordsClass: "manifesto-word" });
      const highlightMarks = gsap.utils.toArray<HTMLElement>(".manifesto-mark", manifestoElement);

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: manifestoElement,
          start: "center center",
          end: "+=160%",
          pin: true,
          scrub: 0.6,
        },
      });
      timeline.from(wordSplit.words, { opacity: 0.1, stagger: wordStagger, duration: 1 });

      highlightMarks.forEach((markElement) => {
        const firstWordIndex = wordSplit.words.findIndex((wordElement) => markElement.contains(wordElement));
        const markWordCount = wordSplit.words.filter((wordElement) => markElement.contains(wordElement)).length;
        timeline.fromTo(
          markElement,
          { backgroundSize: "0% 0.36em" },
          { backgroundSize: "100% 0.36em", duration: 0.4 + markWordCount * wordStagger },
          firstWordIndex * wordStagger + 0.5,
        );
      });
    });
  });

  return (
    <section className="manifesto" id="manifeste" data-chapter="Manifeste" ref={manifestoRef}>
      <div className="manifesto-inner section-shell">
        <p className="section-label">(un seul interlocuteur)</p>
        <p className="manifesto-text">
          {manifestoParts.map((part) =>
            part.isHighlighted ? (
              <mark className="manifesto-mark" key={part.text}>
                {part.text}
              </mark>
            ) : (
              part.text
            ),
          )}
        </p>
      </div>
    </section>
  );
}

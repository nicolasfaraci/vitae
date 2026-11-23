"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP);

export const motionQuery = "(prefers-reduced-motion: no-preference)";
export const desktopMotionQuery = `${motionQuery} and (min-width: 900px)`;

// Lance les animations d'une section une fois les polices chargées (SplitText mesure les glyphes),
// dans un gsap.matchMedia scopé : tout est annulé au démontage ou si les media queries changent.
export function useScrollMotion(
  scopeRef: RefObject<HTMLElement | null>,
  setupMotion: (matchMedia: gsap.MatchMedia, scopeElement: HTMLElement) => void,
) {
  useGSAP(
    (_context, contextSafe) => {
      const scopeElement = scopeRef.current;
      if (!scopeElement || !contextSafe) return;

      const matchMedia = gsap.matchMedia(scopeElement);
      let isActive = true;
      const runSetup = contextSafe(() => {
        if (isActive) setupMotion(matchMedia, scopeElement);
      });
      document.fonts.ready.then(runSetup);

      return () => {
        isActive = false;
        matchMedia.revert();
      };
    },
    { scope: scopeRef },
  );
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

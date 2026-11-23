"use client";

import { useRef } from "react";
import { services, servicesNote } from "@/content/home";
import { desktopMotionQuery, gsap, useScrollMotion } from "@/lib/gsap";

const viewBoxWidth = 1440;
const viewBoxHeight = 810;
const filPath = "M-40 300 C 240 60, 480 540, 720 470 S 1160 230, 1480 520";
const serviceAnchors = [0.2, 0.5, 0.78];
const cardWidth = 300;

export default function Services() {
  const servicesRef = useRef<HTMLElement>(null);

  useScrollMotion(servicesRef, (matchMedia, servicesElement) => {
    matchMedia.add(desktopMotionQuery, () => {
      const stage = servicesElement.querySelector<HTMLElement>(".fil-stage");
      const path = servicesElement.querySelector<SVGPathElement>(".fil-stage-path");
      const markers = gsap.utils.toArray<SVGCircleElement>(".fil-marker", servicesElement);
      const cards = gsap.utils.toArray<HTMLElement>(".fil-service", servicesElement);
      if (!stage || !path) return;

      const pathLength = path.getTotalLength();
      cards.forEach((card, cardIndex) => {
        const anchorPoint = path.getPointAtLength(pathLength * serviceAnchors[cardIndex]);
        const left = Math.min(anchorPoint.x - 24, viewBoxWidth - cardWidth - 24);
        card.style.setProperty("--x", `${(left / viewBoxWidth) * 100}%`);
        card.style.setProperty("--y", `${((anchorPoint.y + 36) / viewBoxHeight) * 100}%`);
        markers[cardIndex]?.setAttribute("cx", String(anchorPoint.x));
        markers[cardIndex]?.setAttribute("cy", String(anchorPoint.y));
      });
      stage.classList.add("is-placed");

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: servicesElement,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 1,
        },
      });

      timeline
        .fromTo(".fil-stage-path", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1 }, 0)
        .fromTo(".fil-stage-text textPath", { attr: { startOffset: "100%" } }, { attr: { startOffset: "-30%" }, duration: 1.1 }, 0)
        .from(".services-head", { autoAlpha: 0, y: 40, duration: 0.12 }, 0);

      cards.forEach((card, cardIndex) => {
        const anchorTime = serviceAnchors[cardIndex];
        timeline
          .from(markers[cardIndex], { scale: 0, transformOrigin: "50% 50%", duration: 0.04 }, anchorTime)
          .from(card, { autoAlpha: 0, y: 50, duration: 0.1, ease: "power2.out" }, anchorTime);
      });

      return () => stage.classList.remove("is-placed");
    });
  });

  return (
    <section className="services" id="services" ref={servicesRef}>
      <div className="services-head section-shell">
        <h2 className="section-title">Ce que je construis avec vous.</h2>
        <p className="section-label">(offres)</p>
      </div>
      <div className="fil-stage">
        <svg
          className="fil-stage-svg"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          aria-hidden="true"
        >
          <defs>
            <path id="services-fil" d={filPath} />
          </defs>
          <path className="fil-stage-path" d={filPath} />
          <text className="fil-stage-text" dy="-18">
            <textPath href="#services-fil" startOffset="4%">
              Concevoir — Construire — Livrer — Concevoir — Construire — Livrer —
            </textPath>
          </text>
          {services.map((service) => (
            <circle className="fil-marker" key={service.title} r="10" cx="0" cy="0" />
          ))}
        </svg>
        <ol className="fil-services">
          {services.map((service, serviceIndex) => (
            <li className="fil-service" key={service.title}>
              <span className="fil-service-index">0{serviceIndex + 1}</span>
              <h3 className="fil-service-title">{service.title}</h3>
              <p className="fil-service-description">{service.description}</p>
              <p className="fil-service-timing">{service.timing} →</p>
            </li>
          ))}
        </ol>
      </div>
      <p className="services-note section-shell">{servicesNote}</p>
    </section>
  );
}

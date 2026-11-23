"use client";

import { useRef } from "react";
import { services } from "@/content/home";
import { desktopMotionQuery, gsap, motionQuery, ScrollTrigger, useScrollMotion } from "@/lib/gsap";

const viewBoxWidth = 1440;
const viewBoxHeight = 810;
const filPath = "M-40 300 C 260 170, 420 420, 720 360 S 1180 220, 1480 330";
const cardLeftFractions = [0.06, 0.37, 0.68];
const anchorInsetFromCardLeft = 14;
const cardGapBelowFil = 90;
const pathSampleCount = 200;
const inactiveServiceOpacity = 0.32;

function findLengthAtX(path: SVGPathElement, targetX: number) {
  let lowLength = 0;
  let highLength = path.getTotalLength();
  for (let iteration = 0; iteration < 24; iteration++) {
    const middleLength = (lowLength + highLength) / 2;
    if (path.getPointAtLength(middleLength).x < targetX) lowLength = middleLength;
    else highLength = middleLength;
  }
  return (lowLength + highLength) / 2;
}

function findLowestPointY(path: SVGPathElement) {
  const pathLength = path.getTotalLength();
  let lowestY = -Infinity;
  for (let sampleIndex = 0; sampleIndex <= pathSampleCount; sampleIndex++) {
    lowestY = Math.max(lowestY, path.getPointAtLength((pathLength * sampleIndex) / pathSampleCount).y);
  }
  return lowestY;
}

export default function Services() {
  const servicesRef = useRef<HTMLElement>(null);

  useScrollMotion(servicesRef, (matchMedia, servicesElement) => {
    matchMedia.add(desktopMotionQuery, () => {
      const stage = servicesElement.querySelector<HTMLElement>(".fil-stage");
      const path = servicesElement.querySelector<SVGPathElement>(".fil-stage-path");
      const markers = gsap.utils.toArray<SVGCircleElement>(".fil-marker", servicesElement);
      const connectors = gsap.utils.toArray<SVGLineElement>(".fil-connector", servicesElement);
      const cards = gsap.utils.toArray<HTMLElement>(".fil-service", servicesElement);
      if (!stage || !path) return;

      const pathLength = path.getTotalLength();
      const cardTopY = findLowestPointY(path) + cardGapBelowFil;
      const anchorProgressByCard = cards.map((card, cardIndex) => {
        const cardLeftX = cardLeftFractions[cardIndex] * viewBoxWidth;
        const anchorLength = findLengthAtX(path, cardLeftX + anchorInsetFromCardLeft);
        const anchorPoint = path.getPointAtLength(anchorLength);

        card.style.setProperty("--x", `${cardLeftFractions[cardIndex] * 100}%`);
        card.style.setProperty("--y", `${(cardTopY / viewBoxHeight) * 100}%`);
        markers[cardIndex]?.setAttribute("cx", String(anchorPoint.x));
        markers[cardIndex]?.setAttribute("cy", String(anchorPoint.y));
        connectors[cardIndex]?.setAttribute("x1", String(anchorPoint.x));
        connectors[cardIndex]?.setAttribute("y1", String(anchorPoint.y));
        connectors[cardIndex]?.setAttribute("x2", String(anchorPoint.x));
        connectors[cardIndex]?.setAttribute("y2", String(cardTopY - 14));
        return anchorLength / pathLength;
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
        const anchorTime = anchorProgressByCard[cardIndex];
        timeline
          .fromTo(
            markers[cardIndex],
            { scale: 0.7, fill: "#f6f6f0", transformOrigin: "50% 50%" },
            { scale: 1.3, fill: "#c7ff3d", duration: 0.04 },
            anchorTime,
          )
          .fromTo(connectors[cardIndex], { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.06 }, anchorTime)
          .from(card, { autoAlpha: 0, y: 40, duration: 0.1, ease: "power2.out" }, anchorTime + 0.04);

        if (cardIndex > 0) {
          timeline
            .to(cards.slice(0, cardIndex), { opacity: inactiveServiceOpacity, duration: 0.06 }, anchorTime)
            .to(markers[cardIndex - 1], { scale: 1, duration: 0.04 }, anchorTime);
        }
      });

      timeline
        .to(cards, { opacity: 1, duration: 0.04 }, 0.95)
        .to(markers, { scale: 1, duration: 0.04 }, 0.95);

      return () => stage.classList.remove("is-placed");
    });

    matchMedia.add(`${motionQuery} and (max-width: 899px)`, () => {
      gsap.from(".services-head > *", {
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-head", start: "top 85%" },
      });

      gsap.fromTo(
        ".fil-services",
        { "--fil-progress": 0 },
        {
          "--fil-progress": 1,
          ease: "none",
          scrollTrigger: { trigger: ".fil-services", start: "top 75%", end: "bottom 60%", scrub: 0.6 },
        },
      );

      const serviceList = servicesElement.querySelector<HTMLElement>(".fil-services");
      serviceList?.classList.add("is-tracking");

      gsap.utils.toArray<HTMLElement>(".fil-service", servicesElement).forEach((serviceElement) => {
        gsap.from(serviceElement, {
          x: -24,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: serviceElement, start: "top 75%" },
        });
        ScrollTrigger.create({
          trigger: serviceElement,
          start: "top 60%",
          end: "bottom 40%",
          toggleClass: { targets: serviceElement, className: "is-active" },
          onEnter: () => serviceElement.classList.add("is-reached"),
          onLeaveBack: () => serviceElement.classList.remove("is-reached"),
        });
      });

      return () => serviceList?.classList.remove("is-tracking");
    });
  });

  return (
    <section className="services" id="services" data-chapter="Offres" ref={servicesRef}>
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
              Concevoir — Construire — Livrer — Concevoir — Construire — Livrer
            </textPath>
          </text>
          {services.map((service) => (
            <line className="fil-connector" key={`${service.title}-connector`} x1="0" y1="0" x2="0" y2="0" />
          ))}
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
    </section>
  );
}

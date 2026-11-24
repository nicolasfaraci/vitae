"use client";

import { useRef } from "react";
import ContactForm from "@/components/ContactForm";
import { linkedinUrl } from "@/content/home";
import { gsap, motionQuery, SplitText, useScrollMotion } from "@/lib/gsap";

export default function Contact() {
  const contactRef = useRef<HTMLElement>(null);

  useScrollMotion(contactRef, (matchMedia, contactElement) => {
    matchMedia.add(motionQuery, () => {
      SplitText.create(".contact-title", {
        type: "lines",
        mask: "lines",
        linesClass: "contact-title-line",
        autoSplit: true,
        onSplit: (titleSplit) =>
          gsap.from(titleSplit.lines, {
            yPercent: 110,
            duration: 1.1,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: contactElement, start: "top 70%" },
          }),
      });

      gsap.fromTo(
        ".contact-cta-fil path",
        { drawSVG: "0%" },
        { drawSVG: "100%", ease: "none", scrollTrigger: { trigger: ".contact-cta", start: "top 90%", end: "top 55%", scrub: 1 } },
      );

      const signatureSplit = SplitText.create(".contact-signature", { type: "chars" });
      gsap.from(signatureSplit.chars, {
        yPercent: 100,
        stagger: 0.03,
        ease: "none",
        scrollTrigger: { trigger: ".contact-signature", start: "top bottom", end: "bottom bottom", scrub: 1 },
      });

      const typedSplit = SplitText.create(".footer-credit-typed", { type: "chars" });
      const creditTimeline = gsap
        .timeline({ scrollTrigger: { trigger: ".footer-credit", start: "top bottom-=24px" } })
        .from(".footer-credit-human", { yPercent: 60, autoAlpha: 0, duration: 0.7, ease: "expo.out" })
        .addLabel("thread", "-=0.25")
        .fromTo(
          ".footer-credit-fil path",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 0.9, ease: "power2.inOut" },
          "thread",
        )
        .from(
          ".footer-credit-knot",
          { scale: 0, svgOrigin: "111 10", duration: 0.7, ease: "elastic.out(1.1, 0.4)" },
          "-=0.12",
        )
        .from(".footer-credit-machine", { autoAlpha: 0, duration: 0.01 }, "-=0.45")
        .from(typedSplit.chars, { autoAlpha: 0, duration: 0.01, stagger: 0.055 }, "<")
        .from(".footer-credit-claude", { backgroundSize: "0% 100%", duration: 0.45, ease: "power3.out" }, "+=0.1");

      const creditElement = contactElement.querySelector<HTMLElement>(".footer-credit");
      const replayCredit = () => {
        if (!creditTimeline.isActive() && creditTimeline.progress() === 1) creditTimeline.play("thread");
      };
      creditElement?.addEventListener("pointerenter", replayCredit);

      const ctaElement = contactElement.querySelector<HTMLElement>(".contact-cta");
      if (!ctaElement || !window.matchMedia("(hover: hover)").matches) {
        return () => creditElement?.removeEventListener("pointerenter", replayCredit);
      }

      const moveCtaX = gsap.quickTo(ctaElement, "x", { duration: 0.5, ease: "power3" });
      const moveCtaY = gsap.quickTo(ctaElement, "y", { duration: 0.5, ease: "power3" });
      const attractCta = (event: PointerEvent) => {
        const ctaBounds = ctaElement.getBoundingClientRect();
        moveCtaX((event.clientX - (ctaBounds.left + ctaBounds.width / 2)) * 0.3);
        moveCtaY((event.clientY - (ctaBounds.top + ctaBounds.height / 2)) * 0.4);
      };
      const releaseCta = () => {
        moveCtaX(0);
        moveCtaY(0);
      };
      ctaElement.addEventListener("pointermove", attractCta);
      ctaElement.addEventListener("pointerleave", releaseCta);

      return () => {
        creditElement?.removeEventListener("pointerenter", replayCredit);
        ctaElement.removeEventListener("pointermove", attractCta);
        ctaElement.removeEventListener("pointerleave", releaseCta);
      };
    });
  });

  return (
    <section className="contact" id="contact" data-chapter="Contact" ref={contactRef}>
      <div className="contact-inner section-shell">
        <div className="contact-copy">
          <p className="section-label">(contact)</p>
          <h2 className="contact-title">
            Un projet ? <em>Racontez-moi.</em>
          </h2>
          <p className="contact-lead">
            Même vague, même à moitié écrit. Je reviens vers vous avec une première analyse et la
            suite que je vous propose.
          </p>
          <a className="contact-cta" href="#contact-form">
            Décrire mon projet ↗
            <svg className="contact-cta-fil fil" viewBox="0 0 260 14" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 7 C 60 0, 140 14, 260 6" vectorEffect="non-scaling-stroke" />
            </svg>
          </a>
          <p className="contact-info">
            Réponse sous 48 h ouvrées
            <br />
            Démarrage sous 2 à 3 semaines
            <br />
            <a className="contact-link" href={linkedinUrl} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </p>
        </div>
        <div className="contact-form-wrap" id="contact-form">
          <ContactForm />
        </div>
      </div>
      <footer className="site-footer">
        <p className="contact-signature" aria-hidden="true">
          Nicolas Faraci
        </p>
        <div className="footer-meta section-shell">
          <span>Nicolas Faraci</span>
          <p className="footer-credit">
            <span className="footer-credit-human">
              Pensé par <em>un humain</em>
            </span>
            <svg className="footer-credit-fil fil" viewBox="0 0 120 20" aria-hidden="true">
              <path d="M2 12 C 22 2, 38 20, 58 10 S 92 4, 110 10" vectorEffect="non-scaling-stroke" />
              <circle className="footer-credit-knot" cx="111" cy="10" r="7" />
            </svg>
            <span className="footer-credit-machine">
              <span className="footer-credit-typed">
                codé avec <mark className="footer-credit-claude">Claude</mark>
              </span>
              <span className="brand-cursor" aria-hidden="true">_</span>
            </span>
          </p>
          <span>France · {new Date().getFullYear()}</span>
        </div>
      </footer>
    </section>
  );
}

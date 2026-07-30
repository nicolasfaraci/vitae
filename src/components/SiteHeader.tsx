"use client";

import { useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#expertise", label: "Expertise" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="section-shell nav-inner">
        <a className="brand" href="#accueil" aria-label="Nicolas Faraci, accueil">
          <strong className="brand-name">
            <span>Nicolas</span>
            <span>Faraci</span>
          </strong>
        </a>
        <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Navigation principale">
          {links.map((link) => (
            <a href={link.href} key={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>
            Démarrer un projet <span aria-hidden="true">↗</span>
          </a>
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

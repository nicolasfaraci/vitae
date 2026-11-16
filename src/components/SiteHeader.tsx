const links = [
  { href: "#services", label: "Offres" },
  { href: "#work", label: "Réalisations" },
  { href: "#expertise", label: "Expertise" },
];

export default function SiteHeader() {
  return (
    <header className="site-header section-shell">
      <a className="brand" href="#home" aria-label="Nicolas Faraci, accueil">
        nicolas faraci<span className="brand-cursor">_</span>
      </a>
      <nav className="nav" aria-label="Navigation principale">
        {links.map((link) => (
          <a className="nav-link" href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
        <a className="btn btn-accent nav-cta" href="#contact">
          Démarrer<span className="wide-only"> un projet</span> ↗
        </a>
      </nav>
    </header>
  );
}

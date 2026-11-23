import Link from "next/link";

const links = [
  { href: "/#services", label: "Offres" },
  { href: "/#work", label: "Portfolio" },
  { href: "/#expertise", label: "Expertise" },
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/#home" aria-label="Nicolas Faraci, accueil">
        NF<span className="brand-cursor">_</span>
      </Link>
      <nav className="nav" aria-label="Navigation principale">
        {links.map((link) => (
          <Link className="nav-link wide-only" href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
        <Link className="nav-link nav-cta" href="/#contact">
          Démarrer un projet ↗
        </Link>
      </nav>
    </header>
  );
}

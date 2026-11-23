# Portfolio Nicolas Faraci (vitae)

Site vitrine de Nicolas Faraci, développeur fullstack senior : une page unique et responsive qui présente les offres, les réalisations, l'expertise et un formulaire de contact.

## Stack

- Next.js 16 (App Router, Server Components), React 19, TypeScript
- GSAP 3 (ScrollTrigger, SplitText, DrawSVG) via `@gsap/react` pour le parcours au scroll
- Tailwind CSS v4 (import et `@theme`), styles dans `src/app/globals.css`
- Polices Inter Tight, Instrument Serif et JetBrains Mono via `next/font`
- Resend pour l'envoi des emails, Cloudflare Turnstile contre le spam
- pnpm, ESLint

## Installation

```bash
pnpm install
pnpm dev
```

Le site tourne sur [http://localhost:3000](http://localhost:3000).

### Variables d'environnement

Créer un fichier `.env.local` à la racine :

```bash
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL="Site Nicolas Faraci <contact@mail.nicolasfaraci.fr>"
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key
TURNSTILE_SECRET_KEY=your_secret_key
```

- `RESEND_FROM_EMAIL` est optionnel (adresse d'expédition, domaine vérifié sur Resend).
- En développement, des clés de test Turnstile sont utilisées par défaut. Sans `RESEND_API_KEY`, le formulaire répond par une erreur 503 explicite.

## Scripts

```bash
pnpm dev     # développement
pnpm build   # build de production
pnpm start   # lancer le build
pnpm lint    # ESLint
```

## Structure

```
src/
├── app/
│   ├── api/contact/route.ts   # envoi du formulaire (validation, Turnstile, Resend)
│   ├── projets/[slug]/page.tsx # page étude de cas, générée pour chaque projet
│   ├── layout.tsx             # polices, métadonnées SEO, JSON-LD
│   ├── page.tsx               # assemble les sections
│   ├── globals.css            # variables CSS et styles de toute la page
│   ├── sitemap.ts             # inclut les projets (hors exemples)
│   ├── manifest.ts
│   └── icon.svg
├── content/
│   ├── home.ts                # manifeste, offres, expertise, stack
│   ├── projects.ts            # contenu des projets (texte uniquement)
│   └── projectVisuals.ts      # visuels des projets, indexés par slug
├── lib/gsap.ts                # plugins GSAP + hook useScrollMotion
└── components/
    ├── SiteHeader.tsx
    ├── ContactForm.tsx
    ├── ProjectVisual.tsx      # image du projet ou couverture typographique
    ├── ProjectCaseStudy.tsx
    └── home/
        ├── Hero.tsx           # nom en lettres géantes, départ du fil
        ├── Manifesto.tsx      # phrase épinglée, mots allumés au scroll
        ├── Services.tsx       # offres posées sur le fil (SVG tracé au scroll)
        ├── Work.tsx           # portfolio horizontal épinglé
        ├── Expertise.tsx      # compteur, stack pilotée par la vitesse de scroll
        └── Contact.tsx        # titre, CTA magnétique, formulaire, pied de page
public/                        # og.png, profile.png, robots.txt, projects/<slug>/
```

Ancres de la page : `#home`, `#manifeste`, `#services`, `#work`, `#expertise`, `#contact`.

## Ajouter un projet

1. Ajouter une entrée dans `src/content/projects.ts` (slug, titre, résumé, description, stack…).
2. Optionnel : déposer une image dans `public/projects/<slug>/` et la déclarer dans `src/content/projectVisuals.ts` (`cover`). Sans image, une couverture typographique (monogramme + couleur `tone`) est affichée.

La carte du portfolio, la page `/projets/<slug>` et l'entrée du sitemap sont générées automatiquement. Un projet marqué `isExample: true` porte un badge « Exemple » et n’est pas indexé.

## Design et animations

Direction « Le Fil » : le nom s'ouvre en lettres géantes, puis un trait part du A de FARACI et traverse le site (offres, portfolio, soulignement du bouton de contact).

- Variables dans `:root` de `globals.css` : `--ink`, `--paper`, `--muted`, `--line`, `--accent` (`#c7ff3d`), `--dark`, etc.
- Chaque section crée ses animations avec `useScrollMotion` (`src/lib/gsap.ts`), après le chargement des polices, dans un `gsap.matchMedia` nettoyé au démontage.
- Les animations ne tournent qu'avec `prefers-reduced-motion: no-preference` : sinon la page reste statique et entièrement lisible. Les sections épinglées (offres sur le fil, portfolio horizontal) ne s'activent qu'à partir de 900px ; en dessous, la mise en page est verticale.

## Formulaire de contact

Le formulaire envoie un `POST /api/contact` avec nom, email, type de projet, message, un champ honeypot et le token Turnstile. L'API valide les champs, vérifie Turnstile auprès de Cloudflare, puis envoie l'email via Resend.

## SEO

Métadonnées Open Graph et Twitter, JSON-LD (Person et ProfessionalService), sitemap et manifest sont gérés dans `src/app`. L'image de partage est `public/og.png`. Voir `SEO-GUIDE.md` pour le détail.

## Déploiement

Déploiement sur Vercel ou toute plateforme compatible Next.js. Renseigner les quatre variables d'environnement ci-dessus dans le dashboard de la plateforme.

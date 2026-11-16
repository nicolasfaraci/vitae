# Portfolio Nicolas Faraci (vitae)

Site vitrine de Nicolas Faraci, développeur fullstack senior : une page unique et responsive qui présente les offres, les réalisations, l'expertise et un formulaire de contact.

## Stack

- Next.js 16 (App Router, Server Components), React 19, TypeScript
- Tailwind CSS v4 (import et `@theme`), styles dans `src/app/globals.css`
- Polices Geist et Geist Mono via `next/font`
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
│   ├── layout.tsx             # polices, métadonnées SEO, JSON-LD
│   ├── page.tsx               # assemble les sections
│   ├── globals.css            # variables CSS et styles de toute la page
│   ├── sitemap.ts
│   ├── manifest.ts
│   └── icon.svg
└── components/
    ├── SiteHeader.tsx         # logo et navigation
    ├── ContactForm.tsx        # formulaire (client component)
    └── home/
        ├── Hero.tsx
        ├── Marquee.tsx        # bande défilante de la stack
        ├── Services.tsx       # offres
        ├── Work.tsx           # réalisations
        ├── Expertise.tsx
        ├── Contact.tsx        # texte de contact + ContactForm
        └── Footer.tsx
public/                        # og.png, profile.png, robots.txt
```

Ancres de la page : `#home`, `#services`, `#work`, `#expertise`, `#contact`.

## Design

- Variables dans `:root` de `globals.css` : `--ink`, `--paper`, `--muted`, `--line`, `--accent` (`#c7ff3d`), `--dark`, etc.
- Une seule mise en page responsive : le mobile (sous 760px) est géré par une media query, sans composant séparé.
- Les animations (marquee, point pulsant, survols) sont en CSS et désactivées avec `prefers-reduced-motion`.
- Le contenu (offres, réalisations, expertise, stack) est défini en tableaux en haut de chaque composant de `src/components/home/`.

## Formulaire de contact

Le formulaire envoie un `POST /api/contact` avec nom, email, type de projet, message, un champ honeypot et le token Turnstile. L'API valide les champs, vérifie Turnstile auprès de Cloudflare, puis envoie l'email via Resend.

## SEO

Métadonnées Open Graph et Twitter, JSON-LD (Person et ProfessionalService), sitemap et manifest sont gérés dans `src/app`. L'image de partage est `public/og.png`. Voir `SEO-GUIDE.md` pour le détail.

## Déploiement

Déploiement sur Vercel ou toute plateforme compatible Next.js. Renseigner les quatre variables d'environnement ci-dessus dans le dashboard de la plateforme.

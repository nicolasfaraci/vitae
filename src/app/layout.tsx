import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nicolasfaraci.fr"),
  title: {
    default: "Nicolas Faraci — Product builder & développeur full-stack",
    template: "%s — Nicolas Faraci",
  },
  description:
    "Je transforme vos idées en produits web utiles et développe des sites rapides, modernes et orientés conversion. Product builder freelance à Lille.",
  keywords: [
    "product builder freelance",
    "création MVP",
    "développeur site web",
    "développeur full-stack Lille",
    "Next.js freelance",
    "création outil métier",
    "Nicolas Faraci",
  ],
  authors: [{ name: "Nicolas Faraci", url: "https://www.nicolasfaraci.fr" }],
  creator: "Nicolas Faraci",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Nicolas Faraci — Product builder",
    title: "Vos idées méritent de devenir réelles.",
    description:
      "Product builder & développeur full-stack. Je conçois et livre des produits web et des sites qui vont droit au but.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Vos idées méritent de devenir réelles — Nicolas Faraci, Product builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vos idées méritent de devenir réelles.",
    description: "Product builder & développeur full-stack à Lille.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.nicolasfaraci.fr/#person",
      name: "Nicolas Faraci",
      url: "https://www.nicolasfaraci.fr",
      jobTitle: "Product builder et développeur full-stack",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lille",
        addressCountry: "FR",
      },
      knowsAbout: [
        "Product development",
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Spring Boot",
        "Symfony",
        "Cloud computing",
      ],
      sameAs: [
        "https://www.linkedin.com/in/nicolas-faraci-495675147",
        "https://github.com/FlyzCorp",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.nicolasfaraci.fr/#service",
      name: "Nicolas Faraci — Product builder",
      url: "https://www.nicolasfaraci.fr",
      founder: { "@id": "https://www.nicolasfaraci.fr/#person" },
      areaServed: { "@type": "Country", name: "France" },
      serviceType: [
        "Création de produits web",
        "Développement de sites web",
        "Développement full-stack",
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}

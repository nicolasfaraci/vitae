import Contact from "@/components/home/Contact";
import Expertise from "@/components/home/Expertise";
import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import Services from "@/components/home/Services";
import Work from "@/components/home/Work";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Manifesto />
        <Services />
        <Work />
        <Expertise />
        <Contact />
      </main>
    </>
  );
}

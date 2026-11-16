import Contact from "@/components/home/Contact";
import Expertise from "@/components/home/Expertise";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Services from "@/components/home/Services";
import Work from "@/components/home/Work";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Expertise />
      <Contact />
      <Footer />
    </main>
  );
}

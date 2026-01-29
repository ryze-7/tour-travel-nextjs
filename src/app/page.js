import Hero from "@/components/Hero";
import PopularDestinations from "@/components/PopularDestinations";
import ValueProposition from "@/components/ValueProposition";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { getDestinations } from "@/lib/sheetdb";

export default async function Home() {
  const destinations = await getDestinations();

  return (
    <>
      <Hero destinations={destinations} />
      <PopularDestinations destinations={destinations} />
      <ValueProposition />
      <Testimonials />
      <CTASection />
      <Footer />
    </>
  );
}
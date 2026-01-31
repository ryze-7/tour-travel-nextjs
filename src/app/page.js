import Hero from "@/components/Hero";
import PopularDestinations from "@/components/PopularDestinations";
import AboutSection from "@/components/AboutSection";
import ValueProposition from "@/components/ValueProposition";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { getDestinations } from "@/lib/sheetdb";

export default async function Home() {
  let destinations = [];

  try {
    destinations = await getDestinations();
  } catch (error) {
    console.error('Failed to load destinations:', error.message);
    // Use empty array as fallback during build
    destinations = [];
  }

  return (
    <>
      <Hero destinations={destinations} />
      <PopularDestinations destinations={destinations} />
      <AboutSection />
      <ValueProposition />
      <CTASection />
      <Footer />
    </>
  );
}
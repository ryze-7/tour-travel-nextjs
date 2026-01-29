import Hero from "@/components/Hero";
import PopularDestinations from "@/components/PopularDestinations";
import AboutSection from "@/components/AboutSection";
import ValueProposition from "@/components/ValueProposition";
// import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { getDestinations } from "@/lib/sheetdb";

export default async function Home() {
  const destinations = await getDestinations();

  return (
    <>
      <Hero destinations={destinations} />
      <PopularDestinations destinations={destinations} />
      <div className="h-8 sm:h-12 bg-gradient-to-b from-gray-50 to-gray-200"></div>
      <AboutSection />
      <ValueProposition />
      {/* <Testimonials /> */}
      <CTASection />
      <Footer />
    </>
  );
}
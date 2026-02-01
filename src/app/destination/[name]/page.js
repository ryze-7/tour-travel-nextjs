import DestinationHero from "@/components/DestinationHero";
import PackagesList from "@/components/PackagesList";
import ValueProposition from "@/components/ValueProposition";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { getDestinations, getPackages } from "@/lib/sheetdb";
import { notFound } from "next/navigation";

export default async function DestinationPage({ params }) {
  const { name } = await params;
  
  const destinations = await getDestinations();
  const allPackages = await getPackages();
  
  const destination = destinations.find(dest => dest.slug === name);
  
  if (!destination) {
    notFound();
  }
  
  const destinationPackages = allPackages.filter(pkg => pkg.destination === name);

  return (
    <>
      <DestinationHero destination={destination} />
      <PackagesList packages={destinationPackages} />
      <ValueProposition />
      <CTASection />
      <Footer />
    </>
  );
}

export async function generateMetadata({ params }) {
  const { name } = await params;
  const destinations = await getDestinations();
  const destination = destinations.find(dest => dest.slug === name);
  
  if (!destination) {
    return { title: 'Destination Not Found' };
  }

  return {
    title: `${destination.name} - ${destination.subtitle} | MyMarzi`,
    description: destination.description || `Explore ${destination.name} with MyMarzi. ${destination.subtitle}`,
    openGraph: {
      title: `${destination.name} - ${destination.subtitle} | MyMarzi`,
      description: destination.description,
      images: [destination.image],
    },
  };
}
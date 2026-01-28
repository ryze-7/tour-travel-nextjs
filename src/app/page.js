import Hero from "@/components/Hero";
import { getDestinations } from "@/lib/sheetdb";

export default async function Home() {
  const destinations = await getDestinations();

  return <Hero destinations={destinations} />;
}

import PackageHero from "@/components/PackageHero";
import BookingForm from "@/components/BookingForm";
import PackageContent from "@/components/PackageContent";
import Footer from "@/components/Footer";
import { getPackages, getItinerary, getInclusions, getExclusions, getPolicies } from "@/lib/sheetdb";
import { notFound } from "next/navigation";

export default async function PackagePage({ params }) {
  const { id } = await params;
  
  // Fetch all data
  const packages = await getPackages();
  const allItinerary = await getItinerary();
  const allInclusions = await getInclusions();
  const allExclusions = await getExclusions();
  const allPolicies = await getPolicies();
  
  // Find the specific package
  const packageData = packages.find(pkg => pkg.id === id);
  
  // If package not found, show 404
  if (!packageData) {
    notFound();
  }
  
  // Filter data for this package
  const itinerary = allItinerary.filter(item => item.packageId === id);
  const inclusions = allInclusions.filter(item => item.packageId === id);
  const exclusions = allExclusions.filter(item => item.packageId === id);
  const policies = allPolicies.filter(item => item.packageId === id);

  return (
    <>
      <PackageHero packageData={packageData} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2">
            <PackageContent
              packageData={packageData}
              itinerary={itinerary}
              inclusions={inclusions}
              exclusions={exclusions}
              policies={policies}
            />
          </div>
          
          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <BookingForm packageData={packageData} />
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = await params;
  const packages = await getPackages();
  const packageData = packages.find(pkg => pkg.id === id);
  
  if (!packageData) {
    return { title: 'Package Not Found' };
  }

  return {
    title: `${packageData.title} - ${packageData.days} Days Tour | MyMarzi`,
    description: packageData.overview || `Explore ${packageData.title} with MyMarzi. ${packageData.days} days, ${packageData.nights} nights starting from ₹${packageData.price}`,
    openGraph: {
      title: `${packageData.title} - ${packageData.days} Days Tour | MyMarzi`,
      description: packageData.overview,
      images: [packageData.image],
    },
  };
}

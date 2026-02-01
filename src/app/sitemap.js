import { getDestinations, getPackages } from "@/lib/sheetdb";

export default async function sitemap() {
  let destinations = [];
  let packages = [];

  try {
    destinations = await getDestinations();
    packages = await getPackages();
  } catch (e) {}

  const destinationUrls = destinations.map((dest) => ({
    url: `https://my-marzi.vercel.app/destination/${dest.slug}`,
    lastModified: new Date(),
  }));

  const packageUrls = packages.map((pkg) => ({
    url: `https://my-marzi.vercel.app/packages/${pkg.id}`,
    lastModified: new Date(),
  }));

  return [
    { url: "https://my-marzi.vercel.app", lastModified: new Date() },
    ...destinationUrls,
    ...packageUrls,
  ];
}

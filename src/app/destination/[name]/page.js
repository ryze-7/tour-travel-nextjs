import { getPackages } from "@/lib/sheetdb";
import PackageCard from "@/components/PackageCard";

export default async function Destination({ params }) {
  // NEW: unwrap params
  const { name } = await params;

  const data = await getPackages();

  const packages = data.filter(
    p =>
      p.destination &&
      p.destination.toLowerCase() === name.toLowerCase()
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {name} Packages
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map(p => (
          <PackageCard key={p.id} data={p} />
        ))}
      </div>
    </div>
  );
}

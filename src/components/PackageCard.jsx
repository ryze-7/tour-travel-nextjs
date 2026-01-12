export default function PackageCard({ data }) {
  return (
    <div className="border p-4">
      {data.packageName}
    </div>
  );
}

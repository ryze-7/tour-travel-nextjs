import { getPackages } from "@/lib/sheetdb";

export default async function Test() {
  const data = await getPackages();

  return (
    <pre className="p-6 bg-black text-green-400">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

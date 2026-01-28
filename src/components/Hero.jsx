"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Hero({ destinations }) {
  const [query, setQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSearch = () => {
    const value = query.trim().toLowerCase();
    if (!value) return;

    const match = destinations.find(
      (d) => d.slug.toLowerCase() === value
    );

    if (!match) {
      alert("Destination not found");
      return;
    }

    router.push(`/destination/${match.slug}`);
  };

  return (
    <section className="relative h-[90vh] flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
        }}
      />

      <div className="absolute inset-0 bg-black/57" />

      <div className="relative z-10 text-center max-w-3xl px-6">
        <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Your Next Adventure Starts Here
        </h1>

        <p className={`text-lg text-gray-200 mb-8 max-w-xl mx-auto transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Discover curated tour packages across the world with unforgettable
          experiences.
        </p>

        <div className={`flex gap-3 justify-center transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destination..."
            className="px-5 py-3 rounded-lg text-black w-85 border border-white bg-white focus:outline-none focus:ring-2 focus:ring-[#008774]"
          />

          <button
            onClick={handleSearch}
            className="bg-[#009C85] px-6 py-3 rounded-lg font-semibold hover:bg-[#008774] transition-colors duration-200"
          >
            Explore
          </button>
        </div>
      </div>
    </section>
  );
}
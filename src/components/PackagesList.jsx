"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function PackagesList({ packages }) {
  const [isVisible, setIsVisible] = useState(false);
  const [filters, setFilters] = useState({
    budget: "all",
    duration: "all",
    sortBy: "all"
  });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Filter and sort packages
  const filteredPackages = packages.filter(pkg => {
    // Budget filter
    if (filters.budget !== "all") {
      if (filters.budget === "budget" && pkg.price > 50000) return false;
      if (filters.budget === "mid" && (pkg.price < 50000 || pkg.price > 150000)) return false;
      if (filters.budget === "luxury" && pkg.price < 150000) return false;
    }

    // Duration filter
    if (filters.duration !== "all") {
      if (filters.duration === "short" && pkg.days > 3) return false;
      if (filters.duration === "medium" && (pkg.days < 4 || pkg.days > 7)) return false;
      if (filters.duration === "long" && pkg.days < 8) return false;
    }

    return true;
  }).sort((a, b) => {
    // Sort packages
    switch (filters.sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "duration":
        return a.days - b.days;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gray-600 text-lg">
            Choose from multiple curated tour packages
          </p>
        </div>

        {/* Filters */}
        <div 
          className={`grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Budget Filter */}
          <select
            value={filters.budget}
            onChange={(e) => setFilters({...filters, budget: e.target.value})}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009C85] focus:border-transparent outline-none transition-all bg-white text-sm"
          >
            <option value="all">All Budgets</option>
            <option value="budget">Budget Friendly (Under ₹50K)</option>
            <option value="mid">Mid Range (₹50K - ₹1.5L)</option>
            <option value="luxury">Luxury (Above ₹1.5L)</option>
          </select>

          {/* Duration Filter */}
          <select
            value={filters.duration}
            onChange={(e) => setFilters({...filters, duration: e.target.value})}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009C85] focus:border-transparent outline-none transition-all bg-white text-sm"
          >
            <option value="all">All Durations</option>
            <option value="short">1-3 Days</option>
            <option value="medium">4-7 Days</option>
            <option value="long">8+ Days</option>
          </select>

          {/* Sort By */}
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009C85] focus:border-transparent outline-none transition-all bg-white text-sm"
          >
            <option value="all">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="duration">Duration: Short to Long</option>
            <option value="rating">Rating: High to Low</option>
          </select>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm">
            Showing {filteredPackages.length} of {packages.length} packages
          </p>
        </div>

        {/* Packages Grid */}
        {filteredPackages && filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                {/* Package Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Hotel Rating Badge */}
                  <div className="absolute top-4 left-4 bg-[#009C85] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>
                    {pkg.rating}★ Hotel
                  </div>
                </div>

                {/* Package Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {pkg.title}
                  </h3>

                  {/* Duration and Nights */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      {pkg.days} Days / {pkg.nights} Nights
                    </div>
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-yellow-500">
                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                      </svg>
                      {pkg.rating} Star
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600">From</p>
                      <p className="text-2xl font-bold text-[#009C85]">₹{pkg.price.toLocaleString()}</p>
                    </div>
                    <Link
                      href={`/packages/${pkg.id}`}
                      className="bg-[#009C85] hover:bg-[#008774] text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No packages match your filters. Try adjusting your selection.</p>
          </div>
        )}
      </div>
    </section>
  );
}
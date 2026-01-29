"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Hero({ destinations }) {
  const [query, setQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Filter destinations based on query
  useEffect(() => {
    if (query.trim()) {
      const filtered = destinations.filter((destination) =>
        destination.name?.toLowerCase().includes(query.toLowerCase()) ||
        destination.slug?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDestinations(filtered);
      setShowDropdown(true);
    } else {
      setFilteredDestinations([]);
      setShowDropdown(false);
    }
  }, [query, destinations]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectDestination = (slug) => {
    router.push(`/destination/${slug}`);
    setQuery("");
    setShowDropdown(false);
  };

  const handleExplore = () => {
    if (filteredDestinations.length > 0) {
      handleSelectDestination(filteredDestinations[0].slug);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filteredDestinations.length > 0) {
      handleSelectDestination(filteredDestinations[0].slug);
    }
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Highlight matching text
  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <span key={i} className="font-bold bg-yellow-200 text-gray-900 px-0.5 rounded">{part}</span> 
        : part
    );
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
        }}
      />

      <div className="absolute inset-0 bg-black/57" />

      <div className="relative z-10 text-center max-w-3xl px-4 sm:px-6 py-20">
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Your Next Adventure Starts Here
        </h1>

        <p
          className={`text-base sm:text-lg text-gray-200 mb-6 sm:mb-8 max-w-xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Discover curated tour packages across the world with unforgettable
          experiences.
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative w-full sm:w-85" ref={dropdownRef}>
            {/* Search Icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.trim() && setShowDropdown(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search destination..."
              className="pl-12 pr-4 py-3 rounded-lg text-black w-full border border-white bg-white focus:outline-none focus:ring-2 focus:ring-[#008774] transition-all duration-200"
            />

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl max-h-64 overflow-y-auto z-50 border border-gray-200 animate-slideDown">
                {filteredDestinations.length > 0 ? (
                  <ul className="py-1">
                    {filteredDestinations.map((destination, index) => (
                      <li
                        key={destination.slug}
                        onClick={() => handleSelectDestination(destination.slug)}
                        className={`px-4 py-3 hover:bg-emerald-50 cursor-pointer transition-all duration-150 text-left text-gray-800 group ${
                          index !== filteredDestinations.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="w-5 h-5 text-[#009C85] flex-shrink-0"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                          </svg>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">
                              {highlightMatch(destination.name, query)}
                            </div>
                            {destination.country && (
                              <div className="text-sm text-gray-500 mt-0.5">
                                {destination.country}
                              </div>
                            )}
                          </div>
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={2} 
                            stroke="currentColor" 
                            className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                          </svg>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-8 text-gray-500 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-12 h-12 mx-auto mb-3 opacity-30"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                    <p className="font-semibold text-gray-700">No results found</p>
                    <p className="text-sm mt-1">Try searching for another destination</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={handleExplore}
            className="bg-[#009C85] px-6 py-3 rounded-lg font-semibold hover:bg-[#008774] transition-colors duration-200 whitespace-nowrap shadow-lg hover:shadow-xl transform active:scale-95"
          >
            Explore
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-1000 delay-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        aria-label="Scroll down"
      >
        <div className="flex flex-col items-center gap-2 text-white hover:text-[#009C85] transition-colors cursor-pointer group">
          <span className="text-sm font-medium opacity-75 group-hover:opacity-100 transition-opacity">
            Scroll Down
          </span>
          <div className="animate-bounce">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </div>
        </div>
      </button>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </section>
  );
}
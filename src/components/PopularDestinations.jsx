"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function PopularDestinations({ destinations }) {
  const [imageErrors, setImageErrors] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleImageError = (slug) => {
    setImageErrors(prev => ({ ...prev, [slug]: true }));
  };

  // Intersection Observer for scroll-triggered animation
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

  const scroll = (direction) => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    const totalCards = destinations.length;
    
    if (direction === 'left') {
      setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
    } else {
      setCurrentIndex((prev) => (prev + 1) % totalCards);
    }
    
    setTimeout(() => setIsScrolling(false), 500);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 320 + 24; // card width + gap
    const scrollPosition = currentIndex * cardWidth;
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }, [currentIndex]);

  return (
    <section id="popular-destinations" ref={sectionRef} className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 
            className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Destinations We Offer
          </h2>
          <p 
            className={`text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Explore our handpicked destinations and find your perfect getaway
          </p>
        </div>

        {/* Scrollable Cards Container */}
        <div 
          className={`relative max-w-6xl mx-auto transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Left Button - Desktop only */}
          <button
            onClick={() => scroll('left')}
            disabled={isScrolling}
            className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center"
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Right Button - Desktop only */}
          <button
            onClick={() => scroll('right')}
            disabled={isScrolling}
            className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center"
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Scrollable Container */}
          <div className="overflow-hidden">
            <div
              ref={scrollContainerRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto lg:overflow-x-hidden scroll-smooth scrollbar-hide pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {destinations.map((destination, index) => (
                <div
                  key={destination.slug}
                  className={`group relative overflow-hidden rounded-2xl flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-80 snap-center transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                    {imageErrors[destination.slug] ? (
                      <div className="w-full h-full bg-gradient-to-br from-[#009C85] to-[#008774] flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">
                          {destination.name?.charAt(0) || "?"}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={destination.heroImage || `https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800`}
                        alt={destination.name}
                        onError={() => handleImageError(destination.slug)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    
                    {/* Gradient Overlay - darker on hover */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 group-hover:via-black/50" 
                      style={{ transition: 'background 1.2s ease-in-out' }}
                    ></div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                      {destination.name}
                    </h3>
                    
                    <Link
                      href={`/destination/${destination.slug}`}
                      className="inline-block bg-white text-gray-900 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-100 transition-colors duration-200"
                    >
                      View Packages
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4 sm:mt-6">
            {destinations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                disabled={isScrolling}
                className={`w-2 h-2 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                  index === currentIndex
                    ? 'bg-[#009C85] w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex lg:hidden justify-center gap-4 mt-6">
            <button
              onClick={() => scroll('left')}
              disabled={isScrolling}
              className="bg-white p-3 rounded-full shadow-lg active:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-800"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={isScrolling}
              className="bg-white p-3 rounded-full shadow-lg active:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-800"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
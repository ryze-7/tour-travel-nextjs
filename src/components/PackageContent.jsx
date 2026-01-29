"use client";

import { useState, useEffect, useRef, useMemo } from "react";

export default function PackageContent({ 
  packageData, 
  itinerary, 
  inclusions, 
  exclusions, 
  policies 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const contentRefs = useRef({});
  const sectionRef = useRef(null);

  // Group itinerary by day - use useMemo to prevent recalculation
  const groupedItinerary = useMemo(() => {
    return itinerary.reduce((acc, item) => {
      const day = item.day;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(item);
      return acc;
    }, {});
  }, [itinerary]);

  // Initialize with first day expanded
  const firstDay = useMemo(() => {
    return Object.keys(groupedItinerary).sort((a, b) => a - b)[0];
  }, [groupedItinerary]);

  const [expandedDays, setExpandedDays] = useState(() => 
    firstDay ? { [firstDay]: true } : {}
  );
  const [heights, setHeights] = useState({});

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

  // Calculate heights for smooth animation
  useEffect(() => {
    const newHeights = {};
    Object.keys(groupedItinerary).forEach(day => {
      if (contentRefs.current[day]) {
        newHeights[day] = contentRefs.current[day].scrollHeight;
      }
    });
    setHeights(newHeights);
  }, [groupedItinerary]);

  // Recalculate heights on window resize
  useEffect(() => {
    const handleResize = () => {
      const newHeights = {};
      Object.keys(groupedItinerary).forEach(day => {
        if (contentRefs.current[day]) {
          newHeights[day] = contentRefs.current[day].scrollHeight;
        }
      });
      setHeights(newHeights);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [groupedItinerary]);

  // Toggle day expansion
  const toggleDay = (day) => {
    setExpandedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  return (
    <div ref={sectionRef} className="py-8 sm:py-12">
      {/* Overview Section */}
      {packageData.overview && (
        <div 
          className={`mb-8 sm:mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Overview</h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {packageData.overview}
          </p>
        </div>
      )}

      {/* Day-wise Itinerary - Accordion Style */}
      <div 
        className={`mb-8 sm:mb-12 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Itinerary</h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {Object.keys(groupedItinerary).sort((a, b) => a - b).map((day, index) => {
            const dayItems = groupedItinerary[day];
            const dayTitle = dayItems[0]?.title || `Day ${day}`;
            const isExpanded = expandedDays[day];
            const isFirst = index === 0;
            
            return (
              <div key={day} className={!isFirst ? "border-t border-gray-200" : ""}>
                {/* Day Header - Clickable */}
                <button
                  onClick={() => toggleDay(day)}
                  className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 transition-colors duration-200 text-left"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    
                    <h3 className={`text-sm sm:text-base md:text-lg font-bold transition-colors duration-200 ${
                      isExpanded ? 'text-[#009C85]' : 'text-gray-900'
                    }`}>
                      Day {day}: {dayTitle}
                    </h3>
                  </div>
                  <svg 
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Day Content - Expandable with calculated height */}
                <div 
                  style={{
                    height: isExpanded ? `${heights[day]}px` : '0px',
                    transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  className="overflow-hidden"
                >
                  <div 
                    ref={el => contentRefs.current[day] = el}
                    className="px-3 sm:px-4 pb-3 sm:pb-4"
                  >
                    <ul className="space-y-2 sm:space-y-3">
                      {dayItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 sm:gap-3">
                          <span className="text-gray-900 font-bold flex-shrink-0 mt-0.5 sm:mt-1">•</span>
                          <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                            {item.bullets}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* What's Included */}
      <div 
        className={`mb-8 sm:mb-12 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">What's Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {inclusions.map((item, index) => (
            <div key={index} className="flex items-start gap-2 sm:gap-3">
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#009C85] flex-shrink-0 mt-0.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs sm:text-sm text-gray-700">{item.item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What's Excluded */}
      <div 
        className={`mb-8 sm:mb-12 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">What's Excluded</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {exclusions.map((item, index) => (
            <div key={index} className="flex items-start gap-2 sm:gap-3">
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-xs sm:text-sm text-gray-700">{item.item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Policies */}
      <div 
        className={`transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Policies & Terms</h2>
        
        {/* Group policies by type */}
        {['payment', 'cancellation', 'terms'].map((type) => {
          const typePolicies = policies.filter(p => p.type === type);
          if (typePolicies.length === 0) return null;
          
          return (
            <div key={type} className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 capitalize">
                {type === 'terms' ? 'Terms & Conditions' : `${type} Policy`}
              </h3>
              <div className="space-y-2">
                {typePolicies.map((policy, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3 bg-gray-50 rounded-lg p-2 sm:p-3">
                    <span className="text-[#009C85] font-semibold flex-shrink-0">•</span>
                    <span className="text-xs sm:text-sm text-gray-700">{policy.text}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
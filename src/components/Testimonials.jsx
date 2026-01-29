"use client";

import { useState, useEffect, useRef } from "react";

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, India",
      image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=009C85&color=fff&size=100",
      rating: 5,
      text: "My Marzi planned the perfect honeymoon for us in Bali. Every detail was taken care of, from hotels to activities. The experience was unforgettable!",
      trip: "Bali Honeymoon Package"
    },
    {
      id: 2,
      name: "Rahul Verma",
      location: "Delhi, India",
      image: "https://ui-avatars.com/api/?name=Rahul+Verma&background=009C85&color=fff&size=100",
      rating: 5,
      text: "Excellent service! The team was very professional and responsive. Our family trip to Dubai was amazing. Highly recommended for hassle-free travel.",
      trip: "Dubai Family Tour"
    },
    {
      id: 3,
      name: "Anjali Patel",
      location: "Ahmedabad, India",
      image: "https://ui-avatars.com/api/?name=Anjali+Patel&background=009C85&color=fff&size=100",
      rating: 5,
      text: "Best travel agency I've worked with! They customized our Europe tour perfectly. Great value for money and wonderful support throughout the journey.",
      trip: "European Adventure"
    }
  ];

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

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            What Our Travelers Say
          </h2>
          <p className={`text-base sm:text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Real experiences from real travelers who trusted us with their dream vacations
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 p-6 sm:p-8 relative overflow-hidden group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <svg className="w-16 h-16 text-[#009C85]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Avatar and Info */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full border-4 border-[#009C85]/20"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs text-gray-600">{testimonial.location}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-sm text-gray-700 leading-relaxed mb-3 italic">
                  "{testimonial.text}"
                </p>

                {/* Trip Tag */}
                <div className="inline-block bg-[#009C85]/10 text-[#009C85] px-3 py-1 rounded-full text-xs font-semibold">
                  {testimonial.trip}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const router = useRouter();

  // Helper function for smooth scrolling or navigating
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    if (pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      router.push(`/#${targetId}`);
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <img 
                src="/favicon.ico" 
                alt="Logo" 
                className="w-7 h-7" 
              />
              <span className="text-xl font-bold">MyMarzi</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Because Travel should be your Marzi
            </p>
            <div className="flex gap-4 pt-2">
              {/* Instagram - FIXED TAG OPENING */}
              <a
                href="https://www.instagram.com/mymarzi.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#009C85] transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-800 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={handleHomeClick} className="text-sm text-gray-400 hover:text-[#009C85] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-[#009C85] group-hover:w-4 transition-all"></span>
                  Home
                </button>
              </li>
              <li>
                <button onClick={(e) => handleScrollTo(e, 'popular-destinations')} className="text-sm text-gray-400 hover:text-[#009C85] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-[#009C85] group-hover:w-4 transition-all"></span>
                  Destinations
                </button>
              </li>
              <li>
                <button onClick={(e) => handleScrollTo(e, 'value-proposition')} className="text-sm text-gray-400 hover:text-[#009C85] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-[#009C85] group-hover:w-4 transition-all"></span>
                  Why Choose Us
                </button>
              </li>
              <li>
                <button onClick={(e) => handleScrollTo(e, 'contact-section')} className="text-sm text-gray-400 hover:text-[#009C85] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-[#009C85] group-hover:w-4 transition-all"></span>
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div id="contact-footer">
            <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-800 pb-2">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#009C85]"><path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                <span>142/255, Mukund Nagar, Ghaziabad, UP - 201001</span>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#009C85]"><path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                <a href="tel:+919625675772" className="hover:text-white">+91 9625675772</a>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#009C85]"><path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                <a href="mailto:mymarzi.travel@gmail.com" className="hover:text-white break-all">mymarzi.travel@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Business Details */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-800 pb-2">Business Details</h3>
            <div className="space-y-2 text-sm">
              <span className="text-gray-500 text-xs uppercase tracking-wider">GSTIN</span>
              <p className="text-white font-mono text-base">09GJIPK3167D1Z2</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center md:flex md:justify-between text-sm text-gray-500">
          
        </div>
      </div>
    </footer>
  );
}
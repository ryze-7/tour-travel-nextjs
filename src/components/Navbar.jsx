"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set background based on scroll position
      setIsScrolled(currentScrollY > 10);
      
      // Show/hide navbar based on scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Unified logic for Section Scrolling vs Page Navigation
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsSidebarOpen(false);

    if (pathname === '/') {
      // If on Home page, scroll to the ID
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // If on a different page (like /destination/[slug]), go home first
      router.push(`/#${targetId}`);
    }
  };

  const handleHomeClick = (e) => {
    setIsSidebarOpen(false);
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link
              href="/"
              onClick={handleHomeClick}
              className={`flex items-center gap-2 transition-colors duration-200 ${
                isScrolled ? 'text-gray-900 hover:text-[#009C85]' : 'text-white hover:text-white/80'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span className="text-xl font-bold">My Marzi</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <Link
                href="/"
                onClick={handleHomeClick}
                className={`transition-colors duration-200 font-medium ${
                  isScrolled ? 'text-gray-700 hover:text-[#009C85]' : 'text-white hover:text-white/80'
                }`}
              >
                Home
              </Link>
              <button
                onClick={(e) => handleNavClick(e, 'popular-destinations')}
                className={`transition-colors duration-200 font-medium ${
                  isScrolled ? 'text-gray-700 hover:text-[#009C85]' : 'text-white hover:text-white/80'
                }`}
              >
                Destinations
              </button>
              {/* About Button - Corrected to scroll to ValueProposition */}
              <button
                onClick={(e) => handleNavClick(e, 'value-proposition')}
                className={`transition-colors duration-200 font-medium ${
                  isScrolled ? 'text-gray-700 hover:text-[#009C85]' : 'text-white hover:text-white/80'
                }`}
              >
                About
              </button>
              {/* Contact Button - Corrected to scroll to ContactForm */}
              <button
                onClick={(e) => handleNavClick(e, 'contact-section')}
                className={`transition-colors duration-200 font-medium ${
                  isScrolled ? 'text-gray-700 hover:text-[#009C85]' : 'text-white hover:text-white/80'
                }`}
              >
                Contact
              </button>
            </div>

            {/* Mobile menu button icon */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`md:hidden transition-colors duration-200 ${
                isScrolled ? 'text-gray-700 hover:text-[#009C85]' : 'text-white hover:text-white/80'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
          <button onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4 text-gray-700 hover:text-[#009C85]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col gap-6 p-8 mt-12">
            <Link href="/" onClick={handleHomeClick} className="text-gray-700 hover:text-[#009C85] font-medium text-lg">Home</Link>
            <button onClick={(e) => handleNavClick(e, 'popular-destinations')} className="text-left text-gray-700 hover:text-[#009C85] font-medium text-lg">Destinations</button>
            <button onClick={(e) => handleNavClick(e, 'value-proposition')} className="text-left text-gray-700 hover:text-[#009C85] font-medium text-lg">About</button>
            <button onClick={(e) => handleNavClick(e, 'contact-section')} className="text-left text-gray-700 hover:text-[#009C85] font-medium text-lg">Contact</button>
          </div>
        </div>
      </div>
    </>
  );
}
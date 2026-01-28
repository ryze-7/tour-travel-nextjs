"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [sidebarOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link 
            href="/" 
            className={`text-xl font-bold flex items-center gap-2 transition-colors ${
              scrolled ? "text-gray-900" : "text-white"
            }`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            My Marzi
          </Link>

          {/* Desktop Links */}
          <div className={`hidden md:flex items-center gap-8 text-sm transition-colors ${
            scrolled ? "text-gray-700" : "text-white"
          }`}>
            <Link href="/" className={`transition-colors ${scrolled ? "hover:text-emerald-600" : "hover:text-emerald-400"}`}>
              Home
            </Link>
            <Link href="/destinations" className={`transition-colors ${scrolled ? "hover:text-emerald-600" : "hover:text-emerald-400"}`}>
              Destinations
            </Link>
            <Link href="/about" className={`transition-colors ${scrolled ? "hover:text-emerald-600" : "hover:text-emerald-400"}`}>
              About
            </Link>
            <Link href="/contact" className={`transition-colors ${scrolled ? "hover:text-emerald-600" : "hover:text-emerald-400"}`}>
              Contact
            </Link>
          </div>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden md:block bg-gray-200 px-5 py-2 text-black rounded-lg text-sm font-semibold hover:bg-gray-100"
          >
            Get Started
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`md:hidden transition-colors ${scrolled ? "text-gray-900" : "text-white"}`}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Overlay - only on mobile */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar - only on mobile */}
      <div 
        className={`md:hidden fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 text-gray-900">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span className="font-bold text-lg">My Marzi</span>
          </div>
          
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col p-6 space-y-1">
          <Link 
            href="/" 
            className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-3 rounded-lg transition-all duration-200"
            onClick={() => setSidebarOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/destinations" 
            className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-3 rounded-lg transition-all duration-200"
            onClick={() => setSidebarOpen(false)}
          >
            Destinations
          </Link>
          <Link 
            href="/about" 
            className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-3 rounded-lg transition-all duration-200"
            onClick={() => setSidebarOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-3 rounded-lg transition-all duration-200"
            onClick={() => setSidebarOpen(false)}
          >
            Contact
          </Link>
          
          {/* Get Started Button */}
          <Link
            href="/contact"
            className="bg-[#009C85] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#008774] text-center mt-4 transition-colors duration-200"
            onClick={() => setSidebarOpen(false)}
          >
            Get Started
          </Link>
        </nav>
      </div>
    </>
  );
}
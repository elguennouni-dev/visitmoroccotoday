import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Destinations', path: '/blog?category=destinations' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200/80 shadow-lg' 
        : 'bg-white/90 backdrop-blur-md border-b border-gray-100/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo - Enhanced */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="w-11 h-11 bg-gradient-to-br from-morocco-clay to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl text-gray-900 leading-tight tracking-tight">
                  Visit Morocco
                </span>
                <span className="text-xs text-morocco-clay tracking-[0.2em] uppercase font-semibold mt-0.5">
                  Discover • Explore • Experience
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu - Enhanced */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg mx-1 ${
                  isActive(link.path) 
                    ? 'text-morocco-clay font-semibold' 
                    : 'text-gray-700 hover:text-morocco-clay'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-morocco-clay rounded-full"></span>
                )}
              </Link>
            ))}
            <div className="ml-4 pl-4 border-l border-gray-200">
              <Link 
                to="/blog" 
                className="bg-gradient-to-r from-morocco-clay to-orange-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:from-orange-600 hover:to-orange-700"
              >
                Plan My Trip
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button - Enhanced */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isMenuOpen 
                  ? 'bg-orange-50 text-morocco-clay' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              aria-label="Toggle menu"
            >
              <svg 
                className="h-7 w-7" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Enhanced */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen 
          ? 'max-h-96 opacity-100 visible' 
          : 'max-h-0 opacity-0 invisible'
      }`}>
        <div className="bg-white border-t border-gray-100/80 backdrop-blur-lg px-4 py-3 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  isActive(link.path) 
                    ? 'text-morocco-clay bg-gradient-to-r from-orange-50 to-orange-50/30 border border-orange-100' 
                    : 'text-gray-700 hover:text-morocco-clay hover:bg-gray-50/80'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="ml-2 w-2 h-2 bg-morocco-clay rounded-full inline-block"></span>
                )}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                to="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-gradient-to-r from-morocco-clay to-orange-600 text-white px-4 py-3 rounded-xl text-base font-semibold hover:shadow-lg transition-all duration-200 mt-2 shadow-md"
              >
                Plan My Trip
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
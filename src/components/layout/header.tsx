'use client'
import React, { useEffect, useState } from 'react';
import LogoIcon from '../common/logo-icon'; // Adjust path as needed
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function ActivePointer() {
  return (
    <svg 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-[#f3c334]"
    >
      <path
        d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const pathName = usePathname();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (href: string) => {
    return pathName === href;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed font-playfair top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg border-b border-solid border-b-[#393528]/10' 
          : 'bg-transparent'
      }`}>
      {/* Desktop Layout */}
      <div className="items-center justify-between hidden px-6 py-3 lg:flex xl:px-10">
        {/* Left Navigation */}
        <nav className="flex items-center flex-1 gap-8">
          {navItems.slice(0, 2).map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              {isActive(item.href) && <ActivePointer />}
              <Link 
                className={`text-sm font-medium leading-normal transition-all duration-700 font-inter ${
                  isActive(item.href) 
                    ? 'text-[#f3c334] font-bold' 
                    : isScrolled 
                      ? 'text-black text-shadow-lg' 
                      : 'text-white hover:text-[#f3c334]'
                } ${
                  isScrolled && !isActive(item.href) 
                    ? 'hover:text-lg hover:font-bold hover:text-shadow-xl hover:text-shadow-gray-800/30 text-shadow-lg text-shadow-gray-300' 
                    : ''
                }`} 
                href={item.href}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>

        {/* Centered Logo */}
        <div className={`flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2 transition-colors duration-300 ${
          isScrolled ? 'text-black' : 'text-white'
        }`}>
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className={`w-full h-full rounded-t-md transition-all duration-300 rounded-bl-lg ${isScrolled ? 'bg-transparent' : 'bg-white/90 mt-4'}`}><LogoIcon /></div> 
            {/* <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] font-playfair">
              The CutNeat
            </h2> */}
          </div>
        </div>

        {/* Right Navigation */}
        <nav className="flex items-center justify-end flex-1 gap-8">
          {navItems.slice(2).map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              {isActive(item.href) && <ActivePointer />}
              <Link 
                className={`text-sm font-medium leading-normal transition-all duration-700 font-inter ${
                  isActive(item.href) 
                    ? 'text-[#f3c334] font-bold' 
                    : isScrolled 
                      ? 'text-black font-bold text-shadow-lg' 
                      : 'text-white hover:text-[#f3c334]'
                } ${
                  isScrolled && !isActive(item.href) 
                    ? 'hover:text-lg hover:font-bold hover:text-shadow-xl hover:text-shadow-gray-800/30 text-shadow-lg text-shadow-gray-300' 
                    : ''
                }`} 
                href={item.href}
              >
                {item.name}
              </Link>
            </div>
          ))}
          <button className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f3c334] text-[#181611] text-sm font-bold leading-normal tracking-[0.015em] transition-all duration-300 ml-4 font-inter ${
            isScrolled 
              ? 'hover:bg-[#e6b02e] shadow-md hover:shadow-lg' 
              : 'hover:bg-[#e6b02e] hover:shadow-xl'
          }`}>
            <span className="truncate">Book Now</span>
          </button>
        </nav>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className={`flex items-center justify-between px-4 sm:px-6 py-3 transition-colors duration-300 ${
          isScrolled ? 'text-black' : 'text-white'
        }`}>
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className={`w-full h-full ${isScrolled ? 'bg-transparent' : 'bg-white'}`}><LogoIcon /></div>
            
            {/* <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] font-playfair">
              The CutNeat
            </h2> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="flex flex-col items-center justify-center w-8 h-8 space-y-1.5"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            } ${isScrolled ? 'bg-black' : 'bg-white'}`}></span>
            <span className={`w-6 h-0.5 transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            } ${isScrolled ? 'bg-black' : 'bg-white'}`}></span>
            <span className={`w-6 h-0.5 transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            } ${isScrolled ? 'bg-black' : 'bg-white'}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} 
                        overflow-hidden transition-all duration-300 ease-in-out ${
                          isScrolled ? 'bg-white/95 backdrop-blur-sm' : 'bg-black/20 backdrop-blur-md'
                        } border-t ${
                          isScrolled ? 'border-[#393528]/10' : 'border-white/10'
                        }`}>
          <nav className="flex flex-col px-4 py-4 space-y-4 sm:px-6">
            {navItems.map((item) => (
              <div key={item.name} className="flex items-center gap-3 py-2">
                {isActive(item.href) && <ActivePointer />}
                <Link 
                  className={`text-base font-medium leading-normal transition-colors duration-200 font-inter ${
                    isActive(item.href) 
                      ? 'text-[#f3c334]' 
                      : isScrolled 
                        ? 'text-black hover:text-[#f3c334]' 
                        : 'text-white hover:text-[#f3c334]'
                  }`} 
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
            <button className={`flex w-full sm:w-auto sm:max-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-[#f3c334] text-[#181611] text-base font-bold leading-normal tracking-[0.015em] transition-all duration-300 mt-4 font-inter ${
              isScrolled 
                ? 'hover:bg-[#e6b02e] shadow-md hover:shadow-lg' 
                : 'hover:bg-[#e6b02e] hover:shadow-xl'
            }`}>
              <span className="truncate">Book Now</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
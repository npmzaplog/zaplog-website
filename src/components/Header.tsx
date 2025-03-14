import React, { useState, useEffect } from 'react';
import { Zap, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking a nav link
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-indigo-400" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Zaplog</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-sm">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#examples" className="hover:text-indigo-400 transition-colors">Examples</a>
            <a href="#log-levels" className="hover:text-indigo-400 transition-colors">Log Levels</a>
            <a href="#configuration" className="hover:text-indigo-400 transition-colors">Configuration</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.npmjs.com/package/zaplog" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden md:block text-sm font-medium px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              npm
            </a>
            <a 
              href="https://github.com/MAliHassanDev/zaplog" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden md:flex text-sm font-medium px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 transition-colors"
            >
              GitHub
            </a>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white focus:outline-none" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Side Menu */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-slate-900 z-50 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button 
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white focus:outline-none"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="px-6 py-4">
            <div className="flex items-center space-x-2 mb-8">
              <Zap className="h-6 w-6 text-indigo-400" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Zaplog</span>
            </div>

            <nav className="flex flex-col space-y-6">
              <a 
                href="#features" 
                className="text-lg hover:text-indigo-400 transition-colors" 
                onClick={handleNavClick}
              >
                Features
              </a>
              <a 
                href="#examples" 
                className="text-lg hover:text-indigo-400 transition-colors"
                onClick={handleNavClick}
              >
                Examples
              </a>
              <a 
                href="#log-levels" 
                className="text-lg hover:text-indigo-400 transition-colors"
                onClick={handleNavClick}
              >
                Log Levels
              </a>
              <a 
                href="#configuration" 
                className="text-lg hover:text-indigo-400 transition-colors"
                onClick={handleNavClick}
              >
                Configuration
              </a>
            </nav>

            <div className="mt-8 flex flex-col space-y-4">
              <a 
                href="https://www.npmjs.com/package/zaplog" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-center text-sm font-medium px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700 transition-colors"
                onClick={handleNavClick}
              >
                npm
              </a>
              <a 
                href="https://github.com/MAliHassanDev/zaplog" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-center text-sm font-medium px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 transition-colors"
                onClick={handleNavClick}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
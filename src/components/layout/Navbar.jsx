import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Offers', href: '#offers' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-brand-burgundy/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className={`font-serif text-2xl md:text-3xl font-bold tracking-wider ${isScrolled ? 'text-brand-gold' : 'text-brand-cream'}`}>
            THE ROYAL SPICE
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-medium hover:text-brand-gold transition-colors ${isScrolled ? 'text-brand-cream' : 'text-brand-cream/90'}`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#reservation"
              className="bg-brand-gold text-brand-burgundy px-6 py-2 rounded-full font-semibold hover:bg-white transition-colors"
            >
              Book Table
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${isScrolled ? 'text-brand-gold' : 'text-brand-cream'} focus:outline-none`}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-burgundy absolute top-full left-0 w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-3 text-base font-medium text-brand-cream hover:text-brand-gold hover:bg-brand-burgundy/80 rounded-md"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#reservation"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center mt-4 bg-brand-gold text-brand-burgundy px-6 py-3 rounded-full font-semibold"
            >
              Book Table
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

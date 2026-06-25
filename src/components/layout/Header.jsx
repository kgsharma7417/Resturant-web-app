import { User, Menu as MenuIcon, X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { totalItems } = useCart();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 100 && latest > previous && !mobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <>
      <motion.header 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 w-full z-50 transition-colors duration-500 border-b ${scrolled || mobileMenuOpen ? 'bg-brand-dark/90 backdrop-blur-xl border-brand-gold/10 shadow-2xl py-4' : 'bg-transparent border-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="font-serif font-bold text-3xl tracking-widest text-brand-gold hover:text-brand-white transition-colors uppercase">
            TANATAN
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <a href="#about" className="text-sm tracking-[0.2em] uppercase text-brand-white hover:text-brand-gold transition-colors">Story</a>
            <a href="#full-menu" className="text-sm tracking-[0.2em] uppercase text-brand-white hover:text-brand-gold transition-colors">Menu</a>
            <a href="#reservation" className="text-sm tracking-[0.2em] uppercase text-brand-white hover:text-brand-gold transition-colors">Reservation</a>
            
            {/* Cart Icon (Desktop) */}
            <div className="relative cursor-pointer hover:text-brand-gold transition-colors text-brand-white flex items-center">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>

            <Link to="/admin" className="text-sm tracking-[0.2em] uppercase text-brand-gold border border-brand-gold px-6 py-2 hover:bg-brand-gold hover:text-brand-dark transition-all flex items-center gap-2">
              <User size={14} /> Admin
            </Link>
          </nav>

          {/* Mobile Actions removed since we use MobileBottomNav */}

        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20"
          >
            <nav className="flex flex-col items-center gap-8 text-center w-full px-6">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-xl tracking-[0.2em] uppercase text-brand-white hover:text-brand-gold transition-colors block w-full py-2">Story</a>
              <a href="#full-menu" onClick={() => setMobileMenuOpen(false)} className="text-xl tracking-[0.2em] uppercase text-brand-white hover:text-brand-gold transition-colors block w-full py-2">Menu</a>
              <a href="#reservation" onClick={() => setMobileMenuOpen(false)} className="text-xl tracking-[0.2em] uppercase text-brand-white hover:text-brand-gold transition-colors block w-full py-2">Reservation</a>
              
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="mt-8 text-lg tracking-[0.2em] uppercase text-brand-gold border border-brand-gold px-8 py-3 rounded-full hover:bg-brand-gold hover:text-brand-dark transition-all flex items-center gap-2">
                <User size={18} /> Admin Access
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

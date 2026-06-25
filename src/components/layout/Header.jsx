import { User, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { useSettings } from '../../contexts/SettingsContext';

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { totalItems, setIsCartOpen } = useCart();
  const { settings } = useSettings();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 100 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-black/60 backdrop-blur-2xl border-white/10 shadow-2xl py-4' : 'bg-transparent border-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="font-serif font-bold text-2xl md:text-3xl tracking-widest text-brand-gold hover:text-white transition-all uppercase drop-shadow-lg">
          {settings?.restaurantName || 'TANATAN'}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <a href="#about" className="text-sm tracking-[0.2em] uppercase text-gray-300 hover:text-brand-gold transition-colors font-medium">Story</a>
          <a href="#full-menu" className="text-sm tracking-[0.2em] uppercase text-gray-300 hover:text-brand-gold transition-colors font-medium">Menu</a>
          <a href="#reservation" className="text-sm tracking-[0.2em] uppercase text-gray-300 hover:text-brand-gold transition-colors font-medium">Reservation</a>
          
          {/* Cart Icon (Desktop) */}
          <button onClick={() => setIsCartOpen(true)} className="relative cursor-pointer hover:text-brand-gold transition-colors text-white flex items-center">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <Link to="/admin" className="text-xs tracking-[0.2em] uppercase text-brand-gold border border-brand-gold/30 px-6 py-2.5 hover:bg-brand-gold hover:text-brand-dark transition-all flex items-center gap-2 rounded-full backdrop-blur-sm">
            <User size={14} /> Admin
          </Link>
        </nav>

        {/* Mobile Actions - Top Header */}
        <div className="flex md:hidden items-center gap-4">
          <button onClick={() => setIsCartOpen(true)} className="relative text-white hover:text-brand-gold transition-colors">
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>

      </div>
    </motion.header>
  );
}

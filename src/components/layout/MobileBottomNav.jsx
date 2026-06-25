import { Home, Menu as MenuIcon, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

export default function MobileBottomNav() {
  const { cart, setIsCartOpen } = useCart();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-dark/95 backdrop-blur-md border-t border-brand-gray z-50 px-6 py-3 safe-area-pb">
      <div className="flex justify-between items-center">
        <a href="#home" className="flex flex-col items-center gap-1 text-brand-textLight hover:text-brand-orange transition-colors">
          <Home size={22} />
          <span className="text-[10px] font-medium uppercase tracking-wider">Home</span>
        </a>
        
        <a href="#full-menu" className="flex flex-col items-center gap-1 text-brand-textLight hover:text-brand-orange transition-colors">
          <MenuIcon size={22} />
          <span className="text-[10px] font-medium uppercase tracking-wider">Menu</span>
        </a>
        
        <button onClick={() => setIsCartOpen(true)} className="relative flex flex-col items-center gap-1 text-brand-textLight hover:text-brand-orange transition-colors">
          <ShoppingBag size={22} />
          {totalItems > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-brand-orange text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full"
            >
              {totalItems}
            </motion.span>
          )}
          <span className="text-[10px] font-medium uppercase tracking-wider">Cart</span>
        </button>
        
        <Link to="/admin" className="flex flex-col items-center gap-1 text-brand-textLight hover:text-brand-orange transition-colors">
          <User size={22} />
          <span className="text-[10px] font-medium uppercase tracking-wider">Admin</span>
        </Link>
      </div>
    </div>
  );
}

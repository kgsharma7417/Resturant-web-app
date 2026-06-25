import { motion } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import LazyImage from '../ui/LazyImage';
import { Plus, Minus, ShoppingBag } from 'lucide-react';

export default function MenuItemCard({ item }) {
  const { cart, addToCart, removeFromCart } = useCart();
  const cartItem = cart.find(i => i.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex flex-row gap-4 bg-[#111] border border-white/5 rounded-2xl p-4 hover:bg-white/5 transition-all duration-300 group shadow-lg hover:shadow-2xl hover:border-brand-gold/30"
    >
      {/* Left: Content */}
      <div className="flex-1 flex flex-col justify-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${item.isVeg ? 'border-green-500' : 'border-red-500'}`}>
              <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            {item.isMustTry && (
              <span className="text-[9px] bg-brand-gold/10 text-brand-gold border border-brand-gold/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(255,87,34,0.2)]">Bestseller</span>
            )}
          </div>
          
          <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-brand-gold transition-colors mt-1 tracking-wide">{item.name}</h3>
          {item.nameHi && <p className="text-xs text-gray-400 mb-1">{item.nameHi}</p>}
          <div className="mt-2 font-bold text-brand-gold text-base drop-shadow-md">₹{item.price}</div>
        </div>
        <p className="text-gray-400 text-xs sm:text-sm mt-3 line-clamp-2 leading-relaxed font-light pr-2">{item.description}</p>
      </div>

      {/* Right: Image & Actions */}
      <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] shrink-0 relative flex flex-col items-center">
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner border border-white/10 group-hover:border-brand-gold/30 transition-colors">
          <LazyImage 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Floating Add Button */}
        <div className="absolute -bottom-4 w-11/12 h-9 shadow-[0_4px_15px_rgba(0,0,0,0.5)] bg-brand-dark border border-brand-gold/40 text-brand-gold font-bold text-sm rounded-xl flex items-center justify-between overflow-hidden select-none hover:shadow-[0_4px_20px_rgba(255,87,34,0.3)] hover:-translate-y-0.5 transition-all z-10 backdrop-blur-md">
          {quantity === 0 ? (
            <button 
              onClick={() => addToCart(item)}
              className="w-full h-full flex items-center justify-center uppercase hover:bg-brand-gold hover:text-brand-dark transition-colors tracking-wider text-xs gap-1"
            >
              <ShoppingBag size={14} /> Add
            </button>
          ) : (
            <div className="flex w-full h-full bg-brand-gold text-brand-dark">
              <button 
                onClick={() => removeFromCart(item.id)}
                className="w-1/3 h-full flex items-center justify-center hover:bg-black/10 active:bg-black/20 transition-colors"
              >
                <Minus size={14} strokeWidth={3} />
              </button>
              <span className="w-1/3 h-full flex items-center justify-center font-black text-sm bg-white/20">
                {quantity}
              </span>
              <button 
                onClick={() => addToCart(item)}
                className="w-1/3 h-full flex items-center justify-center hover:bg-black/10 active:bg-black/20 transition-colors"
              >
                <Plus size={14} strokeWidth={3} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

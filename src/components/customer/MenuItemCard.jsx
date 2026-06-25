import { motion } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';

export default function MenuItemCard({ item }) {
  const { cart, addToCart, removeFromCart } = useCart();
  const cartItem = cart.find(i => i.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex justify-between gap-4 py-8 border-b border-gray-100 last:border-b-0 group"
    >
      {/* Details */}
      <div className="flex-1 max-w-[60%] sm:max-w-[70%]">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-4 h-4 border flex items-center justify-center rounded-sm shadow-sm ${item.isVeg ? 'border-green-600 bg-green-50' : 'border-red-600 bg-red-50'}`}>
            <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
          </div>
          {item.isMustTry && (
            <span className="text-[10px] text-brand-orange font-bold uppercase tracking-wider bg-orange-100 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span> Bestseller
            </span>
          )}
        </div>
        
        <h3 className="font-bold text-brand-dark text-lg sm:text-xl mb-1 group-hover:text-brand-orange transition-colors">{item.name}</h3>
        <p className="font-bold text-brand-dark text-base mb-3 tracking-tight">₹{item.price}</p>
        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{item.description}</p>
      </div>

      {/* Image & Add Button */}
      <div className="w-[120px] sm:w-[160px] shrink-0 relative flex flex-col items-center">
        <div className="w-full h-[120px] sm:h-[140px] rounded-2xl overflow-hidden shadow-sm bg-gray-50 border border-gray-100 group-hover:shadow-md transition-shadow">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="absolute -bottom-5 w-24 sm:w-28 h-10 shadow-lg bg-white text-green-600 font-extrabold text-sm rounded-xl flex items-center justify-between border border-gray-200 overflow-hidden select-none hover:shadow-xl hover:scale-105 transition-all">
          {quantity === 0 ? (
            <button 
              onClick={() => addToCart(item)}
              className="w-full h-full flex items-center justify-center uppercase hover:bg-green-50 active:bg-green-100 transition-colors"
            >
              Add
            </button>
          ) : (
            <>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="w-1/3 h-full flex items-center justify-center text-lg hover:bg-green-50 active:bg-green-100 text-gray-500 transition-colors"
              >-</button>
              <span className="w-1/3 h-full flex items-center justify-center text-green-600 bg-green-50/50">{quantity}</span>
              <button 
                onClick={() => addToCart(item)}
                className="w-1/3 h-full flex items-center justify-center text-lg hover:bg-green-50 active:bg-green-100 transition-colors"
              >+</button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

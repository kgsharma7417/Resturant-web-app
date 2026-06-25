import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useOrders } from '../../contexts/OrdersContext';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CartDrawer() {
  const { cart, cartTotal, totalItems, addToCart, removeFromCart, clearCart, isCartOpen, setIsCartOpen } = useCart();
  const { addOrder } = useOrders();

  const handleCheckout = () => {
    const finalTotal = cartTotal + 40 + Math.round(cartTotal * 0.05);
    
    addOrder({
      items: cart,
      total: finalTotal,
    });

    toast.success('Order placed successfully! Check Admin Dashboard.');
    clearCart();
    setIsOpen(false);
  };

  return (
    <>
      {/* Removed Redundant Floating Bottom Bar */}

      {/* Cart Drawer Popup */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            ></motion.div>

            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed bottom-0 left-0 w-full sm:w-[450px] sm:left-auto sm:right-0 h-[85vh] sm:h-full bg-brand-light z-50 rounded-t-2xl sm:rounded-none flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100 shrink-0">
                <h2 className="font-bold text-xl flex items-center gap-2 text-brand-dark">
                  <ShoppingBag className="text-brand-orange" /> My Cart
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 bg-white">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-brand-gray">
                    <ShoppingBag size={64} className="opacity-20 mb-4" />
                    <p className="font-medium text-lg text-brand-dark mb-1">Your cart is empty</p>
                    <p className="text-sm">You can go to home page to view more restaurants</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-start gap-3 w-1/2">
                          <div className={`mt-1 shrink-0 w-3.5 h-3.5 border flex items-center justify-center rounded-sm ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                            <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                          </div>
                          <span className="font-medium text-brand-dark text-sm leading-tight">{item.name}</span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-8 shadow-sm bg-white text-green-600 font-bold text-sm rounded flex items-center justify-between border border-gray-200">
                            <button onClick={() => removeFromCart(item.id)} className="w-1/3 h-full hover:bg-gray-50">-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => addToCart(item)} className="w-1/3 h-full hover:bg-gray-50">+</button>
                          </div>
                          <span className="font-medium text-brand-gray w-12 text-right text-sm">₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                    ))}
                    
                    {/* Bill Details */}
                    <div className="mt-8 pt-6 border-t border-dashed border-gray-300">
                      <h3 className="font-bold text-brand-dark mb-4 text-sm uppercase">Bill Details</h3>
                      <div className="space-y-2 text-sm text-brand-gray">
                        <div className="flex justify-between">
                          <span>Item Total</span>
                          <span>₹{cartTotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery Fee</span>
                          <span>₹40</span>
                        </div>
                        <div className="flex justify-between">
                          <span>GST and Restaurant Charges</span>
                          <span>₹{Math.round(cartTotal * 0.05)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 font-bold text-brand-dark text-lg">
                        <span>To Pay</span>
                        <span>₹{cartTotal + 40 + Math.round(cartTotal * 0.05)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Checkout Button */}
              {cart.length > 0 && (
                <div className="p-4 bg-white border-t border-gray-100 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-brand-orange hover:bg-[#E64A19] text-white font-bold py-4 rounded-xl text-lg flex items-center justify-between px-6 transition-colors shadow-lg"
                  >
                    <span>Proceed to Pay</span>
                    <span>₹{cartTotal + 40 + Math.round(cartTotal * 0.05)} &rarr;</span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

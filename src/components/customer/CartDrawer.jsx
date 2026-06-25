import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useOrders } from '../../contexts/OrdersContext';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CartDrawer() {
  const { cart, cartTotal, totalItems, addToCart, removeFromCart, clearCart, isCartOpen, setIsCartOpen } = useCart();
  const { addOrder } = useOrders();
  
  // 'cart' | 'checkout' | 'success'
  const [step, setStep] = useState('cart');
  
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    diningPreference: 'Dine-in',
    tableNumber: ''
  });

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    
    if (!checkoutForm.name || !checkoutForm.phone) {
      toast.error('Please enter your name and phone number');
      return;
    }

    const finalTotal = cartTotal + 40 + Math.round(cartTotal * 0.05);
    
    addOrder({
      items: cart,
      total: finalTotal,
      customerDetails: checkoutForm
    });

    setStep('success');
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setTimeout(() => setStep('cart'), 300); // reset step after animation
  };

  const handleSuccessClose = () => {
    clearCart();
    setCheckoutForm({ name: '', phone: '', diningPreference: 'Dine-in', tableNumber: '' });
    handleClose();
  };

  return (
    <>
      {/* Cart Drawer Popup */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={step === 'success' ? handleSuccessClose : handleClose}
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
              {step !== 'success' && (
                <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100 shrink-0">
                  <div className="flex items-center gap-3">
                    {step === 'checkout' && (
                      <button onClick={() => setStep('cart')} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft size={20} />
                      </button>
                    )}
                    <h2 className="font-bold text-xl flex items-center gap-2 text-brand-dark">
                      {step === 'cart' ? <><ShoppingBag className="text-brand-orange" /> My Cart</> : 'Checkout Details'}
                    </h2>
                  </div>
                  <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full">
                    <X size={24} />
                  </button>
                </div>
              )}

              {/* Step 1: Cart Items */}
              {step === 'cart' && (
                <div className="flex-1 overflow-y-auto p-4 bg-white flex flex-col">
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
                            <span>Delivery/Service Fee</span>
                            <span>₹40</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxes (5%)</span>
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
              )}

              {/* Step 2: Checkout Form */}
              {step === 'checkout' && (
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50 flex flex-col">
                  <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-6">
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Full Name *</label>
                        <input 
                          type="text" required
                          value={checkoutForm.name}
                          onChange={e => setCheckoutForm({...checkoutForm, name: e.target.value})}
                          className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
                          placeholder="e.g. Rahul Sharma"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Phone Number *</label>
                        <input 
                          type="tel" required
                          value={checkoutForm.phone}
                          onChange={e => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                          className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Dining Preference</label>
                        <div className="flex gap-4">
                          <label className="flex-1 flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-all has-[:checked]:bg-brand-orange/10 has-[:checked]:border-brand-orange has-[:checked]:text-brand-orange">
                            <input 
                              type="radio" name="dining" value="Dine-in" className="hidden"
                              checked={checkoutForm.diningPreference === 'Dine-in'}
                              onChange={e => setCheckoutForm({...checkoutForm, diningPreference: e.target.value})}
                            />
                            <span className="font-bold text-sm">Dine-in</span>
                          </label>
                          <label className="flex-1 flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-all has-[:checked]:bg-brand-orange/10 has-[:checked]:border-brand-orange has-[:checked]:text-brand-orange">
                            <input 
                              type="radio" name="dining" value="Takeaway" className="hidden"
                              checked={checkoutForm.diningPreference === 'Takeaway'}
                              onChange={e => setCheckoutForm({...checkoutForm, diningPreference: e.target.value})}
                            />
                            <span className="font-bold text-sm">Takeaway</span>
                          </label>
                        </div>
                      </div>

                      {checkoutForm.diningPreference === 'Dine-in' && (
                        <div className="animate-fade-in">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Table Number (Optional)</label>
                          <input 
                            type="text"
                            value={checkoutForm.tableNumber}
                            onChange={e => setCheckoutForm({...checkoutForm, tableNumber: e.target.value})}
                            className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
                            placeholder="e.g. Table 4"
                          />
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              )}

              {/* Step 3: Success */}
              {step === 'success' && (
                <div className="flex-1 p-6 bg-brand-dark flex flex-col items-center justify-center text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                    className="w-24 h-24 bg-brand-gold/20 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 size={48} className="text-brand-gold" />
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-serif font-bold text-white mb-4"
                  >
                    Order Received!
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-400 mb-8 max-w-xs leading-relaxed"
                  >
                    Thank you, {checkoutForm.name}. Your culinary experience is being prepared by our chefs.
                  </motion.p>
                  
                  <motion.button 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    onClick={handleSuccessClose}
                    className="bg-brand-gold text-brand-dark px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-colors"
                  >
                    Return to Menu
                  </motion.button>
                </div>
              )}

              {/* Footer Button */}
              {cart.length > 0 && step === 'cart' && (
                <div className="p-4 bg-white border-t border-gray-100 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <button 
                    onClick={() => setStep('checkout')}
                    className="w-full bg-brand-orange hover:bg-[#E64A19] text-white font-bold py-4 rounded-xl text-lg flex items-center justify-between px-6 transition-colors shadow-lg"
                  >
                    <span>Proceed to Checkout</span>
                    <span>₹{cartTotal + 40 + Math.round(cartTotal * 0.05)} &rarr;</span>
                  </button>
                </div>
              )}

              {step === 'checkout' && (
                <div className="p-4 bg-white border-t border-gray-100 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <button 
                    type="submit"
                    form="checkout-form"
                    className="w-full bg-brand-orange hover:bg-[#E64A19] text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center transition-colors shadow-lg"
                  >
                    Place Order - ₹{cartTotal + 40 + Math.round(cartTotal * 0.05)}
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

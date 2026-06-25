import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMenu } from '../../contexts/MenuContext';
import { useCart } from '../../contexts/CartContext';
import { Search, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

export default function Menu() {
  const { menuItems, categories } = useMenu();
  const { addToCart } = useCart();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [filter, setFilter] = useState('All'); // All, Veg, Non-Veg
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMenu = menuItems.filter(item => {
    const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
    const vegMatch = filter === 'All' || (filter === 'Veg' && item.isVeg) || (filter === 'Non-Veg' && !item.isVeg);
    const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (item.nameHi && item.nameHi.includes(searchQuery)) ||
                        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && vegMatch && searchMatch;
  });

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      icon: '🛒'
    });
  };

  return (
    <section id="full-menu" className="py-32 bg-[#050403] relative border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-brand-gold text-sm uppercase tracking-[0.3em] mb-4">Our Complete Selection</h4>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-white mb-8 leading-tight">
            The Royal Menu
          </h2>
        </motion.div>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6 bg-brand-dark/50 p-6 rounded-2xl border border-brand-gold/20">
          
          {/* Categories */}
          <div className="flex overflow-x-auto pb-2 w-full lg:w-1/2 scrollbar-hide space-x-3">
            <button
              onClick={() => setActiveCategory('All')}
              className={`whitespace-nowrap px-6 py-2 rounded-full font-medium transition-all duration-300 border ${
                activeCategory === 'All' 
                  ? 'bg-brand-gold text-brand-dark border-brand-gold shadow-[0_0_15px_rgba(130,71,13,0.4)]' 
                  : 'bg-transparent text-brand-textLight border-brand-gold/30 hover:border-brand-gold'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-2 rounded-full font-medium transition-all duration-300 border ${
                  activeCategory === cat 
                    ? 'bg-brand-gold text-brand-dark border-brand-gold shadow-[0_0_15px_rgba(130,71,13,0.4)]' 
                    : 'bg-transparent text-brand-textLight border-brand-gold/30 hover:border-brand-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <input 
                type="text" 
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-dark border border-brand-gold/30 text-brand-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-brand-gold placeholder-brand-textLight/50"
              />
              <Search className="absolute left-3 top-2.5 text-brand-gold/70" size={18} />
            </div>

            {/* Veg / Non-Veg Toggle */}
            <div className="flex bg-brand-dark rounded-full p-1 border border-brand-gold/30 shrink-0">
              {['All', 'Veg', 'Non-Veg'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === f ? 'bg-brand-gold text-brand-dark' : 'text-brand-textLight hover:text-brand-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence>
            {filteredMenu.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={item.id} 
                className="flex flex-row gap-4 bg-brand-dark/40 border-b border-brand-gray/50 py-6 hover:bg-brand-gray/10 transition-all duration-300 group"
              >
                {/* Left: Content */}
                <div className="flex-1 flex flex-col">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                        <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                      </div>
                      {item.isMustTry && (
                        <span className="text-[10px] bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded font-bold uppercase tracking-wider">Bestseller</span>
                      )}
                    </div>
                    
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-white group-hover:text-brand-orange transition-colors mt-1">{item.name}</h3>
                    <p className="text-xs text-brand-textLight/50 mb-1">{item.nameHi}</p>
                    <span className="font-bold text-brand-textLight text-base">₹{item.price}</span>
                  </div>
                  <p className="text-brand-textLight/70 text-sm mt-3 line-clamp-2 leading-relaxed font-light pr-4">{item.description}</p>
                </div>

                {/* Right: Image & Add Button */}
                <div className="relative w-36 h-36 shrink-0 sm:w-44 sm:h-44">
                  <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg border border-brand-gray/30">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                  
                  {/* Floating Add Button */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full flex justify-center">
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="bg-brand-orange text-brand-dark hover:bg-white border-2 border-brand-dark px-8 py-2 rounded-xl shadow-xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredMenu.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-20 text-brand-textLight/50 font-light tracking-widest uppercase"
          >
            No dishes found matching your criteria.
          </motion.div>
        )}

      </div>
    </section>
  );
}

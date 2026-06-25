import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMenu } from '../../contexts/MenuContext';
import { Search } from 'lucide-react';
import MenuItemCard from '../customer/MenuItemCard';

export default function Menu() {
  const { menuItems, categories } = useMenu();
  
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
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-8 leading-tight drop-shadow-lg">
            The Royal Menu
          </h2>
        </motion.div>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6 bg-[#111]/80 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-2xl">
          
          {/* Categories */}
          <div className="flex overflow-x-auto pb-2 w-full lg:w-1/2 scrollbar-hide space-x-3">
            <button
              onClick={() => setActiveCategory('All')}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-300 border ${
                activeCategory === 'All' 
                  ? 'bg-brand-gold text-brand-dark border-brand-gold shadow-[0_0_15px_rgba(255,87,34,0.4)]' 
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-brand-gold/50 hover:text-white'
              }`}
            >
              All
            </button>
            {categories.filter(cat => cat.toLowerCase() !== 'all').map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-300 border ${
                  activeCategory === cat 
                    ? 'bg-brand-gold text-brand-dark border-brand-gold shadow-[0_0_15px_rgba(255,87,34,0.4)]' 
                    : 'bg-transparent text-gray-400 border-white/10 hover:border-brand-gold/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
            {/* Search */}
            <div className="relative w-full sm:w-64 group">
              <input 
                type="text" 
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-brand-gold focus:shadow-[0_0_15px_rgba(255,87,34,0.2)] transition-all placeholder-gray-600"
              />
              <Search className="absolute left-4 top-3 text-gray-500 group-focus-within:text-brand-gold transition-colors" size={20} />
            </div>

            {/* Veg / Non-Veg Toggle */}
            <div className="flex bg-[#0a0a0a] rounded-full p-1.5 border border-white/10 shrink-0">
              {['All', 'Veg', 'Non-Veg'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    filter === f ? 'bg-brand-gold text-brand-dark shadow-md' : 'text-gray-500 hover:text-white hover:bg-white/5'
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-12"
        >
          <AnimatePresence>
            {filteredMenu.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredMenu.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-32 text-gray-500 font-light tracking-[0.2em] uppercase flex flex-col items-center gap-4"
          >
            <Search size={48} className="text-gray-700 mb-2" />
            <p>No culinary delights found matching your criteria.</p>
          </motion.div>
        )}

      </div>
    </section>
  );
}

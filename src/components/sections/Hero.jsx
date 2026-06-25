import { motion, useScroll, useTransform } from 'framer-motion';
import { useSettings } from '../../contexts/SettingsContext';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const { settings } = useSettings();

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
      <motion.div style={{ y }} className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]">
        <img 
          src={settings?.heroImage || "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1920&q=80"} 
          alt={settings?.restaurantName || "Hero"} 
          className="w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
        {/* Improved gradient overlay for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-brand-dark"></div>
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-brand-gold mb-6 tracking-tight uppercase drop-shadow-2xl" style={{ textShadow: '0px 4px 30px rgba(255, 87, 34, 0.4)' }}>
              {settings?.restaurantName || 'Tanatan'}
            </h1>
          </motion.div>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.4em] uppercase text-gray-300 mb-12 font-medium drop-shadow-lg">
            {settings?.tagline || 'A contemporary dining experience'}
          </p>
          <motion.a 
            href="#reservation"
            whileHover={{ scale: 1.02, boxShadow: "0px 0px 30px rgba(255, 87, 34, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="inline-block border border-brand-gold/60 text-brand-gold px-12 py-5 uppercase tracking-[0.2em] text-xs sm:text-sm font-bold hover:bg-brand-gold hover:text-brand-dark transition-all duration-500 backdrop-blur-sm rounded-none"
          >
            Reserve a Table
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <a href="#about" className="text-brand-gold/50 hover:text-brand-gold transition-colors flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
          <div className="w-[1px] h-[40px] bg-gradient-to-b from-brand-gold to-transparent"></div>
        </a>
      </motion.div>
    </section>
  );
}

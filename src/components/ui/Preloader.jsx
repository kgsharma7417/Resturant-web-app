import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const { settings } = useSettings();

  useEffect(() => {
    // Wait 2.5 seconds before hiding preloader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#050403] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-[100px]"></div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Text Animation */}
            <motion.div className="overflow-hidden">
              <motion.h1 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="font-serif text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-[#ffd700] to-brand-gold tracking-widest uppercase mb-6"
              >
                {settings?.restaurantName || 'TANATAN'}
              </motion.h1>
            </motion.div>

            {/* Loading Line */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-y-0 left-0 w-1/2 bg-brand-gold rounded-full"
              ></motion.div>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-brand-gold/60 text-xs font-bold uppercase tracking-[0.3em]"
            >
              Curating your experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

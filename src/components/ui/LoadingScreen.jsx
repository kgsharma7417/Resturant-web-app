import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-burgundy text-brand-cream"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-24 h-24 mb-4 border-4 border-brand-gold rounded-full flex items-center justify-center"
          >
            <span className="font-serif text-4xl font-bold text-brand-gold">RS</span>
          </motion.div>
          <h1 className="text-3xl font-serif tracking-widest">THE ROYAL SPICE</h1>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-brand-gold">Loading Experience</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

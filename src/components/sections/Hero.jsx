import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]">
        <img 
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1920&q=80" 
          alt="Tanatan Hero" 
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-transparent to-brand-dark"></div>
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-brand-gold mb-6 tracking-tight uppercase" style={{ textShadow: '2px 2px 20px rgba(130, 71, 13, 0.4)' }}>
              Tanatan
            </h1>
          </motion.div>
          <p className="text-sm sm:text-lg tracking-[0.3em] uppercase text-brand-white/80 mb-12">
            A contemporary dining experience
          </p>
          <motion.a 
            href="#reservation"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(201,168,76,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-block border border-brand-gold text-brand-gold px-10 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 backdrop-blur-sm"
          >
            Discover More
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <a href="#about" className="text-brand-gold/70 hover:text-brand-gold transition-colors">
          <div className="w-[30px] h-[50px] rounded-full border-2 border-current flex justify-center p-2">
            <div className="w-1 h-3 bg-current rounded-full"></div>
          </div>
        </a>
      </motion.div>
    </section>
  );
}

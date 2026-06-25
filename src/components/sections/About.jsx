import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-32 relative bg-brand-dark overflow-hidden border-t border-brand-gold/10">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="relative h-[500px] sm:h-[600px] overflow-hidden group rounded-sm"
        >
          <div className="absolute inset-0 border border-brand-gold/30 translate-x-4 translate-y-4 sm:translate-x-6 sm:translate-y-6 z-0 transition-transform duration-700 group-hover:translate-x-3 group-hover:translate-y-3"></div>
          <motion.div
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="absolute inset-0 z-10"
          >
            <div className="absolute inset-0 bg-brand-dark/20 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80" 
              alt="Ambience" 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10"
        >
          <h4 className="text-brand-gold text-sm sm:text-base uppercase tracking-[0.3em] mb-4 font-semibold">Our Story</h4>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-white mb-8 leading-tight drop-shadow-lg">
            Creating Culinary Memories Where Taste and Ambience Collide!
          </h2>
          <p className="text-brand-textLight/80 text-lg leading-relaxed mb-8 font-sans font-light">
            Welcome to Tanatan. A contemporary dining experience featuring luxurious bells, along with antique copper collectibles and Indian motifs, that transport you to the grandeur of India.
          </p>
          <img 
            src="https://tanatan.co/wp-content/uploads/2023/01/cropped-tanatan-logo.png" 
            alt="Signature" 
            className="w-40 sm:w-48 opacity-50 grayscale contrast-200 sepia hover:opacity-100 transition-opacity duration-500" 
          />
        </motion.div>
      </div>
    </section>
  );
}

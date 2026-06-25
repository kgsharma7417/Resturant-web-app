import { motion } from 'framer-motion';

const reviews = [
  {
    name: "Vikram S.",
    role: "Food Critic",
    content: "An absolute masterpiece of culinary art. The ambience transports you to a royal era, and every bite is infused with authentic, rich flavors. 10/10.",
    rating: 5
  },
  {
    name: "Priya R.",
    role: "Local Guide",
    content: "The best dining experience I've had this year. Their signature dishes are simply phenomenal. You must try the chef's specials!",
    rating: 5
  },
  {
    name: "Arjun M.",
    role: "Guest",
    content: "Stunning interiors and impeccable service. From the moment you walk in, you feel like royalty. Perfect for special occasions.",
    rating: 5
  },
  {
    name: "Sneha K.",
    role: "Food Enthusiast",
    content: "A beautifully curated menu. The perfect balance of spices, presentation, and taste. The glassmorphism UI of their app matches the luxury of their restaurant!",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-[#050403] relative overflow-hidden border-t border-brand-gold/10">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-brand-gold text-sm uppercase tracking-[0.3em] mb-4 font-semibold">Guest Experiences</h4>
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-8 leading-tight drop-shadow-md">
            Words From Our Royals
          </h2>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden pb-8">
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050403] to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050403] to-transparent z-10"></div>
          
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 w-max"
          >
            {/* Double the array to create an infinite loop effect */}
            {[...reviews, ...reviews].map((review, idx) => (
              <div 
                key={idx} 
                className="w-[350px] md:w-[450px] shrink-0 bg-[#111]/80 backdrop-blur-md border border-white/5 p-8 rounded-3xl shadow-xl hover:border-brand-gold/30 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex text-brand-gold mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 text-lg font-light leading-relaxed mb-8 italic">
                  "{review.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold font-serif text-xl border border-brand-gold/40">
                    {review.name[0]}
                  </div>
                  <div>
                    <h4 className="text-white font-bold tracking-wide">{review.name}</h4>
                    <span className="text-brand-gold/80 text-xs font-bold uppercase tracking-widest">{review.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

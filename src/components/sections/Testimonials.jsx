import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const reviews = [
  {
    id: 1,
    name: "Aarti Desai",
    rating: 5,
    text: "Absolutely stunning ambiance and the food is out of this world. The Dal Makhani is exactly how it should be - creamy and rich.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Vikram Singh",
    rating: 5,
    text: "Best Butter Chicken in Delhi, hands down! The service was prompt and the staff was extremely courteous. Highly recommend.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Priya Sharma",
    rating: 4,
    text: "Loved the family vibe. We went for my father's 60th birthday and they made it very special. Food quality is premium.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="py-24 bg-brand-charcoal text-brand-cream relative overflow-hidden">
      {/* Decorative bg element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-burgundy/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-brand-gold font-serif text-4xl md:text-5xl font-bold mb-16">
          Hamare Khush Grahak
        </h2>

        <div className="relative min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="px-8"
            >
              <div className="flex justify-center mb-6">
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="text-brand-gold fill-current mx-1" size={24} />
                ))}
              </div>
              
              <p className="text-xl md:text-2xl italic font-light mb-8 leading-relaxed">
                "{reviews[currentIndex].text}"
              </p>
              
              <div className="flex items-center justify-center">
                <img 
                  src={reviews[currentIndex].image} 
                  alt={reviews[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-brand-gold mr-4"
                />
                <h4 className="font-serif text-xl font-semibold">{reviews[currentIndex].name}</h4>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-brand-cream/50 hover:text-brand-gold transition-colors"
          >
            <ChevronLeft size={40} />
          </button>
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-brand-cream/50 hover:text-brand-gold transition-colors"
          >
            <ChevronRight size={40} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentIndex === idx ? 'bg-brand-gold' : 'bg-brand-cream/30 hover:bg-brand-cream/50'
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}

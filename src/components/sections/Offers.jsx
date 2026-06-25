import { motion } from 'framer-motion';

export default function Offers() {
  const offers = [
    {
      title: "Weekend Grand Buffet",
      price: "₹499",
      desc: "Unlimited starters, main course, and desserts. Every Saturday & Sunday.",
      tag: "Bestseller",
      bg: "bg-brand-burgundy",
      text: "text-brand-cream",
      border: "border-brand-gold/30"
    },
    {
      title: "Corporate Lunch Box",
      price: "₹249",
      desc: "Perfect balanced meal for your office cravings. Mon-Fri only.",
      tag: "New",
      bg: "bg-brand-gold",
      text: "text-brand-charcoal",
      border: "border-brand-burgundy/20"
    },
    {
      title: "Birthday Special",
      price: "15% OFF",
      desc: "Celebrate with us and get a flat discount on a bill of ₹2000+.",
      tag: "Offer",
      bg: "bg-brand-charcoal",
      text: "text-brand-gold",
      border: "border-brand-gold/30"
    }
  ];

  return (
    <section id="offers" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-brand-burgundy font-serif text-4xl md:text-5xl font-bold mb-4 drop-shadow-sm">
            Special Offers & Events
          </h2>
          <p className="text-brand-charcoal/70 text-lg max-w-2xl mx-auto">
            Make your dining experience even more special with our exclusive promotions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {offers.map((offer, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, rotateY: 15, y: 20 }}
              whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotateY: 5, z: 20 }}
              className={`${offer.bg} ${offer.text} p-8 rounded-2xl shadow-xl hover:shadow-2xl relative overflow-hidden group border ${offer.border} transform-gpu`}
            >
              {/* Decorative Circle */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white opacity-10 group-hover:scale-[2] transition-transform duration-700 ease-in-out"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-black opacity-10 group-hover:scale-[1.5] transition-transform duration-700 ease-in-out delay-100"></div>

              <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                {offer.tag}
              </span>
              
              <h3 className="font-serif text-2xl font-bold mb-2 leading-tight">{offer.title}</h3>
              <div className="text-5xl font-bold mb-4 font-serif drop-shadow-md">{offer.price}</div>
              <p className="opacity-90 mb-8 font-medium leading-relaxed">{offer.desc}</p>
              
              <a 
                href="#reservation"
                className="inline-block border border-current px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-brand-charcoal transition-colors relative z-10"
              >
                Abhi Book Karein
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

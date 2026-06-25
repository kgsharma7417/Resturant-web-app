import { useState } from 'react';
import { Calendar, Clock, Users, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { useOrders } from '../../contexts/OrdersContext';
import { motion } from 'framer-motion';

export default function Reservation() {
  const { addReservation } = useOrders();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    request: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add to Admin Dashboard via OrdersContext
    addReservation(formData);
    
    // Simulate WhatsApp redirect
    const phoneNumber = "919876543210";
    const text = `Namaste, I would like to book a table.
Name: ${formData.name}
Phone: ${formData.phone}
Date: ${formData.date}
Time: ${formData.time}
Guests: ${formData.guests}
Special Request: ${formData.request || 'None'}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    
    // Show success toast
    toast.success('Table booking request sent successfully!');

    // Open WhatsApp in new tab after a brief delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1500);

    // Reset form
    setFormData({
      name: '', phone: '', date: '', time: '', guests: '2', request: ''
    });
  };

  return (
    <section id="reservation" className="py-32 bg-brand-dark text-white relative overflow-hidden border-t border-brand-gold/10">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-brand-gold text-sm uppercase tracking-[0.3em] mb-4 font-semibold">Reserve Your Spot</h4>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight drop-shadow-md">
              Book a Table
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed font-light">
              Experience the royal dining by reserving your table in advance. We recommend booking at least 24 hours prior for weekend dinners to secure your preferred spot.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="p-3 bg-brand-gold/10 rounded-xl mr-5 border border-brand-gold/20">
                  <Clock className="text-brand-gold" size={24} />
                </div>
                <div>
                  <h4 className="font-bold font-serif text-xl text-white mb-1">Opening Hours</h4>
                  <p className="text-gray-400 font-light">Mon - Sun: 12:00 PM to 11:30 PM</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-3 bg-brand-gold/10 rounded-xl mr-5 border border-brand-gold/20">
                  <MessageSquare className="text-brand-gold" size={24} />
                </div>
                <div>
                  <h4 className="font-bold font-serif text-xl text-white mb-1">Instant Confirmation</h4>
                  <p className="text-gray-400 font-light">We will confirm your booking within 30 minutes via WhatsApp.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#111]/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl relative"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Full Name</label>
                  <input 
                    type="text" name="name" required
                    value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white rounded-xl focus:ring-0 focus:border-brand-gold outline-none transition-all placeholder-gray-600"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Phone Number</label>
                  <input 
                    type="tel" name="phone" required
                    value={formData.phone} onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white rounded-xl focus:ring-0 focus:border-brand-gold outline-none transition-all placeholder-gray-600"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                    <Calendar size={14} className="mr-1.5" /> Date
                  </label>
                  <input 
                    type="date" name="date" required
                    value={formData.date} onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white rounded-xl focus:ring-0 focus:border-brand-gold outline-none transition-all [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                    <Clock size={14} className="mr-1.5" /> Time
                  </label>
                  <input 
                    type="time" name="time" required
                    value={formData.time} onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white rounded-xl focus:ring-0 focus:border-brand-gold outline-none transition-all [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                    <Users size={14} className="mr-1.5" /> Guests
                  </label>
                  <select 
                    name="guests" 
                    value={formData.guests} onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white rounded-xl focus:ring-0 focus:border-brand-gold outline-none transition-all [color-scheme:dark]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map(num => (
                      <option key={num} value={num}>{num} Person{num !== 1 && 's'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Special Request (Optional)</label>
                <textarea 
                  name="request" rows="3"
                  value={formData.request} onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white rounded-xl focus:ring-0 focus:border-brand-gold outline-none transition-all resize-none placeholder-gray-600"
                  placeholder="Anniversary, Birthday, Allergy info..."
                ></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full bg-brand-gold text-brand-dark font-bold text-sm uppercase tracking-widest py-4 rounded-xl hover:bg-white hover:text-brand-dark transition-colors shadow-[0_0_20px_rgba(255,87,34,0.3)] hover:shadow-[0_0_30px_rgba(255,87,34,0.5)]"
                >
                  Book via WhatsApp
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

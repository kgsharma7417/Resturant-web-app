import { useState } from 'react';
import { Calendar, Clock, Users, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { useOrders } from '../../contexts/OrdersContext';

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
    <section id="reservation" className="py-24 bg-brand-burgundy text-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Info */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-brand-gold">
              Table Book Karein
            </h2>
            <p className="text-brand-cream/80 text-lg mb-8">
              Experience the royal dining by reserving your table in advance. We recommend booking at least 24 hours prior for weekend dinners.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <Clock className="text-brand-gold mr-4" size={28} />
                <div>
                  <h4 className="font-bold font-serif text-xl">Opening Hours</h4>
                  <p className="text-brand-cream/70">Mon - Sun: 12:00 PM to 11:30 PM</p>
                </div>
              </div>
              <div className="flex items-center">
                <MessageSquare className="text-brand-gold mr-4" size={28} />
                <div>
                  <h4 className="font-bold font-serif text-xl">Confirmation</h4>
                  <p className="text-brand-cream/70">Hum aapko 30 minute mein confirm karenge.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white text-brand-charcoal p-8 md:p-10 rounded-2xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Pura Naam</label>
                  <input 
                    type="text" name="name" required
                    value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number</label>
                  <input 
                    type="tel" name="phone" required
                    value={formData.phone} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 flex items-center">
                    <Calendar size={16} className="mr-2" /> Date
                  </label>
                  <input 
                    type="date" name="date" required
                    value={formData.date} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 flex items-center">
                    <Clock size={16} className="mr-2" /> Time
                  </label>
                  <input 
                    type="time" name="time" required
                    value={formData.time} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 flex items-center">
                    <Users size={16} className="mr-2" /> Guests
                  </label>
                  <select 
                    name="guests" 
                    value={formData.guests} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map(num => (
                      <option key={num} value={num}>{num} Person{num !== 1 && 's'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Special Request (Optional)</label>
                <textarea 
                  name="request" rows="3"
                  value={formData.request} onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none resize-none"
                  placeholder="Anniversary, Birthday, Allergy info..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-brand-gold text-brand-charcoal font-bold py-4 rounded-lg hover:bg-[#b59542] transition-colors"
              >
                WhatsApp par Book Karein
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-brand-burgundy font-serif text-4xl md:text-5xl font-bold mb-4">
            Humse Sampark Karein
          </h2>
          <p className="text-brand-charcoal/70 text-lg max-w-2xl mx-auto">
            We are centrally located in the heart of the city. Drop by for a meal you'll never forget.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Details */}
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
            <h3 className="font-serif text-2xl font-bold text-brand-burgundy mb-8">Contact Details</h3>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-brand-cream p-3 rounded-full mr-4 text-brand-gold shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-lg">Location</h4>
                  <p className="text-gray-600">123 Culinary Avenue, Connaught Place,<br />Delhi 110001</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-cream p-3 rounded-full mr-4 text-brand-gold shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-lg">Phone Numbers</h4>
                  <p className="text-gray-600">+91 98765 43210 (Bookings)</p>
                  <p className="text-gray-600">+91 98765 09876 (Queries)</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-cream p-3 rounded-full mr-4 text-brand-gold shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-lg">Email Address</h4>
                  <p className="text-gray-600">hello@theroyalspice.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-cream p-3 rounded-full mr-4 text-brand-gold shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-lg">Working Hours</h4>
                  <p className="text-gray-600">Lunch: 12:00 PM - 4:00 PM</p>
                  <p className="text-gray-600">Dinner: 7:00 PM - 11:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] lg:h-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            {/* Embedded Google Map (Placeholder coordinates for Connaught Place, Delhi) */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d14008.1148271844!2d77.2064506!3d28.6327429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
}

import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-brand-cream/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="font-serif text-2xl text-brand-gold font-bold tracking-wider mb-4">THE ROYAL SPICE</h2>
            <p className="mb-6">Har Niwala Ek Yaadgaar. Experience authentic flavors that bring back the golden era of dining.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-gold hover:text-white transition-colors"><Instagram size={24} /></a>
              <a href="#" className="text-brand-gold hover:text-white transition-colors"><Facebook size={24} /></a>
              <a href="#" className="text-brand-gold hover:text-white transition-colors"><Twitter size={24} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="hover:text-brand-gold transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-brand-gold transition-colors">About Us</a></li>
              <li><a href="#menu" className="hover:text-brand-gold transition-colors">Menu</a></li>
              <li><a href="#gallery" className="hover:text-brand-gold transition-colors">Gallery</a></li>
              <li><a href="#reservation" className="hover:text-brand-gold transition-colors">Book Table</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-xl text-white mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-brand-gold mr-3 shrink-0" size={20} />
                <span>123 Culinary Avenue,<br />Connaught Place, Delhi 110001</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-brand-gold mr-3 shrink-0" size={20} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-brand-gold mr-3 shrink-0" size={20} />
                <span>hello@theroyalspice.com</span>
              </li>
            </ul>
          </div>

          {/* Timings */}
          <div>
            <h3 className="font-serif text-xl text-white mb-4">Opening Hours</h3>
            <ul className="space-y-3">
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <span>Mon - Fri</span>
                <span>12:00 PM - 11:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2 text-brand-gold">
                <span>Sat - Sun</span>
                <span>11:00 AM - 11:30 PM</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} The Royal Spice. All rights reserved.</p>
          <p className="mt-2 text-gray-500">Powered by Antigravity IDE</p>
        </div>
      </div>
    </footer>
  );
}

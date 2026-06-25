import { useScroll, useTransform } from 'framer-motion';
import Header from '../components/layout/Header';
import MobileBottomNav from '../components/layout/MobileBottomNav';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Menu from '../components/sections/Menu';
import Reservation from '../components/sections/Reservation';
import CartDrawer from '../components/customer/CartDrawer';
import Testimonials from '../components/sections/Testimonials';
import Preloader from '../components/ui/Preloader';
import { useMenu } from '../contexts/MenuContext';

export default function StorePage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const { menuItems } = useMenu();

  return (
    <div className="bg-[#050403] min-h-screen font-sans text-brand-textLight selection:bg-brand-orange selection:text-white pb-24 md:pb-0">
      <Preloader />
      <Header />
      <MobileBottomNav />
      <CartDrawer />

      <Hero />
      <About />
      <Testimonials />
      <Menu />
      <Reservation />

      {/* Footer */}
      <footer className="bg-[#050403] py-20 text-center border-t border-brand-gold/10">
        <h2 className="font-serif text-3xl text-brand-gold tracking-widest uppercase mb-6">Tanatan</h2>
        <p className="text-brand-textLight/50 text-sm font-light mb-10 tracking-widest uppercase">
          Mumbai • Dubai • Lucknow • Udaipur • Indore • Muscat • Bahrain
        </p>
        <p className="text-brand-textLight/30 text-xs font-light">
          © 2026 Tanatan. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

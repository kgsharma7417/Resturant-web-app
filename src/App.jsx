import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { MenuProvider } from './contexts/MenuContext';
import { CartProvider } from './contexts/CartContext';
import { OrdersProvider } from './contexts/OrdersContext';

import StorePage from './pages/StorePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import CustomCursor from './components/ui/CustomCursor';

function App() {
  return (
    <OrdersProvider>
      <MenuProvider>
        <CartProvider>
          <BrowserRouter>
          <CustomCursor />
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<StorePage />} />
            {/* Login page bypassed as requested */}
            {/* <Route path="/admin-login" element={<AdminLoginPage />} /> */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </MenuProvider>
    </OrdersProvider>
  );
}

export default App;

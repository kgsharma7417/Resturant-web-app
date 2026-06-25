import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, setDoc, doc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Listen to orders
    const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
      const fetchedOrders = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setOrders(fetchedOrders);
    });

    // Listen to reservations
    const resQuery = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
    const unsubscribeRes = onSnapshot(resQuery, (snapshot) => {
      const fetchedRes = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setReservations(fetchedRes);
    });

    return () => {
      unsubscribeOrders();
      unsubscribeRes();
    };
  }, []);

  const addOrder = async (orderData) => {
    const newId = Date.now().toString();
    const newOrder = {
      ...orderData,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'orders', newId), newOrder);
    return { ...newOrder, id: newId };
  };

  const updateOrderStatus = async (orderId, status) => {
    await updateDoc(doc(db, 'orders', String(orderId)), { status });
  };

  const addReservation = async (reservationData) => {
    const newId = Date.now().toString();
    const newReservation = {
      ...reservationData,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'reservations', newId), newReservation);
    return { ...newReservation, id: newId };
  };

  const updateReservationStatus = async (reservationId, status) => {
    await updateDoc(doc(db, 'reservations', String(reservationId)), { status });
  };

  return (
    <OrdersContext.Provider value={{ 
      orders, 
      reservations, 
      addOrder, 
      updateOrderStatus, 
      addReservation, 
      updateReservationStatus 
    }}>
      {children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);

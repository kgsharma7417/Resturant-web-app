import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, setDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { menuData as initialData, categories as initialCategories } from '../data/menuData';

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to categories
    const unsubscribeCats = onSnapshot(collection(db, 'categories'), (snapshot) => {
      if (snapshot.empty) {
        // Seed categories on first run
        initialCategories.forEach(async (cat) => {
          try {
            await setDoc(doc(db, 'categories', cat), { name: cat });
          } catch(e) { console.error(e) }
        });
      } else {
        setCategories(snapshot.docs.map(doc => doc.id));
      }
    });

    // Listen to menu items
    const unsubscribeMenu = onSnapshot(collection(db, 'menu'), (snapshot) => {
      if (snapshot.empty) {
        // Seed menu on first run
        initialData.forEach(async (item) => {
          try {
            await setDoc(doc(db, 'menu', String(item.id)), item);
          } catch(e) { console.error(e) }
        });
      } else {
        const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setMenuItems(items);
      }
      setLoading(false);
    });

    return () => {
      unsubscribeCats();
      unsubscribeMenu();
    };
  }, []);

  const addMenuItem = async (item) => {
    const newId = String(Date.now());
    await setDoc(doc(db, 'menu', newId), { ...item, id: newId });
    if (!categories.includes(item.category)) {
      addCategory(item.category);
    }
  };

  const deleteMenuItem = async (id) => {
    await deleteDoc(doc(db, 'menu', String(id)));
  };

  const addCategory = async (categoryName) => {
    await setDoc(doc(db, 'categories', categoryName), { name: categoryName });
  };

  const deleteCategory = async (categoryName) => {
    await deleteDoc(doc(db, 'categories', categoryName));
  };

  return (
    <MenuContext.Provider value={{ 
      menuItems, categories, addMenuItem, deleteMenuItem, addCategory, deleteCategory, loading
    }}>
      {children}
    </MenuContext.Provider>
  );
}

export const useMenu = () => useContext(MenuContext);

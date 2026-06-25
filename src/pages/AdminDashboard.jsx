import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../contexts/MenuContext';
import { useOrders } from '../contexts/OrdersContext';
import { LogOut, Plus, Trash2, LayoutDashboard, UtensilsCrossed, Tags, ClipboardList, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { menuItems, categories, addMenuItem, deleteMenuItem, addCategory, deleteCategory } = useMenu();
  const { orders, reservations, updateOrderStatus, updateReservationStatus } = useOrders();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  
  const [formData, setFormData] = useState({
    name: '', nameHi: '', category: '', description: '', price: '', isVeg: true, isMustTry: false, image: ''
  });

  useEffect(() => {
    // Login bypass as requested by user
    // const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    // if (!isLoggedIn) {
    //   navigate('/admin');
    // }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/');
  };

  const handleAddDish = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      toast.error('Please fill required fields');
      return;
    }
    
    addMenuItem({
      ...formData,
      price: parseInt(formData.price),
      image: formData.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
    });
    
    toast.success('Dish added successfully!');
    setShowAddForm(false);
    setFormData({ name: '', nameHi: '', category: '', description: '', price: '', isVeg: true, isMustTry: false, image: '' });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    addCategory(newCategoryName.trim());
    toast.success('Category added');
    setNewCategoryName('');
  };

  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors border-l-4 ${
        activeTab === id 
          ? 'bg-brand-gold/10 border-brand-gold text-brand-gold font-bold' 
          : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-brand-dark'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-20 flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-gray-200">
          <h1 className="font-serif font-bold text-2xl text-brand-dark tracking-wider">TANATAN <span className="text-brand-gold text-sm">ADMIN</span></h1>
        </div>
        <nav className="flex-1 py-6">
          <TabButton id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <TabButton id="menu" icon={UtensilsCrossed} label="Menu Management" />
          <TabButton id="categories" icon={Tags} label="Categories" />
          <TabButton id="orders" icon={ClipboardList} label="Orders & Bookings" />
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button onClick={() => navigate('/')} className="w-full mb-2 text-center text-sm font-medium text-brand-gray hover:text-brand-dark py-2">
            View Store
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 font-medium bg-white border border-red-100 px-4 py-2 rounded-md transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-gray-500 text-sm font-medium mb-1">Total Dishes</p>
                <p className="text-3xl font-bold text-brand-dark">{menuItems.length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-gray-500 text-sm font-medium mb-1">Categories</p>
                <p className="text-3xl font-bold text-brand-dark">{categories.length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-gray-500 text-sm font-medium mb-1">Pending Orders</p>
                <p className="text-3xl font-bold text-orange-600">{orders.filter(o => o.status === 'Pending').length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-gray-500 text-sm font-medium mb-1">Active Reservations</p>
                <p className="text-3xl font-bold text-brand-gold">{reservations.filter(r => r.status === 'Confirmed').length}</p>
              </div>
            </div>
          </div>
        )}

        {/* MENU TAB */}
        {activeTab === 'menu' && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Menu Management</h2>
              <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-2 bg-brand-dark text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-lg"
              >
                {showAddForm ? 'Cancel' : <><Plus size={20} /> Add New Dish</>}
              </button>
            </div>

            {/* Add Dish Form */}
            {showAddForm && (
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mb-8 animate-slide-down">
                <h3 className="text-xl font-bold mb-6 border-b pb-4">Add New Dish</h3>
                <form onSubmit={handleAddDish} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dish Name (English) *</label>
                      <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dish Name (Hindi)</label>
                      <input type="text" value={formData.nameHi} onChange={e => setFormData({...formData, nameHi: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all" required>
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
                      <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all" required />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all" rows="2"></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                      <div className="flex gap-4 items-center">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setIsUploading(true);
                              try {
                                const storageRef = ref(storage, `menu-images/${Date.now()}_${file.name}`);
                                const snapshot = await uploadBytes(storageRef, file);
                                const downloadURL = await getDownloadURL(snapshot.ref);
                                setFormData({...formData, image: downloadURL});
                              } catch (err) {
                                console.error('Upload failed:', err);
                                alert('Failed to upload image to Firebase Storage');
                              } finally {
                                setIsUploading(false);
                              }
                            }
                          }} 
                          className="text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                        />
                        {isUploading && <span className="text-sm text-brand-gold">Uploading...</span>}
                        <span className="text-sm text-gray-400 font-medium">OR URL</span>
                        <input 
                          type="text" 
                          value={formData.image} 
                          onChange={e => setFormData({...formData, image: e.target.value})} 
                          className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-gold outline-none transition-all" 
                          placeholder="Paste image URL here..." 
                        />
                      </div>
                      {formData.image && (
                        <div className="mt-4 p-2 border border-gray-200 rounded-lg inline-block bg-gray-50">
                          <img src={formData.image} alt="Preview" className="h-24 w-24 object-cover rounded-md" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-8 mt-2 md:col-span-2 bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={formData.isVeg} onChange={e => setFormData({...formData, isVeg: e.target.checked})} className="w-5 h-5 text-brand-gold rounded focus:ring-brand-gold" />
                        <span className="text-base font-medium text-gray-800">Vegetarian Dish</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={formData.isMustTry} onChange={e => setFormData({...formData, isMustTry: e.target.checked})} className="w-5 h-5 text-brand-gold rounded focus:ring-brand-gold" />
                        <span className="text-base font-medium text-gray-800">Mark as Bestseller</span>
                      </label>
                    </div>
                  </div>
                  <div className="pt-6 flex justify-end border-t border-gray-100">
                    <button type="submit" className="bg-brand-gold text-white px-8 py-3 rounded-lg font-bold hover:bg-[#6b390a] transition-colors shadow-md">Save Dish to Menu</button>
                  </div>
                </form>
              </div>
            )}

            {/* Menu Items List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {menuItems.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-12 w-12 shrink-0 border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                              <img className="h-full w-full object-cover" src={item.image} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-bold text-gray-900">{item.name}</div>
                              <div className="text-xs text-gray-500">{item.nameHi}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 border border-gray-200">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                          ₹{item.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${item.isVeg ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                            {item.isVeg ? 'Veg' : 'Non-Veg'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => {
                              if(window.confirm('Are you sure you want to delete this dish?')) {
                                deleteMenuItem(item.id);
                                toast.success('Dish deleted!');
                              }
                            }}
                            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div className="animate-fade-in max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Category Management</h2>
            
            <form onSubmit={handleAddCategory} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">New Category Name</label>
                <input 
                  type="text" 
                  value={newCategoryName} 
                  onChange={e => setNewCategoryName(e.target.value)} 
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-gold outline-none" 
                  placeholder="e.g. Desserts" 
                />
              </div>
              <button type="submit" className="bg-brand-dark text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors flex items-center gap-2 h-[50px]">
                <Plus size={20} /> Add Category
              </button>
            </form>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {categories.map(category => (
                  <li key={category} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                    <span className="font-medium text-gray-900">{category}</span>
                    <button 
                      onClick={() => {
                        if(window.confirm(`Delete category "${category}"? Menu items with this category will still exist but won't be filterable.`)) {
                          deleteCategory(category);
                          toast.success('Category deleted');
                        }
                      }}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
                {categories.length === 0 && (
                  <li className="px-6 py-8 text-center text-gray-500">No categories found.</li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Orders & Bookings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Online Orders */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <ClipboardList className="text-brand-gold" /> Pending Online Orders
                </h3>
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <p className="text-gray-500 italic text-center py-4">No online orders yet.</p>
                  ) : (
                    orders.map(order => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-gray-900">Order #{order.id.slice(-6)}</span>
                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${order.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Total:</span> ₹{order.total}</p>
                        <div className="text-sm text-gray-500 mb-4 space-y-1">
                          {order.items.map((item, i) => (
                            <div key={i}>• {item.quantity}x {item.name}</div>
                          ))}
                        </div>
                        {order.status === 'Pending' && (
                          <button 
                            onClick={() => {
                              updateOrderStatus(order.id, 'Completed');
                              toast.success('Order marked as completed');
                            }}
                            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition-colors text-sm"
                          >
                            <CheckCircle size={16} /> Mark Completed
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Table Reservations */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <UtensilsCrossed className="text-brand-gold" /> Table Reservations
                </h3>
                <div className="space-y-4">
                  {reservations.length === 0 ? (
                    <p className="text-gray-500 italic text-center py-4">No reservations yet.</p>
                  ) : (
                    reservations.map(res => (
                      <div key={res.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                          <span className="font-bold text-gray-900">{res.name}</span>
                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${res.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                            {res.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                          <p><span className="font-medium">Date:</span> {res.date}</p>
                          <p><span className="font-medium">Time:</span> {res.time}</p>
                          <p><span className="font-medium">Guests:</span> {res.guests || 'Not specified'}</p>
                          <p><span className="font-medium">Phone:</span> {res.phone}</p>
                        </div>
                        {res.status === 'Confirmed' && (
                          <button 
                            onClick={() => updateReservationStatus(res.id, 'Completed')}
                            className="w-full text-center text-brand-dark py-2 rounded-md font-medium border border-gray-300 hover:bg-gray-100 transition-colors text-sm"
                          >
                            Mark Completed
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

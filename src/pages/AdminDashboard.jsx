import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../contexts/MenuContext';
import { useOrders } from '../contexts/OrdersContext';
import { useSettings } from '../contexts/SettingsContext';
import { LogOut, Plus, Trash2, LayoutDashboard, UtensilsCrossed, Tags, ClipboardList, CheckCircle, Settings, Image as ImageIcon, Edit2 } from 'lucide-react';
import { toast } from 'sonner';
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { menuItems, categories, addMenuItem, updateMenuItem, deleteMenuItem, addCategory, deleteCategory } = useMenu();
  const { orders, reservations, updateOrderStatus, updateReservationStatus } = useOrders();
  const { settings, updateSettings } = useSettings();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingHero, setIsUploadingHero] = useState(false);
  const [isUploadingAbout, setIsUploadingAbout] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', nameHi: '', category: '', description: '', price: '', isVeg: true, isMustTry: false, image: ''
  });

  const [settingsForm, setSettingsForm] = useState({
    restaurantName: '',
    tagline: '',
    heroImage: '',
    aboutImage: ''
  });

  useEffect(() => {
    if (settings) {
      setSettingsForm({
        restaurantName: settings.restaurantName || '',
        tagline: settings.tagline || '',
        heroImage: settings.heroImage || '',
        aboutImage: settings.aboutImage || ''
      });
    }
  }, [settings]);

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
    
    const itemData = {
      ...formData,
      price: parseInt(formData.price),
      image: formData.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
    };

    if (editingId) {
      updateMenuItem(editingId, itemData);
      toast.success('Dish updated successfully!');
    } else {
      addMenuItem(itemData);
      toast.success('Dish added successfully!');
    }
    
    setShowAddForm(false);
    setEditingId(null);
    setFormData({ name: '', nameHi: '', category: '', description: '', price: '', isVeg: true, isMustTry: false, image: '' });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    addCategory(newCategoryName.trim());
    toast.success('Category added');
    setNewCategoryName('');
  };

  const handleUpdateSettings = (e) => {
    e.preventDefault();
    updateSettings(settingsForm);
    toast.success('Site settings updated successfully!');
  };

  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`whitespace-nowrap shrink-0 md:w-full flex flex-row items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 text-left transition-all border-b-4 md:border-b-0 md:border-l-4 ${
        activeTab === id 
          ? 'bg-slate-800 text-indigo-400 border-indigo-500 font-bold shadow-md' 
          : 'border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-white'
      }`}
    >
      <Icon size={18} className={activeTab === id ? 'text-indigo-400' : 'text-slate-400'} />
      <span className="text-sm md:text-base">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar / Topbar */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-r border-slate-800 md:fixed md:h-full z-20 flex flex-col shadow-xl sticky top-0">
        <div className="h-16 md:h-20 flex items-center justify-between md:justify-center px-4 md:px-0 border-b border-slate-800 bg-slate-950 shrink-0">
          <h1 className="font-bold text-xl md:text-2xl text-white tracking-widest uppercase truncate flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-sm">T</div>
            {settings?.restaurantName || 'TANATAN'}
          </h1>
          <button 
            onClick={handleLogout}
            className="md:hidden flex items-center justify-center gap-2 text-white bg-rose-600 hover:bg-rose-700 font-medium px-3 py-1.5 rounded-lg transition-colors text-xs"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
        <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible flex-1 md:py-6 scrollbar-hide md:space-y-1">
          <TabButton id="dashboard" icon={LayoutDashboard} label="Overview" />
          <TabButton id="menu" icon={UtensilsCrossed} label="Menu" />
          <TabButton id="categories" icon={Tags} label="Categories" />
          <TabButton id="orders" icon={ClipboardList} label="Orders" />
          <TabButton id="settings" icon={Settings} label="Settings" />
        </nav>
        <div className="hidden md:block p-4 border-t border-slate-800 bg-slate-900">
          <button onClick={() => navigate('/')} className="w-full mb-3 text-center text-sm font-bold tracking-wider text-indigo-400 hover:text-indigo-300 uppercase transition-colors">
            View Live Site
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-white bg-rose-600 hover:bg-rose-700 font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 bg-slate-50 w-full overflow-x-hidden">
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="animate-fade-in max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600"><UtensilsCrossed size={24} /></div>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Total Dishes</p>
                </div>
                <p className="text-4xl font-black text-slate-900">{menuItems.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-600"><Tags size={24} /></div>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Categories</p>
                </div>
                <p className="text-4xl font-black text-slate-900">{categories.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-orange-50 rounded-xl text-orange-600"><ClipboardList size={24} /></div>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Pending Orders</p>
                </div>
                <p className="text-4xl font-black text-orange-600">{orders.filter(o => o.status === 'Pending').length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600"><CheckCircle size={24} /></div>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Confirmed Bookings</p>
                </div>
                <p className="text-4xl font-black text-emerald-600">{reservations.filter(r => r.status === 'Confirmed').length}</p>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Site Settings</h2>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold mb-6 pb-4 border-b border-slate-100 flex items-center gap-2 text-slate-800">
                <Settings className="text-indigo-600" /> Global Configuration
              </h3>
              <form onSubmit={handleUpdateSettings} className="space-y-6">
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Restaurant Name</label>
                  <input 
                    type="text" 
                    value={settingsForm.restaurantName} 
                    onChange={e => setSettingsForm({...settingsForm, restaurantName: e.target.value})} 
                    className="w-full border-2 border-slate-200 rounded-xl p-3 focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500 outline-none transition-all font-medium text-lg" 
                    required 
                  />
                  <p className="text-xs text-slate-500 mt-2">This will appear in the Header, Hero section, and Footer.</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Tagline</label>
                  <input 
                    type="text" 
                    value={settingsForm.tagline} 
                    onChange={e => setSettingsForm({...settingsForm, tagline: e.target.value})} 
                    className="w-full border-2 border-slate-200 rounded-xl p-3 focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500 outline-none transition-all" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider flex items-center gap-2">
                    <ImageIcon size={18} /> Hero Background Image
                  </label>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <div className="flex-1 w-full">
                      <input 
                        type="text" 
                        value={settingsForm.heroImage} 
                        onChange={e => setSettingsForm({...settingsForm, heroImage: e.target.value})} 
                        className="w-full border-2 border-slate-200 rounded-xl p-3 focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500 outline-none transition-all mb-3" 
                        placeholder="Image URL" 
                        required
                      />
                      
                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                          <span>Upload New Image</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setIsUploadingHero(true);
                                try {
                                  const storageRef = ref(storage, `site-images/${Date.now()}_${file.name}`);
                                  const snapshot = await uploadBytes(storageRef, file);
                                  const downloadURL = await getDownloadURL(snapshot.ref);
                                  setSettingsForm({...settingsForm, heroImage: downloadURL});
                                } catch (err) {
                                  console.error('Upload failed:', err);
                                  toast.error('Failed to upload image');
                                } finally {
                                  setIsUploadingHero(false);
                                }
                              }
                            }}
                          />
                        </label>
                        {isUploadingHero && <span className="text-sm font-bold text-indigo-600 animate-pulse">Uploading...</span>}
                      </div>
                    </div>
                    
                    {settingsForm.heroImage && (
                      <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden border-2 border-slate-200 shadow-inner flex-shrink-0">
                        <img src={settingsForm.heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider flex items-center gap-2">
                    <ImageIcon size={18} /> Our Story (About) Image
                  </label>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <div className="flex-1 w-full">
                      <input 
                        type="text" 
                        value={settingsForm.aboutImage} 
                        onChange={e => setSettingsForm({...settingsForm, aboutImage: e.target.value})} 
                        className="w-full border-2 border-slate-200 rounded-xl p-3 focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500 outline-none transition-all mb-3" 
                        placeholder="Image URL" 
                        required
                      />
                      
                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                          <span>Upload New Image</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setIsUploadingAbout(true);
                                try {
                                  const storageRef = ref(storage, `site-images/${Date.now()}_${file.name}`);
                                  const snapshot = await uploadBytes(storageRef, file);
                                  const downloadURL = await getDownloadURL(snapshot.ref);
                                  setSettingsForm({...settingsForm, aboutImage: downloadURL});
                                } catch (err) {
                                  console.error('Upload failed:', err);
                                  toast.error('Failed to upload image');
                                } finally {
                                  setIsUploadingAbout(false);
                                }
                              }
                            }}
                          />
                        </label>
                        {isUploadingAbout && <span className="text-sm font-bold text-indigo-600 animate-pulse">Uploading...</span>}
                      </div>
                    </div>
                    
                    {settingsForm.aboutImage && (
                      <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden border-2 border-slate-200 shadow-inner flex-shrink-0">
                        <img src={settingsForm.aboutImage} alt="About Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg uppercase tracking-wider">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MENU TAB */}
        {activeTab === 'menu' && (
          <div className="animate-fade-in max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Menu Management</h2>
              <button 
                onClick={() => {
                  setShowAddForm(!showAddForm);
                  if (showAddForm) setEditingId(null);
                  setFormData({ name: '', nameHi: '', category: '', description: '', price: '', isVeg: true, isMustTry: false, image: '' });
                }}
                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md"
              >
                {showAddForm ? 'Cancel' : <><Plus size={20} /> Add New Dish</>}
              </button>
            </div>

            {/* Add Dish Form */}
            {showAddForm && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-8 animate-slide-down">
                <h3 className="text-xl font-bold mb-6 border-b border-slate-100 pb-4 text-slate-800">{editingId ? 'Edit Dish' : 'Add New Dish'}</h3>
                <form onSubmit={handleAddDish} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Dish Name (English) *</label>
                      <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border-2 border-slate-200 rounded-xl p-3 focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500 outline-none transition-all" required />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Dish Name (Hindi)</label>
                      <input type="text" value={formData.nameHi} onChange={e => setFormData({...formData, nameHi: e.target.value})} className="w-full border-2 border-slate-200 rounded-xl p-3 focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Category *</label>
                      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border-2 border-slate-200 rounded-xl p-3 focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500 outline-none transition-all" required>
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Price (₹) *</label>
                      <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border-2 border-slate-200 rounded-xl p-3 focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500 outline-none transition-all" required />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Description</label>
                      <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border-2 border-slate-200 rounded-xl p-3 focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500 outline-none transition-all" rows="2"></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Image</label>
                      <div className="flex gap-4 items-center">
                        <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl text-sm font-bold transition-colors">
                          <span>Upload Image</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden"
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
                                  toast.error('Failed to upload image');
                                } finally {
                                  setIsUploading(false);
                                }
                              }
                            }} 
                          />
                        </label>
                        {isUploading && <span className="text-sm font-bold text-indigo-600">Uploading...</span>}
                        <span className="text-sm text-slate-400 font-bold uppercase">OR</span>
                        <input 
                          type="text" 
                          value={formData.image} 
                          onChange={e => setFormData({...formData, image: e.target.value})} 
                          className="flex-1 border-2 border-slate-200 rounded-xl p-3 focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500 outline-none transition-all" 
                          placeholder="Paste image URL here..." 
                        />
                      </div>
                      {formData.image && (
                        <div className="mt-4 p-2 border-2 border-slate-200 rounded-xl inline-block bg-slate-50">
                          <img src={formData.image} alt="Preview" className="h-32 w-32 object-cover rounded-lg" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-8 mt-2 md:col-span-2 bg-slate-50 p-6 rounded-xl border border-slate-200">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={formData.isVeg} onChange={e => setFormData({...formData, isVeg: e.target.checked})} className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-slate-300" />
                        <span className="text-base font-bold text-slate-800">Vegetarian Dish</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={formData.isMustTry} onChange={e => setFormData({...formData, isMustTry: e.target.checked})} className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-slate-300" />
                        <span className="text-base font-bold text-slate-800">Mark as Bestseller</span>
                      </label>
                    </div>
                  </div>
                  <div className="pt-6 flex justify-end border-t border-slate-100">
                    <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md uppercase tracking-wider">{editingId ? 'Update Dish' : 'Save Dish'}</button>
                  </div>
                </form>
              </div>
            )}

            {/* Menu Items List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {menuItems.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-14 w-14 shrink-0 rounded-xl overflow-hidden shadow-sm border border-slate-100">
                              <img className="h-full w-full object-cover" src={item.image} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-bold text-slate-900">{item.name}</div>
                              <div className="text-xs text-slate-500 mt-1">{item.nameHi}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-xs font-bold rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-black">
                          ₹{item.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-lg ${item.isVeg ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                            {item.isVeg ? 'Veg' : 'Non-Veg'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => {
                              setEditingId(item.id);
                              setFormData(item);
                              setShowAddForm(true);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-slate-400 hover:text-indigo-600 p-2 rounded-full hover:bg-indigo-50 transition-all mr-2"
                          >
                            <Edit2 size={20} />
                          </button>
                          <button 
                            onClick={() => {
                              if(window.confirm('Are you sure you want to delete this dish?')) {
                                deleteMenuItem(item.id);
                                toast.success('Dish deleted!');
                              }
                            }}
                            className="text-slate-400 hover:text-rose-600 p-2 rounded-full hover:bg-rose-50 transition-all"
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
          <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Category Management</h2>
            
            <form onSubmit={handleAddCategory} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col sm:flex-row gap-4 sm:items-end">
              <div className="flex-1">
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">New Category Name</label>
                <input 
                  type="text" 
                  value={newCategoryName} 
                  onChange={e => setNewCategoryName(e.target.value)} 
                  className="w-full border-2 border-slate-200 rounded-xl p-3 focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500 outline-none transition-all" 
                  placeholder="e.g. Signature Desserts" 
                />
              </div>
              <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 h-[52px] shadow-md uppercase tracking-wider w-full sm:w-auto">
                <Plus size={20} /> Add
              </button>
            </form>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <ul className="divide-y divide-slate-100">
                {categories.map(category => (
                  <li key={category} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <span className="font-bold text-lg text-slate-800">{category}</span>
                    <button 
                      onClick={() => {
                        if(window.confirm(`Delete category "${category}"? Menu items with this category will still exist but won't be filterable.`)) {
                          deleteCategory(category);
                          toast.success('Category deleted');
                        }
                      }}
                      className="text-slate-400 hover:text-rose-600 p-2 rounded-full hover:bg-rose-50 transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </li>
                ))}
                {categories.length === 0 && (
                  <li className="px-6 py-12 text-center text-slate-400 font-medium">No categories found.</li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="animate-fade-in max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Orders & Bookings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Online Orders */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <ClipboardList className="text-orange-500" size={24} /> Delivery/Takeaway
                </h3>
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <p className="text-slate-400 italic text-center py-8">No active orders yet.</p>
                  ) : (
                    orders.map(order => (
                      <div key={order.id} className="border border-slate-200 rounded-xl p-5 bg-slate-50 hover:border-indigo-300 transition-colors shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex flex-col">
                            <span className="font-black text-slate-900 text-lg">Order #{order.id.slice(-6).toUpperCase()}</span>
                            {order.customerDetails && (
                              <span className="text-xs font-bold text-slate-500 uppercase mt-1">{order.customerDetails.name} • {order.customerDetails.phone}</span>
                            )}
                          </div>
                          <span className={`px-3 py-1 text-xs font-bold rounded-lg uppercase tracking-wider border ${order.status === 'Pending' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-slate-700 mb-3">Total: <span className="text-indigo-600 font-black">₹{order.total}</span></p>
                        
                        {order.customerDetails && (
                           <div className="text-xs font-medium text-slate-600 mb-3 flex items-center gap-2">
                             <span className="bg-white px-2 py-1 rounded border border-slate-200">{order.customerDetails.diningPreference}</span>
                             {order.customerDetails.tableNumber && <span className="bg-white px-2 py-1 rounded border border-slate-200">Table: {order.customerDetails.tableNumber}</span>}
                           </div>
                        )}

                        <div className="text-sm text-slate-600 mb-5 space-y-2 bg-white p-3 rounded-lg border border-slate-200">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center">
                              <span><span className="font-black text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded mr-2">{item.quantity}x</span> {item.name}</span>
                            </div>
                          ))}
                        </div>
                        {order.status === 'Pending' && (
                          <button 
                            onClick={() => {
                              updateOrderStatus(order.id, 'Completed');
                              toast.success('Order marked as completed');
                            }}
                            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors text-sm uppercase tracking-wider shadow-sm"
                          >
                            <CheckCircle size={18} /> Mark Completed
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Table Reservations */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <UtensilsCrossed className="text-blue-500" size={24} /> Reservations
                </h3>
                <div className="space-y-4">
                  {reservations.length === 0 ? (
                    <p className="text-slate-400 italic text-center py-8">No reservations yet.</p>
                  ) : (
                    reservations.map(res => (
                      <div key={res.id} className="border border-slate-200 rounded-xl p-5 bg-slate-50 hover:border-blue-300 transition-colors shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                          <span className="font-black text-slate-900 text-lg">{res.name}</span>
                          <span className={`px-3 py-1 text-xs font-bold rounded-lg uppercase tracking-wider border ${res.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                            {res.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-slate-700 mb-5 bg-white p-4 rounded-lg border border-slate-200">
                          <p><span className="text-slate-400 text-xs block uppercase font-bold tracking-wider mb-1">Date</span> <span className="font-bold">{res.date}</span></p>
                          <p><span className="text-slate-400 text-xs block uppercase font-bold tracking-wider mb-1">Time</span> <span className="font-bold">{res.time}</span></p>
                          <p><span className="text-slate-400 text-xs block uppercase font-bold tracking-wider mb-1">Guests</span> <span className="font-bold">{res.guests || 'Not specified'}</span></p>
                          <p><span className="text-slate-400 text-xs block uppercase font-bold tracking-wider mb-1">Phone</span> <span className="font-bold">{res.phone}</span></p>
                        </div>
                        {res.status === 'Confirmed' && (
                          <button 
                            onClick={() => updateReservationStatus(res.id, 'Completed')}
                            className="w-full flex items-center justify-center gap-2 bg-white text-slate-700 py-3 rounded-xl font-bold border-2 border-slate-200 hover:border-slate-800 hover:text-slate-900 transition-all text-sm uppercase tracking-wider shadow-sm"
                          >
                            <CheckCircle size={18} /> Mark Completed
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

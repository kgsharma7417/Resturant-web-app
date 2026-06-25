const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'pages', 'AdminDashboard.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Sidebar / Topbar
content = content.replace(/bg-brand-dark/g, 'bg-slate-900');
content = content.replace(/text-brand-gold/g, 'text-indigo-400');
content = content.replace(/text-brand-dark/g, 'text-slate-900');
content = content.replace(/bg-brand-gold/g, 'bg-indigo-600');
content = content.replace(/border-brand-gold/g, 'border-indigo-500');
content = content.replace(/hover:text-brand-dark/g, 'hover:text-slate-900');
content = content.replace(/hover:text-brand-gold/g, 'hover:text-indigo-600');
content = content.replace(/focus:border-brand-gold/g, 'focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500');
content = content.replace(/hover:bg-\[#e64a19\]/g, 'hover:bg-indigo-700');
content = content.replace(/bg-gray-50/g, 'bg-slate-50');
content = content.replace(/border-gray-100/g, 'border-slate-200');
content = content.replace(/border-gray-200/g, 'border-slate-300');
content = content.replace(/text-gray-500/g, 'text-slate-500');
content = content.replace(/text-gray-700/g, 'text-slate-700');
content = content.replace(/text-gray-400/g, 'text-slate-400');
content = content.replace(/text-white bg-red-600/g, 'text-white bg-rose-600');
content = content.replace(/hover:bg-red-700/g, 'hover:bg-rose-700');

// Fix specific text colors that shouldn't be indigo-400 on white background
content = content.replace(/text-indigo-400 px-8/g, 'text-white px-8'); // Save Dish buttons
content = content.replace(/text-indigo-400 px-6/g, 'text-white px-6'); // Add New Dish button
content = content.replace(/text-indigo-400 bg-white/g, 'text-slate-900 bg-white');

// Fix sidebar active state text color
content = content.replace(/text-indigo-400 border-indigo-500 font-bold shadow-md/g, 'text-indigo-400 border-indigo-400 font-bold');

fs.writeFileSync(targetFile, content);
console.log('Updated AdminDashboard.jsx color theme successfully.');

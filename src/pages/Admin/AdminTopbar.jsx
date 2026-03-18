import { useState, useEffect } from 'react';
import { Bell, Search, User, ChevronDown, Menu, Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../../context/DarkModeContext';

export default function AdminTopbar({ onMenuClick }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(5); // Mock
  const [user] = useState({ name: 'Admin User', email: 'admin@campusflow.com' });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', searchQuery);
  };

  return (
    <div className={`h-16 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm ${isDarkMode ? 'shadow-gray-900/20' : 'shadow-lg'}`}>
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Mobile Menu + Breadcrumbs */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 lg:hidden rounded-xl hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <Menu size={20} />
          </button>
          <nav className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 max-w-md">
            <span className="text-gray-900 dark:text-white font-semibold">Dashboard</span>
            <span className="text-gray-400">/</span>
            <span>Overview</span>
          </nav>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md mx-8 hidden lg:flex">
          <form onSubmit={handleSearch} className="w-full relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students, departments, fees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500"
            />
          </form>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors"
            title={isDarkMode ? 'Light mode' : 'Dark mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-xl hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors relative">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg">
                  {notifications > 9 ? '9+' : notifications}
                </span>
              )}
            </button>
          </div>

          {/* Profile Dropdown */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-white/50">
              <User size={18} className="text-white" />
            </div>
            <div className="hidden md:block text-right">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
            <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}


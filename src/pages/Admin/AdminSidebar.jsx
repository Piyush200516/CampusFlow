import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Building2, DollarSign, Settings, 
  LogOut, ChevronLeft, ChevronRight, X, Bell, Menu 
} from 'lucide-react';
import { useDarkMode } from '../../context/DarkModeContext';

export default function AdminSidebar({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/admin/students', icon: Users },
    { name: 'Departments', path: '/admin/departments', icon: Building2 },
    { name: 'Fees', path: '/admin/fees', icon: DollarSign },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    // TODO: Clear auth tokens
    navigate('/login');
  };

  return (
    <div className={`flex flex-col h-full ${collapsed ? 'w-16' : 'w-full'}`}>
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center gap-3">
          {collapsed ? (
            <Menu size={24} className="text-gray-700 dark:text-gray-300 cursor-pointer" onClick={() => setCollapsed(false)} />
          ) : (
            <>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                  CampusFlow Admin
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">College Management</p>
              </div>
            </>
          )}
          {!collapsed && (
            <button 
              className="ml-auto p-1 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors lg:hidden"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                group flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                }
                ${collapsed ? 'justify-center' : 'px-4'}
              `}
              onClick={() => onClose?.()}
            >
              <Icon size={20} className={collapsed ? 'w-5 h-5' : 'w-6 h-6'} />
              {!collapsed && <span className="font-medium">{item.name}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto w-2 h-8 bg-white/30 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 group"
        >
          <LogOut size={20} />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
        {!collapsed ? (
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <ChevronLeft 
              size={16} 
              className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors" 
              onClick={() => setCollapsed(true)} 
            />
            <span>Collapse</span>
          </div>
        ) : (
          <ChevronRight 
            size={16} 
            className="ml-auto cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors" 
            onClick={() => setCollapsed(false)} 
          />
        )}
      </div>
    </div>
  );
}


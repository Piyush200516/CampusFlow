import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Building2, Users, ClipboardList, Settings, LogOut, ChevronLeft, ChevronRight, X, Briefcase, FileText, UserRound, GraduationCap } from "lucide-react";

export default function CDCSidebar({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("cdcEmail");
    localStorage.removeItem("userData");
    localStorage.removeItem("userRole");
    navigate("/login");
    if (onClose) onClose();
  };

  const menuItems = [
    { name: "Dashboard", path: "/cdc/dashboard", icon: LayoutDashboard, color: "from-blue-500 to-indigo-600" },
    { name: "Add Company", path: "/cdc/add-company", icon: Building2, color: "from-emerald-500 to-teal-600" },
    { name: "Company List", path: "/cdc/company-list", icon: Briefcase, color: "from-orange-500 to-amber-600" },
    { name: "Applications", path: "/cdc/applications", icon: FileText, color: "from-purple-500 to-violet-600" },
    { name: "Student Forms", path: "/cdc/student-forms", icon: ClipboardList, color: "from-pink-500 to-rose-600" },
    { name: "Update Status", path: "/cdc/update-status", icon: Users, color: "from-cyan-500 to-sky-600" },
    { name: "Settings", path: "/cdc/settings", icon: Settings, color: "from-gray-500 to-gray-600" },
  ];

  return (
    <div className={`${collapsed ? "w-20" : "w-72"} h-full bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-r border-gray-700/50 flex flex-col shadow-2xl shadow-black/20`}>
      
      {/* Header */}
      <div className="p-5 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/30 animate-float">
                <Building2 size={24} className="text-white drop-shadow-sm" />
              </div>
              <div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
                  CDC Portal
                </h2>
                <p className="text-xs font-semibold text-emerald-400/90 flex items-center gap-1 mt-1">
                  <GraduationCap size={12} />
                  Career Development Cell
                </p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/30 mx-auto animate-float">
              <Building2 size={24} className="text-white" />
            </div>
          )}
          <div className="flex items-center gap-2">
            {onClose && (
              <button 
                onClick={onClose} 
                className="p-2.5 rounded-2xl hover:bg-white/10 backdrop-blur-sm text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-black/20 lg:hidden"
              >
                <X size={20} />
              </button>
            )}
            <button 
              onClick={() => setCollapsed(!collapsed)} 
              className="p-2.5 rounded-2xl hover:bg-white/10 backdrop-blur-sm text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-black/20 hidden lg:flex"
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-gray-600/50 scrollbar-track-gray-800/30">
        <div className="space-y-1.5 pt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                onClick={() => { if (onClose) onClose(); }} 
                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-lg hover:shadow-${item.color.replace('from-', '').replace('to-', '')}/20 backdrop-blur-sm border border-transparent hover:border-white/20 ${
                  isActive 
                    ? `bg-gradient-to-r ${item.color} text-white shadow-xl shadow-${item.color.replace('from-', '').replace('to-', '')}/30 ring-2 ring-white/30 scale-105` 
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <div className={`p-2 rounded-xl transition-all duration-300 flex-shrink-0 ${
                  isActive 
                    ? `bg-white/20 backdrop-blur-sm shadow-lg scale-110` 
                    : "group-hover:scale-110 group-hover:bg-white/20"
                }`}>
                  <Icon size={20} />
                </div>
                {!collapsed && (
                  <span className="font-semibold text-sm tracking-wide flex-1">
                    {item.name}
                  </span>
                )}
                {isActive && !collapsed && (
                  <div className="absolute right-4 w-2 h-8 bg-gradient-to-b from-white/50 to-transparent rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer Profile */}
      <div className="p-4 border-t border-gray-700/50 mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 cursor-pointer group border border-gray-700/50 hover:border-white/30 hover:shadow-lg shadow-sm">
          {!collapsed && (
            <>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <UserRound size={20} className="text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white truncate group-hover:text-emerald-400 transition-colors">
                  CDC Admin
                </p>
                <p className="text-xs text-gray-400 truncate">
                  cdc@campusflow.in
                </p>
              </div>
            </>
          )}
          {collapsed && (
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 mx-auto">
              <UserRound size={20} className="text-white" />
            </div>
          )}
          <LogOut size={18} className="text-gray-400 ml-auto group-hover:text-red-400 transition-colors flex-shrink-0" onClick={handleLogout} />
        </div>
        <button 
          onClick={handleLogout} 
          className={`flex items-center gap-3 px-4 py-3 mt-2 rounded-2xl text-red-400 hover:bg-red-900/20 hover:text-red-300 w-full transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm border border-red-900/30 shadow-md hover:shadow-lg font-medium ${collapsed ? "justify-center text-sm" : ""}`}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}


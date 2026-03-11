import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Award,
  Clock,
  Rocket,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  UserCircle,
  BarChart3,
  GraduationCap,
  Menu
} from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function Sidebar({ onClose }) {
  const { isDarkMode } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("studentEmail");
    localStorage.removeItem("userData");
    navigate("/login");
    if (onClose) onClose();
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Information Form", path: "/Information", icon: <FileText size={20} /> },
    { name: "Internships", path: "/internships", icon: <Briefcase size={20} /> },
    { name: "Fee", path: "/Fee", icon: <Award size={20} /> },
    { name: "Attendance", path: "/attendance", icon: <Clock size={20} /> },
    { name: "Placement Drives", path: "/Plackment", icon: <Rocket size={20} /> },
    { name: "TC", path: "/TC", icon: <Users size={20} /> },
    { name: "Administrative Features", path: "/Administrative_Features", icon: <UserCircle size={20} /> },
    { name: "Dashboard Analytics", path: "/Dashboard_Analytics", icon: <BarChart3 size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className={`${collapsed ? "w-20" : "w-72"} h-screen flex flex-col transition-all duration-300 ${
      isDarkMode ? "bg-gray-800" : "bg-white"
    }`}>
      {/* Logo Section */}
      <div className={`p-4 border-b ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <GraduationCap size={22} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">CampusFlow</h2>
                <p className={`text-xs ${isDarkMode ? "text-blue-400" : "text-blue-500"}`}>Student Portal</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25">
              <GraduationCap size={22} className="text-white" />
            </div>
          )}
          <div className="flex items-center gap-2">
            {onClose && (
              <button onClick={onClose} className={`p-2 rounded-xl transition-colors ${
                isDarkMode ? "hover:bg-gray-700 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              } lg:hidden`}>
                <X size={20} />
              </button>
            )}
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isDarkMode 
                  ? "hover:bg-gray-700 text-gray-400 hover:text-white" 
                  : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              } hidden lg:flex ${collapsed ? "mx-auto" : ""}`}
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => { if (onClose) onClose(); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                  : isDarkMode
                    ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <span className={`transition-transform duration-300 group-hover:scale-110 ${
                location.pathname === item.path ? "text-white" : isDarkMode ? "text-gray-400 group-hover:text-white" : "text-gray-500 group-hover:text-gray-700"
              }`}>
                {item.icon}
              </span>
              {!collapsed && <span className="font-medium">{item.name}</span>}
              {!collapsed && location.pathname === item.path && (
                <span className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className={`p-4 border-t ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
        <button 
          onClick={handleLogout}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-full ${
            isDarkMode 
              ? "text-red-400 hover:bg-red-900/30" 
              : "text-red-500 hover:bg-red-50"
          } ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={20} className="transition-transform duration-300 hover:rotate-12" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}


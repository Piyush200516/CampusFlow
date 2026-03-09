import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  CheckCircle,
  Settings,
  LogOut,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  X,
  GraduationCap,
  UserCheck,
  ClipboardList
} from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function CDCSidebar({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("cdcEmail");
    navigate("/login");
    if (onClose) onClose();
  };

  const menuItems = [
    { name: "Dashboard", path: "/cdc/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Add Company", path: "/cdc/add-company", icon: <Building2 size={20} /> },
    { name: "Company List", path: "/cdc/company-list", icon: <Briefcase size={20} /> },
    { name: "Applications", path: "/cdc/applications", icon: <Users size={20} /> },
    { name: "Update Status", path: "/cdc/update-status", icon: <CheckCircle size={20} /> },
    { name: "Student Forms", path: "/cdc/student-forms", icon: <ClipboardList size={20} /> },
    { name: "Settings", path: "/cdc/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className={`${collapsed ? "w-20" : "w-72"} h-screen flex flex-col justify-between transition-all duration-300 ease-in-out ${
      isDarkMode ? "bg-gray-800" : "bg-white"
    }`}>
      {/* Border */}
      <div className={`border-r h-full flex flex-col ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      }`}>
        
        {/* Logo Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                  isDarkMode 
                    ? "bg-gradient-to-br from-green-500 to-teal-600" 
                    : "bg-gradient-to-br from-green-500 to-teal-500"
                }`}>
                  <GraduationCap size={22} className="text-white" />
                </div>
                <div>
                  <h2 className={`text-xl font-bold transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}>
                    CampusFlow
                  </h2>
                  <p className={`text-xs font-medium transition-colors duration-300 ${
                    isDarkMode ? "text-green-400" : "text-green-600"
                  }`}>
                    CDC Portal
                  </p>
                </div>
              </div>
            )}
            {collapsed && (
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto shadow-lg ${
                isDarkMode 
                  ? "bg-gradient-to-br from-green-500 to-teal-600" 
                  : "bg-gradient-to-br from-green-500 to-teal-500"
              }`}>
                <GraduationCap size={22} className="text-white" />
              </div>
            )}
            <div className="flex items-center gap-2">
              {/* Mobile Close Button */}
              {onClose && (
                <button 
                  onClick={onClose}
                  className={`p-2 rounded-xl transition-all duration-300 lg:hidden ${
                    isDarkMode 
                      ? "hover:bg-gray-700 text-gray-400 hover:text-white" 
                      : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <X size={20} />
                </button>
              )}
              <button 
                onClick={() => setCollapsed(!collapsed)}
                className={`p-2 rounded-xl transition-all duration-300 hidden lg:flex items-center justify-center ${
                  isDarkMode 
                    ? "hover:bg-gray-700 text-gray-400 hover:text-white" 
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                }`}
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col gap-1.5">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (onClose) onClose();
                }}
                className={`
                  flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group
                  ${collapsed ? "justify-center" : ""}
                  ${
                    location.pathname === item.path
                      ? isDarkMode 
                        ? "bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg shadow-green-500/25" 
                        : "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg shadow-green-500/25"
                      : isDarkMode 
                        ? "hover:bg-gray-700/50 text-gray-300 hover:text-white" 
                        : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                  }
                `}
                title={collapsed ? item.name : ""}
              >
                <span className={`transition-transform duration-300 ${
                  location.pathname === item.path ? "scale-110" : "group-hover:scale-110"
                }`}>
                  {item.icon}
                </span>
                {!collapsed && <span className="font-medium">{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 mt-auto">
          <button 
            onClick={handleLogout}
            className={`
              flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 w-full
              ${collapsed ? "justify-center" : ""}
              ${
                isDarkMode 
                  ? "hover:bg-red-600/20 text-red-400 hover:text-red-300" 
                  : "hover:bg-red-50 text-red-600 hover:text-red-700"
              }`}
            title={collapsed ? "Logout" : ""}
          >
            <LogOut size={20} />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}


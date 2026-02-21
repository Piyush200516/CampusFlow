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
  PanelLeftClose,
  PanelLeft
} from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function Sidebar({ isCollapsed, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Information Form", path: "/Information", icon: <FileText size={18} /> },
    { name: "Internships", path: "/internships", icon: <Briefcase size={18} /> },
    { name: "Fee", path: "/Fee", icon: <Award size={18} /> },
    { name: "Attendance", path: "/attendance", icon: <Clock size={18} /> },
    { name: "Placement Drives", path: "/Plackment", icon: <Rocket size={18} /> },
    { name: "TC", path: "/TC", icon: <Users size={18} /> },
    { name: "Administrative Features", path: "/Administrative_Features", icon: <Rocket size={18} /> },
     { name: "Dashboard Analytics", path: "/Dashboard_Analytics", icon: <Rocket size={18} /> },
   { name: "Settings", path: "/settings", icon: <Settings size={18} /> },

  ]

  return (
    <div className={`h-screen flex flex-col justify-between p-4 border-r transition-all duration-300 ${
      darkMode ? "bg-zinc-800 border-zinc-700" : "bg-gray-100"
    } ${isCollapsed ? "w-16" : "w-64"}`}>

        {/* Logo & Toggle Button */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onToggle}
            className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 ${
              darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-700"
            }`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {!isCollapsed && (
              <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Portal
              </h2>
            )}
            {isCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
                ${
                  location.pathname === item.path
                    ? darkMode ? "bg-gray-700 font-semibold text-white" : "bg-gray-300 font-semibold text-gray-900"
                    : darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-700"
                }
                ${isCollapsed ? "justify-center" : ""}
              `}
              title={isCollapsed ? item.name : ""}
            >
              {item.icon}
              {!isCollapsed && item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div>
        <button 
          onClick={handleLogout}
          className={`w-full flex items-center gap-2 border rounded-lg py-2 px-4 transition-colors duration-300 ${
            darkMode 
              ? "bg-gray-700 border-gray-600 hover:bg-gray-600 text-white" 
              : "bg-white border-gray-300 hover:bg-gray-200 text-gray-700"
          } ${isCollapsed ? "justify-center px-2" : ""}
          `}
          title={isCollapsed ? "Logout" : ""}
        >
          <LogOut size={18} />
          {!isCollapsed && "Logout"}
        </button>
      </div>
    </div>
  );
}

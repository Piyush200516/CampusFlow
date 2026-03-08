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
  ChevronRight
} from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("studentEmail");
    navigate("/login");
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
  ];

  return (
    <div className={`${collapsed ? "w-20" : "w-64"} h-screen flex flex-col justify-between p-4 border-r transition-all duration-300 ${
      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    }`}>

      {/* Logo Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          {!collapsed && (
            <h2 className={`text-xl font-bold transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}>Portal</h2>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className={`p-1.5 rounded-lg transition-colors ${
              isDarkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300
                ${collapsed ? "justify-center" : ""}
                ${
                  location.pathname === item.path
                    ? isDarkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
                    : isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"
                }
              `}
              title={collapsed ? item.name : ""}
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div>
        <button 
          onClick={handleLogout}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors duration-300 w-full
            ${collapsed ? "justify-center" : ""}
            ${
              isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"
            }`}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}


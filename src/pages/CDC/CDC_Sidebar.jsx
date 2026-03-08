import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  CheckCircle,
  Settings,
  LogOut,
  Briefcase
} from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function CDCSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("cdcEmail");
    // Navigate to login page
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/cdc/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Add Company", path: "/cdc/add-company", icon: <Building2 size={18} /> },
    { name: "Student Internship", path: "/cdc/company-list", icon: <Building2 size={18} /> },
    { name: "Applications", path: "/cdc/applications", icon: <Users size={18} /> },
    { name: "Update Status", path: "/cdc/update-status", icon: <CheckCircle size={18} /> },
    { name: "Student Forms", path: "/cdc/student-forms", icon: <FileText size={18} /> },
    { name: "Settings", path: "/cdc/settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className={`w-64 h-screen flex flex-col justify-between p-4 border-r transition-colors duration-300 ${
      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100"
    }`}>

      {/* Logo */}
      <div>
        <h2 className={`text-xl font-bold mb-6 transition-colors duration-300 ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}>CDC Portal</h2>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-300
                ${
                  location.pathname === item.path
                    ? isDarkMode ? "bg-gray-700 text-white font-semibold" : "bg-gray-300 font-semibold"
                    : isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200"
                }
              `}
            >
              {item.icon}
              <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div>
        <button 
          onClick={handleLogout}
          className={`w-full flex items-center gap-2 border rounded-lg py-2 px-4 hover:bg-gray-200 transition-colors duration-300 ${
            isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600" : "bg-white border-gray-300 text-gray-700"
          }`}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

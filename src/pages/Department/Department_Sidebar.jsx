import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Calendar,
  Settings,
  LogOut,
  UserCheck
} from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function DepartmentSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("departmentEmail");
    // Navigate to login page
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/department/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Student List", path: "/department/student-list", icon: <Users size={18} /> },
    { name: "Attendance Update", path: "/department/attendance-update", icon: <Calendar size={18} /> },
    { name: "Verify Forms", path: "/department/verify-forms", icon: <ClipboardCheck size={18} /> },
    { name: "Settings", path: "/department/settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className={`w-64 h-screen flex flex-col justify-between p-4 border-r transition-colors duration-300 ${
      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100"
    }`}>

      {/* Logo */}
      <div>
        <h2 className={`text-xl font-bold mb-6 transition-colors duration-300 ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}>Department Portal</h2>

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

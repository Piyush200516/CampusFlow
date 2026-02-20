import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Award,
  Clock,
  Rocket,
  Users,
  Settings,
  LogOut
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Information Form", path: "/caf", icon: <FileText size={18} /> },
    { name: "Internships", path: "/internships", icon: <Briefcase size={18} /> },
    { name: "Fee", path: "/Fee", icon: <Award size={18} /> },
    { name: "Attendance", path: "/attendance", icon: <Clock size={18} /> },
    { name: "Placement Drives", path: "/Plackment", icon: <Rocket size={18} /> },
    { name: "TC", path: "/mock", icon: <Users size={18} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="w-64 h-screen bg-gray-100 flex flex-col justify-between p-4 border-r">

      {/* Logo */}
      <div>
        <h2 className="text-xl font-bold mb-6">Portal</h2>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
                ${
                  location.pathname === item.path
                    ? "bg-gray-300 font-semibold"
                    : "hover:bg-gray-200"
                }
              `}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div>
        <button className="w-full flex items-center gap-2 bg-white border rounded-lg py-2 px-4 hover:bg-gray-200">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

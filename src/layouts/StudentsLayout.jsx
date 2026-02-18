import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Home,
  Clipboard,
  Briefcase,
  Award,
  Clock,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

export default function StudentLayout() {
  const [studentEmail, setStudentEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("studentEmail");
    if (!email) {
      navigate("/login");
    } else {
      setStudentEmail(email);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("studentEmail");
    navigate("/login");
  };

  const links = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Internships / Job", icon: Briefcase, path: "/internships" },
    { name: "Attendance", icon: Clock, path: "/attendance" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col justify-between p-4">
        <div>
          <div className="mb-8 font-bold text-xl">Portal</div>

          <nav className="space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="flex items-center p-2 rounded-md hover:bg-gray-100"
              >
                <link.icon className="h-5 w-5 mr-3" />
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full p-2 text-red-500 border rounded-md hover:bg-red-100"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <div className="h-16 bg-white border-b flex items-center justify-between px-6">
          <img
            src="/Acropolis-logo.png"
            alt="Logo"
            className="h-10"
          />
          <div className="font-semibold">{studentEmail}</div>
        </div>

        {/* Dynamic Page Content */}
        <div className="p-6 overflow-y-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

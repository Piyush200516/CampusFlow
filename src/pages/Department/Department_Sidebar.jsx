import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, ClipboardCheck, FileText, Settings, LogOut, ChevronLeft, ChevronRight, X, GraduationCap } from "lucide-react";

export default function DepartmentSidebar({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("departmentEmail");
    navigate("/login");
    if (onClose) onClose();
  };

  const menuItems = [
    { name: "Dashboard", path: "/department/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Student List", path: "/department/student-list", icon: <Users size={20} /> },
    { name: "Attendance", path: "/department/attendance-update", icon: <ClipboardCheck size={20} /> },
    { name: "Verify Forms", path: "/department/verify-forms", icon: <FileText size={20} /> },
    { name: "Settings", path: "/department/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className={`${collapsed ? "w-20" : "w-72"} h-screen bg-gray-800 flex flex-col`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center">
                <GraduationCap size={22} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Department</h2>
                <p className="text-xs text-amber-400">Academic Section</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center mx-auto">
              <GraduationCap size={22} className="text-white" />
            </div>
          )}
          <div className="flex items-center gap-2">
            {onClose && (
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-700 text-gray-400 hover:text-white lg:hidden">
                <X size={20} />
              </button>
            )}
            <button onClick={() => setCollapsed(!collapsed)} className="p-2 rounded-xl hover:bg-gray-700 text-gray-400 hover:text-white hidden lg:flex">
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={() => { if (onClose) onClose(); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${location.pathname === item.path ? "bg-amber-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"} ${collapsed ? "justify-center" : ""}`}>
              {item.icon}
              {!collapsed && <span className="font-medium">{item.name}</span>}
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button onClick={handleLogout} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-900/30 w-full ${collapsed ? "justify-center" : ""}`}>
          <LogOut size={20} />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}


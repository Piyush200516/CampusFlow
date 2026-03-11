import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Building2, Users, ClipboardList, Settings, LogOut, ChevronLeft, ChevronRight, X, Briefcase, FileText } from "lucide-react";

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
    { name: "Dashboard", path: "/cdc/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Add Company", path: "/cdc/add-company", icon: <Building2 size={20} /> },
    { name: "Company List", path: "/cdc/company-list", icon: <Briefcase size={20} /> },
    { name: "Applications", path: "/cdc/applications", icon: <FileText size={20} /> },
    { name: "Student Forms", path: "/cdc/student-forms", icon: <ClipboardList size={20} /> },
    { name: "Update Status", path: "/cdc/update-status", icon: <Users size={20} /> },
    { name: "Settings", path: "/cdc/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className={`${collapsed ? "w-20" : "w-72"} h-full bg-gray-800 flex flex-col`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <Building2 size={22} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">CDC Portal</h2>
                <p className="text-xs text-green-400">Career Development</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center mx-auto">
              <Building2 size={22} className="text-white" />
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
            <Link key={item.path} to={item.path} onClick={() => { if (onClose) onClose(); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${location.pathname === item.path ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"} ${collapsed ? "justify-center" : ""}`}>
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


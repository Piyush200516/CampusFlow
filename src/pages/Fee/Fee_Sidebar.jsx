import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, DollarSign, CreditCard, Users, Settings, LogOut, ChevronLeft, ChevronRight, X, Receipt } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function FeeSidebar({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { isDarkMode } = useDarkMode();

  const handleLogout = () => {
    localStorage.removeItem("feeEmail");
    navigate("/login");
    if (onClose) onClose();
  };

  const menuItems = [
    { name: "Dashboard", path: "/fee/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Fee Records", path: "/fee/records", icon: <Receipt size={20} /> },
    { name: "Update Fee", path: "/fee/update", icon: <CreditCard size={20} /> },
    { name: "Student Fees", path: "/fee/student-fees", icon: <Users size={20} /> },
    { name: "TC Approval", path: "/fee/tc-approval", icon: <DollarSign size={20} /> },
    { name: "Settings", path: "/fee/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className={`${collapsed ? "w-20" : "w-72"} h-full flex flex-col transition-all duration-300 ${
      isDarkMode ? "bg-gray-800" : "bg-white"
    }`}>

      <div className={`p-4 border-b ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>

        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center">
                <DollarSign size={22} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Fee Portal</h2>
                <p className="text-xs text-rose-400">Finance Department</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center mx-auto">
              <DollarSign size={22} className="text-white" />
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
            <Link key={item.path} to={item.path} onClick={() => { if (onClose) onClose(); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${location.pathname === item.path ? "bg-rose-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"} ${collapsed ? "justify-center" : ""}`}>
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

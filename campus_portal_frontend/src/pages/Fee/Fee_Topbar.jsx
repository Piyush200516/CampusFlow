import { useEffect, useState } from "react";
import { Moon, Sun, Bell, Search, Menu, DollarSign, Sparkles, User, LogOut, Settings, ChevronDown, TrendingUp, CreditCard, Users } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";
import { useNavigate } from "react-router-dom";

export default function FeeTopbar({ onMenuClick }) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("feeEmail");
    const userData = localStorage.getItem("userData");
    if (storedEmail) setEmail(storedEmail);
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.full_name || "");
    }
  }, []);

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : "F";

  const handleLogout = () => {
    localStorage.removeItem("feeEmail");
    localStorage.removeItem("userData");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const notifications = [
    { id: 1, title: "Payment Received", message: "₹12,000 received from Rahul Sharma", time: "Just now", unread: true },
    { id: 2, title: "Pending Fee", message: "85 students have pending fees", time: "1 hour ago", unread: true },
    { id: 3, title: "TC Request", message: "New TC approval request", time: "2 hours ago", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className={`w-full flex justify-between items-center px-4 md:px-6 py-3 transition-all duration-500 backdrop-blur-xl ${isDarkMode ? "bg-gray-900/80 border-b border-gray-700/50" : "bg-white/80 border-b border-gray-100"}`}>
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 hover:scale-105 ${isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-100"}`}>
          <Menu size={24} className={isDarkMode ? "text-white" : "text-gray-700"} />
        </button>
        <div className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/25 animate-float">
          <DollarSign size={20} className="text-white" />
        </div>
        <div className="hidden sm:block">
          <h1 className={`text-lg font-bold tracking-tight ${isDarkMode ? "text-white" : "text-gray-800"}`}>Fee Portal</h1>
          <p className={`text-xs font-medium flex items-center gap-1 ${isDarkMode ? "text-rose-400" : "text-rose-600"}`}>
            <Sparkles size={10} className="animate-pulse-subtle" />Finance Department
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-3">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}>
          <TrendingUp size={16} className="text-rose-500" />
          <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>₹45L</span>
          <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Collected</span>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}>
          <CreditCard size={16} className="text-orange-500" />
          <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>85</span>
          <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Pending</span>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}>
          <Users size={16} className="text-blue-500" />
          <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>1,250</span>
          <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Students</span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <div className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-2xl ${isDarkMode ? "bg-gray-800/50 border border-gray-700/50" : "bg-gray-100/50 border border-gray-200"}`}>
          <Search size={18} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
          <input type="text" placeholder="Search..." className={`bg-transparent outline-none text-sm w-32 font-medium ${isDarkMode ? "text-white placeholder-gray-400" : "text-gray-700 placeholder-gray-500"}`} />
        </div>

        <div className="relative">
          <button className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-105 relative ${isDarkMode ? "bg-gray-700/50 hover:bg-gray-600 border border-gray-600" : "bg-gray-100 hover:bg-gray-200 border border-gray-200"}`} onClick={() => setShowDropdown(!showDropdown)}>
            <Bell size={18} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
            {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">{unreadCount}</span>}
          </button>
          {showDropdown && (
            <div className={`absolute right-0 mt-3 w-80 rounded-2xl shadow-2xl border z-50 overflow-hidden animate-scaleIn ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`px-4 py-3 border-b cursor-pointer ${isDarkMode ? "border-gray-700/50 hover:bg-gray-700/50" : "border-gray-100 hover:bg-gray-50"} ${notif.unread ? (isDarkMode ? "bg-rose-900/20" : "bg-rose-50") : ""}`}>
                    <div className="flex items-start gap-3">
                      {notif.unread && <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></span>}
                      <div className={notif.unread ? "" : "ml-5"}>
                        <p className={`font-medium text-sm ${isDarkMode ? "text-white" : "text-gray-800"}`}>{notif.title}</p>
                        <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{notif.message}</p>
                        <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button onClick={toggleDarkMode} className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-105 ${isDarkMode ? "bg-gray-700/50 hover:bg-gray-600 border border-gray-600" : "bg-gray-100 hover:bg-gray-200 border border-gray-200"}`}>
          {isDarkMode ? <Sun size={18} className="text-yellow-400 animate-spin-slow" /> : <Moon size={18} className="text-gray-700" />}
        </button>
        
        <div className="relative">
          <div className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? "bg-gradient-to-r from-rose-600 to-pink-600" : "bg-gradient-to-r from-rose-500 to-pink-500"} shadow-lg shadow-rose-500/25`} onClick={() => setShowDropdown(!showDropdown)}>
            <div className="w-8 h-8 md:w-9 md:h-9 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-sm md:text-base font-bold">{getInitial(userName)}</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white text-sm font-semibold">{userName || "Fee Admin"}</span>
            </div>
            <ChevronDown size={16} className="text-white/70 hidden sm:block" />
          </div>

          {showDropdown && (
            <div className={`absolute right-0 mt-3 w-56 rounded-2xl shadow-2xl border z-50 overflow-hidden animate-scaleIn ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                <p className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{userName || "Fee Admin"}</p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{email || "fee@campus.edu"}</p>
              </div>
              <div className="py-2">
                <button onClick={() => navigate("/fee/settings")} className={`w-full flex items-center gap-3 px-4 py-2.5 ${isDarkMode ? "hover:bg-gray-700/50 text-gray-300" : "hover:bg-gray-50 text-gray-700"}`}>
                  <Settings size={18} /><span className="text-sm">Settings</span>
                </button>
              </div>
              <div className={`py-2 border-t ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                <button onClick={handleLogout} className={`w-full flex items-center gap-3 px-4 py-2.5 ${isDarkMode ? "hover:bg-red-900/30 text-red-400" : "hover:bg-red-50 text-red-600"}`}>
                  <LogOut size={18} /><span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


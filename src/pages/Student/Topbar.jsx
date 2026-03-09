import { useEffect, useState } from "react";
import { Moon, Sun, Bell, Search, Menu, GraduationCap } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function Navbar({ onMenuClick }) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const storedEmail = localStorage.getItem("studentEmail");
    const userData = localStorage.getItem("userData");
    
    if (storedEmail) {
      setEmail(storedEmail);
    }
    
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.full_name || "");
    }
  }, []);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className={`w-full flex justify-between items-center px-4 md:px-6 py-3 shadow-lg transition-all duration-300 backdrop-blur-sm ${
      isDarkMode 
        ? "bg-gray-800/95 border-b border-gray-700" 
        : "bg-white/95 border-b border-gray-100"
    }`}>

      {/* Left - Menu Button & Logo */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick}
          className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 hover:scale-105 ${
            isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          }`}
        >
          <Menu size={24} className={isDarkMode ? "text-white" : "text-gray-700"} />
        </button>

        {/* Logo */}
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
          <GraduationCap size={22} className="text-white" />
        </div>
        <div className="hidden sm:block">
          <h1 className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}>
            CampusFlow
          </h1>
          <p className={`text-xs font-medium transition-colors duration-300 ${
            isDarkMode ? "text-blue-400" : "text-blue-600"
          }`}>
            Acropolis Institute
          </p>
        </div>
      </div>

      {/* Search Bar - Hidden on mobile */}
      <div className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-300 ${
        isDarkMode ? "bg-gray-700/50 border border-gray-600" : "bg-gray-100 border border-gray-200"
      }`}>
        <Search size={18} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
        <input 
          type="text" 
          placeholder="Search..." 
          className={`bg-transparent outline-none text-sm w-48 font-medium ${
            isDarkMode ? "text-white placeholder-gray-400" : "text-gray-700 placeholder-gray-500"
          }`}
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Notifications */}
        <button
          className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-105 ${
            isDarkMode 
              ? "bg-gray-700/50 hover:bg-gray-600 border border-gray-600" 
              : "bg-gray-100 hover:bg-gray-200 border border-gray-200"
          }`}
        >
          <Bell size={18} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
        </button>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-105 ${
            isDarkMode 
              ? "bg-gray-700/50 hover:bg-gray-600 border border-gray-600" 
              : "bg-gray-100 hover:bg-gray-200 border border-gray-200"
          }`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode 
            ? <Sun size={18} className="text-yellow-400" /> 
            : <Moon size={18} className="text-gray-700" />
          }
        </button>
        
        {/* User Profile */}
        <div className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg ${
          isDarkMode 
            ? "bg-gradient-to-r from-blue-600 to-purple-600" 
            : "bg-gradient-to-r from-blue-500 to-purple-500"
        }`}>
          <div className="w-8 h-8 md:w-9 md:h-9 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-white text-sm md:text-base font-bold">
              {getInitial(userName)}
            </span>
          </div>
          <div className="hidden sm:block">
            <span className="text-white text-sm font-semibold">
              {userName || email || "Student"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


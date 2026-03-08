import { useEffect, useState } from "react";
import { Moon, Sun, Bell, Search } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function Navbar() {
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
    <div className={`w-full flex justify-between items-center px-6 py-3 shadow-lg transition-colors duration-300 backdrop-blur-sm ${
      isDarkMode ? "bg-gray-800/95" : "bg-white/95"
    }`}>

      {/* Left Logo */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-xl">🎓</span>
        </div>
        <div>
          <h1 className={`text-lg font-bold transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-blue-900"
          }`}>
            CampusFlow
          </h1>
          <p className={`text-xs transition-colors duration-300 ${
            isDarkMode ? "text-blue-400" : "text-blue-600"
          }`}>
            Acropolis Institute of Technology & Research
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl transition-colors duration-300 ${
        isDarkMode ? "bg-gray-700" : "bg-gray-100"
      }`}>
        <Search size={18} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
        <input 
          type="text" 
          placeholder="Search..." 
          className={`bg-transparent outline-none text-sm w-48 ${
            isDarkMode ? "text-white placeholder-gray-400" : "text-gray-700 placeholder-gray-500"
          }`}
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          className={`p-2 rounded-xl transition-colors duration-300 ${
            isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <Bell size={18} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
        </button>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-xl transition-colors duration-300 ${
            isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
          }`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-700" />}
        </button>
        
        {/* User Profile */}
        <div className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors duration-300 ${
          isDarkMode ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gradient-to-r from-blue-500 to-purple-500"
        }`}>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {getInitial(userName)}
            </span>
          </div>
          <div className="hidden sm:block">
            <span className="text-white text-sm font-medium">
              {userName || email || "Student"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


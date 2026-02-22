import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function CDCTopbar() {
  const [email, setEmail] = useState("");
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const storedEmail = localStorage.getItem("cdcEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <div className={`w-full flex justify-between items-center px-6 py-3 shadow-sm transition-colors duration-300 ${
      isDarkMode ? "bg-gray-800" : "bg-gray-100"
    }`}>

      {/* Left Logo */}
      <div className="flex items-center gap-3">
        <img
          src="/Acropolis-logo.png"
          alt="Logo"
          className="h-10"
        />
        <div>
          <h1 className={`text-xl font-bold transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-blue-900"
          }`}>CDC Department</h1>
          <p className={`text-sm transition-colors duration-300 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}>Career Development Cell</p>
        </div>
      </div>

      {/* Right Email & Dark Mode Toggle */}
      <div className="flex items-center gap-3">
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-xl transition-colors duration-300 ${
            isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
          }`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-700" />}
        </button>
        
        {/* User Email */}
        <div className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors duration-300 ${
          isDarkMode ? "bg-gray-700" : "bg-gray-200"
        }`}>
          <span className={`text-sm font-medium transition-colors duration-300 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}>
            {email || "CDC Admin"}
          </span>
        </div>
      </div>
    </div>
  );
}

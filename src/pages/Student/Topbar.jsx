import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function Navbar() {
  const [email, setEmail] = useState("");
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <div className={`w-full flex justify-between items-center px-6 py-3 shadow-md transition-colors duration-300 ${
      darkMode ? "bg-slate-900" : "bg-black"
    }`}>

      {/* Left Logo */}
      <div className="flex items-center gap-3">
        <img
          src="/Acropolis-logo.png"
          alt="Logo"
          className="h-10"
        />
      </div>

      {/* Right - Dark Mode Toggle & Email */}
      <div className="flex items-center gap-3">
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-xl transition-colors duration-300 ${
            darkMode 
              ? "bg-yellow-500 hover:bg-yellow-600" 
              : "bg-white hover:bg-gray-200"
          }`}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? (
            <Sun size={18} className="text-black" />
          ) : (
            <Moon size={18} className="text-black" />
          )}
        </button>

        {/* Email Display */}
        <div className={`px-4 py-2 rounded-xl transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}>
          <span className={`text-sm font-medium ${
            darkMode ? "text-white" : "text-black"
          }`}>
            {email || "No User Logged In"}
          </span>
        </div>
      </div>
    </div>
  );
}

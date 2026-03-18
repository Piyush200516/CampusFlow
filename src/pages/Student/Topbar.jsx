import { useEffect, useState } from "react";
import { Moon, Sun, Bell, Menu, GraduationCap, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

export default function Navbar({ onMenuClick }) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = () => {
      // First try to get complete profile from localStorage
      const profileData = localStorage.getItem("studentProfile");
      const userData = localStorage.getItem("userData");
      const storedEmail = localStorage.getItem("studentEmail");
      
      if (storedEmail) setEmail(storedEmail);
      
      if (profileData) {
        const profile = JSON.parse(profileData);
        setUserName(profile.full_name || profile.student_info?.full_name || "");
        setEnrollmentNo(profile.rgpv_enrollment_no || profile.student_info?.rgpv_enrollment || "");
        setCourse(profile.course || profile.student_info?.course || "");
        setBranch(profile.branch || profile.student_info?.branch || "");
      } else if (userData) {
        const user = JSON.parse(userData);
        setUserName(user.full_name || "");
        setEnrollmentNo(user.rgpv_enrollment_no || "");
        setCourse(user.course || "");
        setBranch(user.branch || "");
      }
    };
    
    fetchUserData();
    
    // Listen for storage changes
    window.addEventListener('storage', fetchUserData);
    return () => window.removeEventListener('storage', fetchUserData);
  }, []);

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : "U";

  const handleLogout = () => {
    localStorage.removeItem("studentEmail");
    localStorage.removeItem("userData");
    localStorage.removeItem("studentProfile");
    navigate("/login");
  };

  return (
    <div className={`w-full flex justify-between items-center px-4 md:px-6 py-3 border-b transition-colors duration-300 ${
      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    }`}>
      {/* Left - Menu Button & Logo */}
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className={`lg:hidden p-2.5 rounded-xl transition-colors ${
          isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"
        }`}>
          <Menu size={24} />
        </button>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
          <GraduationCap size={20} className="text-white" />
        </div>
        <div>
          <h1 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>CampusFlow</h1>
          <p className={`text-xs ${isDarkMode ? "text-blue-400" : "text-blue-500"}`}>AITR</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Notifications */}
        <button className={`p-2.5 rounded-xl transition-colors ${
          isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        }`}>
          <Bell size={18} />
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`p-2.5 rounded-xl transition-all duration-300 ${
            isDarkMode 
              ? "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400" 
              : "bg-blue-100 hover:bg-blue-200 text-blue-600"
          }`}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl transition-all duration-300 ${
              isDarkMode 
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            } text-white shadow-lg shadow-blue-500/25`}
          >
            <div className="w-7 h-7 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">{getInitial(userName)}</span>
            </div>
            <span className="text-white text-sm font-semibold hidden sm:block">
              {userName || email?.split('@')[0] || "Student"}
            </span>
            <ChevronDown size={16} className={`text-white/70 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu */}
          {profileOpen && (
            <div className={`absolute right-0 mt-2 w-48 md:w-56 rounded-xl shadow-xl border overflow-hidden z-50 ${
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}>
              <div className={`p-3 border-b ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                <p className={`font-semibold text-sm ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  {userName || "Student"}
                </p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {email || "No email"}
                </p>
              </div>
              <button 
                onClick={handleLogout}
                className={`w-full flex items-center gap-2 px-4 py-3 text-left transition-colors ${
                  isDarkMode ? "text-red-400 hover:bg-red-900/30" : "text-red-600 hover:bg-red-50"
                }`}
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


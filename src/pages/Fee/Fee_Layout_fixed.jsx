import { useState, useEffect } from "react";
import FeeSidebar from "./Fee_Sidebar";
import FeeTopbar from "./Fee_Topbar";
import { Outlet } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

export default function FeeLayout_fixed() {
  const { isDarkMode } = useDarkMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when switching to desktop
  useEffect(() => {
    if (!isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isMobile, sidebarOpen]);

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar - Always fixed */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 transform h-screen shadow-2xl shadow-gray-900/20 dark:shadow-gray-900/50 transition-all duration-500 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <FeeSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Topbar - Always fixed */}
      <div className="fixed top-0 left-72 right-0 z-40">
        <FeeTopbar onMenuClick={() => setSidebarOpen(true)} />
      </div>

      {/* Main Content Area */}
      <div className="ml-72 mt-16 p-6 md:p-8 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

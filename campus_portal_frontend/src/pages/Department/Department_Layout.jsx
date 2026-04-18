import { useState, useEffect } from "react";
import DepartmentSidebar from "./Department_Sidebar";
import DepartmentTopbar from "./Department_Topbar";
import { Outlet } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

export default function DepartmentLayout() {
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
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar - Fixed on mobile, static on desktop */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 transform transition-all duration-500 ease-in-out 
        lg:transform-none h-screen shadow-2xl shadow-gray-900/20 dark:shadow-gray-900/50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <DepartmentSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <DepartmentTopbar onMenuClick={() => setSidebarOpen(true)} />
        <main 
          className={`flex-1 overflow-y-auto p-6 md:p-8 transition-colors duration-300 scroll-smooth ${
            isDarkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}


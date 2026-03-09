import { useState } from "react";
import CDCSidebar from "./CDC_Sidebar";
import CDCTopbar from "./CDC_Topbar";
import { Outlet } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

export default function CDCLayout() {
  const { isDarkMode } = useDarkMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar - Hidden on mobile unless opened */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:transform-none
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <CDCSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <CDCTopbar onMenuClick={() => setSidebarOpen(true)} />
        <div 
          className={`p-4 md:p-6 flex-1 overflow-auto transition-colors duration-300 ${
            isDarkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

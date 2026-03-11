import { useState } from "react";
import FeeSidebar from "./Fee_Sidebar";
import FeeTopbar from "./Fee_Topbar";
import { Outlet } from "react-router-dom";

export default function FeeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar - Fixed on mobile, relative on desktop */}
      <div className={`fixed lg:relative z-50 h-screen transition-transform duration-300 lg:transform-none ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <FeeSidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      <div className="flex-1 flex flex-col">
        <FeeTopbar onMenuClick={() => setSidebarOpen(true)} />
        <div className="flex-1 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}


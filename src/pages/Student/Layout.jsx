import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

export default function Layout() {
  const { darkMode } = useDarkMode();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }} className={`transition-colors duration-300 ${
      darkMode ? "bg-neutral-900" : "bg-gray-50"
    }`}>
      
      <div style={{ position: "fixed", height: "100vh" }}>
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      </div>

      <div style={{ flex: 1, marginLeft: isSidebarCollapsed ? "4rem" : "16rem" }} className="transition-all duration-300">
        <Topbar />

        <div style={{ padding: "20px" }} className={`transition-colors duration-300 ${
          darkMode ? "bg-neutral-900" : "bg-gray-50"
        }`}>
          <Outlet />
        </div>
      </div>

    </div>
  );
}

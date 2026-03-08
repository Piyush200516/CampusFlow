import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

export default function Layout() {
  const { isDarkMode } = useDarkMode();

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh" }}>
        <Topbar />
        <div 
          style={{ padding: "20px", flex: 1, overflow: "auto" }}
          className={isDarkMode ? "bg-gray-900" : "bg-gray-50"}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}


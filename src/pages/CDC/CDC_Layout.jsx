import CDCSidebar from "./CDC_Sidebar";
import CDCTopbar from "./CDC_Topbar";
import { Outlet } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

export default function CDCLayout() {
  const { isDarkMode } = useDarkMode();

  return (
    <div style={{ display: "flex" }}>
      <CDCSidebar />

      <div style={{ flex: 1 }} className={`transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <CDCTopbar />

        <div style={{ padding: "20px" }} className={`transition-colors duration-300 ${isDarkMode ? "bg-gray-900 min-h-screen" : "bg-gray-50 min-h-screen"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

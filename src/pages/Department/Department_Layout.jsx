import DepartmentSidebar from "./Department_Sidebar";
import DepartmentTopbar from "./Department_Topbar";
import { Outlet } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

export default function DepartmentLayout() {
  const { isDarkMode } = useDarkMode();

  return (
    <div style={{ display: "flex" }}>
      <DepartmentSidebar />

      <div style={{ flex: 1 }} className={`transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <DepartmentTopbar />

        <div style={{ padding: "20px" }} className={`transition-colors duration-300 ${isDarkMode ? "bg-gray-900 min-h-screen" : "bg-gray-50 min-h-screen"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

import FeeSidebar from "./Fee_Sidebar";
import FeeTopbar from "./Fee_Topbar";
import { Outlet } from "react-router-dom";

export default function FeeLayout() {
  return (
    <div style={{ display: "flex" }}>
      
      <FeeSidebar />

      <div style={{ flex: 1 }}>
        <FeeTopbar />

        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </div>

    </div>
  );
}

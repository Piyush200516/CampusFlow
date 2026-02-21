import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      <div style={{ position: "fixed", height: "100vh" }}>
        <Sidebar />
      </div>

      <div style={{ flex: 1, marginLeft: "16rem" }}>
        <Topbar />

        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </div>

    </div>
  );
}

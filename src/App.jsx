import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";

import Sidebar from "./pages/Student/Sidebar";
import Topbar from "./pages/Student/Topbar";

import StudentDashboard from "./pages/Student/Dashboard";
import Internships from "./pages/Student/Internships";
import Attendance from "./pages/Student/Attendance";
import Fee from "./pages/Student/Fee";
import Plackment from "./pages/Student/Plackment";
import FeePayment from "./pages/Student/FeePayment";
import Information from "./pages/Student/Information";
import TC from "./pages/Student/TC";
import Settings from "./pages/Student/Settings";
import Dashboard_Analytics from "./pages/Student/Dashboard_Analytics";

import { Outlet } from "react-router-dom";

// ✅ Layout Component (Common Navbar)
function Layout() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Topbar />

        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}


function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

{/* Protected / Student Routes with Common Navbar */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="Information" element={<Information />} />
          <Route path="internships" element={<Internships />} />
          <Route path="attendance" element={<Attendance />} />
<Route path="fee" element={<Fee />} />
          <Route path="pay-fee" element={<FeePayment />} />
          <Route path="Plackment" element={<Plackment />} />
          <Route path="TC" element={<TC />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="Dashboard_Analytics" element={<Dashboard_Analytics/>} />
         </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;

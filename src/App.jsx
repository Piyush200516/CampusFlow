
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
import Administrative_Features from "./pages/Student/Administrative_Features";

// CDC Components
import CDC_Layout from "./pages/CDC/CDC_Latout";
import CDC_Dashboard from "./pages/CDC/CDC_Dashboard";

import { Outlet } from "react-router-dom";
import { useDarkMode } from "./context/DarkModeContext";

// ✅ Layout Component (Common Navbar)
function Layout() {
  const { darkMode } = useDarkMode();

  return (
    <div style={{ display: "flex" }} className={`transition-colors duration-300 ${
      darkMode ? "bg-neutral-900" : "bg-gray-50"
    }`}>
      <Sidebar />

      <div style={{ flex: 1 }}>
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
          <Route path="Administrative_Features" element={<Administrative_Features/>}/>
        </Route>

        {/* CDC (Placement Cell) Routes */}
        <Route path="/cdc" element={<CDC_Layout />}>
          <Route path="dashboard" element={<CDC_Dashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import RoleSelection from "./pages/Auth/RoleSelection";
import StudentLogin from "./pages/Auth/StudentLogin";
import CDCLogin from "./pages/Auth/CDCLogin";
import FeeLogin from "./pages/Auth/FeeLogin";
import DepartmentLogin from "./pages/Auth/DepartmentLogin";

import StudentLayout from "./pages/Student/Layout";
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

// Fee Department Imports
import FeeSidebar from "./pages/Fee/Fee_Sidebar";
import FeeTopbar from "./pages/Fee/Fee_Topbar";
import FeeDashboard from "./pages/Fee/Dashboard";
import FeeRecords from "./pages/Fee/Fee_Records";
import StudentFees from "./pages/Fee/StudentFees";
import FeeUpdate from "./pages/Fee/FeeUpdate";
import TCApproval from "./pages/Fee/TCApproval";
import FeeSettings from "./pages/Fee/Fee_Settings";

// CDC Department Imports
import CDCSidebar from "./pages/CDC/CDC_Sidebar";
import CDCTopbar from "./pages/CDC/CDC_Topbar";
import CDCDashboard from "./pages/CDC/Dashboard";
import CDCAddCompany from "./pages/CDC/AddCompany";
import CDCCompanyList from "./pages/CDC/CompanyList";
import CDCApplications from "./pages/CDC/Applications";
import CDCUpdateStatus from "./pages/CDC/UpdateStatus";
import CDCStudentForms from "./pages/CDC/StudentForms";
import CDCSettings from "./pages/CDC/CDC_Settings";

// Department Imports
import DepartmentSidebar from "./pages/Department/Department_Sidebar";
import DepartmentTopbar from "./pages/Department/Department_Topbar";
import DepartmentDashboard from "./pages/Department/Dashboard";
import DepartmentStudentList from "./pages/Department/StudentList";
import DepartmentAttendanceUpdate from "./pages/Department/AttendanceUpdate";
import DepartmentVerifyForms from "./pages/Department/VerifyForms";
import DepartmentSettings from "./pages/Department/Department_Settings";

import { Outlet } from "react-router-dom";
import { useDarkMode } from "./context/DarkModeContext";

// ✅ Layout Component (Common Navbar for Students)
function Layout() {
  const { isDarkMode } = useDarkMode();

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }} className={`transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <Topbar />

        <div style={{ padding: "20px" }} className={`transition-colors duration-300 ${isDarkMode ? "bg-gray-900 min-h-screen" : "bg-gray-50 min-h-screen"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

// ✅ Fee Layout Component (Common Navbar for Fee Department)
function FeeLayout() {
  const { isDarkMode } = useDarkMode();

  return (
    <div style={{ display: "flex" }}>
      <FeeSidebar />

      <div style={{ flex: 1 }} className={`transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <FeeTopbar />

        <div style={{ padding: "20px" }} className={`transition-colors duration-300 ${isDarkMode ? "bg-gray-900 min-h-screen" : "bg-gray-50 min-h-screen"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

// ✅ CDC Layout Component (Common Navbar for CDC Department)
function CDCLayout() {
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

// ✅ Department Layout Component (Common Navbar for Department)
function DeptLayout() {
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

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* New Separate Login Pages */}
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/cdc-login" element={<CDCLogin />} />
        <Route path="/fee-login" element={<FeeLogin />} />
        <Route path="/department-login" element={<DepartmentLogin />} />

        {/* Protected / Student Routes with Common Navbar */}
        <Route path="/" element={<StudentLayout />}>
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

        {/* Fee Department Routes */}
        <Route path="/fee" element={<FeeLayout />}>
          <Route path="dashboard" element={<FeeDashboard />} />
          <Route path="records" element={<FeeRecords />} />
          <Route path="student-fees" element={<StudentFees />} />
          <Route path="update" element={<FeeUpdate />} />
          <Route path="tc-approval" element={<TCApproval />} />
          <Route path="settings" element={<FeeSettings />} />
        </Route>

        {/* CDC Department Routes */}
        <Route path="/cdc" element={<CDCLayout />}>
          <Route path="dashboard" element={<CDCDashboard />} />
          <Route path="add-company" element={<CDCAddCompany />} />
          <Route path="company-list" element={<CDCCompanyList />} />
          <Route path="applications" element={<CDCApplications />} />
          <Route path="update-status" element={<CDCUpdateStatus />} />
          <Route path="student-forms" element={<CDCStudentForms />} />
          <Route path="settings" element={<CDCSettings />} />
        </Route>

        {/* Department Routes */}
        <Route path="/department" element={<DeptLayout />}>
          <Route path="dashboard" element={<DepartmentDashboard />} />
          <Route path="student-list" element={<DepartmentStudentList />} />
          <Route path="attendance-update" element={<DepartmentAttendanceUpdate />} />
          <Route path="verify-forms" element={<DepartmentVerifyForms />} />
          <Route path="settings" element={<DepartmentSettings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;

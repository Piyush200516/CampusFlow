import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import RoleSelection from "./pages/Auth/RoleSelection";
import StudentLogin from "./pages/Auth/StudentLogin";
import CDCLogin from "./pages/Auth/CDCLogin";
import FeeLogin from "./pages/Auth/FeeLogin";
import DepartmentLogin from "./pages/Auth/DepartmentLogin";

// Student Layout Imports
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
import AIAssistant from "./pages/Student/AIAssistant";

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
import DepartmentLayout_fixed from "./pages/Department/Department_Layout_fixed.jsx";
import DepartmentDashboard from "./pages/Department/Dashboard";
import DepartmentStudentList from "./pages/Department/StudentList";
import DepartmentAttendanceUpdate from "./pages/Department/AttendanceUpdate";
import DepartmentVerifyForms from "./pages/Department/VerifyForms";
import DepartmentSettings from "./pages/Department/Department_Settings";

// Admin Imports
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminStudents from "./pages/Admin/Students";
import AdminDepartments from "./pages/Admin/Departments";
import AdminFees from "./pages/Admin/Fees";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
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
          <Route path="ai-assistant" element={<AIAssistant />} />
        </Route>

        {/* Fee Department Routes */}
        <Route path="/fee/*" element={<FeeLayout_fixed />}>
          <Route index element={<FeeDashboard />} />
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
        <Route path="/department" element={<DepartmentLayout_fixed />}>
          <Route path="dashboard" element={<DepartmentDashboard />} />
          <Route path="student-list" element={<DepartmentStudentList />} />
          <Route path="attendance-update" element={<DepartmentAttendanceUpdate />} />
          <Route path="verify-forms" element={<DepartmentVerifyForms />} />
          <Route path="settings" element={<DepartmentSettings />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="departments" element={<AdminDepartments />} />
          <Route path="fees" element={<AdminFees />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

import FeeLayout_fixed from "./pages/Fee/Fee_Layout_fixed.jsx";

// ✅ CDC Layout Component
function CDCLayout() {
  return (
    <div style={{ display: "flex" }}>
      <CDCSidebar />
      <div style={{ flex: 1, backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        <CDCTopbar />
        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;


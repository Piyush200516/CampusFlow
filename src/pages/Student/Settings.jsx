import { useState, useEffect } from "react";
import { Shield, Key, User, Mail, Smartphone, Bell, Lock, Eye, EyeOff } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";
import API from "../../services/api";
import MFASetup from "../../components/MFASetup";

export default function Settings() {
  const { isDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState("profile");
  const [showMfaModal, setShowMfaModal] = useState(false);
  const [showPasswords, setShowPasswords] = useState({});
  const [loading, setLoading] = useState(true);
  const [mfaStatus, setMfaStatus] = useState('disabled');
  
  // Student data state
  const [studentData, setStudentData] = useState({
    full_name: "",
    email: "",
    rgpv_enrollment_no: "",
    institute_enrollment_no: "",
    course: "",
    branch: "",
    batch_year: "",
    section: ""
  });

  // Get user ID from localStorage
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const user_id = userData?.id;
  const storedEmail = localStorage.getItem("studentEmail");

  // Fetch student data from API (Information Form data)
  useEffect(() => {
    const fetchStudentData = async () => {
      if (!user_id) {
        // Fallback to localStorage data if no user_id
        const profileData = localStorage.getItem("studentProfile");
        const localUserData = localStorage.getItem("userData");
        
        if (profileData) {
          const profile = JSON.parse(profileData);
          setStudentData({
            full_name: profile.full_name || profile.student_info?.full_name || "",
            email: storedEmail || profile.email || profile.student_info?.email || "",
            rgpv_enrollment_no: profile.rgpv_enrollment_no || profile.student_info?.rgpv_enrollment || "",
            institute_enrollment_no: profile.institute_enrollment_no || profile.student_info?.institute_enrollment || "",
            course: profile.course || profile.student_info?.course || "",
            branch: profile.branch || profile.student_info?.branch || "",
            batch_year: profile.batch_year || profile.student_info?.batch_year || "",
            section: profile.section || profile.student_info?.section || ""
          });
        } else if (localUserData) {
          const user = JSON.parse(localUserData);
          setStudentData({
            full_name: user.full_name || "",
            email: storedEmail || user.email || "",
            rgpv_enrollment_no: user.rgpv_enrollment_no || "",
            institute_enrollment_no: user.institute_enrollment_no || "",
            course: user.course || "",
            branch: user.branch || "",
            batch_year: user.batch_year || "",
            section: user.section || ""
          });
        }
        setLoading(false);
        return;
      }

      try {
        // Fetch from Information Form API
        const response = await API.get(`/api/student/info/${user_id}`);
        if (response.data && response.data.id) {
          const info = response.data;
          setStudentData({
            full_name: info.full_name || "",
            email: info.college_email || storedEmail || "",
            rgpv_enrollment_no: info.rgpv_enrollment || "",
            institute_enrollment_no: info.institute_enrollment || "",
            course: info.course || "",
            branch: info.branch || "",
            batch_year: info.batch_year || "",
            section: info.section || ""
          });
        } else {
          // Fallback to localStorage
          fetchLocalStorageData();
        }
      } catch (error) {
        console.log("No information form data found, using localStorage");
        fetchLocalStorageData();
      } finally {
        setLoading(false);
      }
    };

    const fetchLocalStorageData = () => {
      const profileData = localStorage.getItem("studentProfile");
      const localUserData = localStorage.getItem("userData");
      
      if (profileData) {
        const profile = JSON.parse(profileData);
        setStudentData({
          full_name: profile.full_name || profile.student_info?.full_name || "",
          email: storedEmail || profile.email || profile.student_info?.email || "",
          rgpv_enrollment_no: profile.rgpv_enrollment_no || profile.student_info?.rgpv_enrollment || "",
          institute_enrollment_no: profile.institute_enrollment_no || profile.student_info?.institute_enrollment || "",
          course: profile.course || profile.student_info?.course || "",
          branch: profile.branch || profile.student_info?.branch || "",
          batch_year: profile.batch_year || profile.student_info?.batch_year || "",
          section: profile.section || profile.student_info?.section || ""
        });
      } else if (localUserData) {
        const user = JSON.parse(localUserData);
        setStudentData({
          full_name: user.full_name || "",
          email: storedEmail || user.email || "",
          rgpv_enrollment_no: user.rgpv_enrollment_no || "",
          institute_enrollment_no: user.institute_enrollment_no || "",
          course: user.course || "",
          branch: user.branch || "",
          batch_year: user.batch_year || "",
          section: user.section || ""
        });
      }
    };
    
    fetchStudentData();
  }, [user_id]);

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "mfa", label: "Multi-Factor Auth", icon: <Shield size={18} /> },
    { id: "password", label: "Change Password", icon: <Key size={18} /> },
  ];

  const Input = ({ label, value, isDarkMode, readOnly = true }) => (
    <div>
      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{label}</label>
      <input
        type="text"
        value={value}
        readOnly={readOnly}
        className={`w-full p-3 rounded-xl transition-all ${
          isDarkMode 
            ? "bg-gray-700/50 text-gray-300 border border-gray-600" 
            : "bg-gray-100 text-gray-800 border border-gray-200"
        }`}
      />
    </div>
  );

  const PasswordInput = ({ label }) => {
    const [show, setShow] = useState(false);
    return (
      <div>
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{label}</label>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            placeholder={`Enter ${label.toLowerCase()}`}
            className={`w-full p-3 pr-12 rounded-xl transition-all ${
              isDarkMode 
                ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400" 
                : "bg-white border border-gray-200 text-gray-800"
            }`}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
              isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`p-4 md:p-6 transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Settings
        </h1>
        <p className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Manage your account settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all duration-300 ${
              activeTab === tab.id
                ? isDarkMode 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25" 
                  : "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                : isDarkMode 
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700" 
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================= PROFILE TAB ================= */}
      {activeTab === "profile" && (
        <div className={`p-6 md:p-8 rounded-2xl shadow-xl ${
          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-blue-900/30" : "bg-blue-100"}`}>
              <User className="text-blue-500" size={24} />
            </div>
            <div>
              <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Student Profile Information
              </h2>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Your account details
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <Input label="Full Name" value={studentData.full_name} isDarkMode={isDarkMode} />
            <Input label="College Email" value={studentData.email} isDarkMode={isDarkMode} />
            <Input label="RGPV Enrollment Number" value={studentData.rgpv_enrollment_no} isDarkMode={isDarkMode} />
            <Input label="Institute Enrollment Number" value={studentData.institute_enrollment_no} isDarkMode={isDarkMode} />
            <Input label="Course" value={studentData.course} isDarkMode={isDarkMode} />
            <Input label="Branch" value={studentData.branch} isDarkMode={isDarkMode} />
            <Input label="Batch Year" value={studentData.batch_year} isDarkMode={isDarkMode} />
            <Input label="Section" value={studentData.section} isDarkMode={isDarkMode} />
          </div>

          <div className={`mt-6 p-4 rounded-xl ${
            isDarkMode ? "bg-gray-700/50 border border-gray-600" : "bg-gray-50 border border-gray-200"
          }`}>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              <span className="font-medium">Note:</span> If you need to update any of this information, please contact your administrator.
            </p>
          </div>
        </div>
      )}

      {/* ================= MFA TAB ================= */}
      {activeTab === "mfa" && (
        <div className={`p-6 md:p-8 rounded-2xl shadow-xl ${
          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
        }`}>
          <div className="space-y-4">
            <div className={`p-4 rounded-xl ${
              mfaStatus === 'enabled' 
                ? 'bg-emerald-50 border border-emerald-200' 
                : 'bg-yellow-50 border border-yellow-200'
            }`}>
              <div className="flex items-center gap-3">
                <Shield className={`w-5 h-5 ${mfaStatus === 'enabled' ? 'text-emerald-600' : 'text-yellow-600'}`} />
                <div>
                  <p className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {mfaStatus === 'enabled' ? 'MFA Enabled' : 'MFA Disabled'}
                  </p>
                  <p className="text-sm text-gray-600">Google Authenticator app</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setShowMfaModal(true)}
              className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                isDarkMode 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25" 
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
              }`}
            >
              {mfaStatus === 'enabled' ? 'Manage MFA' : 'Setup Google Authenticator'}
            </button>
          </div>
        </div>
      )}

      <MFASetup 
        userId={user_id} 
        isOpen={showMfaModal} 
        onClose={() => setShowMfaModal(false)} 
      />

      {/* ================= PASSWORD TAB ================= */}
      {activeTab === "password" && (
        <div className={`p-6 md:p-8 rounded-2xl shadow-xl max-w-2xl ${
          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-purple-900/30" : "bg-purple-100"}`}>
              <Lock className="text-purple-500" size={24} />
            </div>
            <div>
              <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Change Password
              </h2>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Use a strong password with at least 8 characters
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <PasswordInput label="Current Password" />
            <PasswordInput label="New Password" />
            <PasswordInput label="Confirm New Password" />
          </div>

          <button className={`mt-6 w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${
            isDarkMode 
              ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25" 
              : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
          }`}>
            Change Password
          </button>
        </div>
      )}
    </div>
  );
}

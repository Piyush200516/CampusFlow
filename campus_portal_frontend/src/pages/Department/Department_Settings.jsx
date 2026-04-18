import { useState } from "react";
import { User, Mail, Phone, Lock, Bell, Shield, Save, Camera } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function DepartmentSettings() {
  const { isDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "Dr. Rajesh Kumar",
    email: "department@acropolis.edu",
    phone: "+91 9876543210",
    department: "Computer Science",
    designation: "HOD",
  });
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    attendanceAlerts: true,
    formVerification: true,
    studentUpdates: false,
  });

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "security", label: "Security", icon: <Lock size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
  ];

  return (
    <div className={`p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Department Settings
        </h1>
        <p className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Manage your department profile and preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className={`w-full lg:w-64 rounded-xl shadow-sm border transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <div className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className={`flex-1 rounded-xl shadow-sm border transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Profile Information
              </h2>

              {/* Profile Picture */}
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold ${
                    isDarkMode ? "bg-gray-700 text-white" : "bg-blue-100 text-blue-600"
                  }`}>
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <Camera size={16} />
                  </button>
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    {profileData.name}
                  </h3>
                  <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                    {profileData.designation} - {profileData.department}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Full Name
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} size={18} />
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300 ${
                        isDarkMode 
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400" 
                          : "bg-white border-gray-300 text-gray-800 focus:ring-blue-400"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} size={18} />
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300 ${
                        isDarkMode 
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400" 
                          : "bg-white border-gray-300 text-gray-800 focus:ring-blue-400"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} size={18} />
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300 ${
                        isDarkMode 
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400" 
                          : "bg-white border-gray-300 text-gray-800 focus:ring-blue-400"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Department
                  </label>
                  <input
                    type="text"
                    value={profileData.department}
                    disabled
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300 ${
                      isDarkMode 
                        ? "bg-gray-700 border-gray-600 text-white cursor-not-allowed" 
                        : "bg-gray-100 border-gray-300 text-gray-800 cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Security Settings
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300 ${
                          isDarkMode 
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400" 
                            : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-400"
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300 ${
                          isDarkMode 
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400" 
                            : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-400"
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300 ${
                          isDarkMode 
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400" 
                            : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className={`border-t pt-6 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-blue-100"}`}>
                        <Shield className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <h3 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                          Two-Factor Authentication
                        </h3>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          Add an extra layer of security to your account
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Enable
                    </button>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                >
                  <Save size={18} />
                  Update Password
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Notification Preferences
              </h2>

              <div className="space-y-4">
                {[
                  { key: "emailAlerts", label: "Email Alerts", desc: "Receive email notifications for important updates" },
                  { key: "attendanceAlerts", label: "Attendance Alerts", desc: "Get notified about attendance updates and alerts" },
                  { key: "formVerification", label: "Form Verification", desc: "Notifications for student form verification requests" },
                  { key: "studentUpdates", label: "Student Updates", desc: "Receive updates about student activities" },
                ].map((item) => (
                  <div 
                    key={item.key}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors duration-300 ${
                      isDarkMode ? "border-gray-700 bg-gray-700/50" : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div>
                      <h3 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                        {item.label}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {item.desc}
                      </p>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, [item.key]: !notifications[item.key]})}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                        notifications[item.key] ? "bg-blue-600" : isDarkMode ? "bg-gray-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                          notifications[item.key] ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                >
                  <Save size={18} />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}


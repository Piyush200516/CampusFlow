import { useEffect, useState } from "react";
import { CheckCircle, Download, Clock, Briefcase, Building2, TrendingUp, Users, FileText, Award } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function StudentDashboard() {
  const [userName, setUserName] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [course, setCourse] = useState("");
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.full_name || "");
      setEnrollmentNo(user.rgpv_enrollment_no || "");
      setCourse(user.course || "");
    }
  }, []);

  const stats = [
    { title: "Attendance", value: "85%", icon: <Clock size={24} />, color: "blue" },
    { title: "Applications", value: "12", icon: <FileText size={24} />, color: "purple" },
    { title: "Internships", value: "2", icon: <Briefcase size={24} />, color: "green" },
    { title: "Placements", value: "1", icon: <Building2 size={24} />, color: "orange" },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div className={`relative overflow-hidden rounded-2xl p-6 mb-6 ${
        isDarkMode 
          ? "bg-gradient-to-r from-gray-700 to-gray-600" 
          : "bg-gradient-to-r from-blue-600 to-purple-600"
      }`}>
        <div className="absolute right-0 top-0 opacity-10">
          <Building2 size={200} />
        </div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-white mb-2">
            Welcome back, {userName || "Student"}! 👋
          </h1>
          <p className="text-blue-100">
            {enrollmentNo} | {course}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className={`p-5 rounded-xl transition-all duration-300 hover:scale-105 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-sm hover:shadow-lg`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-xl ${
                stat.color === "blue" ? "bg-blue-100" :
                stat.color === "purple" ? "bg-purple-100" :
                stat.color === "green" ? "bg-green-100" : "bg-orange-100"
              }`}>
                <div className={
                  stat.color === "blue" ? "text-blue-600" :
                  stat.color === "purple" ? "text-purple-600" :
                  stat.color === "green" ? "text-green-600" : "text-orange-600"
                }>
                  {stat.icon}
                </div>
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <h3 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              {stat.value}
            </h3>
            <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              {stat.title}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* CAF Approved Section */}
        <div className="lg:col-span-2">
          <div className={`rounded-xl p-6 shadow-sm ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  CAF Form Status
                </h2>
                <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                  Your CAF approval status
                </p>
              </div>
            </div>

            <div className={`p-4 rounded-xl mb-4 ${
              isDarkMode ? "bg-green-900/30" : "bg-green-50"
            }`}>
              <span className="flex items-center gap-1 bg-green-600 text-white text-sm px-3 py-1 rounded-full mb-2 inline-block">
                <CheckCircle size={14} /> Approved
              </span>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Congratulations! Your CAF form has been approved.
              </p>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download size={18} />
              Download Resume
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`rounded-xl p-6 shadow-sm ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Quick Actions
          </h2>
          
          <div className="space-y-3">
            <button className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="text-blue-600" size={18} />
              </div>
              <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>
                Update Profile
              </span>
            </button>

            <button className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Briefcase className="text-purple-600" size={18} />
              </div>
              <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>
                View Internships
              </span>
            </button>

            <button className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}>
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="text-green-600" size={18} />
              </div>
              <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>
                Check Fee Status
              </span>
            </button>

            <button className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="text-orange-600" size={18} />
              </div>
              <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>
                Apply for TC
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


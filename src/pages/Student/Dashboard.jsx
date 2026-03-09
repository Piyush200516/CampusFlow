import { useEffect, useState } from "react";
import { CheckCircle, Download, Clock, Briefcase, Building2, TrendingUp, Users, FileText, Award, ArrowRight } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [userName, setUserName] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [course, setCourse] = useState("");
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

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
    { title: "Attendance", value: "85%", icon: <Clock size={24} />, color: "blue", path: "/attendance" },
    { title: "Applications", value: "12", icon: <FileText size={24} />, color: "purple", path: "/internships" },
    { title: "Internships", value: "2", icon: <Briefcase size={24} />, color: "green", path: "/internships" },
    { title: "Placements", value: "1", icon: <Building2 size={24} />, color: "orange", path: "/Plackment" },
  ];

  const quickActions = [
    { name: "Update Profile", icon: <FileText size={18} />, color: "blue", path: "/Information" },
    { name: "View Internships", icon: <Briefcase size={18} />, color: "purple", path: "/internships" },
    { name: "Check Fee Status", icon: <Award size={18} />, color: "green", path: "/Fee" },
    { name: "Apply for TC", icon: <Users size={18} />, color: "orange", path: "/TC" },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: { bg: "bg-blue-100", text: "text-blue-600", gradient: "from-blue-500 to-blue-600" },
      purple: { bg: "bg-purple-100", text: "text-purple-600", gradient: "from-purple-500 to-purple-600" },
      green: { bg: "bg-green-100", text: "text-green-600", gradient: "from-green-500 to-green-600" },
      orange: { bg: "bg-orange-100", text: "text-orange-600", gradient: "from-orange-500 to-orange-600" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className={`relative overflow-hidden rounded-2xl p-6 md:p-8 ${
        isDarkMode 
          ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" 
          : "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
      }`}>
        <div className="absolute right-0 top-0 opacity-10">
          <Building2 size={200} className="text-white" />
        </div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-purple-400/20 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Welcome back, {userName || "Student"}! 👋
          </h1>
          <p className="text-blue-100 text-sm md:text-base">
            {enrollmentNo} | {course}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const colors = getColorClasses(stat.color);
          return (
            <div 
              key={index}
              onClick={() => navigate(stat.path)}
              className={`p-5 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                isDarkMode 
                  ? "bg-gray-800 hover:bg-gray-750 border border-gray-700" 
                  : "bg-white hover:bg-gray-50 border border-gray-100"
              } shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${colors.bg}`}>
                  <div className={colors.text}>
                    {stat.icon}
                  </div>
                </div>
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <h3 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                {stat.value}
              </h3>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                {stat.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* CAF Approved Section */}
        <div className="lg:col-span-2">
          <div className={`rounded-2xl p-6 shadow-lg ${
            isDarkMode 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-white border border-gray-100"
          }`}>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 bg-green-100 rounded-xl">
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

            <div className={`p-4 rounded-xl mb-5 ${
              isDarkMode ? "bg-green-900/20 border border-green-800" : "bg-green-50 border border-green-100"
            }`}>
              <span className="flex items-center gap-2 bg-green-600 text-white text-sm px-4 py-1.5 rounded-full inline-block mb-2">
                <CheckCircle size={14} /> Approved
              </span>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Congratulations! Your CAF form has been approved.
              </p>
            </div>

            <button 
              onClick={() => {}}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/25"
            >
              <Download size={18} />
              Download Resume
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`rounded-2xl p-6 shadow-lg ${
          isDarkMode 
            ? "bg-gray-800 border border-gray-700" 
            : "bg-white border border-gray-100"
        }`}>
          <h2 className={`text-lg font-semibold mb-5 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Quick Actions
          </h2>
          
          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const colors = getColorClasses(action.color);
              return (
                <button 
                  key={index}
                  onClick={() => navigate(action.path)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                    isDarkMode 
                      ? "hover:bg-gray-700/50" 
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${colors.bg}`}>
                    <div className={colors.text}>
                      {action.icon}
                    </div>
                  </div>
                  <span className={`${isDarkMode ? "text-gray-200" : "text-gray-700"} font-medium`}>
                    {action.name}
                  </span>
                  <ArrowRight size={16} className={`ml-auto ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


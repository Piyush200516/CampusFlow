import { useEffect, useState } from "react";
import { CheckCircle, Download, Clock, Briefcase, Building2, TrendingUp, Users, FileText, Award, ArrowRight, Building, UserCheck, ClipboardList } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";
import { useNavigate } from "react-router-dom";

export default function CDCDashboard() {
  const [userName, setUserName] = useState("");
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("cdcUserData");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.full_name || "CDC Admin");
    }
  }, []);

  const stats = [
    { title: "Total Companies", value: "45", icon: <Building2 size={24} />, color: "blue", path: "/cdc/company-list" },
    { title: "Applications", value: "320", icon: <FileText size={24} />, color: "purple", path: "/cdc/applications" },
    { title: "Placed Students", value: "180", icon: <UserCheck size={24} />, color: "green", path: "/cdc/applications" },
    { title: "Pending", value: "85", icon: <Clock size={24} />, color: "orange", path: "/cdc/update-status" },
  ];

  const quickActions = [
    { name: "Add Company", icon: <Building size={18} />, color: "blue", path: "/cdc/add-company" },
    { name: "View Companies", icon: <Briefcase size={18} />, color: "purple", path: "/cdc/company-list" },
    { name: "Applications", icon: <Users size={18} />, color: "green", path: "/cdc/applications" },
    { name: "Student Forms", icon: <ClipboardList size={18} />, color: "orange", path: "/cdc/student-forms" },
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
          : "bg-gradient-to-r from-green-600 via-teal-600 to-emerald-600"
      }`}>
        <div className="absolute right-0 top-0 opacity-10">
          <Building2 size={200} className="text-white" />
        </div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-teal-400/20 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Welcome back, {userName || "CDC Admin"}! 👋
          </h1>
          <p className="text-green-100 text-sm md:text-base">
            Career Development Cell | Manage placements and companies
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
        {/* Recent Placements */}
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
                  Recent Placements
                </h2>
                <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                  Latest student placements
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <th className={`text-left py-3 px-4 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Company</th>
                    <th className={`text-left py-3 px-4 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Student Name</th>
                    <th className={`text-left py-3 px-4 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Package</th>
                    <th className={`text-left py-3 px-4 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Role</th>
                    <th className={`text-left py-3 px-4 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b hover:bg-gray-50 ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Google</td>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Rahul Sharma</td>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>₹18,00,000</td>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Software Engineer</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm flex items-center gap-1 w-fit">
                        <CheckCircle size={14} /> Selected
                      </span>
                    </td>
                  </tr>
                  <tr className={`border-b hover:bg-gray-50 ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Amazon</td>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Anjali Verma</td>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>₹15,00,000</td>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>SDE</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm flex items-center gap-1 w-fit">
                        <CheckCircle size={14} /> Selected
                      </span>
                    </td>
                  </tr>
                  <tr className={`border-b hover:bg-gray-50 ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Microsoft</td>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Priya Singh</td>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>₹14,00,000</td>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Software Engineer</td>
                    <td className="py-3 px-4">
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-sm flex items-center gap-1 w-fit">
                        <Clock size={14} /> Pending
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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


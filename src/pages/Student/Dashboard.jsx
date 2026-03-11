import { useEffect, useState } from "react";
import { CheckCircle, Download, Clock, Briefcase, Building2, TrendingUp, Users, FileText, Award, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

export default function StudentDashboard() {
  const { isDarkMode } = useDarkMode();
  const [userName, setUserName] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [attendance, setAttendance] = useState(0);
  const [applications, setApplications] = useState(0);
  const [internships, setInternships] = useState(0);
  const [placements, setPlacements] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.full_name || "");
      setEnrollmentNo(user.rgpv_enrollment_no || user.enrollment || "");
      setCourse(user.course || "");
      setBranch(user.branch || "");
      // Simulated real data - in production, fetch from API
      setAttendance(85 + Math.floor(Math.random() * 10));
      setApplications(Math.floor(Math.random() * 8));
      setInternships(Math.floor(Math.random() * 3));
      setPlacements(Math.floor(Math.random() * 2));
    }
  }, []);

  const stats = [
    { title: "Attendance", value: `${attendance}%`, icon: <Clock size={24} />, color: "blue", path: "/attendance", gradient: "from-blue-500 to-cyan-500" },
    { title: "Applications", value: applications, icon: <FileText size={24} />, color: "purple", path: "/internships", gradient: "from-purple-500 to-pink-500" },
    { title: "Internships", value: internships, icon: <Briefcase size={24} />, color: "green", path: "/internships", gradient: "from-green-500 to-emerald-500" },
    { title: "Placements", value: placements, icon: <Building2 size={24} />, color: "orange", path: "/Plackment", gradient: "from-orange-500 to-amber-500" },
  ];

  const quickActions = [
    { name: "Update Profile", icon: <FileText size={18} />, color: "blue", path: "/Information", gradient: "from-blue-500 to-purple-500" },
    { name: "View Internships", icon: <Briefcase size={18} />, color: "purple", path: "/internships", gradient: "from-purple-500 to-pink-500" },
    { name: "Check Fee Status", icon: <Award size={18} />, color: "green", path: "/Fee", gradient: "from-green-500 to-emerald-500" },
    { name: "Apply for TC", icon: <Users size={18} />, color: "orange", path: "/TC", gradient: "from-orange-500 to-amber-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-6 md:p-8 shadow-2xl shadow-purple-500/25">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={20} className="text-yellow-300" />
            <span className="text-blue-100 text-sm font-medium">Welcome back!</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Hello, {userName?.split(' ')[0] || "Student"}! 👋
          </h1>
          <p className="text-blue-100">
            {enrollmentNo && `${enrollmentNo} | `}{course} {branch && `| ${branch}`}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index}
            onClick={() => navigate(stat.path)}
            className={`relative overflow-hidden bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group`}
          >
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`}></div>
            
            <div className="flex items-center justify-between mb-3 relative z-10">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}>
                {stat.icon}
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* CAF Approved Section */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white shadow-lg">
                <CheckCircle size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">CAF Form Status</h2>
                <p className="text-gray-500 dark:text-gray-400">Your CAF approval status</p>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl mb-5 border border-green-100 dark:border-green-800">
              <span className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm px-4 py-1.5 rounded-full inline-block mb-2">
                <CheckCircle size={14} /> Approved
              </span>
              <p className="text-gray-600 dark:text-gray-300">
                Congratulations! Your CAF form has been approved.
              </p>
            </div>

            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/25">
              <Download size={18} />
              Download Resume
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-5 text-gray-800 dark:text-white">Quick Actions</h2>
          
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <button 
                key={index}
                onClick={() => navigate(action.path)}
                className="w-full flex items-center gap-3 p-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all group"
              >
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${action.gradient} text-white shadow-md group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <span className="text-gray-700 dark:text-gray-200 font-medium">{action.name}</span>
                <ArrowRight size={16} className="ml-auto text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


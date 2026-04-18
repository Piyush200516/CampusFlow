import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useDarkMode } from "../../context/DarkModeContext";
import API from "../../services/api";
import jsFileDownload from "js-file-download";
import {
  FaUserGraduate, FaBriefcase, FaFileAlt, FaClock, FaTimes, FaChartLine, FaGraduationCap, FaRupeeSign, FaTrophy, FaBrain, FaRocket
} from "react-icons/fa";
import {
  GraduationCap, DollarSign, Briefcase as BriefcaseIcon, FileText, CheckCircle, AlertCircle, Download, Calendar,
  TrendingUp, Users, Award, ArrowRight, Filter, BarChart3, Brain, Target, Zap, Sparkles
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  RadialBarChart, RadialBar
} from "recharts";

export default function Dashboard_Analytics() {
  const { isDarkMode } = useDarkMode();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [profile, setProfile] = useState({});
  const [selectedSemester, setSelectedSemester] = useState("Current");
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [skillsData, setSkillsData] = useState([
    { skill: 'HTML', level: 4 },
    { skill: 'CSS', level: 3 },
    { skill: 'JavaScript', level: 5 },
    { skill: 'React', level: 4 },
    { skill: 'Node.js', level: 2 },
    { skill: 'Python', level: 3 },
    { skill: 'Java', level: 2 },
    { skill: 'SQL', level: 4 }
  ]);
  const semesters = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8", "Current"];

  // Mock fees persist
  const feesData = {
    total: 120000,
    paid: 60000,
    semesters: [
      { sem: 1, amount: 30000, status: "Paid" },
      { sem: 2, amount: 30000, status: "Paid" },
      { sem: 3, amount: 30000, status: "Pending" },
      { sem: 4, amount: 30000, status: "Pending" },
    ]
  };
  // Removed duplicate feePercent declaration

  // Mock/real data structures matching existing app
  const mockGpaData = [
    { semester: "Sem 1", gpa: 8.2 },
    { semester: "Sem 2", gpa: 8.5 },
    { semester: "Sem 3", gpa: 7.9 },
    { semester: "Sem 4", gpa: 8.7 },
    { semester: "Sem 5", gpa: 8.4 },
  ];
  const mockSubjectAttendance = [
    { subject: "Maths", attendance: 85 },
    { subject: "Physics", attendance: 78 },
    { subject: "Chemistry", attendance: 92 },
    { subject: "English", attendance: 88 },
  ];
  const mockDeadlines = [
    { title: "Fee Payment Sem 5", date: "2024-12-15", status: "Pending" },
    { title: "Internship Form", date: "2024-11-30", status: "Overdue" },
    { title: "TC Application", date: "2025-01-20", status: "Upcoming" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = localStorage.getItem("userData") || localStorage.getItem("studentProfile");
        if (userData) {
          const user = JSON.parse(userData);
          const id = user.id || user.student_id;
          setUserId(id);

          // New unified analytics fetch
          const analyticsRes = await API.get(`/api/student/analytics/${id}`).catch(() => ({ data: null }));
          if (analyticsRes.data) {
            setAnalyticsData(analyticsRes.data);
            setProfile(analyticsRes.data.profile);
          }

          // Update skills radar based on count (mock levels)
          if (analyticsRes.data?.student_info?.skills_count) {
            const count = analyticsRes.data.student_info.skills_count;
            setSkillsData(skillsData.map((s, i) => ({ ...s, level: Math.max(1, Math.round((count / 8) * 5 + i % 3)) })));
          }
        }
      } catch (err) {
        console.error("Analytics fetch error:", err);
        setError("Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Real data from analytics
  const attendanceData = analyticsData?.attendance || { percentage: 82 };
  const attPercentage = attendanceData.percentage;
  const currentCgpa = parseFloat(analyticsData?.student_info?.cgpa) || 8.2;
  const placementScore = analyticsData?.analytics?.placement_score || 85;
  const tcStatus = analyticsData?.analytics?.tc_status || 'Pending';
  const batchComparison = analyticsData?.analytics?.batch_comparison || {};
  const predictions = analyticsData?.analytics?.predictions || {};
  const gpaData = mockGpaData; // Use mock for trend, replace with real later 

  const totalFees = feesData.total;
  const paidFees = feesData.paid;
  const feePercent = Math.round((paidFees / totalFees) * 100) || 0;
  const COLORS = ["#10B981", "#EF4444", "#F59E0B"];

  const handleExport = useCallback(() => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value\\n"
      + `Attendance,${attPercentage}%\\n`
      + `CGPA,${currentCgpa}\\n`
      + `Placement Score,${realPlacementScore}%\\n`
      + `Fee Paid,₹${paidFees.toLocaleString()}\\n`
      + `Batch Percentile,${batchComparison.percentile || 70}%\\n`
      + `Predicted Placement Prob,${predictions.placement_prob || 60}%`;
    
    const encodedUri = encodeURI(csvContent);
    jsFileDownload(encodedUri, `analytics_${profile.full_name || 'student'}.csv`);
  }, [analyticsData, feesData, profile]);

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className={`p-6 text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
      >
        Loading advanced analytics...
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className={`p-6 text-center ${isDarkMode ? "bg-red-900/30 text-red-300 rounded-2xl border border-red-500/50" : "bg-red-50 text-red-700 rounded-2xl border border-red-200"}`}
      >
        {error}. Using fallback data.
      </motion.div>
    );
  }

  return (
    <div className={`p-4 md:p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Student Analytics Dashboard
          </h1>
          <p className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Track your academic progress, fees and placement readiness
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className={`px-4 py-2 rounded-xl border ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-200"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {semesters.map(sem => <option key={sem}>{sem}</option>)}
          </select>
          <button
            onClick={handleExport}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium shadow-lg transition-all ${isDarkMode ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25" : "bg-blue-500 hover:bg-blue-600 text-white shadow-blue-400/25"}`}
          >
            <Download size={18} /> Export CSV
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <div className={`p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-blue-900/30" : "bg-blue-100"}`}>
              <FaUserGraduate className={isDarkMode ? "text-blue-400" : "text-blue-600"} size={20} />
            </div>
            <h2 className={`font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Attendance</h2>
          </div>
<p className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{attPercentage}%</p>
          <div className={`w-full h-2 rounded-full mt-2 ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
            <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${attPercentage}%` }}></div> 
          </div>
        </div>

        <div className={`p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-orange-900/30" : "bg-orange-100"}`}>
              <DollarSign className={isDarkMode ? "text-orange-400" : "text-orange-600"} size={20} />
            </div>
            <h2 className={`font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Fee Progress</h2>
          </div>
          <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>₹{paidFees.toLocaleString()}</p>
          <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{feePercent}% of ₹{totalFees.toLocaleString()}</p>
        </div>

        <div className={`p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-green-900/30" : "bg-green-100"}`}>
              <FaTrophy className={isDarkMode ? "text-green-400" : "text-green-600"} size={20} />
            </div>
            <h2 className={`font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Placement Score</h2>
          </div>
          <p className={`text-2xl font-bold ${isDarkMode ? "text-green-400" : "text-green-600"}`}>{placementScore}%</p> 
          <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Readiness Level</p>
        </div>

        <div className={`p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-yellow-900/30" : "bg-yellow-100"}`}>
              <FileText className={isDarkMode ? "text-yellow-400" : "text-yellow-600"} size={20} />
            </div>
            <h2 className={`font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Current CGPA</h2>
          </div>
<p className={`text-xl font-bold ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`}>{currentCgpa}</p>
          <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Overall</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* GPA Trend */}
        <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-purple-900/30" : "bg-purple-100"}`}>
              <FaChartLine className={isDarkMode ? "text-purple-400" : "text-purple-600"} size={22} />
            </div>
            <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>GPA Trend</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={gpaData}> 
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#f1f5f9"} />
              <XAxis dataKey="semester" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
              <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="gpa" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: "#8B5CF6", strokeWidth: 2 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Fee Breakdown Pie */}
        <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-orange-900/30" : "bg-orange-100"}`}>
              <BarChart3 className={isDarkMode ? "text-orange-400" : "text-orange-600"} size={22} />
            </div>
            <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Fees Breakdown</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Paid", value: paidFees },
                  { name: "Pending", value: totalFees - paidFees }
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {COLORS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Rest of the component remains the same with dynamic data */}
      {/* Subject Attendance Bar + Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-green-900/30" : "bg-green-100"}`}>
              <BarChart3 className={isDarkMode ? "text-green-400" : "text-green-600"} size={22} />
            </div>
            <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Subject Attendance</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockSubjectAttendance}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#f1f5f9"} />
              <XAxis dataKey="subject" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} angle={-45} textAnchor="end" height={70} />
              <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
              <Tooltip />
              <Bar dataKey="attendance" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-indigo-900/30" : "bg-indigo-100"}`}>
              <Calendar className={isDarkMode ? "text-indigo-400" : "text-indigo-600"} size={22} />
            </div>
            <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Upcoming Deadlines</h2>
          </div>
          <div className="space-y-3">
            {mockDeadlines.map((deadline, index) => (
              <div key={index} className={`flex items-center justify-between p-4 rounded-xl border ${deadline.status === "Overdue" ? "border-red-200 bg-red-50 dark:bg-red-900/20" : "border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${deadline.status === "Overdue" ? "bg-red-500/20 text-red-500" : "bg-blue-500/20 text-blue-500"}`}>
                    <FaClock size={16} />
                  </div>
                  <div>
                    <p className={`font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>{deadline.title}</p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{deadline.date}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  deadline.status === "Overdue" ? "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400" :
                  deadline.status === "Upcoming" ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400" :
                  "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400"
                }`}>
                  {deadline.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Overview Donut & Semester Fees - Existing enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-blue-900/30" : "bg-blue-100"}`}>
              <GraduationCap className="text-blue-500" size={22} />
            </div>
            <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Attendance Overview</h2>
          </div>
          <div className="flex items-center justify-center py-4">
            <div className="relative w-40 h-40">
              <div className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-full`}>
                <div className="text-center">
              <p className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{attPercentage}%</p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Overall</p> 
                </div>
              </div>
              <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 36 36">
                <path className={isDarkMode ? "text-gray-700" : "text-gray-200"} strokeWidth="3" stroke="currentColor" fill="transparent" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-blue-500" strokeWidth="3" strokeDasharray={`${attPercentage}, 100`} stroke="currentColor" fill="transparent" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /> 
              </svg>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-orange-900/30" : "bg-orange-100"}`}>
              <DollarSign className="text-orange-500" size={22} />
            </div>
            <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Semester Fee Status</h2>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {feesData.semesters.slice(0, 4).map((sem) => (
              <div key={sem.sem} className={`flex items-center justify-between p-4 rounded-xl ${sem.status === "Paid" ? isDarkMode ? "bg-green-900/20 border border-green-800" : "bg-green-50 border border-green-100" : isDarkMode ? "bg-red-900/20 border border-red-800" : "bg-red-50 border border-red-100"}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${sem.status === "Paid" ? "bg-green-500/20" : "bg-red-500/20"}`}>
                    {sem.status === "Paid" ? <CheckCircle className="text-green-500" size={18} /> : <AlertCircle className="text-red-500" size={18} />}
                  </div>
                  <div>
                    <p className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Semester {sem.sem}</p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>₹{sem.amount.toLocaleString()}</p>
                  </div>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${sem.status === "Paid" ? isDarkMode ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-700" : isDarkMode ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-700"}`}>
                  {sem.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Placement & TC Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-green-900/30" : "bg-green-100"}`}>
              <BriefcaseIcon className="text-green-500" size={22} />
            </div>
            <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Placement Readiness</h2>
          </div>
          <div className={`p-6 rounded-2xl text-center ${placementScore > 80 ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20" : "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20"}`}>
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
              <TrendingUp className="text-white" size={28} />
            </div>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              Score: <span className="text-3xl font-bold text-green-600">{placementScore}%</span>
            </p>
            <p className={`mt-2 text-sm font-medium ${placementScore > 80 ? "text-green-600" : "text-yellow-600"}`}>
              {placementScore > 80 ? "Excellent - Ready for Top Companies" : "Good - Improve Attendance/GPA"}
            </p>
          </div>
        </div>

        <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-yellow-900/30" : "bg-yellow-100"}`}>
              <FileText className="text-yellow-500" size={22} />
            </div>
            <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>TC Status</h2>
          </div>
          <div className={`p-6 rounded-2xl text-center ${tcStatus === "Approved" ? "bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800" : tcStatus === "Rejected" ? "bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800" : "bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800"}`}>
            <div className={`w-20 h-20 mx-auto mb-4 p-4 rounded-full shadow-lg ${
              tcStatus === "Approved" ? "bg-green-500" :
              tcStatus === "Rejected" ? "bg-red-500" :
              "bg-yellow-500"
            } flex items-center justify-center`}>
              {tcStatus === "Approved" ? <CheckCircle className="text-white" size={24} /> :
               tcStatus === "Rejected" ? <AlertCircle className="text-white" size={24} /> :
               <FaClock className="text-white" size={20} />}
            </div>
            <p className={`text-2xl font-bold ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>{tcStatus}</p>
            <p className={`mt-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {tcStatus === "Approved" ? "TC Ready for Download" :
               tcStatus === "Rejected" ? "Please check requirements" :
               "Application Under Review"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


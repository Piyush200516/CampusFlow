import { useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import { Clock, Calendar, CheckCircle, XCircle, User, BookOpen, History } from "lucide-react";

export default function AttendancePage() {
  const { isDarkMode } = useDarkMode();
  const [tab, setTab] = useState("mark");
  const [sessionCode, setSessionCode] = useState("");
  const [studentNo, setStudentNo] = useState("");
  const [myHistory, setMyHistory] = useState([]);
  const [deptHistory, setDeptHistory] = useState([]);

  const submitAttendance = (e) => {
    e.preventDefault();
    if (!sessionCode || !studentNo) return;
    const record = { student: studentNo, code: sessionCode, date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString() };
    setMyHistory([record, ...myHistory]);
    setSessionCode("");
    setStudentNo("");
    setTab("my");
  };

  const addDeptRecord = () => {
    const rec = { student: Math.floor(Math.random() * 50), code: "DEPT" + Math.floor(Math.random() * 999), date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString() };
    setDeptHistory([rec, ...deptHistory]);
  };

  const Tab = ({ name, tab, setTab, isDarkMode, children, icon: Icon }) => (
    <button
      onClick={() => setTab(name)}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all duration-300 ${
        tab === name 
          ? isDarkMode 
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 border-transparent" 
            : "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 border-transparent"
          : isDarkMode 
            ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600" 
            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
      }`}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );

  const Table = ({ data, columns }) => (
    <div className={`overflow-hidden rounded-xl border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={isDarkMode ? "bg-gray-700" : "bg-gray-100"}>
            <tr>
              {columns.map((col, i) => (
                <th key={i} className={`px-5 py-3 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={`text-center py-12 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                  <div className="flex flex-col items-center gap-2">
                    <History size={32} />
                    <p>No records found</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((r, i) => (
                <tr key={i} className={`border-t transition-colors ${isDarkMode ? "border-gray-700 hover:bg-gray-750" : "border-gray-100 hover:bg-gray-50"}`}>
                  {Object.values(r).map((val, j) => (
                    <td key={j} className={`px-5 py-3.5 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className={`p-4 md:p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Attendance
          </h1>
          <p className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Mark and track your attendance
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Tab name="mark" tab={tab} setTab={setTab} isDarkMode={isDarkMode} icon={Clock}>Mark</Tab>
          <Tab name="my" tab={tab} setTab={setTab} isDarkMode={isDarkMode} icon={History}>My History</Tab>
          <Tab name="dept" tab={tab} setTab={setTab} isDarkMode={isDarkMode} icon={BookOpen}>Department</Tab>
        </div>
      </div>

      {/* MARK ATTENDANCE */}
      {tab === "mark" && (
        <div className="flex justify-center">
          <form onSubmit={submitAttendance} className={`w-full max-w-md p-8 rounded-2xl shadow-xl ${
            isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
          }`}>
            <div className="flex items-center justify-center mb-6">
              <div className={`p-4 rounded-full ${isDarkMode ? "bg-blue-900/30" : "bg-blue-100"}`}>
                <Clock className="text-blue-500" size={32} />
              </div>
            </div>
            <h2 className={`text-xl font-semibold mb-6 text-center ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              Mark Attendance
            </h2>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Session Code</label>
                <input
                  value={sessionCode}
                  onChange={(e) => setSessionCode(e.target.value)}
                  placeholder="Enter session code"
                  className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-800"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Student Number</label>
                <input
                  value={studentNo}
                  onChange={(e) => setStudentNo(e.target.value)}
                  placeholder="Enter your student number"
                  className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-800"
                  }`}
                />
              </div>
            </div>
            <button className={`w-full mt-6 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
              isDarkMode 
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25" 
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
            }`}>
              Submit Attendance
            </button>
          </form>
        </div>
      )}

      {/* MY HISTORY */}
      {tab === "my" && (
        <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-green-100 rounded-xl">
              <History className="text-green-600" size={22} />
            </div>
            <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>My Attendance History</h2>
          </div>
          <Table data={myHistory} columns={["Session", "Date", "Time"]} />
        </div>
      )}

      {/* DEPARTMENT HISTORY */}
      {tab === "dept" && (
        <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-100 rounded-xl">
                <BookOpen className="text-purple-600" size={22} />
              </div>
              <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Department History</h2>
            </div>
            <button onClick={addDeptRecord} className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              isDarkMode 
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" 
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            }`}>
              + Add Record
            </button>
          </div>

          {/* Summary */}
          <div className={`p-4 rounded-xl mb-5 ${isDarkMode ? "bg-gray-700/50 border border-gray-600" : "bg-gray-50 border border-gray-200"}`}>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              Total Classes: <b className={isDarkMode ? "text-white" : "text-gray-800"}>{new Set(deptHistory.map((d) => d.code)).size}</b>
            </p>
          </div>

          <Table data={deptHistory} columns={["Student", "Session", "Date", "Time"]} />
        </div>
      )}
    </div>
  );
}


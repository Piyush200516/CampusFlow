import { useState } from "react";
import { Search, Filter, Save, CheckCircle, XCircle, Clock, BookOpen, Users } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function AttendanceUpdate() {
  const { isDarkMode } = useDarkMode();
  const [selectedClass, setSelectedClass] = useState("10th-A");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample student data
  const [students, setStudents] = useState([
    { id: 1, scholarNo: "AITR040613", name: "Rahul Sharma", attendance: "present" },
    { id: 2, scholarNo: "AITR240613", name: "Anjali Verma", attendance: "present" },
    { id: 3, scholarNo: "AITR350714", name: "Priya Singh", attendance: "absent" },
    { id: 4, scholarNo: "AITR460825", name: "Amit Kumar", attendance: "present" },
    { id: 5, scholarNo: "AITR570936", name: "Sneha Gupta", attendance: "present" },
    { id: 6, scholarNo: "AITR681047", name: "Vikram Singh", attendance: "leave" },
  ]);

  const classes = ["10th-A", "10th-B", "11th-A", "11th-B", "12th-A", "12th-B", "9th-A", "9th-B"];

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.scholarNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateAttendance = (id, status) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, attendance: status } : student
    ));
  };

  const markAllPresent = () => {
    setStudents(students.map(student => ({ ...student, attendance: "present" })));
  };

  const markAllAbsent = () => {
    setStudents(students.map(student => ({ ...student, attendance: "absent" })));
  };

  const handleSave = () => {
    alert("Attendance saved successfully!");
  };

  const stats = {
    present: students.filter(s => s.attendance === "present").length,
    absent: students.filter(s => s.attendance === "absent").length,
    leave: students.filter(s => s.attendance === "leave").length,
    total: students.length
  };

  const getAttendanceIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle size={18} className="text-green-600" />;
      case "absent":
        return <XCircle size={18} className="text-red-600" />;
      case "leave":
        return <Clock size={18} className="text-orange-600" />;
      default:
        return null;
    }
  };

  return (
    <div className={`p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Update Attendance
        </h1>
        <p className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Mark and manage student attendance for your classes
        </p>
      </div>

      {/* Class and Date Selection */}
      <div className={`border rounded-xl p-4 shadow-sm mb-6 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}>
        <div className="flex flex-wrap gap-4 items-end">
          {/* Class Selection */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Select Class
            </label>
            <div className="relative">
              <BookOpen className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} size={18} />
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className={`pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400" 
                    : "bg-white border-gray-300 text-gray-800 focus:ring-blue-400"
                }`}
              >
                {classes.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                isDarkMode 
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400" 
                  : "bg-white border-gray-300 text-gray-800 focus:ring-blue-400"
              }`}
            />
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 ml-auto">
            <button
              onClick={markAllPresent}
              className="flex items-center gap-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-4 py-2.5 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors duration-300 font-medium"
            >
              <CheckCircle size={18} />
              Mark All Present
            </button>
            <button
              onClick={markAllAbsent}
              className="flex items-center gap-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-4 py-2.5 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-300 font-medium"
            >
              <XCircle size={18} />
              Mark All Absent
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className={`p-4 rounded-xl border shadow-sm transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Present</p>
              <p className="text-2xl font-bold text-green-600">{stats.present}</p>
            </div>
          </div>
        </div>
        <div className={`p-4 rounded-xl border shadow-sm transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="text-red-600" size={20} />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Absent</p>
              <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
            </div>
          </div>
        </div>
        <div className={`p-4 rounded-xl border shadow-sm transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="text-orange-600" size={20} />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>On Leave</p>
              <p className="text-2xl font-bold text-orange-600">{stats.leave}</p>
            </div>
          </div>
        </div>
        <div className={`p-4 rounded-xl border shadow-sm transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="text-blue-600" size={20} />
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Total</p>
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className={`border rounded-xl p-4 shadow-sm mb-6 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}>
        <div className="relative max-w-md">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} size={18} />
          <input
            type="text"
            placeholder="Search student by name or scholar number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
              isDarkMode 
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400" 
                : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-400"
            }`}
          />
        </div>
      </div>

      {/* Attendance Table */}
      <div className={`border rounded-xl shadow-sm overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}>
              <tr>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Scholar No.
                </th>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Student Name
                </th>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Current Status
                </th>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Mark Attendance
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className={`border-b hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300 ${
                  isDarkMode ? "border-gray-700" : "border-gray-100"
                }`}>
                  <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {student.scholarNo}
                  </td>
                  <td className={`py-3 px-4 font-medium transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    {student.name}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium w-fit ${
                      student.attendance === "present" 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : student.attendance === "absent"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                    }`}>
                      {getAttendanceIcon(student.attendance)}
                      {student.attendance.charAt(0).toUpperCase() + student.attendance.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateAttendance(student.id, "present")}
                        className={`p-2 rounded-lg transition-colors duration-300 ${
                          student.attendance === "present"
                            ? "bg-green-600 text-white"
                            : isDarkMode
                            ? "bg-gray-700 text-gray-300 hover:bg-green-900/50"
                            : "bg-gray-100 text-gray-600 hover:bg-green-100"
                        }`}
                        title="Mark Present"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button
                        onClick={() => updateAttendance(student.id, "absent")}
                        className={`p-2 rounded-lg transition-colors duration-300 ${
                          student.attendance === "absent"
                            ? "bg-red-600 text-white"
                            : isDarkMode
                            ? "bg-gray-700 text-gray-300 hover:bg-red-900/50"
                            : "bg-gray-100 text-gray-600 hover:bg-red-100"
                        }`}
                        title="Mark Absent"
                      >
                        <XCircle size={18} />
                      </button>
                      <button
                        onClick={() => updateAttendance(student.id, "leave")}
                        className={`p-2 rounded-lg transition-colors duration-300 ${
                          student.attendance === "leave"
                            ? "bg-orange-600 text-white"
                            : isDarkMode
                            ? "bg-gray-700 text-gray-300 hover:bg-orange-900/50"
                            : "bg-gray-100 text-gray-600 hover:bg-orange-100"
                        }`}
                        title="Mark Leave"
                      >
                        <Clock size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium shadow-lg hover:shadow-xl"
        >
          <Save size={20} />
          Save Attendance
        </button>
      </div>

    </div>
  );
}


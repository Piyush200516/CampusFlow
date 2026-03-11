import { useState } from "react";
import { Search, Filter, Download, Eye, User, Mail, Phone, BookOpen } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function StudentList() {
  const { isDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Sample student data
  const [students] = useState([
    {
      id: 1,
      scholarNo: "AITR040613",
      name: "Rahul Sharma",
      class: "10th-A",
      email: "rahul.sharma@student.edu",
      phone: "9876543210",
      dob: "15-05-2005",
      attendance: "95%",
      status: "Active",
    },
    {
      id: 2,
      scholarNo: "AITR240613",
      name: "Anjali Verma",
      class: "9th-B",
      email: "anjali.verma@student.edu",
      phone: "9123456780",
      dob: "22-08-2006",
      attendance: "88%",
      status: "Active",
    },
    {
      id: 3,
      scholarNo: "AITR350714",
      name: "Priya Singh",
      class: "11th-A",
      email: "priya.singh@student.edu",
      phone: "9988776655",
      dob: "10-03-2004",
      attendance: "92%",
      status: "Active",
    },
    {
      id: 4,
      scholarNo: "AITR460825",
      name: "Amit Kumar",
      class: "10th-A",
      email: "amit.kumar@student.edu",
      phone: "9876543211",
      dob: "05-11-2005",
      attendance: "78%",
      status: "Active",
    },
    {
      id: 5,
      scholarNo: "AITR570936",
      name: "Sneha Gupta",
      class: "12th-A",
      email: "sneha.gupta@student.edu",
      phone: "9876543222",
      dob: "18-07-2003",
      attendance: "96%",
      status: "Active",
    },
    {
      id: 6,
      scholarNo: "AITR681047",
      name: "Vikram Singh",
      class: "9th-B",
      email: "vikram.singh@student.edu",
      phone: "9876543233",
      dob: "25-12-2006",
      attendance: "82%",
      status: "Active",
    },
  ]);

  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.scholarNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterClass === "All" || student.class === filterClass;
    return matchesSearch && matchesFilter;
  });

  const classes = ["All", "10th-A", "10th-B", "11th-A", "11th-B", "12th-A", "12th-B", "9th-A", "9th-B"];

  const getAttendanceColor = (attendance) => {
    const att = parseInt(attendance);
    if (att >= 90) return "text-green-600";
    if (att >= 75) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className={`p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Student List
        </h1>
        <p className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          View and manage all students in your department
        </p>
      </div>

      {/* Search and Filter */}
      <div className={`border rounded-xl p-4 shadow-sm mb-6 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} size={18} />
              <input
                type="text"
                placeholder="Search by name, scholar number, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-colors duration-300 ${
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400" 
                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-400"
                }`}
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter size={18} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className={`py-2.5 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400" 
                    : "bg-white border-gray-300 text-gray-800 focus:ring-blue-400"
                }`}
              >
                {classes.map((cls) => (
                  <option key={cls} value={cls}>{cls === "All" ? "All Classes" : cls}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Download Button */}
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py--lg hover:bg-blue2.5 rounded-700 transition-colors duration-300 font-medium">
            <Download size={18} />
            Export Data
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Showing {filteredStudents.length} of {students.length} students</p>
      </div>

      {/* Students Table */}
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
                  Class
                </th>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Email
                </th>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Phone
                </th>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Attendance
                </th>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Status
                </th>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id} className={`border-b hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300 ${
                  isDarkMode ? "border-gray-700" : "border-gray-100"
                }`}>
                  <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {student.scholarNo}
                  </td>
                  <td className={`py-3 px-4 font-medium transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    {student.name}
                  </td>
                  <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {student.class}
                  </td>
                  <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {student.email}
                  </td>
                  <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {student.phone}
                  </td>
                  <td className={`py-3 px-4 font-semibold transition-colors duration-300 ${getAttendanceColor(student.attendance)}`}>
                    {student.attendance}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      student.status === "Active" 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => setSelectedStudent(student)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 transition-colors duration-300"
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300`}>
            {/* Header */}
            <div className="bg-blue-600 text-white p-6 sticky top-0">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                  <p className="opacity-90">{selectedStudent.scholarNo} • {selectedStudent.class}</p>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-white hover:bg-blue-700 p-2 rounded"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <User className="w-5 h-5" /> Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
                    <p className="font-medium dark:text-white">{selectedStudent.dob}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      selectedStudent.status === "Active" 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    }`}>
                      {selectedStudent.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Mail className="w-5 h-5" /> Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium dark:text-white">{selectedStudent.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-medium dark:text-white">{selectedStudent.phone}</p>
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> Academic Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Class</p>
                    <p className="font-medium dark:text-white">{selectedStudent.class}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Attendance</p>
                    <p className={`font-medium ${getAttendanceColor(selectedStudent.attendance)}`}>{selectedStudent.attendance}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


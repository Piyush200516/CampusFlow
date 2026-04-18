import { useState, useEffect } from "react";
import API from "../../services/api";
import { CheckCircle, XCircle, Clock, Eye, Search, Filter } from "lucide-react";

export default function StudentForms() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const fetchAllStudents = async () => {
    try {
      setLoading(true);
      const response = await API.get("/api/cdc/forms");
      setStudents(response.data || []);
      if (!response.data || response.data.length === 0) {
        console.warn("No student data available - check database/backend");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-700", text: "Pending" },
      verified: { color: "bg-green-100 text-green-700", text: "Verified" },
      rejected: { color: "bg-red-100 text-red-700", text: "Rejected" },
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  // Filter students based on search and status
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rgpv_enrollment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: students.length,
    pending: students.filter(s => s.status === 'pending').length,
    verified: students.filter(s => s.status === 'verified').length,
    rejected: students.filter(s => s.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading student data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">CDC Student Records</h1>
        <p className="text-gray-500 mt-2">View all student information forms</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{stats.total}</span>
            <span className="text-gray-500">Total</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <Clock className="text-yellow-600" />
            <span className="text-2xl font-bold text-yellow-600">{stats.pending}</span>
            <span className="text-gray-500">Pending</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-600" />
            <span className="text-2xl font-bold text-green-600">{stats.verified}</span>
            <span className="text-gray-500">Verified</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <XCircle className="text-red-600" />
            <span className="text-2xl font-bold text-red-600">{stats.rejected}</span>
            <span className="text-gray-500">Rejected</span>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, enrollment, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-500">Showing {filteredStudents.length} of {students.length} students</p>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <p className="text-gray-500">No students found matching your criteria.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Student Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Enrollment</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Course/Branch</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Department</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{student.full_name || student.student_name}</p>
                        <p className="text-sm text-gray-500">{student.personal_name}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{student.rgpv_enrollment || "N/A"}</td>
                    <td className="py-3 px-4">
                      <span className="text-sm">{student.course}</span>
                      <span className="text-gray-400"> - </span>
                      <span className="text-sm">{student.branch}</span>
                    </td>
                    <td className="py-3 px-4">{student.department_name || "N/A"}</td>
                    <td className="py-3 px-4 text-sm">{student.student_email || student.email}</td>
                    <td className="py-3 px-4">{getStatusBadge(student.status)}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {student.created_at ? new Date(student.created_at).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="text-purple-600 hover:text-purple-800 flex items-center gap-1 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-purple-600 text-white p-6 sticky top-0">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedStudent.full_name || selectedStudent.student_name}
                  </h2>
                  <p className="opacity-90">
                    {selectedStudent.rgpv_enrollment} • {selectedStudent.course} - {selectedStudent.branch}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-white hover:bg-purple-700 p-2 rounded"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Current Status:</span>
                {getStatusBadge(selectedStudent.status)}
              </div>

              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Personal Email</p>
                    <p className="font-medium">{selectedStudent.personal_email || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mobile</p>
                    <p className="font-medium">{selectedStudent.mobile || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">WhatsApp</p>
                    <p className="font-medium">{selectedStudent.whatsapp || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">{selectedStudent.gender || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Address</h3>
                <p className="text-gray-600">
                  {selectedStudent.address || "N/A"}, {selectedStudent.city || ""}, {selectedStudent.state || ""} - {selectedStudent.pincode || ""}
                </p>
              </div>

              {/* Academic */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Academic Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">School Board</p>
                    <p className="font-medium">{selectedStudent.school_board || "N/A"} ({selectedStudent.school_year || "N/A"})</p>
                    <p className="text-sm">{selectedStudent.school_percent || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">College</p>
                    <p className="font-medium">{selectedStudent.college_name || "N/A"}</p>
                    <p className="text-sm">CGPA: {selectedStudent.cgpa || "N/A"} | Passing: {selectedStudent.passing_year || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Career */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Career Preferences</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Career Preference:</span> {selectedStudent.career_preference || "N/A"}</p>
                  <p><span className="font-medium">Primary Domain:</span> {selectedStudent.primary_domain || "N/A"}</p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedStudent.skill_html === 1 && <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">HTML</span>}
                    {selectedStudent.skill_css === 1 && <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">CSS</span>}
                    {selectedStudent.skill_js === 1 && <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm">JavaScript</span>}
                    {selectedStudent.skill_react === 1 && <span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded text-sm">React</span>}
                    {selectedStudent.skill_node === 1 && <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">Node.js</span>}
                    {selectedStudent.skill_python === 1 && <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">Python</span>}
                    {selectedStudent.skill_java === 1 && <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">Java</span>}
                    {selectedStudent.skill_sql === 1 && <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">SQL</span>}
                  </div>
                </div>
              </div>

              {/* Projects */}
              {(selectedStudent.project_links || selectedStudent.project_description) && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Projects</h3>
                  <p className="text-gray-600 mb-2">{selectedStudent.project_links || "N/A"}</p>
                  <p className="text-gray-600">{selectedStudent.project_description || "N/A"}</p>
                </div>
              )}

              {/* Resume */}
              {selectedStudent.resume_link && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Resume</h3>
                  <a
                    href={selectedStudent.resume_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Resume
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


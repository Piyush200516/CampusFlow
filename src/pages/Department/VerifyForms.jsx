import { useState, useEffect } from "react";
import API from "../../services/api";
import { CheckCircle, XCircle, Clock, Eye, Search, Filter, User, Mail, Phone, MapPin } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function VerifyForms() {
  const { isDarkMode } = useDarkMode();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Get department ID from localStorage
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const department_id = userData?.department_id;

  useEffect(() => {
    if (department_id) {
      fetchForms();
    }
  }, [department_id]);

  const fetchForms = async () => {
    try {
      setLoading(true);
      // Get all students for this department (not just pending)
      const response = await API.get(`/api/department/students/${department_id}`);
      setForms(response.data || []);
      if (!response.data || response.data.length === 0) {
        console.warn("No forms data - check department ID or backend");
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (student_info_id, action) => {
    if (!confirm(`Are you sure you want to ${action} this form?`)) {
      return;
    }

    try {
      setActionLoading(true);
      const response = await API.post("/api/department/action", {
        student_info_id,
        action
      });

      alert(response.data.message);
      
      // Update the form status in the list
      setForms(forms.map(form => 
        form.form_id === student_info_id ? { ...form, form_status: action } : form
      ));
      setSelectedForm(null);
      
      // Refresh the list
      fetchForms();
    } catch (error) {
      alert(error.response?.data?.error || "Action failed");
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (form) => {
    // If no form_id, student hasn't submitted form
    if (!form.form_id) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
          Not Submitted
        </span>
      );
    }
    
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400", text: "Pending" },
      verified: { color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", text: "Verified" },
      rejected: { color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", text: "Rejected" },
    };
    
    const config = statusConfig[form.form_status] || statusConfig.pending;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  // Filter forms based on search and status
  const filteredForms = forms.filter(form => {
    const matchesSearch = 
      form.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.rgpv_enrollment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.student_email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || form.form_status === statusFilter || (statusFilter === "not_submitted" && !form.form_id);
    
    return matchesSearch && matchesStatus;
  });

  // Calculate stats based on actual data
  const stats = {
    total: forms.length,
    notSubmitted: forms.filter(f => !f.form_id).length,
    pending: forms.filter(f => f.form_status === 'pending').length,
    verified: forms.filter(f => f.form_status === 'verified').length,
    rejected: forms.filter(f => f.form_status === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading forms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>

      {/* Header */}
      <div className="mb-6">
        <h1 className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Verify Student Forms
        </h1>
        <p className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Review and verify student information forms
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className={`p-4 rounded-xl border shadow-sm transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <div className="flex items-center">
            <span gap-2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{stats.total}</span>
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Total</span>
          </div>
        </div>
        <div className={`p-4 rounded-xl border shadow-sm transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <div className="flex items-center gap-2">
            <Clock className="text-yellow-600" />
            <span className="text-2xl font-bold text-yellow-600">{stats.pending}</span>
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Pending</span>
          </div>
        </div>
        <div className={`p-4 rounded-xl border shadow-sm transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-600" />
            <span className="text-2xl font-bold text-green-600">{stats.verified}</span>
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Verified</span>
          </div>
        </div>
        <div className={`p-4 rounded-xl border shadow-sm transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <div className="flex items-center gap-2">
            <XCircle className="text-red-600" />
            <span className="text-2xl font-bold text-red-600">{stats.rejected}</span>
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Rejected</span>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className={`border rounded-xl p-4 shadow-sm mb-6 transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 relative min-w-[200px]">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} size={18} />
            <input
              type="text"
              placeholder="Search by name, enrollment, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300 ${
                isDarkMode 
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400" 
                  : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-400"
              }`}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className={isDarkMode ? "text-gray-400" : "text-gray-400"} size={18} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300 ${
                isDarkMode 
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400" 
                  : "bg-white border-gray-300 text-gray-800 focus:ring-blue-400"
              }`}
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
        <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Showing {filteredForms.length} of {forms.length} forms</p>
      </div>

      {filteredForms.length === 0 ? (
        <div className={`border rounded-xl p-12 shadow-sm text-center transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-700"}`}>All Caught Up!</h2>
          <p className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>No forms found matching your criteria.</p>
        </div>
      ) : (
        <div className={`border rounded-xl shadow-sm overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}>
                <tr>
                  <th className={`text-left py-3 px-4 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Student Name</th>
                  <th className={`text-left py-3 px-4 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Enrollment</th>
                  <th className={`text-left py-3 px-4 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Course/Branch</th>
                  <th className={`text-left py-3 px-4 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Email</th>
                  <th className={`text-left py-3 px-4 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Mobile</th>
                  <th className={`text-left py-3 px-4 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Status</th>
                  <th className={`text-left py-3 px-4 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Date</th>
                  <th className={`text-left py-3 px-4 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredForms.map((form) => (
                  <tr key={form.user_id} className={`border-b hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300 ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                      <div>
                        <p className="font-medium">{form.full_name}</p>
                      </div>
                    </td>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{form.rgpv_enrollment || "N/A"}</td>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      <span className="text-sm">{form.course}</span>
                      <span className="text-gray-400"> - </span>
                      <span className="text-sm">{form.branch}</span>
                    </td>
                    <td className={`py-3 px-4 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{form.student_email || "N/A"}</td>
                    <td className={`py-3 px-4 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>-</td>
                    <td className="py-3 px-4">{getStatusBadge(form)}</td>
                    <td className={`py-3 px-4 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {form.form_submitted_date ? new Date(form.form_submitted_date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setSelectedForm(form)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 text-sm"
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

      {/* Form Detail Modal */}
      {selectedForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300`}>
            {/* Header */}
            <div className="bg-blue-600 text-white p-6 sticky top-0">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedForm.full_name || selectedForm.student_name}
                  </h2>
                  <p className="opacity-90">
                    {selectedForm.rgpv_enrollment} • {selectedForm.course} - {selectedForm.branch}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedForm(null)}
                  className="text-white hover:bg-blue-700 p-2 rounded"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Current Status:</span>
                {getStatusBadge(selectedForm)}
              </div>

              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 dark:text-white">
                  <User className="w-5 h-5" /> Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Personal Email</p>
                    <p className={`font-medium dark:text-white`}>{selectedForm.personal_email || "N/A"}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Mobile</p>
                    <p className={`font-medium dark:text-white`}>{selectedForm.mobile || "N/A"}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>WhatsApp</p>
                    <p className={`font-medium dark:text-white`}>{selectedForm.whatsapp || "N/A"}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Gender</p>
                    <p className={`font-medium dark:text-white`}>{selectedForm.gender || "N/A"}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Date of Birth</p>
                    <p className={`font-medium dark:text-white`}>{selectedForm.dob || "N/A"}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Category</p>
                    <p className={`font-medium dark:text-white`}>{selectedForm.category || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 dark:text-white">
                  <MapPin className="w-5 h-5" /> Address
                </h3>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                  {selectedForm.address || "N/A"}, {selectedForm.city || ""}, {selectedForm.state || ""} - {selectedForm.pincode || ""}
                </p>
              </div>

              {/* Academic */}
              <div>
                <h3 className="text-lg font-semibold mb-3 dark:text-white">Academic Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>School Board</p>
                    <p className={`font-medium dark:text-white`}>{selectedForm.school_board || "N/A"} ({selectedForm.school_year || "N/A"})</p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{selectedForm.school_percent || "N/A"}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>College</p>
                    <p className={`font-medium dark:text-white`}>{selectedForm.college_name || "N/A"}</p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>CGPA: {selectedForm.cgpa || "N/A"} | Passing: {selectedForm.passing_year || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Career */}
              <div>
                <h3 className="text-lg font-semibold mb-3 dark:text-white">Career Preferences</h3>
                <div className="space-y-2">
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}><span className="font-medium">Career Preference:</span> {selectedForm.career_preference || "N/A"}</p>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}><span className="font-medium">Primary Domain:</span> {selectedForm.primary_domain || "N/A"}</p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedForm.skill_html === 1 && <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded text-sm">HTML</span>}
                    {selectedForm.skill_css === 1 && <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded text-sm">CSS</span>}
                    {selectedForm.skill_js === 1 && <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-1 rounded text-sm">JavaScript</span>}
                    {selectedForm.skill_react === 1 && <span className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 px-2 py-1 rounded text-sm">React</span>}
                    {selectedForm.skill_node === 1 && <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded text-sm">Node.js</span>}
                    {selectedForm.skill_python === 1 && <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded text-sm">Python</span>}
                    {selectedForm.skill_java === 1 && <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded text-sm">Java</span>}
                    {selectedForm.skill_sql === 1 && <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-1 rounded text-sm">SQL</span>}
                  </div>
                </div>
              </div>

              {/* Projects */}
              {(selectedForm.project_links || selectedForm.project_description) && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 dark:text-white">Projects</h3>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600 mb-2"}>{selectedForm.project_links || "N/A"}</p>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{selectedForm.project_description || "N/A"}</p>
                </div>
              )}

              {/* Resume */}
              {selectedForm.resume_link && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 dark:text-white">Resume</h3>
                  <a
                    href={selectedForm.resume_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Resume
                  </a>
                </div>
              )}

              {/* Action Buttons */}
              {selectedForm.form_status === 'pending' && (
                <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleAction(selectedForm.form_id, "verified")}
                    disabled={actionLoading}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    {actionLoading ? "Processing..." : "Verify"}
                  </button>
                  <button
                    onClick={() => handleAction(selectedForm.form_id, "rejected")}
                    disabled={actionLoading}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    {actionLoading ? "Processing..." : "Reject"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


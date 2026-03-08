import { useState, useEffect } from "react";
import API from "../../services/api";
import { CheckCircle, XCircle, Eye, Clock, User, Mail, Phone, MapPin } from "lucide-react";

export default function VerifyForms() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Get department ID from localStorage
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const department_id = userData?.department_id;

  useEffect(() => {
    if (department_id) {
      fetchPendingForms();
    }
  }, [department_id]);

  const fetchPendingForms = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/api/department/forms/${department_id}`);
      setForms(response.data);
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
      
      // Remove the processed form from the list
      setForms(forms.filter(form => form.id !== student_info_id));
      setSelectedForm(null);
      
      // Refresh the list
      fetchPendingForms();
    } catch (error) {
      alert(error.response?.data?.error || "Action failed");
    } finally {
      setActionLoading(false);
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

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading pending forms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Verify Student Forms</h1>
        <p className="text-gray-500 mt-2">Review and verify student information forms</p>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex items-center gap-2">
          <Clock className="text-yellow-600" />
          <span className="font-semibold">Pending Forms:</span>
          <span className="text-xl font-bold text-yellow-600">{forms.length}</span>
        </div>
      </div>

      {forms.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">All Caught Up!</h2>
          <p className="text-gray-500 mt-2">No pending forms to verify at the moment.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Forms List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-lg font-semibold">Pending Forms ({forms.length})</h2>
            <div className="space-y-3">
              {forms.map((form) => (
                <div
                  key={form.id}
                  onClick={() => setSelectedForm(form)}
                  className={`bg-white p-4 rounded-xl shadow-sm cursor-pointer transition-all hover:shadow-md ${
                    selectedForm?.id === form.id ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {form.full_name || form.student_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {form.rgpv_enrollment || "N/A"}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(form.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {form.course}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {form.branch}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Details */}
          <div className="lg:col-span-2">
            {selectedForm ? (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 text-white p-6">
                  <h2 className="text-2xl font-bold">
                    {selectedForm.full_name || selectedForm.student_name}
                  </h2>
                  <p className="opacity-90">
                    {selectedForm.rgpv_enrollment} • {selectedForm.course} - {selectedForm.branch}
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Contact Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <User className="w-5 h-5" /> Personal Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{selectedForm.personal_email || selectedForm.student_email || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{selectedForm.mobile || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-sm">WhatsApp: {selectedForm.whatsapp || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-sm">Gender: {selectedForm.gender || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-sm">DOB: {selectedForm.dob || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-sm">Category: {selectedForm.category || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5" /> Address
                    </h3>
                    <p className="text-gray-600">
                      {selectedForm.address || "N/A"}, {selectedForm.city || ""}, {selectedForm.state || ""} - {selectedForm.pincode || ""}
                    </p>
                  </div>

                  {/* Academic Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Academic Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">School</p>
                        <p className="font-medium">{selectedForm.school_board || "N/A"} ({selectedForm.school_year || "N/A"})</p>
                        <p className="text-sm">{selectedForm.school_percent || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">College</p>
                        <p className="font-medium">{selectedForm.college_name || "N/A"}</p>
                        <p className="text-sm">CGPA: {selectedForm.cgpa || "N/A"}</p>
                        <p className="text-sm">Passing Year: {selectedForm.passing_year || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Career Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Career Preferences</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Career Preference:</span> {selectedForm.career_preference || "N/A"}</p>
                      <p><span className="font-medium">Primary Domain:</span> {selectedForm.primary_domain || "N/A"}</p>
                      
                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedForm.skill_html && <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">HTML</span>}
                        {selectedForm.skill_css && <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">CSS</span>}
                        {selectedForm.skill_js && <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm">JavaScript</span>}
                        {selectedForm.skill_react && <span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded text-sm">React</span>}
                        {selectedForm.skill_node && <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">Node.js</span>}
                        {selectedForm.skill_python && <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">Python</span>}
                        {selectedForm.skill_java && <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">Java</span>}
                        {selectedForm.skill_sql && <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">SQL</span>}
                      </div>
                    </div>
                  </div>

                  {/* Projects */}
                  {(selectedForm.project_links || selectedForm.project_description) && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Projects</h3>
                      <p className="text-gray-600 mb-2">{selectedForm.project_links || "N/A"}</p>
                      <p className="text-gray-600">{selectedForm.project_description || "N/A"}</p>
                    </div>
                  )}

                  {/* Resume */}
                  {selectedForm.resume_link && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Resume</h3>
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
                  <div className="flex gap-4 pt-6 border-t">
                    <button
                      onClick={() => handleAction(selectedForm.id, "verified")}
                      disabled={actionLoading}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      {actionLoading ? "Processing..." : "Verify"}
                    </button>
                    <button
                      onClick={() => handleAction(selectedForm.id, "rejected")}
                      disabled={actionLoading}
                      className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      {actionLoading ? "Processing..." : "Reject"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 shadow-sm text-center">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-700">Select a Form</h2>
                <p className="text-gray-500 mt-2">Click on a form from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


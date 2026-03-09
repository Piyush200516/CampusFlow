import { useState, useEffect } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import { FileText, Clock, CheckCircle, XCircle, Download, Send, User, BookOpen, Calendar, MessageSquare, ArrowRight } from "lucide-react";

export default function TCApplication() {
  const { isDarkMode } = useDarkMode();
  const [form, setForm] = useState({});
  const [status, setStatus] = useState("Not Applied");

  useEffect(() => {
    const savedForm = localStorage.getItem("tcForm");
    const savedStatus = localStorage.getItem("tcStatus");
    if (savedForm) setForm(JSON.parse(savedForm));
    if (savedStatus) setStatus(savedStatus);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    localStorage.setItem("tcForm", JSON.stringify(updatedForm));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Pending Verification");
    localStorage.setItem("tcStatus", "Pending Verification");
  };

  const verifyBySection = () => {
    setStatus("Verified by Section");
    localStorage.setItem("tcStatus", "Verified by Section");
  };

  const approveApplication = () => {
    setStatus("Approved");
    localStorage.setItem("tcStatus", "Approved");
  };

  const rejectApplication = () => {
    setStatus("Rejected");
    localStorage.setItem("tcStatus", "Rejected");
  };

  const handleDownload = async () => {
    try {
      const params = new URLSearchParams({
        fullName: form.fullName || "",
        enrollment: form.enrollment || "",
        course: form.course || "",
        year: form.year || "",
        reason: form.reason || "",
      });
      const response = await fetch(`/api/generate-tc-pdf?${params}`, { method: "GET" });
      if (!response.ok) throw new Error(`Failed to generate TC PDF: ${response.status}`);
      const blob = await response.blob();
      if (blob.size === 0) throw new Error("Empty PDF received");
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `TC_${form.enrollment || "Certificate"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading TC:", error);
      alert(`Failed to download TC: ${error.message}. Please make sure the backend server is running.`);
    }
  };

  const statusConfig = {
    "Not Applied": { color: "bg-gray-500", icon: FileText, text: "Not Applied" },
    "Pending Verification": { color: "bg-yellow-500", icon: Clock, text: "Pending Verification" },
    "Verified by Section": { color: "bg-blue-500", icon: CheckCircle, text: "Verified by Section" },
    "Approved": { color: "bg-green-500", icon: CheckCircle, text: "Approved" },
    "Rejected": { color: "bg-red-500", icon: XCircle, text: "Rejected" },
  };

  const getStatusBadge = () => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${config.color} text-white`}>
        <Icon size={18} />
        <span className="font-medium">{config.text}</span>
      </div>
    );
  };

  const Input = ({ label, name, type = "text", required = true }) => (
    <div>
      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        onChange={handleChange}
        className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
          isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-800"
        }`}
      />
    </div>
  );

  // Status View
  if (status !== "Not Applied") {
    return (
      <div className={`min-h-screen p-4 md:p-6 flex justify-center transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className={`w-full max-w-4xl p-6 md:p-8 rounded-2xl shadow-xl space-y-6 ${
          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Transfer Certificate Application
              </h1>
              <p className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                View your TC application status
              </p>
            </div>
            {getStatusBadge()}
          </div>

          {/* Application Details */}
          <div className={`p-5 rounded-xl space-y-4 ${
            isDarkMode ? "bg-gray-700/50 border border-gray-600" : "bg-gray-50 border border-gray-200"
          }`}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-blue-900/30" : "bg-blue-100"}`}>
                  <User className="text-blue-500" size={20} />
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Full Name</p>
                  <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>{form.fullName || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-purple-900/30" : "bg-purple-100"}`}>
                  <BookOpen className="text-purple-500" size={20} />
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Enrollment</p>
                  <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>{form.enrollment || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-green-900/30" : "bg-green-100"}`}>
                  <Calendar className="text-green-500" size={20} />
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Course</p>
                  <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>{form.course || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-orange-900/30" : "bg-orange-100"}`}>
                  <Calendar className="text-orange-500" size={20} />
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Passing Year</p>
                  <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>{form.year || "N/A"}</p>
                </div>
              </div>
            </div>
            {form.reason && (
              <div className={`pt-4 border-t ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}>
                <div className="flex items-start gap-3">
                  <MessageSquare className={isDarkMode ? "text-gray-400" : "text-gray-500"} size={20} />
                  <div>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Reason for TC</p>
                    <p className={`mt-1 ${isDarkMode ? "text-white" : "text-gray-800"}`}>{form.reason}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {status === "Pending Verification" && (
              <button onClick={verifyBySection} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                isDarkMode 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25" 
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
              }`}>
                <CheckCircle size={18} />
                Verify by Section
              </button>
            )}
            {status === "Verified by Section" && (
              <>
                <button onClick={approveApplication} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  isDarkMode 
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25" 
                    : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/25"
                }`}>
                  <CheckCircle size={18} />
                  Approve
                </button>
                <button onClick={rejectApplication} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  isDarkMode 
                    ? "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg shadow-red-500/25" 
                    : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg shadow-red-500/25"
                }`}>
                  <XCircle size={18} />
                  Reject
                </button>
              </>
            )}
            {status === "Approved" && (
              <button onClick={handleDownload} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isDarkMode 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25" 
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
              }`}>
                <Download size={20} />
                Download TC
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Application Form
  return (
    <div className={`min-h-screen p-4 md:p-6 flex justify-center transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <form onSubmit={handleSubmit} className={`w-full max-w-4xl p-6 md:p-8 rounded-2xl shadow-xl space-y-6 ${
        isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
      }`}>
        <div className="text-center mb-6">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            isDarkMode ? "bg-blue-900/30" : "bg-blue-100"
          }`}>
            <FileText className="text-blue-500" size={32} />
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Apply for Transfer Certificate (TC)
          </h1>
          <p className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Fill in the details to request your transfer certificate
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <Input label="Full Name *" name="fullName" />
          <Input label="Enrollment Number *" name="enrollment" />
          <Input label="Course / Branch *" name="course" />
          <Input label="Passing Year *" name="year" />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Reason for TC *</label>
          <textarea
            name="reason"
            required
            onChange={handleChange}
            rows="4"
            placeholder="Please provide the reason for requesting your Transfer Certificate..."
            className={`w-full border p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
              isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-800"
            }`}
          />
        </div>

        <button type="submit" className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
          isDarkMode 
            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25" 
            : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
        }`}>
          <Send size={20} />
          Submit Application
        </button>
      </form>
    </div>
  );
}


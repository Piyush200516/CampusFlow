import { useEffect, useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import { Building2, Briefcase, FileText, ExternalLink, X, Check, ArrowRight, Search } from "lucide-react";

export default function StudentApply() {
  const { isDarkMode } = useDarkMode();
  const scholarNo = localStorage.getItem("scholarNo");

  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    cgpa: "",
    skills: "",
    projectLinks: "",
    role: "",
    resume: null,
  });

  useEffect(() => {
    setCompanies(JSON.parse(localStorage.getItem("companies")) || []);
    setApplications(JSON.parse(localStorage.getItem("applications")) || []);
  }, []);

  const isApplied = (companyName) => {
    return applications.some(a => a.scholarNo === scholarNo && a.company === companyName);
  };

  const openForm = (company) => {
    setSelectedCompany(company);
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0].name });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApp = {
      scholarNo,
      company: selectedCompany.name,
      cgpa: form.cgpa,
      skills: form.skills,
      projectLinks: form.projectLinks,
      preferredRole: form.role,
      resume: form.resume,
    };
    const updated = [...applications, newApp];
    localStorage.setItem("applications", JSON.stringify(updated));
    setApplications(updated);
    setShowForm(false);
    setForm({ cgpa: "", skills: "", projectLinks: "", role: "", resume: null });
    alert("Application Submitted 🚀");
  };

  const filteredCompanies = companies.filter(c => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const inputClass = `w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
    isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-800"
  }`;

  return (
    <div className={`p-4 md:p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Placement Drives
        </h1>
        <p className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Browse and apply for placement opportunities
        </p>
      </div>

      {/* Search */}
      <div className={`mb-6 p-4 rounded-xl ${
        isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
      }`}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
              isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-gray-50 border-gray-200 text-gray-800"
            }`}
          />
        </div>
      </div>

      {/* Company Cards */}
      {filteredCompanies.length === 0 ? (
        <div className={`border rounded-2xl p-12 text-center shadow-xl ${
          isDarkMode ? "bg-gray-800 border-gray-700 text-gray-400" : "bg-white border-gray-200 text-gray-500"
        }`}>
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            isDarkMode ? "bg-gray-700" : "bg-gray-100"
          }`}>
            <Building2 size={32} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
          </div>
          <p className="text-lg">No companies available</p>
          <p className="text-sm mt-1">Check back later for new opportunities</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {filteredCompanies.map((c, i) => (
            <div key={i} className={`p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode ? "bg-gray-800 border border-gray-700 hover:border-gray-600" : "bg-white border border-gray-100 hover:border-gray-200"
            }`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isDarkMode ? "bg-blue-900/30" : "bg-blue-100"
                    }`}>
                      <Building2 className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg ${isDarkMode ? "text-white" : "text-gray-800"}`}>{c.name}</h3>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{c.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              {isApplied(c.name) ? (
                <div className={`mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl ${
                  isDarkMode ? "bg-green-900/20 border border-green-800" : "bg-green-50 border border-green-200"
                }`}>
                  <Check className="text-green-500" size={18} />
                  <span className={isDarkMode ? "text-green-400" : "text-green-600"}>Applied</span>
                </div>
              ) : (
                <button
                  onClick={() => openForm(c)}
                  className={`mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    isDarkMode 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25" 
                      : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
                  }`}
                >
                  Apply Now
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Application Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className={`w-full max-w-lg rounded-2xl p-6 md:p-8 relative shadow-2xl ${
            isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
          }`}>
            <button
              onClick={() => setShowForm(false)}
              className={`absolute top-4 right-4 p-2 rounded-xl transition-colors ${
                isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-blue-900/30" : "bg-blue-100"}`}>
                <Building2 className="text-blue-500" size={24} />
              </div>
              <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Apply for {selectedCompany?.name}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>CGPA *</label>
                <input name="cgpa" placeholder="Enter your CGPA" required onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Skills *</label>
                <input name="skills" placeholder="e.g., React, Node.js, Python" required onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Resume *</label>
                <input type="file" name="resume" required onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Project Links</label>
                <input name="projectLinks" placeholder="GitHub/Project URLs" onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Preferred Role *</label>
                <select name="role" required onChange={handleChange} className={inputClass}>
                  <option value="">Select Role</option>
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Full Stack</option>
                  <option>Intern</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                  isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}>
                  Cancel
                </button>
                <button type="submit" className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isDarkMode 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25" 
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
                }`}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


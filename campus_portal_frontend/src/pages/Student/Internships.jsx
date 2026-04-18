import { useState } from "react";
import { X, Plus, Briefcase, Calendar, DollarSign, FileText, ExternalLink, Check } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function Internships() {
  const { isDarkMode } = useDarkMode();
  const [open, setOpen] = useState(false);
  const [internships, setInternships] = useState([]);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    type: "",
    stipend: "",
    description: "",
    ppo: false,
    file: null,
    url: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "company" || name === "role") {
      if (!/^[A-Za-z\s]*$/.test(value)) return;
    }

    if (type === "file") {
      setFormData({ ...formData, file: files[0], url: "" });
      return;
    }

    if (name === "url") {
      setFormData({ ...formData, url: value, file: null });
      return;
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.company || !formData.role || !formData.startDate || !formData.endDate || !formData.type || !formData.stipend) {
      setError("Please fill all required fields.");
      return;
    }

    if (!formData.file && !formData.url) {
      setError("Upload Photo/PDF OR provide URL.");
      return;
    }

    setInternships([...internships, formData]);
    setOpen(false);
    setFormData({
      company: "", role: "", startDate: "", endDate: "", type: "", stipend: "", description: "", ppo: false, file: null, url: "",
    });
  };

  const inputClass = `w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
    isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-800"
  }`;

  return (
    <div className={`p-4 md:p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            My Internships
          </h1>
          <p className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Manage your internship records
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
            isDarkMode 
              ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25" 
              : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
          }`}
        >
          <Plus size={20} />
          Add Internship
        </button>
      </div>

      {/* List */}
      {internships.length === 0 ? (
        <div className={`border rounded-2xl p-12 text-center shadow-xl ${
          isDarkMode ? "bg-gray-800 border-gray-700 text-gray-400" : "bg-white border-gray-200 text-gray-500"
        }`}>
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            isDarkMode ? "bg-gray-700" : "bg-gray-100"
          }`}>
            <Briefcase size={32} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
          </div>
          <p className="text-lg">No internships added yet.</p>
          <p className="text-sm mt-1">Click the button above to add your first internship</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {internships.map((item, index) => (
            <div key={index} className={`p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.01] ${
              isDarkMode ? "bg-gray-800 border border-gray-700 hover:border-gray-600" : "bg-white border border-gray-100 hover:border-gray-200"
            }`}>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{item.company}</h3>
                    {item.ppo && (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full border border-green-500/30">
                        PPO/PPI
                      </span>
                    )}
                  </div>
                  <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{item.role}</p>

                  <div className={`flex flex-wrap gap-4 mt-3 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={16} />
                      {item.startDate} → {item.endDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={16} />
                      {item.type}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <DollarSign size={16} />
                      {item.stipend}
                    </span>
                  </div>

                  {item.description && (
                    <p className={`mt-3 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{item.description}</p>
                  )}
                </div>

                <div className="flex gap-2">
                  {item.file && (
                    <a href={URL.createObjectURL(item.file)} target="_blank" rel="noreferrer" 
                      className={`p-2.5 rounded-xl transition-colors ${
                        isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-blue-400" : "bg-gray-100 hover:bg-gray-200 text-blue-600"
                      }`}>
                      <FileText size={18} />
                    </a>
                  )}
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noreferrer" 
                      className={`p-2.5 rounded-xl transition-colors ${
                        isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-blue-400" : "bg-gray-100 hover:bg-gray-200 text-blue-600"
                      }`}>
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className={`w-full max-w-2xl rounded-2xl p-6 md:p-8 relative shadow-2xl ${
            isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
          }`}>
            <button
              onClick={() => setOpen(false)}
              className={`absolute top-4 right-4 p-2 rounded-xl transition-colors ${
                isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-blue-900/30" : "bg-blue-100"}`}>
                <Briefcase className="text-blue-500" size={24} />
              </div>
              <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Add Internship Details
              </h2>
            </div>

            {error && (
              <div className={`p-3 rounded-xl mb-4 text-sm ${isDarkMode ? "bg-red-900/30 text-red-400 border border-red-800" : "bg-red-100 text-red-600 border border-red-200"}`}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input name="company" value={formData.company} onChange={handleChange} placeholder="Company Name *" className={inputClass} />
                <input name="role" value={formData.role} onChange={handleChange} placeholder="Role *" className={inputClass} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className={inputClass} />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className={inputClass} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <select name="type" value={formData.type} onChange={handleChange} className={inputClass}>
                  <option value="">Internship Type *</option>
                  <option>Online</option>
                  <option>Offline</option>
                </select>
                <select name="stipend" value={formData.stipend} onChange={handleChange} className={inputClass}>
                  <option value="">Stipend *</option>
                  <option>Paid</option>
                  <option>Unpaid</option>
                </select>
              </div>

              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className={`${inputClass} h-24`} />

              <div className={`p-4 rounded-xl border-2 border-dashed ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="file" name="file" accept="image/*,.pdf" onChange={handleChange} disabled={formData.url !== ""} className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`} />
                  <input name="url" value={formData.url} onChange={handleChange} disabled={formData.file !== null} placeholder="Or Paste File URL" className={inputClass} />
                </div>
              </div>

              <label className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                isDarkMode ? "bg-gray-700/50 hover:bg-gray-700" : "bg-gray-50 hover:bg-gray-100"
              }`}>
                <input type="checkbox" name="ppo" checked={formData.ppo} onChange={handleChange} className="w-5 h-5 rounded text-blue-500" />
                <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Received PPO/PPI</span>
                {formData.ppo && <Check size={18} className="text-green-500 ml-auto" />}
              </label>

              <button type="submit" className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                isDarkMode 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25" 
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
              }`}>
                Submit Internship
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


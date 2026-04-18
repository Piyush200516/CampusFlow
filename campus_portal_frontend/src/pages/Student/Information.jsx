import { useState, useEffect } from "react";
import API from "../../services/api";
import { CheckCircle, XCircle, AlertCircle, User, Mail, Phone, MapPin, GraduationCap, Briefcase, FileText, Save } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function Information() {
  const { isDarkMode } = useDarkMode();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [existingData, setExistingData] = useState(null);
  const [skills, setSkills] = useState({
    skill_html: false,
    skill_css: false,
    skill_js: false,
    skill_react: false,
    skill_node: false,
    skill_python: false,
    skill_java: false,
    skill_sql: false,
  });

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const user_id = userData?.id;

  const [formData, setFormData] = useState({
    user_id: user_id,
    full_name: "",
    college_email: "",
    rgpv_enrollment: "",
    institute_enrollment: "",
    course: "",
    branch: "",
    batch_year: "",
    section: "",
    photo: "",
    personal_name: "",
    personal_email: "",
    mobile: "",
    whatsapp: "",
    gender: "",
    dob: "",
    category: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    project_links: "",
    project_description: "",
    school_board: "",
    school_year: "",
    school_percent: "",
    college_course: "",
    college_branch: "",
    college_name: "",
    passing_year: "",
    cgpa: "",
    career_preference: "",
    primary_domain: "",
    resume_link: "",
    department_id: userData?.department_id || 1,
  });

  useEffect(() => {
    if (user_id) {
      fetchExistingInfo();
    }
  }, [user_id]);

  const fetchExistingInfo = async () => {
    try {
      const response = await API.get(`/api/student/info/${user_id}`);
      if (response.data && response.data.id) {
        setExistingData(response.data);
        setStatus(response.data.status);
        setFormData(prev => ({ ...prev, ...response.data, user_id: user_id }));
        setSkills({
          skill_html: response.data.skill_html || false,
          skill_css: response.data.skill_css || false,
          skill_js: response.data.skill_js || false,
          skill_react: response.data.skill_react || false,
          skill_node: response.data.skill_node || false,
          skill_python: response.data.skill_python || false,
          skill_java: response.data.skill_java || false,
          skill_sql: response.data.skill_sql || false,
        });
      }
    } catch (error) {
      console.log("No existing data found");
    }
  };

  const toggleSkill = (skill) => {
    setSkills(prev => ({ ...prev, [skill]: !prev[skill] }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, ...skills, user_id: user_id };
      const response = await API.post("/api/student/submit-info", payload);
      if (response.data && response.data.status) {
        setStatus(response.data.status);
        alert(response.data.message || "Form submitted successfully!");
      } else if (response.data && response.data.message) {
        alert(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || "Failed to submit form";
      alert("Error: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = () => {
    if (!status) return null;
    const statusConfig = {
      pending: { color: isDarkMode ? "bg-yellow-900/50 text-yellow-400 border-yellow-700" : "bg-yellow-100 text-yellow-700 border-yellow-300", icon: AlertCircle, text: "Pending Review" },
      verified: { color: isDarkMode ? "bg-green-900/50 text-green-400 border-green-700" : "bg-green-100 text-green-700 border-green-300", icon: CheckCircle, text: "Verified" },
      rejected: { color: isDarkMode ? "bg-red-900/50 text-red-400 border-red-700" : "bg-red-100 text-red-700 border-red-300", icon: XCircle, text: "Rejected - Edit & Resubmit" },
    };
    const config = statusConfig[status];
    if (!config) return null;
    const Icon = config.icon;
    return (
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${config.color}`}>
        <Icon size={18} />
        <span className="font-medium">{config.text}</span>
      </div>
    );
  };

  const skillList = [
    { key: "skill_html", label: "HTML" },
    { key: "skill_css", label: "CSS" },
    { key: "skill_js", label: "JavaScript" },
    { key: "skill_react", label: "React" },
    { key: "skill_node", label: "Node.js" },
    { key: "skill_python", label: "Python" },
    { key: "skill_java", label: "Java" },
    { key: "skill_sql", label: "SQL" },
  ];

  const inputClass = `w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 ${
    isDarkMode 
      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
      : "bg-white border-gray-300 text-gray-800"
  }`;

  const Card = ({ title, icon, children }) => (
    <div className={`rounded-2xl p-6 shadow-lg ${
      isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
    }`}>
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
          {icon}
        </div>
        <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <div className={`min-h-screen p-4 md:p-6 transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {!user_id && (
        <div className={`max-w-7xl mx-auto mb-4 px-4 py-3 rounded-xl ${isDarkMode ? "bg-red-900/30 border border-red-700 text-red-400" : "bg-red-100 border border-red-400 text-red-700"}`}>
          <p><strong>Warning:</strong> User not logged in or user ID not found.</p>
        </div>
      )}

      {status && (
        <div className="max-w-7xl mx-auto mb-6">
          <div className={`flex items-center justify-between rounded-xl p-4 shadow-lg ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
            <div className="flex items-center gap-3">
              <span className={isDarkMode ? "text-gray-300" : "text-gray-600"} font-medium>Form Status:</span>
              {getStatusBadge()}
            </div>
            {status === "rejected" && (
              <p className={isDarkMode ? "text-red-400 text-sm" : "text-red-600 text-sm"}>
                Your form was rejected. Please make corrections and resubmit.
              </p>
            )}
            {status === "verified" && (
              <p className={isDarkMode ? "text-green-400 text-sm" : "text-green-600 text-sm"}>
                Your information has been verified by the department.
              </p>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className={`text-2xl md:text-3xl font-bold text-center mb-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Student Information Form
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Profile Info */}
            <Card title="Student Profile Information" icon={<User className={isDarkMode ? "text-blue-400" : "text-blue-600"} size={22} />}>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input className={inputClass} placeholder="Full Name *" name="full_name" value={formData.full_name} onChange={handleChange} required />
                <input className={inputClass} placeholder="College Email *" name="college_email" value={formData.college_email} onChange={handleChange} required />
                <input className={inputClass} placeholder="RGPV Enrollment *" name="rgpv_enrollment" value={formData.rgpv_enrollment} onChange={handleChange} required />
                <input className={inputClass} placeholder="Institute Enrollment" name="institute_enrollment" value={formData.institute_enrollment} onChange={handleChange} />
                <select className={inputClass} name="course" value={formData.course} onChange={handleChange} required>
                  <option value="">Select Course</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="MBA">MBA</option>
                  <option value="BCA">BCA</option>
                </select>
                <select className={inputClass} name="branch" value={formData.branch} onChange={handleChange} required>
                  <option value="">Select Branch</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                </select>
                <input className={inputClass} placeholder="Batch Year *" name="batch_year" value={formData.batch_year} onChange={handleChange} required />
                <input className={inputClass} placeholder="Section" name="section" value={formData.section} onChange={handleChange} />
              </div>
            </Card>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <Card title="Personal Details" icon={<User className={isDarkMode ? "text-purple-400" : "text-purple-600"} size={22} />}>
                  <div className="flex gap-4">
                    <div className={`border-2 border-dashed rounded-xl w-32 h-32 flex items-center justify-center text-sm ${isDarkMode ? "text-gray-400 border-gray-600" : "text-gray-500 border-gray-300"}`}>
                      Upload Photo
                    </div>
                    <div className="grid grid-cols-2 gap-3 flex-1">
                      <input className={inputClass} placeholder="Full Name" name="personal_name" value={formData.personal_name} onChange={handleChange} />
                      <input className={inputClass} placeholder="Email" name="personal_email" value={formData.personal_email} onChange={handleChange} />
                      <input className={inputClass} placeholder="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
                      <input className={inputClass} placeholder="WhatsApp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
                      <select className={inputClass} name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <input type="date" className={inputClass} name="dob" value={formData.dob} onChange={handleChange} />
                      <input className={inputClass} placeholder="Category" name="category" value={formData.category} onChange={handleChange} />
                    </div>
                  </div>
                </Card>

                <Card title="Address Details" icon={<MapPin className={isDarkMode ? "text-green-400" : "text-green-600"} size={22} />}>
                  <textarea className={inputClass} placeholder="Address" name="address" value={formData.address} onChange={handleChange} rows={3} />
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <input className={inputClass} placeholder="City" name="city" value={formData.city} onChange={handleChange} />
                    <input className={inputClass} placeholder="State" name="state" value={formData.state} onChange={handleChange} />
                    <input className={inputClass} placeholder="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
                  </div>
                </Card>

                <Card title="Projects & Experience" icon={<Briefcase className={isDarkMode ? "text-orange-400" : "text-orange-600"} size={22} />}>
                  <input className={`${inputClass} mb-3`} placeholder="Project Links" name="project_links" value={formData.project_links} onChange={handleChange} />
                  <textarea className={inputClass} placeholder="Project Description" name="project_description" value={formData.project_description} onChange={handleChange} rows={3} />
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <Card title="Academic Details (School)" icon={<GraduationCap className={isDarkMode ? "text-blue-400" : "text-blue-600"} size={22} />}>
                  <div className="grid grid-cols-3 gap-3">
                    <input className={inputClass} placeholder="Board" name="school_board" value={formData.school_board} onChange={handleChange} />
                    <input className={inputClass} placeholder="Year" name="school_year" value={formData.school_year} onChange={handleChange} />
                    <input className={inputClass} placeholder="% / CGPA" name="school_percent" value={formData.school_percent} onChange={handleChange} />
                  </div>
                </Card>

                <Card title="Academic Details (College)" icon={<GraduationCap className={isDarkMode ? "text-purple-400" : "text-purple-600"} size={22} />}>
                  <div className="grid grid-cols-2 gap-3">
                    <input className={inputClass} placeholder="Course" name="college_course" value={formData.college_course} onChange={handleChange} />
                    <input className={inputClass} placeholder="Branch" name="college_branch" value={formData.college_branch} onChange={handleChange} />
                    <input className={inputClass} placeholder="College" name="college_name" value={formData.college_name} onChange={handleChange} />
                    <input className={inputClass} placeholder="Passing Year" name="passing_year" value={formData.passing_year} onChange={handleChange} />
                    <input className={inputClass} placeholder="CGPA" name="cgpa" value={formData.cgpa} onChange={handleChange} />
                  </div>
                </Card>

                <Card title="Career Preferences" icon={<Briefcase className={isDarkMode ? "text-green-400" : "text-green-600"} size={22} />}>
                  <input className={`${inputClass} mb-3`} placeholder="Career Preference" name="career_preference" value={formData.career_preference} onChange={handleChange} />
                  <input className={`${inputClass} mb-4`} placeholder="Primary Domain" name="primary_domain" value={formData.primary_domain} onChange={handleChange} />
                  <div className="flex flex-wrap gap-2">
                    {skillList.map(skill => (
                      <button
                        type="button"
                        key={skill.key}
                        onClick={() => toggleSkill(skill.key)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                          skills[skill.key]
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                            : isDarkMode
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-200"
                        }`}
                      >
                        {skill.label}
                      </button>
                    ))}
                  </div>
                </Card>

                <Card title="Resume Upload" icon={<FileText className={isDarkMode ? "text-red-400" : "text-red-600"} size={22} />}>
                  <input type="url" className={inputClass} placeholder="Resume Link (Google Drive/LinkedIn)" name="resume_link" value={formData.resume_link} onChange={handleChange} />
                </Card>

                <button 
                  type="submit" 
                  disabled={loading || !user_id}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-blue-500/25"
                >
                  <Save size={20} />
                  {loading ? "Submitting..." : existingData ? "Update Form" : "Submit Form"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


import { useState, useEffect } from "react";
import API from "../../services/api";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function Information() {
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

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const user_id = userData?.id;

  // Form state
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
        
        // Populate form with existing data
        setFormData(prev => ({
          ...prev,
          ...response.data,
          user_id: user_id,
        }));
        
        // Set skills
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
    setSkills(prev => ({
      ...prev,
      [skill]: !prev[skill]
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Submitting form with user_id:", user_id);

    try {
      const payload = {
        ...formData,
        ...skills,
        user_id: user_id,
      };

      console.log("Full payload:", payload);

      const response = await API.post("/api/student/submit-info", payload);
      
      console.log("Response received:", response.data);
      
      if (response.data && response.data.status) {
        setStatus(response.data.status);
        alert(response.data.message || "Form submitted successfully!");
      } else if (response.data && response.data.message) {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
      console.error("Error response:", error.response?.data);
      
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          error.message || 
                          "Failed to submit form";
      alert("Error: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = () => {
    if (!status) return null;
    
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-700", icon: AlertCircle, text: "Pending Review" },
      verified: { color: "bg-green-100 text-green-700", icon: CheckCircle, text: "Verified" },
      rejected: { color: "bg-red-100 text-red-700", icon: XCircle, text: "Rejected - Edit & Resubmit" },
    };
    
    const config = statusConfig[status];
    if (!config) return null;
    
    const Icon = config.icon;
    
    return (
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${config.color}`}>
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

  // Debug: Show user_id
  console.log("Current user_id:", user_id);
  console.log("User data from localStorage:", userData);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Debug Info - Remove in production */}
      {!user_id && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p><strong>Warning:</strong> User not logged in or user ID not found.</p>
          <p>Please login first and try again.</p>
        </div>
      )}

      {/* Status Banner */}
      {status && (
        <div className="max-w-7xl mx-auto mb-6">
          <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-gray-600 font-medium">Form Status:</span>
              {getStatusBadge()}
            </div>
            {status === "rejected" && (
              <p className="text-red-600 text-sm">
                Your form was rejected. Please make corrections and resubmit.
              </p>
            )}
            {status === "verified" && (
              <p className="text-green-600 text-sm">
                Your information has been verified by the department.
              </p>
            )}
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-center mb-6">
        Student Information Form
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="max-w-7xl mx-auto space-y-6">

          {/* ================= PROFILE INFO ================= */}
          <div className="card bg-white rounded-xl p-6 shadow-sm">
            <h2 className="title text-xl font-semibold mb-4">Student Profile Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input 
                className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Full Name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
              <input 
                className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="College Email"
                name="college_email"
                value={formData.college_email}
                onChange={handleChange}
                required
              />
              <input 
                className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="RGPV Enrollment"
                name="rgpv_enrollment"
                value={formData.rgpv_enrollment}
                onChange={handleChange}
                required
              />
              <input 
                className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Institute Enrollment"
                name="institute_enrollment"
                value={formData.institute_enrollment}
                onChange={handleChange}
              />
              <select 
                className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option value="">Select Course</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="MBA">MBA</option>
                <option value="BCA">BCA</option>
              </select>
              <select 
                className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
              >
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
              </select>
              <input 
                className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Batch Year"
                name="batch_year"
                value={formData.batch_year}
                onChange={handleChange}
                required
              />
              <input 
                className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Section"
                name="section"
                value={formData.section}
                onChange={handleChange}
              />
            </div>
          </div>


          {/* ================= MAIN GRID ================= */}
          <div className="grid lg:grid-cols-2 gap-6">

            {/* LEFT */}
            <div className="space-y-6">

              {/* PERSONAL */}
              <div className="card bg-white rounded-xl p-6 shadow-sm">
                <h2 className="title text-xl font-semibold mb-4">Personal Details</h2>

                <div className="flex gap-4">
                  <div className="border-2 border-dashed rounded-lg w-32 h-32 flex items-center justify-center text-sm text-gray-500">
                    Upload Photo
                  </div>

                  <div className="grid grid-cols-2 gap-3 flex-1">
                    <input 
                      className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Full Name"
                      name="personal_name"
                      value={formData.personal_name}
                      onChange={handleChange}
                    />
                    <input 
                      className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Email"
                      name="personal_email"
                      value={formData.personal_email}
                      onChange={handleChange}
                    />
                    <input 
                      className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                    <input 
                      className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="WhatsApp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                    />

                    <select 
                      className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>

                    <input 
                      type="date" 
                      className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                    <input 
                      className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="card bg-white rounded-xl p-6 shadow-sm">
                <h2 className="title text-xl font-semibold mb-4">Address Details</h2>

                <textarea 
                  className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                />
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <input 
                    className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <input 
                    className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                  <input 
                    className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* PROJECT */}
              <div className="card bg-white rounded-xl p-6 shadow-sm">
                <h2 className="title text-xl font-semibold mb-4">Projects & Experience</h2>
                <input 
                  className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-3"
                  placeholder="Project Links"
                  name="project_links"
                  value={formData.project_links}
                  onChange={handleChange}
                />
                <textarea 
                  className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Project Description"
                  name="project_description"
                  value={formData.project_description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

            </div>

            {/* RIGHT */}
            <div className="space-y-6">

              {/* ACADEMIC */}
              <div className="card bg-white rounded-xl p-6 shadow-sm">
                <h2 className="title text-xl font-semibold mb-4">Academic Details (School)</h2>

                <div className="grid grid-cols-3 gap-3">
                  <input 
                    className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Board"
                    name="school_board"
                    value={formData.school_board}
                    onChange={handleChange}
                  />
                  <input 
                    className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Year"
                    name="school_year"
                    value={formData.school_year}
                    onChange={handleChange}
                  />
                  <input 
                    className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="% / CGPA"
                    name="school_percent"
                    value={formData.school_percent}
                    onChange={handleChange}
                  />
                </div>

                <h2 className="title text-xl font-semibold mb-4 mt-6">Academic Details (College)</h2>
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Course"
                    name="college_course"
                    value={formData.college_course}
                    onChange={handleChange}
                  />
                  <input 
                    className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Branch"
                    name="college_branch"
                    value={formData.college_branch}
                    onChange={handleChange}
                  />
                  <input 
                    className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="College"
                    name="college_name"
                    value={formData.college_name}
                    onChange={handleChange}
                  />
                  <input 
                    className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Passing Year"
                    name="passing_year"
                    value={formData.passing_year}
                    onChange={handleChange}
                  />
                  <input 
                    className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="CGPA"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* CAREER */}
              <div className="card bg-white rounded-xl p-6 shadow-sm">
                <h2 className="title text-xl font-semibold mb-4">Career Preferences</h2>

                <input 
                  className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-3"
                  placeholder="Career Preference"
                  name="career_preference"
                  value={formData.career_preference}
                  onChange={handleChange}
                />
                <input 
                  className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
                  placeholder="Primary Domain"
                  name="primary_domain"
                  value={formData.primary_domain}
                  onChange={handleChange}
                />

                <div className="flex flex-wrap gap-2">
                  {skillList.map(skill => (
                    <button
                      type="button"
                      key={skill.key}
                      onClick={() => toggleSkill(skill.key)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        skills[skill.key]
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {skill.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* RESUME */}
              <div className="card bg-white rounded-xl p-6 shadow-sm">
                <h2 className="title text-xl font-semibold mb-4">Resume Upload</h2>
                <input 
                  type="url"
                  className="input w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Resume Link (Google Drive/LinkedIn)"
                  name="resume_link"
                  value={formData.resume_link}
                  onChange={handleChange}
                />
              </div>

              <button 
                type="submit" 
                disabled={loading || !user_id}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Submitting..." : existingData ? "Update Form" : "Submit Form"}
              </button>

            </div>

          </div>

        </div>
      </form>
    </div>
  );
}


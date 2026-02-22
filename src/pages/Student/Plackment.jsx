import { useEffect, useState } from "react";

export default function StudentApply() {
  const scholarNo = localStorage.getItem("scholarNo");

  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [form, setForm] = useState({
    cgpa: "",
    skills: "",
    projectLinks: "",
    role: "",
    resume: null,
  });

  // Load Data
  useEffect(() => {
    setCompanies(
      JSON.parse(localStorage.getItem("companies")) || []
    );
    setApplications(
      JSON.parse(localStorage.getItem("applications")) || []
    );
  }, []);

  // Check applied
  const isApplied = (companyName) => {
    return applications.some(
      (a) =>
        a.scholarNo === scholarNo &&
        a.company === companyName
    );
  };

  // Open form
  const openForm = (company) => {
    setSelectedCompany(company);
    setShowForm(true);
  };

  // Input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setForm({ ...form, [name]: files[0].name });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Submit
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

    localStorage.setItem(
      "applications",
      JSON.stringify(updated)
    );

    setApplications(updated);
    setShowForm(false);

    setForm({
      cgpa: "",
      skills: "",
      projectLinks: "",
      role: "",
      resume: null,
    });

    alert("Application Submitted 🚀");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* ================= Company Cards ================= */}
      <div className="grid md:grid-cols-2 gap-5">
        {companies.map((c, i) => (
          <div key={i} className="bg-white p-4 shadow rounded">
            <h3 className="font-bold text-lg">{c.name}</h3>
            <p>{c.role}</p>

            {isApplied(c.name) ? (
              <button
                disabled
                className="bg-gray-400 text-white px-3 py-2 mt-3 rounded"
              >
                Applied ✅
              </button>
            ) : (
              <button
                onClick={() => openForm(c)}
                className="bg-green-600 text-white px-3 py-2 mt-3 rounded"
              >
                Apply
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ================= FORM POPUP ================= */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <form
            onSubmit={handleSubmit}
            className="bg-white w-[420px] rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-bold mb-4 text-center">
              Apply for {selectedCompany.name}
            </h2>

            <input
              name="cgpa"
              placeholder="CGPA"
              required
              onChange={handleChange}
              className="border p-2 mb-3 w-full rounded"
            />

            <input
              name="skills"
              placeholder="Skills"
              required
              onChange={handleChange}
              className="border p-2 mb-3 w-full rounded"
            />

            <input
              type="file"
              name="resume"
              required
              onChange={handleChange}
              className="mb-3"
            />

            <input
              name="projectLinks"
              placeholder="Project Links"
              onChange={handleChange}
              className="border p-2 mb-3 w-full rounded"
            />

            <select
              name="role"
              required
              onChange={handleChange}
              className="border p-2 mb-4 w-full rounded"
            >
              <option value="">Select Role</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack</option>
              <option>Intern</option>
            </select>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Submit
              </button>
            </div>

          </form>
        </div>
      )}
    </div>
  );
}
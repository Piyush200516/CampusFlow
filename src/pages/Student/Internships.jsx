import { useState } from "react";
import { X } from "lucide-react";

export default function Internships() {
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

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "company" || name === "role") {
      if (!/^[A-Za-z\s]*$/.test(value)) return;
    }

    // FILE SELECTED → CLEAR URL
    if (type === "file") {
      setFormData({
        ...formData,
        file: files[0],
        url: "",
      });
      return;
    }

    // URL TYPED → CLEAR FILE
    if (name === "url") {
      setFormData({
        ...formData,
        url: value,
        file: null,
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.company ||
      !formData.role ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.type ||
      !formData.stipend
    ) {
      setError("Please fill all required fields.");
      return;
    }

    // ONLY ONE FILE/URL REQUIRED
    if (!formData.file && !formData.url) {
      setError("Upload Photo/PDF OR provide URL.");
      return;
    }

    setInternships([...internships, formData]);
    setOpen(false);

    setFormData({
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
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Internships</h1>
          <p className="text-gray-500">
            Manage your internship records
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-black text-white px-5 py-2 rounded-xl"
        >
          Add Internship
        </button>
      </div>

      {/* LIST */}
      {internships.length === 0 ? (
        <div className="bg-white border rounded-xl p-12 text-center text-gray-500">
          No internships added yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {internships.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow border">

              <h3 className="text-xl font-semibold">{item.company}</h3>
              <p className="text-gray-600">{item.role}</p>

              <div className="text-sm text-gray-500 mt-2">
                {item.startDate} → {item.endDate}
              </div>

              <div className="mt-2 text-sm">
                Type: {item.type} | Stipend: {item.stipend}
              </div>

              {item.description && (
                <p className="mt-3 text-gray-600">{item.description}</p>
              )}

              {item.ppo && (
                <div className="mt-2 text-green-600 font-medium">
                  PPO/PPI Received
                </div>
              )}

              {/* FILE */}
              {item.file && (
                <div className="mt-3">
                  <a
                    href={URL.createObjectURL(item.file)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    View Uploaded File
                  </a>
                </div>
              )}

              {/* URL */}
              {item.url && (
                <div className="mt-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    Open File URL
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white w-[720px] rounded-2xl p-8 relative shadow-lg">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 text-gray-500"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Add Internship Details
            </h2>

            {error && (
              <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company Name *"
                  className="border p-2 rounded-lg"
                />

                <input
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Role *"
                  className="border p-2 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="border p-2 rounded-lg"
                />

                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="border p-2 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="border p-2 rounded-lg"
                >
                  <option value="">Internship Type *</option>
                  <option>Online</option>
                  <option>Offline</option>
                </select>

                <select
                  name="stipend"
                  value={formData.stipend}
                  onChange={handleChange}
                  className="border p-2 rounded-lg"
                >
                  <option value="">Stipend *</option>
                  <option>Paid</option>
                  <option>Unpaid</option>
                </select>
              </div>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border rounded-lg p-3 h-24"
              />

              {/* FILE */}
              <input
                type="file"
                name="file"
                accept="image/*,.pdf"
                onChange={handleChange}
                disabled={formData.url !== ""}
                className="border p-2 rounded-lg w-full"
              />

              {/* URL */}
              <input
                name="url"
                value={formData.url}
                onChange={handleChange}
                disabled={formData.file !== null}
                placeholder="Or Paste File URL"
                className="border p-2 rounded-lg w-full"
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="ppo"
                  checked={formData.ppo}
                  onChange={handleChange}
                />
                Received PPO/PPI
              </label>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-xl"
              >
                Submit
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
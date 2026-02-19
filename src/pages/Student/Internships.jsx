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
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "company" || name === "role") {
      if (!/^[A-Za-z\s]*$/.test(value)) return;
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

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
      setError("Please fill all required fields and select Internship Type & Stipend Type.");
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
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Internships</h1>
          <p className="text-gray-500">
            Manage your internship records and PPO details
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-black text-white px-5 py-2 rounded-xl"
        >
          Add Internship
        </button>
      </div>

      {internships.length === 0 ? (
        <div className="bg-white border rounded-xl p-12 text-center text-gray-500">
          No internships added yet. Click "Add Internship" to get started.
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
              {item.ppo && (
                <div className="mt-2 text-green-600 font-medium">
                  PPO/PPI Received
                </div>
              )}
              {item.description && (
                <p className="mt-3 text-gray-600">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-[700px] rounded-2xl p-6 relative">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500"
            >
              <X />
            </button>

            <h2 className="text-2xl font-semibold mb-2">
              Add Internship Details
            </h2>

            {error && (
              <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

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
                placeholder="Position/Role *"
                className="border p-2 rounded-lg"
              />

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

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              >
                <option value="">Select Internship Type *</option>
                <option>Online</option>
                <option>Offline</option>
              </select>

              <select
                name="stipend"
                value={formData.stipend}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              >
                <option value="">Select Stipend Type *</option>
                <option>Paid</option>
                <option>Unpaid</option>
              </select>

              <button className="col-span-2 bg-black text-white py-3 rounded-xl mt-4">
                Submit for Approval
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

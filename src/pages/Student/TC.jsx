import { useState, useEffect } from "react";

export default function TCApplication() {
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

  /* 🏫 Section Verification (Demo) */
  const verifyBySection = () => {
    setStatus("Verified by Section");
    localStorage.setItem("tcStatus", "Verified by Section");
  };

  /* 🎓 Final Approval (Admin Demo) */
  const approveApplication = () => {
    setStatus("Approved");
    localStorage.setItem("tcStatus", "Approved");
  };

  const rejectApplication = () => {
    setStatus("Rejected");
    localStorage.setItem("tcStatus", "Rejected");
  };

  const handleDownload = () => {
    window.print();
  };

  /* ========================= */
  /* 🎯 STATUS VIEW SECTION */
  /* ========================= */

  if (status !== "Not Applied") {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
        <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow space-y-6">

          <h1 className="text-2xl font-bold text-center">
            Transfer Certificate Application
          </h1>

          {/* Status Badge */}
          <div className="text-center">
            <span className={`px-4 py-2 rounded-full text-white text-sm
              ${status === "Pending Verification" && "bg-yellow-500"}
              ${status === "Verified by Section" && "bg-blue-600"}
              ${status === "Approved" && "bg-green-600"}
              ${status === "Rejected" && "bg-red-600"}
            `}>
              {status}
            </span>
          </div>

          {/* Application Details */}
          <div className="border rounded-xl p-6 space-y-3">
            <p><strong>Name:</strong> {form.fullName}</p>
            <p><strong>Enrollment:</strong> {form.enrollment}</p>
            <p><strong>Course:</strong> {form.course}</p>
            <p><strong>Passing Year:</strong> {form.year}</p>
            <p><strong>Reason:</strong> {form.reason}</p>
          </div>

          {/* Action Buttons (Demo Role Simulation) */}
          <div className="flex flex-wrap gap-4 justify-center print:hidden">

            {status === "Pending Verification" && (
              <button
                onClick={verifyBySection}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Verify by Section (Demo)
              </button>
            )}

            {status === "Verified by Section" && (
              <>
                <button
                  onClick={approveApplication}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Approve (Admin Demo)
                </button>

                <button
                  onClick={rejectApplication}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Reject
                </button>
              </>
            )}

            {status === "Approved" && (
              <button
                onClick={handleDownload}
                className="bg-black text-white px-5 py-2 rounded-lg"
              >
                Download TC
              </button>
            )}
          </div>

        </div>
      </div>
    );
  }

  /* ========================= */
  /* 📝 APPLY FORM */
  /* ========================= */

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow space-y-8"
      >
        <h1 className="text-3xl font-bold text-center">
          Apply for Transfer Certificate (TC)
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <Input label="Full Name" name="fullName" onChange={handleChange} />
          <Input label="Enrollment Number" name="enrollment" onChange={handleChange} />
          <Input label="Course / Branch" name="course" onChange={handleChange} />
          <Input label="Passing Year" name="year" onChange={handleChange} />
        </div>

        <div>
          <label className="block text-sm mb-1">Reason for TC</label>
          <textarea
            name="reason"
            required
            onChange={handleChange}
            rows="4"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg hover:bg-blue-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

/* Reusable Input */
function Input({ label, name, onChange }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        type="text"
        name={name}
        required
        onChange={onChange}
        className="w-full border p-2 rounded-lg"
      />
    </div>
  );
}
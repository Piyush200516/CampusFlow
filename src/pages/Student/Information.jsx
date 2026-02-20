import { useState, useEffect } from "react";

export default function CampusApplicationForm() {
  const [form, setForm] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // ✅ Load Data from LocalStorage on Page Load
  useEffect(() => {
    const savedForm = localStorage.getItem("cafData");
    const savedStatus = localStorage.getItem("cafSubmitted");

    if (savedForm) {
      setForm(JSON.parse(savedForm));
    }

    if (savedStatus === "true") {
      setSubmitted(true);
    }
  }, []);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    const updatedValue =
      type === "checkbox"
        ? checked
        : type === "file"
        ? URL.createObjectURL(files[0])
        : value;

    const updatedForm = {
      ...form,
      [name]: updatedValue,
    };

    setForm(updatedForm);
    localStorage.setItem("cafData", JSON.stringify(updatedForm));
  };

  // ✅ Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("cafSubmitted", "true");
    setSubmitted(true);
  };

  // ✅ After Submit Show Preview
  if (submitted) {
    return (
      <ApplicationPreview
        form={form}
        onEdit={() => {
          setSubmitted(false);
          localStorage.setItem("cafSubmitted", "false");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl bg-white p-8 rounded-2xl shadow space-y-10"
      >
        <h1 className="text-3xl font-bold text-center">
          Student Information Application Form (SIAF)
        </h1>

        <SectionTitle title="Personal Details" />
        <Grid3>
          <Input label="Full Name" name="fullName" onChange={handleChange} />
          <Input label="Mobile" name="mobile" onChange={handleChange} />
          <Input label="Email" name="email" onChange={handleChange} />
          <Input label="Date of Birth" type="date" name="dob" onChange={handleChange} />
          <Input label="Passport Photo" type="file" name="photo" onChange={handleChange} />
        </Grid3>

        <SectionTitle title="Academic Record" />
        <Grid3>
          <Input label="10th Board" name="board10" onChange={handleChange} />
          <Input label="10th Percentage" name="percent10" onChange={handleChange} />
          <Input label="Current CGPA" name="cgpa" onChange={handleChange} />
        </Grid3>

        <SectionTitle title="Professional Profile" />
        <Grid3>
          <Input label="Primary Domain" name="primaryDomain" onChange={handleChange} />
          <Input label="Skills" name="skills" onChange={handleChange} />
        </Grid3>

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

/* ================= PREVIEW PAGE ================= */

function ApplicationPreview({ form, onEdit }) {

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center print:bg-white">
      <div className="w-full max-w-5xl bg-white p-8 rounded-2xl shadow space-y-8 print:shadow-none">

        <div className="flex justify-between items-center print:hidden">
          <h1 className="text-2xl font-bold">
            Student Information Application Form (SIAF)
          </h1>

          <div className="space-x-3">
            <button
              onClick={handlePrint}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Print
            </button>

            <button
              onClick={onEdit}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Edit
            </button>
          </div>
        </div>

        <SectionPreview title="Personal Details">
          <Preview label="Full Name" value={form.fullName} />
          <Preview label="Mobile" value={form.mobile} />
          <Preview label="Email" value={form.email} />
          <Preview label="DOB" value={form.dob} />

          {form.photo && (
            <div className="md:col-span-2">
              <img
                src={form.photo}
                alt="Passport"
                className="w-32 h-32 rounded border"
              />
            </div>
          )}
        </SectionPreview>

        <SectionPreview title="Academic Record">
          <Preview label="10th Board" value={form.board10} />
          <Preview label="10th %" value={form.percent10} />
          <Preview label="CGPA" value={form.cgpa} />
        </SectionPreview>

        <SectionPreview title="Professional Profile">
          <Preview label="Primary Domain" value={form.primaryDomain} />
          <Preview label="Skills" value={form.skills} />
        </SectionPreview>

      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function SectionTitle({ title }) {
  return (
    <h2 className="text-xl font-semibold border-b pb-2">{title}</h2>
  );
}

function Grid3({ children }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">{children}</div>
  );
}

function Input({ label, name, type = "text", onChange }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        required
        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

function SectionPreview({ title, children }) {
  return (
    <div className="border rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold border-b pb-2">{title}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

function Preview({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-medium">{value || "-"}</p>
    </div>
  );
}
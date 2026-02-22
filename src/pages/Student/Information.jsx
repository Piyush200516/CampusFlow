import { useState } from "react";

export default function CombinedStudentForm() {

  const [skills, setSkills] = useState([]);

  const toggleSkill = (skill) => {
    if (skills.includes(skill))
      setSkills(skills.filter(s => s !== skill));
    else
      setSkills([...skills, skill]);
  };

  const skillList = [
    "HTML","CSS","JavaScript","React","Node.js","Python","Java","SQL"
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <h1 className="text-3xl font-bold text-center mb-6">
        Student Information Form
      </h1>

      <div className="max-w-7xl mx-auto space-y-6">

        {/* ================= PROFILE INFO ================= */}
        <div className="card">
          <h2 className="title">Student Profile Information</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input className="input" placeholder="Full Name"/>
            <input className="input" placeholder="College Email"/>
            <input className="input" placeholder="RGPV Enrollment"/>
            <input className="input" placeholder="Institute Enrollment"/>
            <input className="input" placeholder="Course"/>
            <input className="input" placeholder="Branch"/>
            <input className="input" placeholder="Batch Year"/>
            <input className="input" placeholder="Section"/>
          </div>
        </div>


        {/* ================= MAIN GRID ================= */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* LEFT */}
          <div className="space-y-6">

            {/* PERSONAL */}
            <div className="card">
              <h2 className="title">Personal Details</h2>

              <div className="flex gap-4">
                <div className="border-2 border-dashed rounded-lg w-32 h-32 flex items-center justify-center text-sm">
                  Upload Photo
                </div>

                <div className="grid grid-cols-2 gap-3 flex-1">
                  <input className="input" placeholder="Full Name"/>
                  <input className="input" placeholder="Email"/>
                  <input className="input" placeholder="Mobile"/>
                  <input className="input" placeholder="WhatsApp"/>

                  <select className="input">
                    <option>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>

                  <input type="date" className="input"/>
                  <input className="input" placeholder="Category"/>
                </div>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="card">
              <h2 className="title">Address Details</h2>

              <textarea className="input" placeholder="Address"/>
              <div className="grid grid-cols-3 gap-3 mt-3">
                <input className="input" placeholder="City"/>
                <input className="input" placeholder="State"/>
                <input className="input" placeholder="Pincode"/>
              </div>
            </div>

            {/* PROJECT */}
            <div className="card">
              <h2 className="title">Projects & Experience</h2>
              <input className="input mb-3" placeholder="Project Links"/>
              <textarea className="input" placeholder="Description"/>
            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* ACADEMIC */}
            <div className="card">
              <h2 className="title">Academic Details</h2>

              <div className="grid grid-cols-3 gap-3">
                <input className="input" placeholder="Board"/>
                <input className="input" placeholder="Year"/>
                <input className="input" placeholder="% / CGPA"/>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-3">
                <input className="input" placeholder="Course"/>
                <input className="input" placeholder="Branch"/>
                <input className="input" placeholder="College"/>
                <input className="input" placeholder="Passing Year"/>
                <input className="input" placeholder="CGPA"/>
              </div>
            </div>

            {/* CAREER */}
            <div className="card">
              <h2 className="title">Career Preferences</h2>

              <input className="input mb-3" placeholder="Career Preference"/>
              <input className="input mb-4" placeholder="Primary Domain"/>

              <div className="flex flex-wrap gap-2">
                {skillList.map(skill => (
                  <button
                    type="button"
                    key={skill}
                    onClick={()=>toggleSkill(skill)}
                    className={`skill ${
                      skills.includes(skill)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* RESUME */}
            <div className="card">
              <h2 className="title">Resume Upload</h2>
              <input type="file" className="input"/>
            </div>

            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">
              Submit Form
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
//9️⃣ 🧑‍🏫 Faculty Contact Directory
//HOD, Subject teachers, CDC staff, Student section contacts 
import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaUserTie,
  FaChalkboardTeacher,
  FaUsers,
} from "react-icons/fa";

const ContactCard = ({ name, role, email, phone, image }) => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-5 flex items-center gap-5 hover:shadow-xl transition-all duration-300 border border-gray-100">
      
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-xl object-cover shadow-md"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500 mb-3">{role}</p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 truncate">
            {email}
          </span>

          <div className="flex gap-3">
            {/* Direct Call */}
            <a
              href={`tel:${phone}`}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg shadow-md"
            >
              <FaPhoneAlt size={14} />
            </a>

            {/* Direct Mail */}
            <a
              href={`mailto:${email}`}
              className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg shadow-md"
            >
              <FaEnvelope size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, icon, children }) => {
  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 rounded-3xl shadow-inner mb-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-600 text-white p-3 rounded-xl shadow-md">
          {icon}
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          {title}
        </h2>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        {children}
      </div>
    </div>
  );
};

const Administrative_Features = () => {
  return (
    <div className="min-h-screen bg-gray-200 p-10">
      
      {/* Page Title */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-800">
          Faculty Contact Directory
        </h1>
        <p className="text-gray-500 mt-2">
          Administrative Contacts & Academic Staff Information
        </p>
      </div>

      {/* HOD */}
      <Section
        title="Heads of Departments (HOD)"
        icon={<FaUserTie size={20} />}
      >
        <ContactCard
          name="Dr. Suresh Sharma"
          role="Computer Science HOD"
          email="suresh.sharma@college.edu"
          phone="9876543210"
          image="https://randomuser.me/api/portraits/men/32.jpg"
        />
        <ContactCard
          name="Dr. Anjali Verma"
          role="Electrical Engineering HOD"
          email="anjali.verma@college.edu"
          phone="9876543211"
          image="https://randomuser.me/api/portraits/women/44.jpg"
        />
        <ContactCard
          name="Dr. Rajesh Gupta"
          role="Mechanical Engineering HOD"
          email="rajesh.gupta@college.edu"
          phone="9876543212"
          image="https://randomuser.me/api/portraits/men/65.jpg"
        />
      </Section>

      {/* Subject Teachers */}
      <Section
        title="Subject Teachers"
        icon={<FaChalkboardTeacher size={20} />}
      >
        <ContactCard
          name="Prof. Neha Singh"
          role="Mathematics"
          email="neha.singh@college.edu"
          phone="9876543213"
          image="https://randomuser.me/api/portraits/women/68.jpg"
        />
        <ContactCard
          name="Prof. Amit Kumar"
          role="Physics"
          email="amit.kumar@college.edu"
          phone="9876543214"
          image="https://randomuser.me/api/portraits/men/52.jpg"
        />
        <ContactCard
          name="Prof. Priya Jha"
          role="Chemistry"
          email="priya.jha@college.edu"
          phone="9876543215"
          image="https://randomuser.me/api/portraits/women/33.jpg"
        />
      </Section>

      {/* Bottom Sections */}
      <div className="grid lg:grid-cols-2 gap-10">
        <Section title="CDC Staff" icon={<FaUsers size={20} />}>
          <ContactCard
            name="Mr. Rakesh Joshi"
            role="Placement Officer"
            email="rakesh.joshi@college.edu"
            phone="9876543216"
            image="https://randomuser.me/api/portraits/men/75.jpg"
          />
          <ContactCard
            name="Mrs. Sunita Deshmukh"
            role="Career Counselor"
            email="sunita.deshmukh@college.edu"
            phone="9876543217"
            image="https://randomuser.me/api/portraits/women/21.jpg"
          />
        </Section>

        <Section
          title="Student Section Contacts"
          icon={<FaUsers size={20} />}
        >
          <ContactCard
            name="Mr. Anil Kumar"
            role="Registrar"
            email="anil.kumar@college.edu"
            phone="9876543218"
            image="https://randomuser.me/api/portraits/men/40.jpg"
          />
          <ContactCard
            name="Ms. Sonia Mehta"
            role="Assistant Registrar"
            email="sonia.mehta@college.edu"
            phone="9876543219"
            image="https://randomuser.me/api/portraits/women/50.jpg"
          />
        </Section>
      </div>
    </div>
  );
};

export default Administrative_Features;
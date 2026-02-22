import { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaUserTie,
  FaChalkboardTeacher,
  FaUsers,
  FaSearch,
} from "react-icons/fa";
import { Search } from "lucide-react";

const ContactCard = ({ name, role, email, phone, image }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-sm text-gray-600 truncate flex-1 mr-2">
          {email}
        </span>

        <div className="flex gap-2">
          <a
            href={`tel:${phone}`}
            className="bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-600 p-2 rounded-lg transition-colors"
            title="Call"
          >
            <FaPhoneAlt size={14} />
          </a>
          <a
            href={`mailto:${email}`}
            className="bg-gray-100 hover:bg-orange-500 hover:text-white text-gray-600 p-2 rounded-lg transition-colors"
            title="Email"
          >
            <FaEnvelope size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label, count }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        active
          ? "bg-blue-600 text-white shadow-sm"
          : "bg-white text-gray-600 hover:bg-gray-100 border"
      }`}
    >
      {icon}
      <span>{label}</span>
      <span
        className={`text-xs px-2 py-0.5 rounded-full ${
          active ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
        }`}
      >
        {count}
      </span>
    </button>
  );
};

const Administrative_Features = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const contacts = {
    hod: [
      {
        name: "Dr. Suresh Sharma",
        role: "Computer Science HOD",
        email: "suresh.sharma@college.edu",
        phone: "9876543210",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        name: "Dr. Anjali Verma",
        role: "Electrical Engineering HOD",
        email: "anjali.verma@college.edu",
        phone: "9876543211",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        name: "Dr. Rajesh Gupta",
        role: "Mechanical Engineering HOD",
        email: "rajesh.gupta@college.edu",
        phone: "9876543212",
        image: "https://randomuser.me/api/portraits/men/65.jpg",
      },
    ],
    teachers: [
      {
        name: "Prof. Neha Singh",
        role: "Mathematics",
        email: "neha.singh@college.edu",
        phone: "9876543213",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      {
        name: "Prof. Amit Kumar",
        role: "Physics",
        email: "amit.kumar@college.edu",
        phone: "9876543214",
        image: "https://randomuser.me/api/portraits/men/52.jpg",
      },
      {
        name: "Prof. Priya Jha",
        role: "Chemistry",
        email: "priya.jha@college.edu",
        phone: "9876543215",
        image: "https://randomuser.me/api/portraits/women/33.jpg",
      },
    ],
    cdc: [
      {
        name: "Mr. Rakesh Joshi",
        role: "Placement Officer",
        email: "rakesh.joshi@college.edu",
        phone: "9876543216",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      {
        name: "Mrs. Sunita Deshmukh",
        role: "Career Counselor",
        email: "sunita.deshmukh@college.edu",
        phone: "9876543217",
        image: "https://randomuser.me/api/portraits/women/21.jpg",
      },
    ],
    studentSection: [
      {
        name: "Mr. Anil Kumar",
        role: "Registrar",
        email: "anil.kumar@college.edu",
        phone: "9876543218",
        image: "https://randomuser.me/api/portraits/men/40.jpg",
      },
      {
        name: "Ms. Sonia Mehta",
        role: "Assistant Registrar",
        email: "sonia.mehta@college.edu",
        phone: "9876543219",
        image: "https://randomuser.me/api/portraits/women/50.jpg",
      },
    ],
  };

  const getFilteredContacts = () => {
    let allContacts = [];
    
    if (activeTab === "all") {
      allContacts = [
        ...contacts.hod,
        ...contacts.teachers,
        ...contacts.cdc,
        ...contacts.studentSection,
      ];
    } else if (activeTab === "hod") {
      allContacts = contacts.hod;
    } else if (activeTab === "teachers") {
      allContacts = contacts.teachers;
    } else if (activeTab === "cdc") {
      allContacts = contacts.cdc;
    } else if (activeTab === "studentSection") {
      allContacts = contacts.studentSection;
    }

    if (searchQuery) {
      allContacts = allContacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return allContacts;
  };

  const totalContacts =
    contacts.hod.length +
    contacts.teachers.length +
    contacts.cdc.length +
    contacts.studentSection.length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Faculty Contact Directory
        </h1>
        <p className="text-gray-500 mt-1">
          Administrative Contacts & Academic Staff Information
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FaUserTie className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">HODs</p>
              <p className="text-xl font-semibold">{contacts.hod.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <FaChalkboardTeacher className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Teachers</p>
              <p className="text-xl font-semibold">{contacts.teachers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <FaUsers className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">CDC Staff</p>
              <p className="text-xl font-semibold">{contacts.cdc.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <FaUsers className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Student Section</p>
              <p className="text-xl font-semibold">{contacts.studentSection.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            <TabButton
              active={activeTab === "all"}
              onClick={() => setActiveTab("all")}
              icon={<FaUsers size={14} />}
              label="All"
              count={totalContacts}
            />
            <TabButton
              active={activeTab === "hod"}
              onClick={() => setActiveTab("hod")}
              icon={<FaUserTie size={14} />}
              label="HOD"
              count={contacts.hod.length}
            />
            <TabButton
              active={activeTab === "teachers"}
              onClick={() => setActiveTab("teachers")}
              icon={<FaChalkboardTeacher size={14} />}
              label="Teachers"
              count={contacts.teachers.length}
            />
            <TabButton
              active={activeTab === "cdc"}
              onClick={() => setActiveTab("cdc")}
              icon={<FaUsers size={14} />}
              label="CDC"
              count={contacts.cdc.length}
            />
            <TabButton
              active={activeTab === "studentSection"}
              onClick={() => setActiveTab("studentSection")}
              icon={<FaUsers size={14} />}
              label="Student Section"
              count={contacts.studentSection.length}
            />
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getFilteredContacts().map((contact, index) => (
          <ContactCard key={index} {...contact} />
        ))}
      </div>

      {/* Empty State */}
      {getFilteredContacts().length === 0 && (
        <div className="text-center py-12">
          <FaSearch className="mx-auto text-gray-300 mb-3" size={40} />
          <p className="text-gray-500">No contacts found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Administrative_Features;

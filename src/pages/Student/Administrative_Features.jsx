import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaUserTie, FaChalkboardTeacher, FaUsers, FaSearch } from "react-icons/fa";
import { Search, Phone, Mail, User, GraduationCap, Briefcase, Building2, Users } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

const ContactCard = ({ name, role, email, phone, image }) => {
  const { isDarkMode } = useDarkMode();
  
  return (
    <div className={`p-5 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] ${
      isDarkMode ? "bg-gray-800 border border-gray-700 hover:border-gray-600" : "bg-white border border-gray-100 hover:border-gray-200"
    }`}>
      <div className="flex items-center gap-4 mb-4">
        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-xl object-cover border-2 border-gray-200"
        />
        <div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{name}</h3>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{role}</p>
        </div>
      </div>

      <div className={`pt-3 border-t ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
        <span className={`text-sm truncate flex-1 mr-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          {email}
        </span>

        <div className="flex gap-2 mt-3">
          <a
            href={`tel:${phone}`}
            className={`p-2 rounded-xl transition-colors ${
              isDarkMode 
                ? "bg-gray-700 hover:bg-blue-600 text-blue-400 hover:text-white" 
                : "bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white"
            }`}
            title="Call"
          >
            <FaPhoneAlt size={14} />
          </a>
          <a
            href={`mailto:${email}`}
            className={`p-2 rounded-xl transition-colors ${
              isDarkMode 
                ? "bg-gray-700 hover:bg-orange-500 text-orange-400 hover:text-white" 
                : "bg-gray-100 hover:bg-orange-500 text-gray-600 hover:text-white"
            }`}
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
  const { isDarkMode } = useDarkMode();
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
          : isDarkMode
            ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
            : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
      }`}
    >
      {icon}
      <span>{label}</span>
      <span className={`text-xs px-2 py-0.5 rounded-full ${
        active ? "bg-white/20 text-white" : isDarkMode ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-600"
      }`}>
        {count}
      </span>
    </button>
  );
};

const Administrative_Features = () => {
  const { isDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const contacts = {
    hod: [
      { name: "Dr. Suresh Sharma", role: "Computer Science HOD", email: "suresh.sharma@college.edu", phone: "9876543210", image: "https://randomuser.me/api/portraits/men/32.jpg" },
      { name: "Dr. Anjali Verma", role: "Electrical Engineering HOD", email: "anjali.verma@college.edu", phone: "9876543211", image: "https://randomuser.me/api/portraits/women/44.jpg" },
      { name: "Dr. Rajesh Gupta", role: "Mechanical Engineering HOD", email: "rajesh.gupta@college.edu", phone: "9876543212", image: "https://randomuser.me/api/portraits/men/65.jpg" },
    ],
    teachers: [
      { name: "Prof. Neha Singh", role: "Mathematics", email: "neha.singh@college.edu", phone: "9876543213", image: "https://randomuser.me/api/portraits/women/68.jpg" },
      { name: "Prof. Amit Kumar", role: "Physics", email: "amit.kumar@college.edu", phone: "9876543214", image: "https://randomuser.me/api/portraits/men/52.jpg" },
      { name: "Prof. Priya Jha", role: "Chemistry", email: "priya.jha@college.edu", phone: "9876543215", image: "https://randomuser.me/api/portraits/women/33.jpg" },
    ],
    cdc: [
      { name: "Mr. Rakesh Joshi", role: "Placement Officer", email: "rakesh.joshi@college.edu", phone: "9876543216", image: "https://randomuser.me/api/portraits/men/75.jpg" },
      { name: "Mrs. Sunita Deshmukh", role: "Career Counselor", email: "sunita.deshmukh@college.edu", phone: "9876543217", image: "https://randomuser.me/api/portraits/women/21.jpg" },
    ],
    studentSection: [
      { name: "Mr. Anil Kumar", role: "Registrar", email: "anil.kumar@college.edu", phone: "9876543218", image: "https://randomuser.me/api/portraits/men/40.jpg" },
      { name: "Ms. Sonia Mehta", role: "Assistant Registrar", email: "sonia.mehta@college.edu", phone: "9876543219", image: "https://randomuser.me/api/portraits/women/50.jpg" },
    ],
  };

  const getFilteredContacts = () => {
    let allContacts = [];
    if (activeTab === "all") allContacts = [...contacts.hod, ...contacts.teachers, ...contacts.cdc, ...contacts.studentSection];
    else if (activeTab === "hod") allContacts = contacts.hod;
    else if (activeTab === "teachers") allContacts = contacts.teachers;
    else if (activeTab === "cdc") allContacts = contacts.cdc;
    else if (activeTab === "studentSection") allContacts = contacts.studentSection;

    if (searchQuery) {
      allContacts = allContacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return allContacts;
  };

  const totalContacts = contacts.hod.length + contacts.teachers.length + contacts.cdc.length + contacts.studentSection.length;

  const stats = [
    { label: "HODs", count: contacts.hod.length, icon: <FaUserTie size={18} />, color: "blue" },
    { label: "Teachers", count: contacts.teachers.length, icon: <FaChalkboardTeacher size={18} />, color: "green" },
    { label: "CDC Staff", count: contacts.cdc.length, icon: <FaUsers size={18} />, color: "purple" },
    { label: "Student Section", count: contacts.studentSection.length, icon: <FaUsers size={18} />, color: "orange" },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: { bg: "bg-blue-100", text: "text-blue-600", darkBg: "bg-blue-900/30", darkText: "text-blue-400" },
      green: { bg: "bg-green-100", text: "text-green-600", darkBg: "bg-green-900/30", darkText: "text-green-400" },
      purple: { bg: "bg-purple-100", text: "text-purple-600", darkBg: "bg-purple-900/30", darkText: "text-purple-400" },
      orange: { bg: "bg-orange-100", text: "text-orange-600", darkBg: "bg-orange-900/30", darkText: "text-orange-400" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className={`p-4 md:p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Faculty Contact Directory
        </h1>
        <p className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Administrative Contacts & Academic Staff Information
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => {
          const colors = getColorClasses(stat.color);
          return (
            <div key={i} className={`p-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${isDarkMode ? colors.darkBg : colors.bg}`}>
                  <div className={isDarkMode ? colors.darkText : colors.text}>
                    {stat.icon}
                  </div>
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{stat.label}</p>
                  <p className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{stat.count}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filter Bar */}
      <div className={`p-4 rounded-xl shadow-lg mb-6 ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <TabButton active={activeTab === "all"} onClick={() => setActiveTab("all")} icon={<Users size={14} />} label="All" count={totalContacts} />
            <TabButton active={activeTab === "hod"} onClick={() => setActiveTab("hod")} icon={<FaUserTie size={14} />} label="HOD" count={contacts.hod.length} />
            <TabButton active={activeTab === "teachers"} onClick={() => setActiveTab("teachers")} icon={<FaChalkboardTeacher size={14} />} label="Teachers" count={contacts.teachers.length} />
            <TabButton active={activeTab === "cdc"} onClick={() => setActiveTab("cdc")} icon={<Users size={14} />} label="CDC" count={contacts.cdc.length} />
            <TabButton active={activeTab === "studentSection"} onClick={() => setActiveTab("studentSection")} icon={<Users size={14} />} label="Student Section" count={contacts.studentSection.length} />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 pr-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64 transition-all ${
                isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-gray-50 border-gray-200 text-gray-800"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {getFilteredContacts().map((contact, index) => (
          <ContactCard key={index} {...contact} />
        ))}
      </div>

      {/* Empty State */}
      {getFilteredContacts().length === 0 && (
        <div className={`text-center py-12 rounded-2xl ${
          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
        }`}>
          <Search className={`mx-auto mb-3 ${isDarkMode ? "text-gray-600" : "text-gray-300"}`} size={40} />
          <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>No contacts found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Administrative_Features;


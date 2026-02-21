import {
  Phone,
  Mail,
  User,
  BookOpen,
  Users,
  Info,
  Building2,
  GraduationCap
} from "lucide-react";

const ContactCard = ({ name, role, email, phone, image }) => {
  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition flex items-center gap-4">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-lg object-cover"
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">{role}</p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 truncate">
            {email}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => window.open(`tel:${phone}`, '_self')}
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 p-2 rounded-lg transition cursor-pointer"
              title="Call"
            >
              <Phone size={14} />
            </button>

            <button
              onClick={() => window.open(`mailto:${email}`, '_blank')}
              className="bg-orange-50 hover:bg-orange-100 text-orange-600 p-2 rounded-lg transition cursor-pointer"
              title="Email"
            >
              <Mail size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, icon, children }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-blue-600 text-white p-2 rounded-lg">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          {title}
        </h2>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
};

const Administrative_Features = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Faculty Contact Directory</h1>
        <p className="text-gray-500 mt-1">
          Administrative Contacts & Academic Staff Information
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-600 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
        <div>
          <p className="text-gray-700 text-sm">
            Click the phone or email icons to directly call or email the respective faculty/staff members.
          </p>
        </div>
      </div>

      {/* HOD */}
      <Section
        title="Heads of Departments (HOD)"
        icon={<User size={18} />}
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
        icon={<BookOpen size={18} />}
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
      <div className="grid lg:grid-cols-2 gap-6">
        <Section title="CDC Staff" icon={<Building2 size={18} />}>
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
          icon={<GraduationCap size={18} />}
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

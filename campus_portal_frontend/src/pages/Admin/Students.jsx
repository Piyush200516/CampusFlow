import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, UserPlus, Download } from 'lucide-react';
import { useDarkMode } from '../../context/DarkModeContext';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Badge from '../../components/Badge';
import { TableSkeleton } from '../../components/Skeleton';

const mockStudents = [
  { id: 1, name: 'Rahul Sharma', rollNo: 'AITR040613', department: 'Computer Science', email: 'rahul@aitr.ac.in', status: 'active', phone: '+91 98765 43210' },
  { id: 2, name: 'Priya Singh', rollNo: 'AITR240614', department: 'Electronics', email: 'priya@aitr.ac.in', status: 'active', phone: '+91 87654 32109' },
  { id: 3, name: 'Anjali Verma', rollNo: 'AITR350715', department: 'Mechanical', email: 'anjali@aitr.ac.in', status: 'inactive', phone: '+91 76543 21098' },
  { id: 4, name: 'Amit Kumar', rollNo: 'AITR460825', department: 'Civil', email: 'amit@aitr.ac.in', status: 'active', phone: '+91 65432 10987' },
  { id: 5, name: 'Sneha Patel', rollNo: 'AITR570936', department: 'Computer Science', email: 'sneha@aitr.ac.in', status: 'active', phone: '+91 54321 09876' },
];

export default function Students() {
  const { isDarkMode } = useDarkMode();
  const [students, setStudents] = useState(mockStudents);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [formData, setFormData] = useState({ name: '', rollNo: '', department: '', email: '', phone: '' });

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!filterDept || student.department === filterDept)
  );

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Roll No', accessor: 'rollNo' },
    { header: 'Department', accessor: 'department' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (status) => <Badge variant={status} />
    },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
  ];

  const departments = [...new Set(mockStudents.map(s => s.department))];

  const handleAddStudent = () => {
    const newStudent = { 
      ...formData, 
      id: students.length + 1,
      status: 'active'
    };
    setStudents([newStudent, ...students]);
    setShowAddModal(false);
    setFormData({ name: '', rollNo: '', department: '', email: '', phone: '' });
  };

  setTimeout(() => setLoading(false), 1000);

  return (
    <div className={`space-y-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Students Management
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">View, filter, and manage student records</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2">
            <Download size={20} />
            Export CSV
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
          >
            <UserPlus size={20} />
            Add Student
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              placeholder="Search students by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl backdrop-blur focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
            />
          </div>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          >
            <option value="">All Departments</option>
            {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
          </select>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Showing {filteredStudents.length} of {students.length} students
        </p>
      </motion.div>

      {/* Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2 }}
      >
        {loading ? (
          <TableSkeleton />
        ) : (
          <Table
            columns={columns}
            data={filteredStudents}
            loading={loading}
            onRowClick={(row) => console.log('Edit student:', row)}
          />
        )}
      </motion.div>

      {/* Add Student Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Student">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter student name"
              required
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Roll Number</label>
              <input
                type="text"
                value={formData.rollNo}
                onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., AITR123456"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Department</option>
                {departments.map(dept => <option key={dept}>{dept}</option>)}
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur focus:ring-2 focus:ring-blue-500"
                placeholder="student@aitr.ac.in"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur focus:ring-2 focus:ring-blue-500"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleAddStudent}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Add Student
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              className="flex-1 bg-gray-200/60 dark:bg-gray-700/60 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-2xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


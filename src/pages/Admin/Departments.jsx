import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, User, Building2, Download } from 'lucide-react';
import { useDarkMode } from '../../context/DarkModeContext';
import Modal from '../../components/Modal';
import Badge from '../../components/Badge';
import { CardSkeleton } from '../../components/Skeleton';

const mockDepts = [
  { id: 1, name: 'Computer Science', students: 450, hod: 'Dr. Rajesh Kumar', status: 'active' },
  { id: 2, name: 'Electronics & Comm', students: 320, hod: 'Prof. Anjali Sharma', status: 'active' },
  { id: 3, name: 'Mechanical Engineering', students: 280, hod: 'Dr. Vikram Singh', status: 'active' },
  { id: 4, name: 'Civil Engineering', students: 250, hod: 'Prof. Meera Patel', status: 'inactive' },
  { id: 5, name: 'Electrical Engineering', students: 300, hod: 'Dr. Amit Verma', status: 'active' },
];

export default function Departments() {
  const { isDarkMode } = useDarkMode();
  const [departments, setDepartments] = useState(mockDepts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', hod: '', status: 'active' });

  const handleAddDept = () => {
    const newDept = { 
      ...formData, 
      id: departments.length + 1,
      students: 0
    };
    setDepartments([newDept, ...departments]);
    setShowAddModal(false);
    setFormData({ name: '', hod: '', status: 'active' });
  };

  return (
    <div className={`space-y-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Departments
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">Manage department information and student allocation</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2">
            <Download size={20} />
            Export List
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            Add Department
          </button>
        </div>
      </motion.div>

      {/* Departments Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
      >
        {departments.map((dept, index) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className={`
              group relative overflow-hidden rounded-3xl p-8 bg-white/70 dark:bg-gray-800/70
              backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50
              shadow-2xl hover:shadow-3xl hover:border-blue-300/50 transition-all duration-500
              h-64 flex flex-col justify-between cursor-pointer
              ${dept.status === 'active' ? 'hover:shadow-blue-500/20 ring-2 ring-blue-500/20' : 'grayscale opacity-75'}
            `}
            onClick={() => console.log('View dept:', dept)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg ring-2 ring-white/30 -m-4 group-hover:scale-110 transition-transform duration-300">
                <Building2 size={28} className="text-white drop-shadow-lg" />
              </div>
              <Badge variant={dept.status} size="lg" />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3">
              <h3 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 transition-all">
                {dept.name}
              </h3>
              <div className="flex items-center gap-2 text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-1">
                <Users size={32} />
                {dept.students.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Students</p>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200/30 dark:border-gray-700/30">
              <div className="flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">HOD</p>
                <p className="font-semibold text-gray-900 dark:text-white truncate">{dept.hod}</p>
              </div>
              <div className="p-3 bg-gray-100/50 dark:bg-gray-700/50 rounded-2xl group-hover:bg-blue-100/50 dark:group-hover:bg-blue-900/20 transition-colors">
                <User size={20} className="text-gray-600 dark:text-gray-400" />
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
          </motion.div>
        ))}
      </motion.div>

      {/* Add Department Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Department">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Department Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-4 border border-gray-200/50 dark:border-gray-600 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-inner focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-lg font-medium"
              placeholder="e.g., Artificial Intelligence"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Head of Department</label>
            <input
              type="text"
              value={formData.hod}
              onChange={(e) => setFormData({ ...formData, hod: e.target.value })}
              className="w-full px-5 py-4 border border-gray-200/50 dark:border-gray-600 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-inner focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all text-lg font-medium"
              placeholder="e.g., Dr. Jane Smith"
            />
          </div>
          <div className="flex gap-4 pt-2">
            <button
              onClick={handleAddDept}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 px-8 rounded-3xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-lg"
            >
              Create Department
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              className="flex-1 bg-gray-200/70 dark:bg-gray-700/70 text-gray-800 dark:text-gray-200 py-4 px-8 rounded-3xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all text-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


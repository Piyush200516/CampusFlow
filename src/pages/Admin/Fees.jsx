import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Search, Filter, CreditCard, Download, Receipt } from 'lucide-react';
import { useDarkMode } from '../../context/DarkModeContext';
import Table from '../../components/Table';
import Badge from '../../components/Badge';
import { TableSkeleton } from '../../components/Skeleton';

const mockFees = [
  { id: 1, student: 'Rahul Sharma (AITR040613)', amount: '₹12,000', status: 'paid', date: '2024-04-10', method: 'UPI' },
  { id: 2, student: 'Priya Singh (AITR240614)', amount: '₹10,000', status: 'pending', date: '-', method: '-' },
  { id: 3, student: 'Anjali Verma (AITR350715)', amount: '₹15,000', status: 'paid', date: '2024-04-15', method: 'Card' },
  { id: 4, student: 'Amit Kumar (AITR460825)', amount: '₹8,000', status: 'partial', date: '2024-04-20', method: 'Cash' },
  { id: 5, student: 'Sneha Patel (AITR570936)', amount: '₹18,000', status: 'paid', date: '2024-04-22', method: 'Bank Transfer' },
  { id: 6, student: 'Rohit Gupta (AITR680747)', amount: '₹11,000', status: 'pending', date: '-', method: '-' },
];

export default function Fees() {
  const { isDarkMode } = useDarkMode();
  const [fees, setFees] = useState(mockFees);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFees = fees.filter(fee => 
    fee.student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: 'Student', accessor: 'student' },
    { header: 'Amount', accessor: 'amount', render: (amount) => <span className="font-bold text-lg">{amount}</span> },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (status) => <Badge variant={status === 'paid' ? 'paid' : status === 'partial' ? 'pending' : 'unpaid'} size="lg" />
    },
    { header: 'Payment Date', accessor: 'date' },
    { header: 'Method', accessor: 'method' },
    {
      header: 'Actions',
      accessor: 'id',
      render: (id) => (
        <div className="flex gap-2">
          <button className="p-2 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 rounded-xl transition-all">
            <CreditCard size={18} />
          </button>
          <button className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-xl transition-all">
            <Receipt size={18} />
          </button>
        </div>
      )
    },
  ];

  setTimeout(() => setLoading(false), 1200);

  return (
    <div className={`space-y-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">
            Fees Management
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">Track payments, process transactions, and manage fee status</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2">
            <Download size={20} />
            Export Report
          </button>
        </div>
      </motion.div>

      {/* Search & Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="grid lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2">
          <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              placeholder="Search by student name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-4 bg-transparent border-none focus:ring-4 focus:ring-emerald-500/20 rounded-3xl text-xl font-medium text-gray-900 dark:text-white placeholder-gray-500"
            />
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Collected', value: '₹1.25 Cr', icon: DollarSign, color: 'emerald' },
            { label: 'Pending', value: '₹2.5 L', icon: DollarSign, color: 'orange' },
            { label: 'This Month', value: '+12%', icon: DollarSign, color: 'blue' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className={`p-6 rounded-3xl bg-gradient-to-br shadow-xl flex flex-col items-center justify-center transition-all hover:-translate-y-2 ${stat.color === 'emerald' ? 'from-emerald-500/10 to-green-500/10 border-emerald-200/50' : stat.color === 'orange' ? 'from-orange-500/10 to-red-500/10 border-orange-200/50' : 'from-blue-500/10 to-indigo-500/10 border-blue-200/50'}`}
              whileHover={{ scale: 1.05 }}
            >
              <stat.icon size={28} className={`mb-2 ${stat.color === 'emerald' ? 'text-emerald-600' : stat.color === 'orange' ? 'text-orange-600' : 'text-blue-600'}`} />
              <div className="text-2xl font-black">{stat.value}</div>
              <div className="text-xs uppercase font-medium text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Fees Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2 }}
        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-2xl overflow-hidden"
      >
        {loading ? (
          <TableSkeleton columns={6} rows={6} />
        ) : (
          <Table
            columns={columns}
            data={filteredFees}
            loading={false}
            className="border-none shadow-none"
            onRowClick={(row) => console.log('View fee details:', row)}
          />
        )}
      </motion.div>

      {/* Summary Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="grid md:grid-cols-4 gap-6 pt-8 border-t border-gray-200/30 dark:border-gray-700/30"
      >
        {[
          { title: 'Total Transactions', value: '1,247', trend: '+15%' },
          { title: 'Success Rate', value: '98.2%', trend: '+0.8%' },
          { title: 'Avg Amount', value: '₹11,450', trend: '+5%' },
          { title: 'Overdue', value: '23', trend: '-3' },
        ].map((card, i) => (
          <div key={i} className="p-8 rounded-3xl bg-gradient-to-b from-white/80 to-white/20 dark:from-gray-800/60 dark:to-gray-900/40 backdrop-blur-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">{card.title}</p>
            <p className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white bg-clip-text text-transparent mb-2">
              {card.value}
            </p>
            <p className={`text-sm font-semibold flex items-center gap-1 ${card.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
              {card.trend.startsWith('+') ? <TrendingUp size={14} /> : <TrendingUp size={14} className="rotate-180" />}
              {card.trend}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}


import { useState, useEffect } from 'react';
import { Users, Building2, DollarSign, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../../context/DarkModeContext';
import { CardSkeleton } from '../../components/Skeleton';
import { PieChartComponent, BarChartComponent } from '../../components/Chart';
import Badge from '../../components/Badge';

const mockData = {
  stats: [
    { title: 'Total Students', value: '2,450', change: '+12%', icon: Users, color: 'blue' },
    { title: 'Total Departments', value: '15', change: '+1', icon: Building2, color: 'green' },
    { title: 'Fees Collected', value: '₹1.25 Cr', change: '+8.5%', icon: DollarSign, color: 'emerald' },
    { title: 'Pending Fees', value: '₹2.5 L', change: '-2%', icon: DollarSign, color: 'orange' },
  ],
  feeChart: [
    { name: 'Jan', paid: 40000, pending: 2400 },
    { name: 'Feb', paid: 30000, pending: 1398 },
    { name: 'Mar', paid: 20000, pending: 9800 },
    { name: 'Apr', paid: 27800, pending: 3908 },
    { name: 'May', paid: 18900, pending: 4800 },
    { name: 'Jun', paid: 23900, pending: 3800 },
  ],
  statusPie: [
    { name: 'Active', value: 1250, fill: '#10b981' },
    { name: 'Inactive', value: 450, fill: '#ef4444' },
    { name: 'Graduated', value: 750, fill: '#f59e0b' },
  ],
};

export default function Dashboard() {
  const { isDarkMode } = useDarkMode();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    );
  }

  return (
    <div className={`min-h-screen space-y-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">Welcome back! Here's what's happening in your college today.</p>
          </div>
          <div className="flex gap-3">
            <Badge variant="active" size="lg">Live Data</Badge>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
              <TrendingUp size={20} />
              Generate Report
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid md:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        {mockData.stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -8, shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            className={`
              group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br
              border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500
              cursor-pointer h-48 flex flex-col justify-between
              ${stat.color === 'blue' && 'from-blue-500/10 to-indigo-500/10'}
              ${stat.color === 'green' && 'from-emerald-500/10 to-teal-500/10'}
              ${stat.color === 'emerald' && 'from-emerald-500/20 to-green-500/20'}
              ${stat.color === 'orange' && 'from-orange-500/10 to-red-500/10'}
              dark:from-white/5 dark:to-white/2 backdrop-blur-xl
            `}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">{stat.title}</p>
                <p className="text-4xl font-black mt-2 bg-gradient-to-r from-gray-900 to-transparent dark:from-white bg-clip-text">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-2xl shadow-lg ${stat.color === 'blue' ? 'bg-blue-500' : stat.color === 'green' ? 'bg-emerald-500' : stat.color === 'emerald' ? 'bg-emerald-500' : 'bg-orange-500'}`}>
                <stat.icon size={24} className="text-white drop-shadow-lg" />
              </div>
            </div>
            <div className={`text-sm font-semibold flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm ${
              stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
            }`}>
              <TrendingUp size={14} className={stat.change.startsWith('+') ? '' : 'rotate-180'} />
              {stat.change}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Fees Overview</h3>
          <BarChartComponent data={mockData.feeChart} xKey="name" yKey="paid" />
        </div>
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Student Status</h3>
          <PieChartComponent 
            data={mockData.statusPie} 
            valueKey="value" 
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          />
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <div className="md:col-span-2 p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { student: 'Rahul Sharma', action: 'Fee Paid', amount: '₹12,000', time: '2 min ago', status: 'paid' },
              { student: 'Priya Singh', action: 'TC Approved', dept: 'CSE', time: '1 hr ago', status: 'active' },
              { student: 'Anjali Verma', action: 'Fee Reminder Sent', amount: '₹10,000', time: '3 hrs ago', status: 'pending' },
            ].map((activity, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors group"
                whileHover={{ x: 4 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white truncate">{activity.student}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.action}</p>
                </div>
                <Badge variant={activity.status} />
                <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="p-8 bg-gradient-to-br from-emerald-500/10 to-green-500/10 backdrop-blur-xl border border-emerald-200/50 dark:border-emerald-800/50 rounded-3xl shadow-2xl">
          <h3 className="text-xl font-bold mb-4 text-emerald-900 dark:text-emerald-100">Uptime</h3>
          <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-2">99.9%</div>
          <div className="w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-3">
            <div className="bg-emerald-500 h-3 rounded-full w-[99.9%]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

